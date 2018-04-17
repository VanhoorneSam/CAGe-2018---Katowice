<?php
/**
 * Created by PhpStorm.
 * User: kevin
 * Date: 4/17/2018
 * Time: 11:07 AM
 */

class ConsumeeException extends Exception
{
    // Redefine the exception so message isn't optional
    public function __construct($message, $code = 0, Exception $previous = null) {
        // some code

        // make sure everything is assigned properly
        parent::__construct($message, $code, $previous);
    }

    // custom string representation of object
    public function __toString() {
        return $this->createJsonError(self::getMessage());
    }

    function createJsonError($message){
        $error = array("error"=>$message);
        return json_encode($error);
    }

}

