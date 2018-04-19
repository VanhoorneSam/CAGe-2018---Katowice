<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8"/>
    <meta name="author" content="Thibeau Cardon"/>
    <title>Add Question</title>

    <link rel="stylesheet" type="text/css" href="assets/css/CAGe-style.css"/>
</head>
<body>

<?php

include_once("functions.php");

if (isset($_POST['submit'])) {
    $question = zuiverData($_POST["question"]);
    $chapter = $_POST["chapter"];
    $answerArr = array(zuiverData($_POST["rightanswer"]), zuiverData($_POST["wronganswer1"]), zuiverData($_POST["wronganswer2"]), zuiverData($_POST["wronganswer3"]),);

    try {
        addQuestion($question, $chapter, $answerArr);
        echo("Question succesfully added!");
    } catch (Exception $e) {
        echo("Failed to add question!/n" . $e);
    }

}

?>

<div id="wrapper">
    <h2 id="headerInfo">Creating a new Question</h2>

    <form name="addQuestion" id="addQuestion" method="post" action="<?php echo $_SERVER['PHP_SELF'] ?>">
        <label for="categorie" id="lblcategorie">Categorie: </label>
        <select id="categorie" name="categorie">
            <?php

            $categories = getAllCategories();
            foreach ($categories as $categorie) {
                echo('<option id="' . $categorie["idCategorie"] . '" name="' . $categorie["nameCategorie"] . '">');
                echo($categorie["nameCategorie"]);
                echo('</option>');
            }
            ?>
        </select>

        <label for="chapter" id="lblchapter">Chapter: </label>
        <select id="chapter" name="chapter">
            <?php

            $chapters = getAllChapters();
            foreach ($chapters as $chapter) {
                echo('<option id="' . $chapter["idChapter"] . '" name="' . $chapter["idCategorie"] . '"value="' . $chapter["idChapter"] . '">');
                echo($chapter["nameChapter"]);
                echo('</option>');
            }
            ?>
        </select>
        <ul id="errors" class="errors">
        </ul>

        <label for="question" id="lblquestion">Question: </label>
        <textarea cols="40" rows="5" id="question" name="question"></textarea>

        <label for="rightanswer" id="lblrightanswer">Right answer: </label>
        <textarea  cols="40" rows="5"  id="rightanswer" name="rightanswer"></textarea>

        <label for="wronganswer1" id="lblwronganswer">Wrong answer: </label>
        <textarea  cols="40" rows="5" id="wronganswer1" name="wronganswer1"></textarea>

        <label for="wronganswer2" id="lblwronganswer2">Wrong answer: </label>
        <textarea  cols="40" rows="5" id="wronganswer2" name="wronganswer2"></textarea>

        <label for="wronganswer3" id="lblwronganswer3">Wrong answer: </label>
        <textarea  cols="40" rows="5" id="wronganswer3" name="wronganswer3"></textarea>

        <input type="submit" name="submit" value="Save to database">
    </form>
</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
<script src="assets/js/question_validator.js"></script>
</body>
</html>