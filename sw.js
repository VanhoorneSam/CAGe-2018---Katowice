//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';
var precacheFiles = [
    /* Add an array of files to precache for your app */
    "/index.html",
    "/assets/js/caching.js",
    "/assets/js/script.js",
    "/assets/images/correct.png",
    "/assets/images/loading.gif",
    "/assets/images/logo.png",
    "/assets/images/next.png",
    "/assets/images/play with me.png",
    "/assets/images/stop.png",
    "/assets/images/stopwatch.png",
    "/assets/images/timer.png",
    "/assets/images/wrong.png",
    // "/assets/images/DK Lemon Yellow Sun.otf",
    "/assets/css/CAGe-style.css",
    "/assets/css/reset.css",
    "/assets/js/localforage.min.js"
];

//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function(evt) {
    console.log('The service worker is being installed.');
    evt.waitUntil(precache().then(function() {
            console.log('[ServiceWorker] Skip waiting on install');
            return self.skipWaiting();

        })
    );
});


//allow sw to control of current page
self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Claiming clients for current page');
    return self.clients.claim();

});

self.addEventListener('fetch', function(evt) {
    console.log('The service worker is serving the asset.'+ evt.request.url);

    if(evt.request.method === "POST"){


        evt.waitUntil(

            fromServer(evt.request).catch(error => {
                if(evt.request.url.indexOf("questions.php") !== -1){
                    return sendMessageToAllClients("questions post failed");
                }
                return sendMessageToAllClients(error)
            })
        )
        // return; // todo communicate with script.js so it knows to show an error
    } else {

        evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
        evt.waitUntil(update(evt.request));
    }
});


function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}


function fromCache(request) {
    //we pull files from the cache first thing so we can show them fast
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}


function update(request) {
    //this is where we call the server to get the newest version of the
    //file to use the next time we show view
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request){
    //this is the fallback if it is not in the cahche to go to the server and get it
    return fetch(request).then(function(response){ return response})
}

function sendMessageToAllClients(msg){
    clients.matchAll().then(clients => {
        clients.forEach(client => {
            send_message_to_client(client, msg).then(m => console.log("SW Received Message: " + m));
        })
    })
}

function send_message_to_client(client, msg){
    return new Promise(function(resolve, reject){
        var msg_chan = new MessageChannel();

        msg_chan.port1.onmessage = function(event){
            if(event.data.error){
                reject(event.data.error);
            }else{
                resolve(event.data);
            }
        };

        client.postMessage(msg, [msg_chan.port2]);
    });
}
