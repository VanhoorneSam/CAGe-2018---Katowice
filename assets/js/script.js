var questionsObject;
var correctAnswer;
var currentQuestionIndex = 0;
var totalScore = 0;
var counter = 0;
// var totalQuestions = 2;
var timer = 0;
var numberOfQuestionsPerChapter;
var numberOfChapters = 14;
var KEY_QUESTIONS = "questions";
var totalSeconds = 0;
var allChapters = [];
var isTimeAttack = false;
var timeAttackTime = 20;

var co = 0; //to prevent spamming of the buttons
var st = 0;////to prevent spamming of the buttons

$(document).ready(function () {
    $(".nickname-panel .next").on("click", startGame);
    $("#difficulty a").on("click", askName);
    $("#home").on("click", reset);
    $(".again-button").on("click", reset);
    $("#learnMore").on("click", learnMore);
    $("#classroom").on("click", showClassroomElements);
    $(".scoreboard").on("click", showScoreBoard);
    $(".next").on("click", checkInput)
});

var checkInput = function () {
    var characterBlacklistRegex = /’/g;

    var nickname = $("#nickname").val();
    nickname.replace(characterBlacklistRegex, "'");

};

var showScoreBoard = function () {
    $("#scoreboard").slideToggle("slow");
};

var showClassroomElements = function () {
    $(".gamepin").show();
    $(".scoreboard").removeClass("hidden");
};

var learnMore = function () {
    $("#chapters").slideToggle("slow");
};


var askName = function () {

    if (($(this).attr("data-mode")) == 1) {
        isTimeAttack = true;
    } else {
        isTimeAttack = false;
    }
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
};

var startGame = function () {
   if(st == 0){
     st++;
    var nick = ($("#nickname").val());
    if (nick.length > 0) {
        $('.player-name').text($("#nickname").val());
    }

    function success(data) {
        var questionsToCache = {};
        questionsObject = data;
        for (var i = 0; i < data.length; i++) {
            questionsObject[i] = JSON.parse(questionsObject[i]);
        }
        var allQuestions = filterQuestionsIntoChapter(questionsObject);
        pickAmmountOfQuestions(allQuestions);
        totalQuestions = Object.keys(questionsObject).length;

        if (!isTimeAttack) {

            localforage.setItem(KEY_QUESTIONS, JSON.stringify(data)).then(function () {
                console.log("cached " + totalQuestions + " questions");
                $("#counter").text("1/" + totalQuestions);
            });
        } else {
            $("#counter").text(timeAttackTime);
        }
        fadeOutNicknamePanel();
    }

    function error(jqXHR, textStatus, errorThrown) {
        if (typeof console != "undefined") {
            console.log(jqXHR.responseText);
            console.log(textStatus, errorThrown);
        }

        localforage.getItem("questions").then(q => {
            questionsObject = JSON.parse(q);
            questionsObject = shuffleArray(questionsObject);
            var allQuestions = filterQuestionsIntoChapter(questionsObject);
            pickAmmountOfQuestions(allQuestions);
            totalQuestions = Object.keys(questionsObject).length;
            $("#counter").text("1/" + totalQuestions);
            fadeOutNicknamePanel();
        })
    }

    RequestQuestions(success, error);
}};

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

///Controll scheme, can do with some cleaning up

$(".answers").on("mousedown", ".answer span", function (event) {

    event.preventDefault();

    if (event.which === 1) {
        $(".answer").removeClass("selectedAnswer");
        $(this).parent().addClass("selectedAnswer");
    }


});

$(".answers").on("mouseup", ".answer span", function (event) {

    event.preventDefault();
    if ($(this).parent().hasClass("selectedAnswer")) {
        verifyQuestion($(this).text());
        co  = 0;
        $(".answers").empty();

    }

});

$(document).on("mouseup", function (event) {
    $(".answer").removeClass("selectedAnswer");
});

