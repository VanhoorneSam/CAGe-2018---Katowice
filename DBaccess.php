<?php/**
 * Created by PhpStorm.
 * User: jorden
 * Date: 4/25/2017
 * Time: 2:43 PM
 */
class DBaccess
{
    public static $QuestionsInstantie = null;

    public $dbh;

    public function __construct()
    {
        try
        {
            $server = "mysqlhost2";
            $database = "appcage";
            $username = "appcage";
            $password = "ouQuai5oocee";

            $this->dbh = new PDO("mysql:host=$server; dbname=$database", $username, $password,
                array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
            //Bij error: exception opwerpen
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch (PDOException $e)
        {
            die($e->getMessage());
        }
    }

    public static function getQuestionsInstantie()
    {
        if(is_null(self::$QuestionsInstantie))
        {
            self::$QuestionsInstantie = new questions();
        }
        return self::$QuestionsInstantie;
    }

    public function sluitDB()
    {
        $this->dbh = null;
    }

    public function addHighscores($voornaam, $difficulty, $score)
    {
        try
        {
            $sql = "INSERT INTO highscores(nickname, difficulty, score)
						VALUES(:nickname, :difficulty, :score)";
            $stmt = $this->dbh->prepare($sql);
            $stmt->bindParam(":voornaam", $voornaam);
            $stmt->bindParam(":difficulty", $difficulty);
            $stmt->bindParam(":score", $score);
            $stmt->execute();
        }
        catch (PDOException $e)
        {
            die($e->getMessage());
        }
    }

    function getQuestion($number)
    {
        //Met Prepared Statement
        try
        {
            $sql = "SELECT Question FROM b6524bru_cage WHERE questionID = $number";
            $stmt = $this->dbh->prepare($sql);
            $stmt->execute();
            $Question = $stmt->fetchAll(PDO::FETCH_CLASS);
        }
        catch (PDOException $e)
        {
            die($e->getMessage());
        }

        return $Question;
    }
}
