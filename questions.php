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

    $array = range(1, $db->getQuestionCount());
    shuffle($array);
    $finalArray = array();
    for ($i = 0; $i < $count; $i++) {

        $nummer = $array[$i];
        $object = $db->getNthQuestionNewFormat($nummer);

        $finalArray[] = $object;
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



