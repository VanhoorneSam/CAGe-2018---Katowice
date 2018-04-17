//IT Students:
//Kenny Depecker, Timo Vergauwen, Louis Hansart, Jorden Deserrano(php man),
//Matthias Carlier, Renzie Omaña, Robbe Vuylsteke, Jaan Buerms, Wout Bracke
//Ward Adriaensen

//Bussiness Students:
//Marcel Mazik, Majdeline Yahyaoui Idrissi,Magdalena Rudawska, Pawel Adamczyk, Grzegorz Markowski,
//Agnieszka Kocot,Natalia Lot,Marianna Macha,Dawid Fuchs, Wojtek Dorobisz, Oskar Bieron

//MAKE SURE TO KEEP THE LOGO THE SAME!!!
//SORRY FOR OUR SHITTY CODE!!!
//STAY THE FUCK OUT OF MY DATABASE!!!
//MAKE SURE TO CLICK THE LOGO MULTIPLE TIMES
//28/04/2017
var questionsObject;
var correctAnswer;
var currentQuestionIndex = 0;
var totalScore = 0;
var counter = 0;
var totalQuestions = 20;
var timer = 0;



var qObject = {


};

$(document).ready(function () {
    elementsToResize = ["answer-one", "answer-two", "answer-three", "answer-four", "question"];

});

var grade = function(rightWrong)
{
    questionsObject[currentQuestionIndex].correct_answer=rightWrong;
    //console.log(questionsObject);
};

var finalGrade = function()
{
    console.log("going to the final grading");
    var consumptionTotal=0;
    var consumptionCorrect=0;
    var companiesTotal=0;
    var companiesCorrect=0;
    var consumersTotal=0;
    var consumersCorrect=0;
    var otherTotal = 0;
    var otherCorrect=0;

    // category names will likely change once the backend is done


    for ( var i = 0; i < currentQuestionIndex; i++) {

        switch(questionsObject[i].category) {
            case "Consumption in Europe; General Characteristics and Consumer Awareness Importance":
                consumptionTotal++;
                if(questionsObject[i].correct_answer){
                    consumptionCorrect++;
                }
                break;
            case "Companies’ Behaviour and Consumer Awareness Relevance":
                companiesTotal++;
                if(questionsObject[i].correct_answer){
                    companiesCorrect++;
                }
                break;
            case "Consumer Protection in Europe":
                consumersTotal++;
                if(questionsObject[i].correct_answer){
                    consumersCorrect++;
                }
                break;
            default:
                otherTotal++;
                if(questionsObject[i].correct_answer){
                    otherCorrect++;
                }
                break;
        }
    }
    $("#score-consumption").text(consumptionCorrect +" / "+ consumptionTotal);
    $("#score-companies").text(companiesCorrect +" / "+ companiesTotal);
    $("#score-consumer").text(consumersCorrect +" / "+ consumersTotal);

    $(".score").text(totalScore);
    if(otherTotal>0){
        $("#score-categories").append("Other " + otherCorrect + " / "+ otherTotal);
    }
};


var verifyQuestion = function (pickedAnswer) {
    console.log("checking " + pickedAnswer);
    $(".question-page").fadeOut("normal", function () {
        console.log(pickedAnswer + '=' + correctAnswer);
        console.log(pickedAnswer == correctAnswer);
        if (pickedAnswer === correctAnswer) {
            $("#success").fadeIn("normal");
            grade(true);

        } else {
            $("#failure").fadeIn("normal");
            grade(false);

        }
    });

};

$('#logo').on("click", function () {
    counter++;
    if (counter >= 10) {
        window.location.replace("http://isitbeeroclock.com/");
    }
});

$(".answer span").on("click", function () {

    if ($(this).parent().hasClass("selectedAnswer")) {
        console.log($(this).text());
        verifyQuestion($(this).text());


    } else {
        $(".answer").removeClass("selectedAnswer");
        $(this).parent().addClass("selectedAnswer");

    }

});

$(".home-page a").on("click", function () {

    console.log("check");
    $(this).fadeOut("normal", function () {

        $(".home-page").fadeOut("normal", function () {

            $("#loadingGif").fadeIn("normal", function () {

                questions();


            })

            $("#loadingGif").fadeOut("normal", function () {
                $(".nickname-panel").fadeIn("normal");
                $("header").fadeIn("normal");
            }).css("display", "block");

        })

    })

});


var loadQuestion = function (givenQuestion) {
    var randomTable = [1, 2, 3, 4];
    $("#question span").text(givenQuestion[0]);
    console.log(givenQuestion);
    //delete givenQuestion[0];
    console.log(givenQuestion);
    correctAnswer = givenQuestion[1];
    console.log(givenQuestion[1]);
    shuffle(randomTable);
    $("#answer-one span").text(givenQuestion[randomTable[0]]);
    $("#answer-two span").text(givenQuestion[randomTable[1]]);
    $("#answer-three span").text(givenQuestion[randomTable[2]]);
    $("#answer-four span").text(givenQuestion[randomTable[3]]);

}


var nextQuestion = function () {

    $("#counter").text(currentQuestionIndex + 1);
    if (currentQuestionIndex === totalQuestions) {
        $(".final-screen").fadeIn("normal");
        $("header").fadeOut("normal");
        finalGrade();
    } else {
        $(".answer").removeClass("selectedAnswer");
        currentQuestionIndex++;
        $(".question-page").fadeIn("normal");
        loadQuestion(questionsObject[currentQuestionIndex]);
    }
};




$("a.next-succes").on("click", function () {

    totalScore++;
    $("#success").fadeOut("normal");
    console.log("next");
    nextQuestion();
});


$("a.next-false").on("click", function () {
    $("#failure").fadeOut("normal");
    console.log("next");
    nextQuestion();

});

$(".nickname-panel .next").on("click", function () {
    $(".nickname-panel").fadeOut("normal", function () {
        $("#time").fadeIn("normal");
        $(".stop").fadeIn().css("display","block");
        console.log(questionsObject);
        loadQuestion(questionsObject[currentQuestionIndex]);
        currentQuestionIndex++;
        $(".question-page").fadeIn("normal");


        setInterval(setTime, 1000);
    });

});

$(".stop").on("click", function () {
    $(".final-screen").fadeIn("normal");
    $("#succes, #failure, header, .question-page").fadeOut("normal");
    finalGrade();

});

$("#nickname").keyup(function () {
    $('.player-name').text($(this).val());
});

var totalSeconds = 0;
function setTime() {
    totalSeconds++;
    console.log(pad(totalSeconds % 60) + ":" + pad(parseInt(totalSeconds / 60)))
}
function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


function shuffle(array) {
    console.log("Start shuffling...");
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


var questions = function () {
    $.ajax({
        url: "script.php",
        data: "action=question",
        dataType: "JSON",
        type: "POST",
        timeout: 3000,
        success: function (data) {
            console.log(data);
            questionsObject = data;
            for (i = 0; i < data.length; i++) {
                questionsObject[i] = JSON.parse(questionsObject[i]);
            }
            console.log(questionsObject);
            //console.log(questionsObject);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error");
            if (typeof console != "undefined") {
                console.log(jqXHR.responseText);
                console.log(textStatus, errorThrown);
            }

        }

    })
};
