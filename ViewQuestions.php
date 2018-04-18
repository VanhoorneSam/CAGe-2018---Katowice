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

if (isset($_POST['delete'])) {
    $idQuestion = $_POST['delete'];
    deleteAnswer($idQuestion);
} else if (isset($_POST['edit'])) {
    $idQuestion = $_POST['edit'];
    $question = getQuestionById($idQuestion);
    foreach ($question as $s) {
        $nameQuestion = $s['nameQuestion'];
        $idChapter = $s['idChapter'];
    }
    $rightAnswerArr = getRightAnswerFromQuestion($idQuestion);
    foreach ($rightAnswerArr as $s) {
        $nameRightAnswer = $s['nameAnswer'];
    }
    $wrongAnswerArr = getWrongAnswersFromQuestion($idQuestion);

    echo('<form name="addQuestion" id="addQuestion" method="post" action="' . $_SERVER['PHP_SELF'] . '">');


    echo('<label for="chapter" > Chapter: </label >');
    echo('<select id = "chapter" name = "chapter" >');


    $chapters = getAllChapters();
    foreach ($chapters as $chapter) {
        if ($chapter["idChapter"] == $idChapter) {
            echo('<option id="' . $chapter["idChapter"] . '" name="' . $chapter["idCategorie"] . '"value="' . $chapter["idChapter"] . '" selected ="selected">');
            echo($chapter["nameChapter"]);
            echo('</option>');
        } else {
            echo('<option id="' . $chapter["idChapter"] . '" name="' . $chapter["idCategorie"] . '"value="' . $chapter["idChapter"] . '">');
            echo($chapter["nameChapter"]);
            echo('</option>');
        }

    }
    echo('</select >');

    echo('<label for="question" > Question: </label >');
    echo('<input type = "text" id = "question" name = "question" value="' . $nameQuestion . '" >');

    echo('<label for="question" > Right answer: </label >');
    echo('<input type = "text" id = "rightanswer" name = "rightanswer" value="' . $nameRightAnswer . '">');


    $countOfAnswers = 0;
    foreach ($wrongAnswerArr as $wrongAnswer) {
        echo('<label for="question" > Wrong answer: </label >');
        echo('<input type = "text" id = "wronganswer1" name = "wronganswer' . $countOfAnswers . '" value="' . $wrongAnswer["nameAnswer"] . '" >');
        $countOfAnswers++;
    }

    echo('<input type = "submit" name = "submit" >');
    echo('</form >');

}else if (isset($_POST['submit'])){
    var_dump(1);
    $newChapter = $_POST['chapter'];
}
?>

<div id="wrapper">
    <form name="actions" method="post" action="<?php echo $_SERVER['PHP_SELF'] ?>">
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
                foreach ($RightAnswerArr as $RightAnswer) {
                    echo $RightAnswer['nameAnswer'];
                }
                echo('</td>');

                echo('<td><ul>');
                $WrongAnswerArr = getWrongAnswersFromQuestion($question['idQuestion']);
                foreach ($WrongAnswerArr as $WrongAnswer) {
                    echo '<li>' . $WrongAnswer['nameAnswer'] . '</li>';
                }
                echo('</ul></td>');

                echo('<td>');
                //echo('<img src="assets/images/edit.svg" id="edit" name="'. $question['idQuestion'].'" />');
                echo('<input type="image" src="assets/images/edit.svg" name="edit" id="edit" value="' . $question['idQuestion'] . '"/>');
                echo('</td>');

                echo('<td>');
                // echo('<a href="ViewQuestions.php?del='.$question['idQuestion'].'"><img src="assets/images/delete.svg" id="delete" name="'. $question['idQuestion'].'" /></a>');
                echo('<input type="image" src="assets/images/delete.svg" name="delete" id="delete" value="' . $question['idQuestion'] . '"/>');
                echo('</td>');
                echo('</tr>');
            }
            ?>
            <tr></tr>
        </table>
    </form>
</div>
<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a
            href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a
            href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0
        BY</a></div>
</body>
</html>