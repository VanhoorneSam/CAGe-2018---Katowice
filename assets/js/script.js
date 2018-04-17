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
var totalQuestions = 1;

//requesting questions not implemented

$(document).ready(function () {

    $(".nickname-panel .next").on("click", startGame);
    $("#difficulty a").on("click", askName);
    $("#home").on("click", reset);

});

var askName = function () {

    $("#difficulty").fadeOut("fast", function () {
        $(".nickname-panel").fadeIn("slow");
    })
};

var reset = function () {
    location.reload();
};

var startGame =function () {

    RequestQuestions();
    $(".nickname-panel").fadeOut("normal", function () {
        console.log(questionsObject);
        loadQuestion(questionsObject[currentQuestionIndex]);
        currentQuestionIndex++;
        $(".question-page").fadeIn("normal");
        $("#time").fadeIn("normal");
    });
};

var verifyQuestion = function (pickedAnswer) {
    console.log("checking " + pickedAnswer);
    $(".question-page").fadeOut("normal", function () {
        console.log(pickedAnswer + '=' + correctAnswer);
        console.log(pickedAnswer == correctAnswer);
        if (pickedAnswer === correctAnswer) {
            $("#success").fadeIn("normal");
        } else {
            $("#failure").fadeIn("normal");
        }
    });

};


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
    $(this).fadeOut("fast", function () {

        $(".home-page").fadeOut("fast", function () {

            $("#loadingGif").fadeIn("fast");

            $("#loadingGif").fadeOut("fast", function () {
                $("#difficulty").fadeIn("normal");
                //$(".nickname-panel").fadeIn("normal");
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

};


var nextQuestion = function () {

    $("#counter").text(currentQuestionIndex + 1);
    if (currentQuestionIndex === totalQuestions) {
        $(".final-screen").fadeIn("normal");
        $("header").fadeOut("normal");
        $(".score").text(totalScore);
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


$("#nickname").keyup(function () {
    $('.player-name').text($(this).val());
});

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


var RequestQuestions = function () {
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
