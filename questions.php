<?php
/**
 * Created by PhpStorm.
 * User: Dante
 * Date: 17/04/2018
 * Time: 11:28
 */


include("ConsumeeDb.php");
include("ConsumeeException.php");
include("JsonUtil.php");

header('Content-Type: application/json');

$path_to_credentials =  __DIR__ . "/credentials.php";
$config = include($path_to_credentials);




function getShuffledQuestions($count){
    global $db;
    global $jsonUtil;

    $finalArray = array();

    $questions = $db->getQuestionsInNewFormat();
    $lastId = null;

    $currentQuestion = null;
    $wrong = array();

    $counter = 0;

   foreach ($questions as $question){

       $currentId = $question['idQuestion'];
       $nameQuestion = ($question['nameQuestion']);
       $isCorrect = ($question['IsCorrect']);
       $chapterName = $question['nameChapter'];
       $categoryName = $question['nameCategorie'];
       if($isCorrect){
           $Correct = ($question['nameAnswer']);
       } else {
           $wrong[] = $question['nameAnswer'];
       }


       if($lastId !== null && $lastId !== $currentId){
           $currentQuestion = array();

           $merged = array(
               'question' => $nameQuestion,
               'wrongAnswers' => $wrong,
               'rightAnswer' => $Correct,
               'chapter' =>$chapterName,
               'category' => $categoryName
           );

           $wrong = array();

           $jsonEncode = json_encode($merged);
           $finalArray[] = $jsonEncode;

           $counter++;
       }

       $lastId = $question['idQuestion'];
   }

    return $finalArray;
}

try{
    $db = new ConsumeeDb();
    $jsonUtil = new JsonUtil();

    $output = json_encode(getShuffledQuestions(20));
    echo $output;
} catch(ConsumeeException $exception){
    echo $exception->getMessage();
}



