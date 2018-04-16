/**
 * Created by jorden on 4/26/2017.
 */

var questions = function(){
    $self = this;
    $.ajax({
        url: "script.php",
        context: this,
        data: "action=question",
        type: "POST",
        dataType: "json",
        timeout:3000,
        success: function(data){
            console.log(data);
            console.log(typeof (data));
            //$("#fuckgunder").innerHTML("test");


        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("error");
            if(typeof console != "undefined") {
                console.log(jqXHR.responseText);
                console.log(textStatus, errorThrown);


            }

        }

    })
};




$(document).ready(function() {
    questions();
});