CREATE DATABASE  IF NOT EXISTS `dexa_project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dexa_project`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: dexa_project
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('Employee','Admin') NOT NULL,
  `code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (15,'HendryKerenBanget','hendry4122@gmail.com','$2b$10$VLQjCxhRroQFnl1EAdNG3edxFJr9BU201XhHsmtCVhlVJ8mAAXpZq','Employee','8CHOYC'),(17,'Hendry224','hendry414@gmail.com','$2b$10$99fEJIUy6V8Rv97H5j3evudL1Hz9L/iwU85aVzMszQcd7oSSrHF8S','Employee','LR43YK'),(18,'Hendry8','hendry410@gmail.com','$2b$10$5zU01zwgqEk1gHt.b2TSs.zu74eXKdmsdkbZVYLi5eo.e1Bmdy89C','Employee','2EJOO2'),(20,'JackalMaria','hendry4104@gmail.com','$2b$10$Eqlfmuslcmx1SerTWscDKOCUrEgBsuplfiHPA6PO6CUIGOo4EC5Eq','Employee','6N6QH4'),(21,'admin','admin@gmail.com','$2b$10$NfSp4qBDghTJOUuz/8/douC9gosaNbjeg3CBKq2p7Mwc9b/JvuRy2','Admin','6N6H82'),(23,'Hendry224','hendry410554@gmail.com','$2b$10$7SUCBZRadP7bzqA2cQ9b2Or7E0gPOSZ7IXhsWLxeXNbQl.Gp9bYNe','Employee','8RALQV'),(24,'Hendry Tjahaja Surijanto Putra','hendrysurijanto123@gmail.com','$2b$10$qnEK0LV.D5Od3PMw6qsCRu2V49AmJSEna6FoRxfhtvJ4xmqO1cSfW','Employee','P0P5HW'),(36,'Hendry Tjahaja Surijanto Putra Putra','hendrytjahaja90@gmail.com','$2b$10$Ogloj/m8WSUs5Nb1CVWtoOXK71Z/mZxbL0RJMYpdVU/uu2Z6BXZjW','Employee','0O1AJO'),(48,'Hendry Tjahaja Surijanto Putra Putra','hendrysurijanto544@gmail.com','$2b$10$9KwS/WgnEg78rLVnMhS91Oys4eRbAkBuXkHJAWl16N4a6f5LGh07q','Employee','D1ZYVA'),(50,'Kevin Keren','hendrytjahaja900@gmail.com','$2b$10$af9jMHBDz.4BqIS0umV8A.9u4U8Omv0gHp3.rjimIm3q8H/mcMnv6','Employee','K3FN3G'),(51,'Admin test 8','jackal@gmail.com','$2b$10$NfSp4qBDghTJOUuz/8/douC9gosaNbjeg3CBKq2p7Mwc9b/JvuRy2','Employee','880OVV'),(52,'Kocak sekali Hahaha','hendrysurijanto555@gmail.com','$2b$10$ue/gbB5WINRFX7fe5Hlx7eRc1xk0Se1eGaUMakaaa0tw2pqXiwFrm','Employee','AZYXEL');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-03 13:47:27
