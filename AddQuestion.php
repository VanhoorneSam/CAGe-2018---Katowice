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
    $nameAnswerRight = zuiverData($_POST["rightanswer"]);
    $nameAnswerWrong1 = zuiverData($_POST["wronganswer1"]);
    $nameAnswerWrong2 = zuiverData($_POST["wronganswer2"]);
    $nameAnswerWrong3 = zuiverData($_POST["wronganswer3"]);
    try {
        addQuestion($question, $chapter, $nameAnswerRight, $nameAnswerWrong1, $nameAnswerWrong2, $nameAnswerWrong3);
        echo("Question succesfully added!");
    }catch(Exception $e){
        echo("Failed to add question!/n".$e );
    }
}
?>
<div id="wrapper">
    <form name="addQuestion" id="addQuestion" method="post" action="<?php echo $_SERVER['PHP_SELF'] ?>">
        <label for="categorie">Categorie: </label>
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

        <label for="chapter">Chapter: </label>
        <select id="chapter" name="chapter">
            <?php

            $chapters = getAllChapters();
            foreach ($chapters as $chapter) {
                echo('<option id="' . $chapter["idChapter"] . '" name="' . $chapter["idCategorie"] .'"value="'. $chapter["idChapter"].'">');
                echo($chapter["nameChapter"]);
                echo('</option>');
            }
            ?>
        </select>

        <label for="question">Question: </label>
        <input type="text" id="question" name="question">

        <label for="question">Right answer: </label>
        <input type="text" id="rightanswer" name="rightanswer">

        <label for="question">Wrong answer: </label>
        <input type="text" id="wronganswer1" name="wronganswer1">

        <label for="question">Wrong answer: </label>
        <input type="text" id="wronganswer2" name="wronganswer2">

        <label for="question">Wrong answer: </label>
        <input type="text" id="wronganswer3" name="wronganswer3">

        <input type="submit" name="submit">
    </form>
</div>
</body>
</html>