///

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
    $("#question span").text(givenQuestion['question']);
    delete givenQuestion[0];
    correctAnswer = givenQuestion.rightAnswer;
    var allAnswers = [];
    allAnswers.push(givenQuestion['rightAnswer']);
    givenQuestion['wrongAnswers'].forEach(x => allAnswers.push(x));
    shuffleArray(allAnswers);
    var answerDiv = $(".answers");
    answerDiv.empty();
    allAnswers.forEach(q => {
        answerDiv.append(`<a href="#" class="answer">
        <span>${q}</span>
            </a>`)
    });
};

var renderScore = function () {
    var solutionobject = countCorrectQuestionsPerChapter();

    for (var i = 0; i < allChapters.length; i++) {
        var currentchapter = allChapters[i];
        var score = solutionobject[currentchapter];

        $("#scoreperchapter").append("<li>" + currentchapter + "<span class='chapterScore'>" + score + "/" + numberOfQuestionsPerChapter + "</span></li>");

    }


};


var nextQuestion = function () {
    //$("#counter").text(currentQuestionIndex + 1 + "/" + totalQuestions);
    if (currentQuestionIndex === totalQuestions || isTimeAttack && timeAttackTime <= 0) {
        $(".final-screen").fadeIn("normal");
        $("header").fadeOut("normal");
        $(".score").text(totalScore + "/" + totalQuestions);
        if(!isTimeAttack)
        {
            $("#learnMore").removeClass("hidden");
            renderScore();
        } else {
            $("#learnMore").addClass("hidden");
        }
        $(".answers").empty();
    } else {
        $(".answer").removeClass("selectedAnswer");
        $(".question-page").fadeIn("normal");
        $(".answers").empty();
        loadQuestion(questionsObject[currentQuestionIndex]);
        if (!isTimeAttack) {
            $("#counter").text(currentQuestionIndex + 1 + "/" + totalQuestions);
        }

    }
};
var countCorrectQuestionsPerChapter = function () {
    var correctAnswer = {};
    allChapters.forEach(x=>correctAnswer[x] = 0);
    for (var question in questionsObject) {
        if (questionsObject[question]["answerCorrect"] === true) {
            correctAnswer[questionsObject[question]["chapter"]]++;
        }
    }
    return correctAnswer;
};

$("a.next-succes").on("click", function () {
    if(co  == 0){
    co++;
    totalScore++;
    //grade(true);
    currentQuestionIndex++;
    $("#success").fadeOut("normal", function () {
        nextQuestion();
    });
}});

$("a.next-false").on("click", function () {
  if(co == 0){
    co++;
    //grade(false);
    currentQuestionIndex++;
    $("#failure").fadeOut("normal", function () {
        nextQuestion();
    });
}});


$("#nickname").keyup(function () {
    $('.player-name').text($(this).val());
});


//////////TIMER

var timer = setInterval(function () {
    if (isTimeAttack) {
        timeAttackTime--;
        $("#counter").text(timeAttackTime);
        if (timeAttackTime <= 0)
            clearInterval(timer);
    }

}, 1000);

/////

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
    sourceArray = Object.values(sourceArray);
    var shuffledArray = [];
    var rand = getRandomInt(0, sourceArray.length - 1);
    var count = 0;
    while (Object.keys(sourceArray).length > 0) {
        if (sourceArray[rand] !== undefined) {
            shuffledArray.push(sourceArray[rand]);
            sourceArray.splice(rand, 1);
        }
        rand = getRandomInt(0, sourceArray.length);
    }
    return shuffledArray;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function filterQuestionsIntoChapter(questionboject) {


    var sortedQuestions = {};

    questionboject.forEach(function (question) {

        if (!allChapters.includes(question.chapter)) {
            allChapters.push(question.chapter);
        }
    });
    console.log(allChapters);
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

    if (isTimeAttack) {
        numberOfQuestionsPerChapter = 10;
    }

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
