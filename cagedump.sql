CREATE DATABASE  IF NOT EXISTS `cage` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `cage`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: cage
-- ------------------------------------------------------
-- Server version	5.7.14

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `idAdmin` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(256) NOT NULL,
  `pwd` varchar(256) NOT NULL,
  PRIMARY KEY (`idAdmin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `answer`
--

DROP TABLE IF EXISTS `answer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `answer` (
  `idAnswer` int(11) NOT NULL AUTO_INCREMENT,
  `idQuestion` int(11) NOT NULL,
  `nameAnswer` varchar(120) NOT NULL,
  `IsCorrect` tinyint(4) NOT NULL,
  PRIMARY KEY (`idAnswer`),
  KEY `FK_QuestionID` (`idQuestion`),
  CONSTRAINT `FK_QuestionID` FOREIGN KEY (`idQuestion`) REFERENCES `question` (`idQuestion`)
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer`
--

LOCK TABLES `answer` WRITE;
/*!40000 ALTER TABLE `answer` DISABLE KEYS */;
INSERT INTO `answer` VALUES (1,1,'By private households',1),(2,1,'By companies',0),(3,1,'In production',0),(4,1,'By nation',0),(5,2,'Which good has the maximum utility',1),(6,2,'Which brand corresponds to their own values',0),(7,2,'The sole price of the product/service',0),(8,2,'The sole asthetics of the product',0),(9,3,'Possessiveness, non-generosity and envy',1),(10,3,'Avidity, greed and envy',0),(11,3,'Avidity, non-generosity and rivalry',0),(12,3,'Possessiveness, greed and rivalry',0),(13,4,'Food',1),(14,4,'Housing',0),(15,4,'Transport',0),(16,4,'Health',0),(17,5,'A wilful choice not to consume a given good/brand',1),(18,5,'A wilful choice to consume a good/brand over another',0),(19,5,'The nonconsumption a certain goods',0),(20,5,'The nonconsumption of certain services',0),(21,6,'Video games addiction',1),(22,6,'Tobacco consumption',0),(23,6,'Alcoholism',0),(24,6,'Drug addiction',0),(25,7,'Using consumption to fake belonging to another \"class\"',1),(26,7,'Showing off belongings to exhibit your wealth',0),(27,7,'Only consuming the priciest goods to exhibit your wealth',0),(28,7,'Only consuming the most noticeable goods to be striking',0),(29,8,'A good\'s capacity to satisfy consumption\'s needs',1),(30,8,'The buyer\'s evaluation of a good or service',0),(31,8,'The price a consumer is willing to pay',0),(32,8,'How much a firm values consumers\' opinion',0),(33,9,'Functional, affective and symbolic',1),(34,9,'Material, affective and symbolic',0),(35,9,'Material, attracitve and conspicuous',0),(36,9,'Functional, affective and conspicuous',0),(37,10,'Safety',1),(38,10,'Belongingness',0),(39,10,'Ego needs',0),(40,10,'Self-actualisation',0),(41,11,'M. Porter',1),(42,11,'Ph. Kotler',0),(43,11,'K. Keller',0),(44,11,'K. Lane',0),(45,12,'cost leadership strategy',1),(46,12,'market challenger strategymarket follower strategymarket nicher strategy',0),(47,12,'market follower strategy',0),(48,12,'market nicher strategy',0),(49,13,'is a competitive strategy',1),(50,13,'generates new selective partnerships',0),(51,13,'addresses to midmarket',0),(52,13,'consists of a big attention to keeping the tradition',0),(53,14,'population decline and aging',1),(54,14,'more investments in innovation',0),(55,14,'low debts',0),(56,14,'growing market for digital work',0),(57,15,'Ethics of Business Competition',1),(58,15,'Behavioral Economics',0),(59,15,'Economics of Business',0),(60,15,'Ethics Procedures',0),(61,16,'have low costs',1),(62,16,'become less competitive',0),(63,16,'do not compete with fair companies',0),(64,16,'always get the highest market share',0),(65,17,'2016, in 13 countries',1),(66,17,'2013, in 16 countries',0),(67,17,'2013, in 13 countries',0),(68,17,'2016, in 16 countries',0),(69,18,'non-corruptive behavior',1),(70,18,'environmental non-protection actions',0),(71,18,'less transparancy',0),(72,18,'considering internal rights for employees and not basic human rights',0),(73,19,'it can be achieved at once',1),(74,19,'trust is important for it',0),(75,19,'it is generated from inside the company',0),(76,19,'customers must be well understood',0),(77,20,'false advertising',1),(78,20,'distribution cost is high',0),(79,20,'large stores are absent in some areas',0),(80,20,'fashion changes too fast',0);
/*!40000 ALTER TABLE `answer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorie`
--

DROP TABLE IF EXISTS `categorie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categorie` (
  `idCategorie` int(11) NOT NULL AUTO_INCREMENT,
  `nameCategorie` varchar(100) NOT NULL,
  PRIMARY KEY (`idCategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorie`
--

LOCK TABLES `categorie` WRITE;
/*!40000 ALTER TABLE `categorie` DISABLE KEYS */;
INSERT INTO `categorie` VALUES (1,'Consumption in Europe; General Characteristics and Consumer Awareness Importance'),(2,'Companies Behaviour and Consumer Awareness Relevance'),(3,'Consumer Protection in Europe');
/*!40000 ALTER TABLE `categorie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chapter`
--

DROP TABLE IF EXISTS `chapter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chapter` (
  `idChapter` int(11) NOT NULL AUTO_INCREMENT,
  `nameChapter` varchar(100) NOT NULL,
  `idCategorie` int(11) NOT NULL,
  PRIMARY KEY (`idChapter`),
  KEY `FK_CategorieID` (`idCategorie`),
  CONSTRAINT `FK_CategorieID` FOREIGN KEY (`idCategorie`) REFERENCES `categorie` (`idCategorie`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapter`
--

LOCK TABLES `chapter` WRITE;
/*!40000 ALTER TABLE `chapter` DISABLE KEYS */;
INSERT INTO `chapter` VALUES (1,'Understanding Consumption and Consumer Values',1),(2,'Consumer Awareness Importance ',1),(3,'Understanding the Market and Companies Behaviour ',2),(4,'Companies Practices Requiring Consumers’ Protection ',2),(5,'Consumer Awareness Relevance and Strategies ',2),(6,'Consumer Rights; National and European Examples and Practices ',3),(7,'Consumer Awareness Understanding in Tangible Goods Sector',3),(8,'Consumer Awareness Understanding in Services Sector',3),(9,'Models of Consumer Policy in the Contemporary Economy',3),(10,'Institutions of Consumer Rights Protection ',3),(11,'Consumer Dispute Resolution',3),(12,'Building Consumer Awareness ',3);
/*!40000 ALTER TABLE `chapter` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `question` (
  `idQuestion` int(11) NOT NULL AUTO_INCREMENT,
  `nameQuestion` varchar(170) NOT NULL,
  `idChapter` int(11) NOT NULL,
  PRIMARY KEY (`idQuestion`),
  KEY `ChapterID` (`idChapter`),
  CONSTRAINT `FK_ChapterID` FOREIGN KEY (`idChapter`) REFERENCES `chapter` (`idChapter`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (1,'Consumption is the way goods and products are used:',1),(2,'In the scope of functional values, consumers are supposed to make a choice by analysing:',1),(3,'What are the three components of materialism ?',1),(4,'According to Engel\'s law, a rising in incomes leads to a decrease of the proportion of income spent on:',1),(5,'What is anti-consumption?',1),(6,'Which of the following can be defined as behavioural addiction?',1),(7,'What does \'conspicuous consumption\' mean?',1),(8,'How can you define \'consumer value\'?',1),(9,'What are the three types of consumer value?',1),(10,'According to Maslow\'s theory of needs, which of the followings stands the lowest on the ladder?',1),(11,'Competition is considered to be multidomestic, based on:',3),(12,'It is not a competitive market strategy, according to Kotler and Keller:',3),(13,'Strategy for research and development:',3),(14,'According to the European Commission (2017), a challenge of the current context is:',3),(15,'Business Ethics is also called:',3),(16,'In a less regulated market, cheating companies:',3),(17,'Global Business Ethics Survey was conducted in:',3),(18,'Doing the right thing at work, means:',3),(19,'It is a false assumption about ethical behavior:',3),(20,'A deceptive practice refers to:',3);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-17 14:20:51
