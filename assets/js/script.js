var questionsObject;
var correctAnswer;
var currentQuestionIndex = 0;
var totalScore = 0;
var counter = 0;
var totalQuestions = 2;
var timer = 0;
var numberOfQuestionsPerChapter;
var numberOfChapters = 14;

$(document).ready(function () {
    $(".nickname-panel .next").on("click", startGame);
    $("#difficulty a").on("click", askName);
    $("#home").on("click", reset);
    $(".again-button").on("click", reset);
    $("#learnMore").on("click", learnMore)
});

var learnMore = function () {
    $("#chapters").slideToggle("slow");
}


var askName = function () {

    numberOfQuestionsPerChapter = ($(this).attr("data-amount"));
    totalQuestions = $(this).attr("data-amount");

    $("#difficulty").fadeOut("fast", function () {
        $(".nickname-panel").fadeIn("slow");
    })
};

var reset = function () {
    location.reload();
};

var finalGrade = function () {

    var consumptionTotal = 0;
    var consumptionCorrect = 0;
    var companiesTotal = 0;
    var companiesCorrect = 0;
    var consumersTotal = 0;
    var consumersCorrect = 0;
    var otherTotal = 0;
    var otherCorrect = 0;


    // category names will likely change once the backend is done


    for (var i = 0; i < currentQuestionIndex; i++) {

        switch (questionsObject[i].category) {
            case "Consumption in Europe; General Characteristics and Consumer Awareness Importance":
                consumptionTotal++;
                if (questionsObject[i].correct_answer) {
                    consumptionCorrect++;
                }
                break;
            case "Companies’ Behaviour and Consumer Awareness Relevance":
                companiesTotal++;
                if (questionsObject[i].correct_answer) {
                    companiesCorrect++;
                }
                break;
            case "Consumer Protection in Europe":
                consumersTotal++;
                if (questionsObject[i].correct_answer) {
                    consumersCorrect++;
                }
                break;
            default:
                otherTotal++;
                if (questionsObject[i].correct_answer) {
                    otherCorrect++;
                }
                break;
        }
    }
    $("#score-consumption").text(consumptionCorrect + " / " + consumptionTotal);
    $("#score-companies").text(companiesCorrect + " / " + companiesTotal);
    $("#score-consumer").text(consumersCorrect + " / " + consumersTotal);

    $(".score").text(totalScore);
    if (otherTotal > 0) {
        $("#score-categories").append("Other " + otherCorrect + " / " + otherTotal);
    }


};

var grade = function (rightWrong) {
    questionsObject[currentQuestionIndex].answerCorrect = rightWrong;
}

var startGame = function () {

    RequestQuestions();

    $("#counter").text("1/" + numberOfChapters * numberOfQuestionsPerChapter);


    $(".nickname-panel").fadeOut("normal", function () {

        loadQuestion(questionsObject[currentQuestionIndex]);
        //currentQuestionIndex++;
        $(".question-page").fadeIn("normal");
        $("#time").fadeIn("normal");
    });
}

var verifyQuestion = function (pickedAnswer) {

    $(".question-page").fadeOut("normal", function () {

        if (pickedAnswer === correctAnswer) {
            $("#success").fadeIn("normal");
            grade(true);
        } else {
            $("#failure").fadeIn("normal");
            grade(false);
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
    $("#welcome").fadeOut(200);
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
    $("#question span").text(givenQuestion['question']);
    delete givenQuestion[0];
    correctAnswer = givenQuestion.rightAnswer;
    var allAnswers = [];
    allAnswers.push(givenQuestion['rightAnswer']);
    givenQuestion['wrongAnswers'].forEach(x => allAnswers.push(x));
    shuffle(allAnswers);
    $("#answer-one span").text([allAnswers[0]]);
    $("#answer-two span").text(allAnswers[randomTable[1]]);
    $("#answer-three span").text(allAnswers[randomTable[2]]);
    $("#answer-four span").text(allAnswers[randomTable[3]]);

};


var nextQuestion = function () {

    $("#counter").text(currentQuestionIndex + 1 + "/" + numberOfChapters*numberOfQuestionsPerChapter);
    if (currentQuestionIndex === totalQuestions) {
        $(".final-screen").fadeIn("normal");
        $("header").fadeOut("normal");
        $(".score").text(totalScore);
    } else {
        $(".answer").removeClass("selectedAnswer");
        $(".question-page").fadeIn("normal");
        console.log(questionsObject);
        loadQuestion(questionsObject[currentQuestionIndex]);

        console.log(totalQuestions);
        console.log(currentQuestionIndex);
    }
};


$("a.next-succes").on("click", function () {
    totalScore++;
    currentQuestionIndex++;
    $("#success").fadeOut("normal");

    grade(true);
    nextQuestion();

});


$("a.next-false").on("click", function () {
    $("#failure").fadeOut("normal");
    currentQuestionIndex++;
    grade(false);
    nextQuestion();


});

$(".nickname-panel .next").on("click", function () {
    $(".nickname-panel").fadeOut("normal", function () {
            $("#time").fadeIn("normal");
            $(".stop").fadeIn().css("display", "block");
            //loadQuestion(questionsObject[currentQuestionIndex]);
            nextQuestion();
            //currentQuestionIndex++;
            $(".question-page").fadeIn("normal");
        }
    )
});

$("#nickname").keyup(function () {
    $('.player-name').text($(this).val());
});

var totalSeconds = 0;

function setTime() {
    totalSeconds++;

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


function filterQuestionsIntoChapter(questionboject) {

    var allChapters = [];

    var sortedQuestions = {};

    questionboject.forEach(function (question) {

        if (!allChapters.includes(question.chapter)) {
            allChapters.push(question.chapter);

        }
    });

    allChapters.forEach(function (chapter) {
        sortedQuestions[chapter] = [];
    });


    questionboject.forEach(function (question) {
        sortedQuestions[question.chapter].push(question);

    });

    console.log(sortedQuestions);

    return sortedQuestions;


}

function pickAmmountOfQuestions(allQuestions) {

    var currentAmmountOfQuestions=0;

    questionsObject={};

    for(var chapter in allQuestions){

        for(var i=0;i<numberOfQuestionsPerChapter;i++){

            console.log(chapter);
            questionsObject[currentAmmountOfQuestions] =allQuestions[chapter][i];


            currentAmmountOfQuestions++;
        }

    }

    console.log(questionsObject);

}


var RequestQuestions = function () {
    $.ajax({
        url: "questions.php",
        data: "action=question",
        dataType: "JSON",
        type: "POST",
        timeout: 3000,
        success: function (data) {
            questionsObject = data;
            for (i = 0; i < data.length; i++) {
                questionsObject[i] = JSON.parse(questionsObject[i]);
            }
            var allQuestions = filterQuestionsIntoChapter(questionsObject);
            pickAmmountOfQuestions(allQuestions);
            totalQuestions = Object.keys(questionsObject).length;
    console.log(totalQuestions);

        },
        error: function (jqXHR, textStatus, errorThrown) {

            if (typeof console != "undefined") {
                console.log(jqXHR.responseText);
                console.log(textStatus, errorThrown);
            }

        }

    });
};