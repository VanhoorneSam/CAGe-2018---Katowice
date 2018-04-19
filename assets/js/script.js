var questionsObject;
var correctAnswer;
var currentQuestionIndex = 0;
var totalScore = 0;
var counter = 0;
var totalQuestions = 2;
var timer = 0;
var numberOfQuestionsPerChapter;
var numberOfChapters = 14;
var KEY_QUESTIONS = "questions";
var totalSeconds = 0;

$(document).ready(function () {
    $(".nickname-panel .next").on("click", startGame);
    $("#difficulty a").on("click", askName);
    $("#home").on("click", reset);
    $(".again-button").on("click", reset);
    $("#learnMore").on("click", learnMore)
});

var learnMore = function () {
    $("#chapters").slideToggle("slow");
};


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


var grade = function (rightWrong) {
    questionsObject[currentQuestionIndex].answerCorrect = rightWrong;
    console.log(questionsObject);
};

var startGame = function () {
    var nick = ($("#nickname").val());
    if(nick.length>0){    $('.player-name').text($("#nickname").val());
    }

    function success(data){
        console.log(data);
        questionsObject = data;
        for (i = 0; i < data.length; i++) {
            questionsObject[i] = JSON.parse(questionsObject[i]);
        }
        var allQuestions = filterQuestionsIntoChapter(questionsObject);
        pickAmmountOfQuestions(allQuestions);
        totalQuestions = Object.keys(questionsObject).length;

        localforage.setItem("KEY_QUESTIONS", JSON.stringify(questionsObject)).then(function () {
            console.log("cached " + totalQuestions + " questions");
            $("#counter").text("1/" + totalQuestions);

        });


        fadeOutNicknamePanel();
    }

    function error(jqXHR, textStatus, errorThrown) {
        console.error("error");
        console.log(textStatus);
        if (typeof console != "undefined") {
            console.log(jqXHR.responseText);
            console.log(textStatus, errorThrown);
        }

        localforage.getItem("questions").then(q => {
            questionsObject = JSON.parse(q);
            totalQuestions = questionsObject.length;

            fadeOutNicknamePanel();
        })
    }

    RequestQuestions(success, error);
};

function fadeOutNicknamePanel() {

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


$(".answer span").on("click", function (event) {

    event.preventDefault();

    if ($(this).parent().hasClass("selectedAnswer")) {

        verifyQuestion($(this).text());


    } else {
        $(".answer").removeClass("selectedAnswer");
        $(this).parent().addClass("selectedAnswer");

    }

});

$(".home-page a").on("click", function () {


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
    shuffleArray(allAnswers);
    $("#answer-one span").text([allAnswers[0]]);
    $("#answer-two span").text(allAnswers[randomTable[1]]);
    $("#answer-three span").text(allAnswers[randomTable[2]]);
    $("#answer-four span").text(allAnswers[randomTable[3]]);

};


var nextQuestion = function () {

    //$("#counter").text(currentQuestionIndex + 1 + "/" + totalQuestions);
    if (currentQuestionIndex === totalQuestions) {
        $(".final-screen").fadeIn("normal");
        $("header").fadeOut("normal");
        $(".score").text(totalScore);
    } else {
        $(".answer").removeClass("selectedAnswer");
        $(".question-page").fadeIn("normal");

        loadQuestion(questionsObject[currentQuestionIndex]);
        $("#counter").text(currentQuestionIndex + 1 + "/" + totalQuestions);


    }
};


$("a.next-succes").on("click", function () {
    totalScore++;
    grade(true);
    currentQuestionIndex++;
    $("#success").fadeOut("normal", function(){nextQuestion()});
});

$("a.next-false").on("click", function () {
    grade(false);
    currentQuestionIndex++;
    $("#failure").fadeOut("normal", function(){nextQuestion()});
});


$("#nickname").keyup(function () {
    $('.player-name').text($(this).val());
});


function setTime() {
    totalSeconds++;

}

function getQuestionsNetworkFirst() {

}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


function shuffleArray(array) {

    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffleArray...
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
function shuffleObject(sourceArray) {
    for (var i = 0; i < Object.keys(sourceArray).length - 1; i++) {
        var j = i + Math.floor(Math.random() * (Object.keys(sourceArray).length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
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


    return sortedQuestions;

}

function pickAmmountOfQuestions(allQuestions) {

    var currentAmmountOfQuestions = 0;

    questionsObject = {};

    for (var chapter in allQuestions) {

        for (var i = 0; i < numberOfQuestionsPerChapter; i++) {


            questionsObject[currentAmmountOfQuestions] = allQuestions[chapter][i];


            currentAmmountOfQuestions++;
        }

    }
    shuffleObject(questionsObject);

}

var RequestQuestions = function (success, error) {
    $.ajax({
        url: "questions.php",
        data: "action=question",
        dataType: "JSON",
        type: "POST",
        timeout: 3000,
        success: success,
        error: error
    });
};
