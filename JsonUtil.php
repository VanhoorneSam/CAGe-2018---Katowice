<?php
/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 4/17/2018
 * Time: 11:07 AM
 */

class JsonUtil{
    function questionsAsJson($questions){
        $wrong = [];
        foreach ($questions as $row) {
            $questions = ($row['nameQuestion']);
            $isCorrect = ($row['isCorrect']);

            if($isCorrect){

                $Correct = ($row['nameAnswer']);
            } else {

                $wrong = (object) array_merge( (array) $row['nameAnswer'], (array) $wrong);
            }
        }

        $merged = (object) array_merge((array) $questions, (array) $Correct, (array) $wrong);


        return json_encode($merged);
    }
}
