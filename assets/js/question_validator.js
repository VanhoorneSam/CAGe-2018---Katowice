/**
 * Created by kevin on 4/19/2018.
 */

var characterBlacklistRegex = /’/g;

$(document).ready(function(){
    $("#addQuestion").on("submit", validateQuestion);
});

function validateQuestion(e){
    var question = cleanInput($("#addQuestion #question").val());
    var rightAnswer = cleanInput($("#addQuestion #rightanswer").val());
    var wrongAnswer1 = cleanInput($("#addQuestion #wronganswer1").val());
    var wrongAnswer2 = cleanInput($("#addQuestion #wronganswer2").val());
    var wrongAnswer3 = cleanInput($("#addQuestion #wronganswer3").val());

    var errors = [];

    validateString("question", question, "Question can't be empty.", errors);
    validateString("rightanswer", rightAnswer, "Right answer can't be empty.", errors);
    validateString("wronganswer1", wrongAnswer1, "Wrong answer can't be empty.", errors);

    if(errors.length !== 0){
        e.preventDefault();
        showErrors(errors);
    }

}

function showErrors(errors){
    errors.forEach(error => {
        if(typeof(error) !== "undefined"){
            console.log(error);

            $("#" + error.field);
        }
    })
}

function Error(field, message){
    this.field = field;
    this.message = message;
}

function validateString(fieldName, inputString, errorMessage, errors){

    if(typeof inputString === "undefined" || inputString === ""){
        errors.push(new Error(fieldName, errorMessage));
    }
}

function cleanInput(inputString){

    return inputString.replace(characterBlacklistRegex, "'");

}