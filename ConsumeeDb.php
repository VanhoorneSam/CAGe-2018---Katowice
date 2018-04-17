<?php
/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 4/17/2018
 * Time: 11:07 AM
 */

class ConsumeeDb{
    function getQuestions($number){
        global $config;
        //Met Prepared Statement
        try {
//                SELECT question,CA_text,WA_text from questions
//                join correct_answers on correct_answers.idQuestion = questions.questionID
//                join wrong_answers on wrong_answers.idQuestion = questions.questionID
//                where questions.questionID = $number

            $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("

                    SELECT nameQuestion, nameAnswer, isCorrect
                    FROM question q
                    join answer a on q.idQuestion = a.idQuestion
                    where q.idQuestion = $number

                ");
            $stmt->execute();

            $result = $stmt->setFetchMode(PDO::FETCH_ASSOC);
            $questions = $stmt->fetchAll();

            return $questions;
        } catch (PDOException $e) {
            throw new ConsumeeException("something went wrong");
        }
        return null;
    }

    function getQuestionCount()
    {
        try {
            global $config;

            $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $stmt = $conn->prepare("SELECT * FROM question");
            $stmt->execute();
            $question = $stmt->fetchAll();


            return (count($question));
        } catch (PDOException $e) {
            throw new ConsumeeException("something went wrong");
//            echo createJsonError("something went wrong");
        }
    }

    function getNthQuestion($number)
    {
        global $jsonUtil;

        $questions = $this->getQuestions($number);
        return $jsonUtil->questionsAsJson($questions);
    }

}