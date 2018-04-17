<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8"/>
    <meta name="author" content="Thibeau Cardon"/>
    <title>View Question</title>

    <link rel="stylesheet" type="text/css" href="assets/css/CAGe-style.css"/>
</head>
<body>
<?php
include_once("functions.php");
?>
<div id="wrapper">
    <table>
        <tr>
            <th>Question</th>
            <th>Chapter</th>
            <th>Category</th>
            <th>Right Answer</th>
            <th>Wrong Answers</th>
            <th colspan="2">Actions</th>
        </tr>

        <?php
        $questions = getAllQuestions();
        foreach ($questions as $question) {
            echo('<tr>');

            echo('<td>');
            echo($question['nameQuestion']);
            echo('</td>');

            echo('<td>');
            echo($question['nameChapter']);
            echo('</td>');

            echo('<td>');
            echo($question['nameCategorie']);
            echo('</td>');

            echo('<td>');
            $RightAnswerArr = getRightAnswerFromQuestion($question['idQuestion']);
            foreach ( $RightAnswerArr as $RightAnswer){
                echo $RightAnswer['nameAnswer'];
            }
            echo('</td>');

            echo('<td><ul>');
            $WrongAnswerArr = getWrongAnswersFromQuestion($question['idQuestion']);
            foreach ($WrongAnswerArr as $WrongAnswer){
                echo '<li>'.$WrongAnswer['nameAnswer'].'</li>';
            }
            echo('</ul></td>');

            echo('<td>');
            echo('<img src="images/edit.svg" name="'. $question['idQuestion'].'"/>');
            echo('</td>');

            echo('<td>');
            echo('<img src="images/delete.svg" name="'. $question['idQuestion'].'""/>');
            echo('</td>');

            echo('</tr>');
        }
        ?>
        <tr></tr>
    </table>
</div>
</body>
</html>