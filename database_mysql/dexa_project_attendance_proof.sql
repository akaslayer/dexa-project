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
-- Table structure for table `attendance_proof`
--

DROP TABLE IF EXISTS `attendance_proof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance_proof` (
  `id` int NOT NULL AUTO_INCREMENT,
  `img_proof` varchar(255) NOT NULL,
  `attendance_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `attendance_id_idx` (`attendance_id`),
  CONSTRAINT `attendance_id` FOREIGN KEY (`attendance_id`) REFERENCES `attendance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance_proof`
--

LOCK TABLES `attendance_proof` WRITE;
/*!40000 ALTER TABLE `attendance_proof` DISABLE KEYS */;
INSERT INTO `attendance_proof` VALUES (34,'https://res.cloudinary.com/dcjjcs49e/image/upload/v1735745018/nuhn7mwjhx23zethe0y2.png',39),(35,'https://res.cloudinary.com/dcjjcs49e/image/upload/v1735745018/nuhn7mwjhx23zethe0y2.png',40),(36,'https://res.cloudinary.com/dv9bbdl6i/image/upload/v1728223796/folder_hii-mart/luodlsujpx28omobsy9e.gif',40),(40,'https://res.cloudinary.com/dv9bbdl6i/image/upload/v1728223796/folder_hii-mart/luodlsujpx28omobsy9e.gif',51),(41,'https://res.cloudinary.com/dcjjcs49e/image/upload/v1735880489/mchqq234z78z0nlfxpoq.jpg',51),(42,'https://res.cloudinary.com/dcjjcs49e/image/upload/v1735880489/mchqq234z78z0nlfxpoq.jpg',48);
/*!40000 ALTER TABLE `attendance_proof` ENABLE KEYS */;
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
