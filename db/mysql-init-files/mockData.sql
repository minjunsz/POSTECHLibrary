-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: librarydb
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `startAt` datetime NOT NULL,
  `endAt` datetime NOT NULL,
  `seatId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_e8e372c3bfa9f3dde83e1a9085` (`seatId`),
  CONSTRAINT `FK_e8e372c3bfa9f3dde83e1a90853` FOREIGN KEY (`seatId`) REFERENCES `seat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,'$argon2i$v=19$m=4096,t=3,p=1$lbK5ZKDXnTAkGoIdZbzwFQ$d+/su5KUXMoJUXJa6YPVXGDujTHoiMPTKc8OgzqwGxA','2021-01-01 07:50:18','2021-01-02 07:50:18',1),(2,'$argon2i$v=19$m=4096,t=3,p=1$79bqz2reGTuVymjTi0Jrlw$I8T59OtueHAJJocVsRGvLHh+e6IQMcrlOgUcR5twxW8','2021-01-01 07:50:18','2021-01-02 07:50:18',5);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat`
--

DROP TABLE IF EXISTS `seat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `seatPassword` varchar(255) NOT NULL,
  `floor` int NOT NULL,
  `xpos` float NOT NULL,
  `ypos` float NOT NULL,
  `status` enum('A','B','C') NOT NULL,
  `hasOutlet` tinyint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat`
--

LOCK TABLES `seat` WRITE;
/*!40000 ALTER TABLE `seat` DISABLE KEYS */;
INSERT INTO `seat` VALUES (1,'$argon2i$v=19$m=4096,t=3,p=1$qcWSSo43K/YLHmJVwQUfoA$aU4KmY3Tv90OOhZsussGaJoUlE/7BzkSPLba1+11UlA',4,0.1,0.1,'A',1),(2,'$argon2i$v=19$m=4096,t=3,p=1$XFTeVsq0TmOalcjd/e6Tbw$yUcb/SBjSuLvFpTV6v7RlyeQR9HvrhT4pLYHSSFocms',4,0.5,0.5,'A',1),(3,'$argon2i$v=19$m=4096,t=3,p=1$yXy25tm4Jl4xkKonfrPECQ$/EVh5FSPp2+zjpnO0xAok9Tk/6YqHyeaL2LafpcdHvQ',4,0.7,0.7,'A',0),(4,'$argon2i$v=19$m=4096,t=3,p=1$t7nSKYeUtfBXOysSDaohjg$gUrDZfJBXt4s8Z9yH2r6dKpc2JkezkCX8Z2hjrMkx2E',3,0.2,0.1,'A',1),(5,'$argon2i$v=19$m=4096,t=3,p=1$U7C9qw3zeYCe/apI+RoKZg$3ceqohByzwXxBgaziMLMfrnzYSWd9TX4RyypT5bPBRg',3,0.1,0.5,'A',1),(6,'$argon2i$v=19$m=4096,t=3,p=1$TwGR0Yx621FlgHG3vRfxWg$EZQpzjfy+aRt78xG1EouzqNgQDKvoLLpWEtUMF10I8E',3,0.9,0.7,'A',0),(7,'$argon2i$v=19$m=4096,t=3,p=1$3oVEtlwJ1BdAMTxNuXm66Q$3pWugBrdUBC9bPhmxEXzxCY6aLoCbfChCuDh5fJ88pk',3,0.9,0.5,'A',1),(8,'$argon2i$v=19$m=4096,t=3,p=1$lEM/amwZYQXePRfMf5XQew$0DvRCthr7eylxDILZxfk6n0wGMQbyujqwfIU1YPq9fY',3,0.7,0.5,'A',1),(9,'$argon2i$v=19$m=4096,t=3,p=1$UA0Ll53qeVvkeMEpO1HJBQ$X3PBv0GpHhfll9DjNg40XZFeDn/43B3JK+K4/cfw5yQ',3,0.8,0.3,'A',0),(10,'$argon2i$v=19$m=4096,t=3,p=1$wWGk8PZ1QWlR60+uQK06zA$MTmTTibsfkx7TY8gS5DOs9Ox+gUxqqcSoYqveF6/Ay0',3,0.9,0.5,'A',1),(11,'$argon2i$v=19$m=4096,t=3,p=1$M5t1hLELXbPGy7ma79dqMQ$m4V/utM+530Jvn1QHvXRHfBWjvw8ZzzMxLkMejn5o8M',3,0.7,0.5,'A',1),(12,'$argon2i$v=19$m=4096,t=3,p=1$E5eKZ/vf3WfS5iWe2nHeyg$cy3dGw5sVsiPliufJq2Q60BRkL09jmhYu1M5y+ycXqs',3,0.8,0.3,'A',0);
/*!40000 ALTER TABLE `seat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seat_condition`
--

DROP TABLE IF EXISTS `seat_condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `seat_condition` (
  `id` int NOT NULL AUTO_INCREMENT,
  `status` enum('FINE','UNAVAILABLE','UNCOMFORTABLE','UNSANITARY') NOT NULL,
  `description` varchar(255) NOT NULL,
  `seatId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_ab8dc2bb045571de4e39a3a2d9` (`seatId`),
  CONSTRAINT `FK_ab8dc2bb045571de4e39a3a2d97` FOREIGN KEY (`seatId`) REFERENCES `seat` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seat_condition`
--

LOCK TABLES `seat_condition` WRITE;
/*!40000 ALTER TABLE `seat_condition` DISABLE KEYS */;
INSERT INTO `seat_condition` VALUES (1,'FINE','aaaa',1),(2,'FINE','aaaa',2),(3,'FINE','aaaa',3),(4,'FINE','aaaa',4),(5,'FINE','aaaa',5);
/*!40000 ALTER TABLE `seat_condition` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-29 22:52:24
