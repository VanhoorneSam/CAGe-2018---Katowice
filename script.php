<?php
/**
 * Created by PhpStorm.
 * User: jorden
 * Date: 4/26/2017
 * Time: 9:43 AM
 */



header('Content-Type: application/json');


function getQuestion($number)
        {

            //Met Prepared Statement
            try {
                // $servername = "mysqlhost2";
                // $username = "appcage";
                // $password = "ouQuai5oocee";
                // $database = "appcage";

                $servername = "localhost";
                $username = "consumee";
                $password = "consumee";
                $database = "consumee";


                $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                $stmt = $conn->prepare("
                SELECT question,CA_text,WA_text from questions
                join correct_answers on correct_answers.idQuestion = questions.questionID
                join wrong_answers on wrong_answers.idQuestion = questions.questionID
                where questions.questionID = $number
                ");
                $stmt->execute();

                // set the resulting array to associative
                $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
                $question = $stmt->fetchAll();


                $wrong = [];
                foreach ($question as $row) {
                    $question = ($row['question']);
                    //echo $question;
                    $Correct = ($row['CA_text']);
                    $wrong = (object) array_merge( (array) $row['WA_text'], (array) $wrong);
                }

                $merged = (object) array_merge((array) $question, (array) $Correct, (array) $wrong);




            } catch (PDOException $e) {
                die($e->getMessage());
            }
            return json_encode($merged);



        }

//print_r ((getQuestion(41)));



function questionsCount()
{
    try {
        $servername = "localhost";
        $username = "consumee";
        $password = "consumee";
        $database = "consumee";

        $conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM questions");
        $stmt->execute();
        $question = $stmt->fetchAll();


    } catch (PDOException $e) {
        die($e->getMessage());
    }

    return (count($question));
}




function getQuestions($count){
    //echo getQuestion(3);
    $array = range(1,questionsCount());
    shuffle($array);
    $finalArray = array();
        for ($i = 0; $i < $count; $i++) {

            $nummer = $array[$i];
            $object = getQuestion($nummer);
            //print_r($object);
            //echo getQuestion($nummer);
            $finalArray[] = $object;
            //echo json_encode("final array" . $finalArray);
        }
        return $finalArray;
}



$output = json_encode(getQuestions(1));
echo $output;



?>