<?php

/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 4/17/2018
 * Time: 11:07 AM
 */
class JsonUtil
{
    function questionsAsJson($questions)
    {

        $wrong = [];
        foreach ($questions as $row) {
            print_r($row);
            $questions = ($row['nameQuestion']);
            $isCorrect = ($row['isCorrect']);

            if ($isCorrect) {

                $Correct = ($row['nameAnswer']);
            } else {

                $wrong = (object)array_merge((array)$row['nameAnswer'], (array)$wrong);
            }
        }


        $merged = (object)array_merge((array)$questions, (array)$Correct, (array)$wrong);


        return json_encode($merged);
    }

    function questionAsNewJson($questionRow)
    {
        $wrong = [];
        $nameQuestion = ($questionRow['nameQuestion']);
        $isCorrect = ($questionRow['IsCorrect']);
        $chapterName = $questionRow['nameChapter'];
        $categoryName = $questionRow['nameCategorie'];
        if ($isCorrect) {
            $Correct = ($questionRow['nameAnswer']);
        } else {
            $wrong[] = $questionRow['nameAnswer'];
        }
//        }


        $merged = array(
            'question' => $nameQuestion,
            'wrongAnswers' => $wrong,
            'rightAnswer' => $Correct,
            'chapter' => $chapterName,
            'category' => $categoryName
        );


        return json_encode($merged);
    }
}
