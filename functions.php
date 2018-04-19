<?php
/**
 * Created by PhpStorm.
 * User: thibeau
 * Date: 17/04/2018
 * Time: 10:44
 */

$path_to_credentials =  __DIR__ . "/credentials.php";
$config = include($path_to_credentials);

function getAllCategories()
{
    global $config;

    try {

        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM categorie");
        $stmt->execute();
        $categories = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return ($categories);
}

function getCategorie($id)
{
    global $config;
    try {

        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM categorie WHERE idCategorie = $id");
        $stmt->execute();
        $categories = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return ($categories);
}

function getCategorieCount()
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM categorie");
        $stmt->execute();
        $categories = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return (count($categories));
}

function getAllChapters()
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM chapter");
        $stmt->execute();
        $chapters = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return ($chapters);
}

function getChapter($id)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM chapter WHERE idChapter = $id");
        $stmt->execute();
        $chapters = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return ($chapters);
}

function getChapterCount()
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM chapter");
        $stmt->execute();
        $chapters = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return (count($chapters));
}

function getAllQuestions()
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT *,chapter.nameChapter,categorie.nameCategorie FROM question LEFT JOIN chapter ON question.idChapter = chapter.idChapter LEFT JOIN categorie ON chapter.idCategorie = categorie.idCategorie");
        $stmt->execute();
        $questions = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return ($questions);
}

function addQuestion($question, $chapter, $nameAnswerRight, $nameAnswerWrong1, $nameAnswerWrong2, $nameAnswerWrong3)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("INSERT INTO question(nameQuestion, idChapter) VALUES(:question,:chapter)");
        $stmt->bindValue(':question', $question);
        $stmt->bindValue(':chapter', $chapter);
        $stmt->execute();
        addAnswer($nameAnswerRight, $nameAnswerWrong1, $nameAnswerWrong2, $nameAnswerWrong3);
    } catch (PDOException $e) {
        die($e->getMessage());
    }
}

function getLastQuestionId()
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT idQuestion FROM question ORDER BY idQuestion DESC LIMIT 1");
        $stmt->execute();
        $lastQuestionId = $stmt->fetchAll();

    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return ($lastQuestionId);
}

function addAnswer($nameAnswerRight, $nameAnswerWrong1, $nameAnswerWrong2, $nameAnswerWrong3)
{
    global $config;
    try {

        $lastQuestionIdArr = getLastQuestionId();
        foreach ($lastQuestionIdArr as $s) {
            $lastQuestionId = $s['idQuestion'];
        }

        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("INSERT INTO answer(idQuestion, nameAnswer, IsCorrect) VALUES(:idQuestion, :nameAnswerRight, 1),(:idQuestion, :nameAnswerWrong1, 0),(:idQuestion, :nameAnswerWrong2, 0),(:idQuestion, :nameAnswerWrong3, 0)");
        $stmt->bindValue(':idQuestion', $lastQuestionId);
        $stmt->bindValue(':nameAnswerRight', $nameAnswerRight);
        $stmt->bindValue(':nameAnswerWrong1', $nameAnswerWrong1);
        $stmt->bindValue(':nameAnswerWrong2', $nameAnswerWrong2);
        $stmt->bindValue(':nameAnswerWrong3', $nameAnswerWrong3);
        $stmt->execute();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
}

function deleteQuestion($idQuestion)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("DELETE FROM question WHERE idQuestion = :idquestion");
        $stmt->bindParam(':idquestion', $idQuestion);
        $stmt->execute();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
}

function deleteAnswer($idQuestion)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("DELETE FROM answer WHERE idQuestion = :idquestion");
        $stmt->bindParam(':idquestion', $idQuestion);
        $stmt->execute();
        deleteQuestion($idQuestion);
    } catch (PDOException $e) {
        die($e->getMessage());
    }
}

function editQuestion($newQuestion, $newChapter, $idQuestion)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("UPDATE question SET nameQuestion = :question, idChapter = :chapter WHERE idQuestion = :idQuestion");
        $stmt->bindValue(':question', $newQuestion);
        $stmt->bindValue(':chapter', $newChapter);
        $stmt->bindValue(':idQuestion', $idQuestion);
        $stmt->execute();
    } catch (PDOException $e) {
        die($e->getMessage());
    }

}

function editAnswers($newAnswer, $idAnswer)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("UPDATE answer SET nameAnswer = :answer, WHERE idAsnwer = :idAnswer");
        $stmt->bindValue(':question', $newAnswer);
        $stmt->bindValue(':idAnswer', $idAnswer);
        $stmt->execute();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
}


function getRightAnswerFromQuestion($idQuestion)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT nameAnswer FROM answer WHERE idQuestion = :idquestion AND IsCorrect=1");
        $stmt->bindValue(':idquestion', $idQuestion);
        $stmt->execute();
        $RightAnswer = $stmt->fetchAll();

    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return $RightAnswer;
}

function getWrongAnswersFromQuestion($idQuestion)
{
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT nameAnswer FROM answer WHERE idQuestion = :idquestion AND IsCorrect=0");
        $stmt->bindValue(':idquestion', $idQuestion);
        $stmt->execute();
        $WrongAnswers = $stmt->fetchAll();
    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return $WrongAnswers;
}
function getQuestionById($idQuestion){
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM question WHERE idQuestion = :idQuestion");
        $stmt->bindValue(':idQuestion', $idQuestion);
        $stmt->execute();
        $question = $stmt->fetchAll();

    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return $question;
}
function getChapterById($idChapter){
    global $config;
    try {
        $conn = new PDO("mysql:host=" . $config["host"] . ";dbname=" . $config["database"], $config["username"], $config["password"]);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $stmt = $conn->prepare("SELECT * FROM chapter WHERE idChapter = :idChapter");
        $stmt->bindValue(':idChapter', $idChapter);
        $stmt->execute();
        $chapter = $stmt->fetchAll();

    } catch (PDOException $e) {
        die($e->getMessage());
    }
    return $chapter;
}
