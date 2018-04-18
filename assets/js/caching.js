if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js', {
        scope: './'
    }).then(function (reg) {
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function (error) {
        console.log('Registration failed with ' + error);
    });

    navigator.serviceWorker.addEventListener('message', function(event){
        console.log("Client 1 Received Message: " + event.data);


        if(event.data === "questions post failed"){
            console.log("couldn't get questions, try to get from cache");

            localforage.getItem("questions").then(q => {
                questionsObject = JSON.parse(q);
                totalQuestions = questionsObject.length;
            })
        }
        // event.ports[0].postMessage("Client 1 Says 'Hello back!'");
    });


}

