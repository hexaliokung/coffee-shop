-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: coffee-shop
-- ------------------------------------------------------
-- Server version	9.3.0

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
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('5409ffb0-6e91-4035-af37-971ac214f102','95d1d6e3c490c2f730084d755ad99f7ee46ac68d83c400eff11b8c887c212ba0','2025-05-18 02:00:55.136','20250518020054_back',NULL,NULL,'2025-05-18 02:00:55.064',1),('a7254995-c659-450c-adb4-f7b40eef4171','12d6299c7820e22ff9c2325b2f8a814f52eee280b12edee0ab554fc48756815f','2025-05-18 01:46:59.224','20250518014658_init',NULL,NULL,'2025-05-18 01:46:58.909',1),('f35c2e1a-2edf-4802-bc35-2b18bf9ba4a4','27fda343a3309f31e9cd60bb36819e51d53db2486969ded680bc75bf20b06731','2025-05-18 02:30:50.098','20250518023049_add_orders',NULL,NULL,'2025-05-18 02:30:49.956',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `items` json NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Order_userId_fkey` (`userId`),
  CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}]',45.00,'pending','2025-05-18 02:43:06.245','2025-05-18 02:43:06.245'),(2,1,'[{\"id\": 3, \"name\": \"ลาเต้\", \"image\": \"/assets/menu/latte.jpg\", \"price\": \"55\", \"quantity\": 1}]',55.00,'pending','2025-05-18 02:43:17.885','2025-05-18 02:43:17.885'),(3,1,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}, {\"id\": 2, \"name\": \"คาปูชิโน่\", \"image\": \"/assets/menu/cappuccino.jpg\", \"price\": \"55\", \"quantity\": 1}, {\"id\": 3, \"name\": \"ลาเต้\", \"image\": \"/assets/menu/latte.jpg\", \"price\": \"55\", \"quantity\": 1}, {\"id\": 4, \"name\": \"มอคค่า\", \"image\": \"/assets/menu/mocha.jpg\", \"price\": \"60\", \"quantity\": 1}, {\"id\": 8, \"name\": \"คาราเมลมัคคิอาโต้\", \"image\": \"/assets/menu/caramel-macchiato.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 7, \"name\": \"ไอซ์มอคค่า\", \"image\": \"/assets/menu/ice-mocha.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 6, \"name\": \"คาเฟ่ฟราเป้\", \"image\": \"/assets/menu/frappe.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 5, \"name\": \"ไอซ์ลาเต้\", \"image\": \"/assets/menu/ice-latte.jpg\", \"price\": \"60\", \"quantity\": 1}, {\"id\": 10, \"name\": \"เฮเซลนัทลาเต้\", \"image\": \"/assets/menu/hazelnut-latte.jpg\", \"price\": \"70\", \"quantity\": 1}, {\"id\": 9, \"name\": \"วานิลลาไลท์\", \"image\": \"/assets/menu/vanilla-latte.jpg\", \"price\": \"65\", \"quantity\": 1}]',605.00,'pending','2025-05-18 02:45:52.841','2025-05-18 02:45:52.841'),(4,1,'[{\"id\": 2, \"name\": \"คาปูชิโน่\", \"image\": \"/assets/menu/cappuccino.jpg\", \"price\": \"55\", \"quantity\": 1}]',55.00,'pending','2025-05-18 03:07:06.495','2025-05-18 03:07:06.495'),(5,1,'[{\"id\": 3, \"name\": \"ลาเต้\", \"image\": \"/assets/menu/latte.jpg\", \"price\": \"55\", \"quantity\": 1}]',55.00,'pending','2025-05-18 03:11:16.344','2025-05-18 03:11:16.344'),(6,1,'[{\"id\": 2, \"name\": \"คาปูชิโน่\", \"image\": \"/assets/menu/cappuccino.jpg\", \"price\": \"55\", \"quantity\": 1}]',55.00,'pending','2025-05-18 03:14:20.746','2025-05-18 03:14:20.746'),(7,1,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}]',45.00,'pending','2025-05-18 03:14:33.302','2025-05-18 03:14:33.302'),(8,1,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}, {\"id\": 2, \"name\": \"คาปูชิโน่\", \"image\": \"/assets/menu/cappuccino.jpg\", \"price\": \"55\", \"quantity\": 1}, {\"id\": 3, \"name\": \"ลาเต้\", \"image\": \"/assets/menu/latte.jpg\", \"price\": \"55\", \"quantity\": 1}, {\"id\": 4, \"name\": \"มอคค่า\", \"image\": \"/assets/menu/mocha.jpg\", \"price\": \"60\", \"quantity\": 1}, {\"id\": 5, \"name\": \"ไอซ์ลาเต้\", \"image\": \"/assets/menu/ice-latte.jpg\", \"price\": \"60\", \"quantity\": 1}, {\"id\": 6, \"name\": \"คาเฟ่ฟราเป้\", \"image\": \"/assets/menu/frappe.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 7, \"name\": \"ไอซ์มอคค่า\", \"image\": \"/assets/menu/ice-mocha.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 8, \"name\": \"คาราเมลมัคคิอาโต้\", \"image\": \"/assets/menu/caramel-macchiato.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 9, \"name\": \"วานิลลาไลท์\", \"image\": \"/assets/menu/vanilla-latte.jpg\", \"price\": \"65\", \"quantity\": 1}, {\"id\": 10, \"name\": \"เฮเซลนัทลาเต้\", \"image\": \"/assets/menu/hazelnut-latte.jpg\", \"price\": \"70\", \"quantity\": 1}]',605.00,'pending','2025-05-18 08:14:12.516','2025-05-18 08:14:12.516'),(9,1,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}]',45.00,'pending','2025-05-18 08:44:42.719','2025-05-18 08:44:42.719'),(10,1,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}]',45.00,'pending','2025-05-18 09:07:06.510','2025-05-18 09:07:06.510'),(11,2,'[{\"id\": 3, \"name\": \"ลาเต้\", \"image\": \"/assets/menu/latte.jpg\", \"price\": \"55\", \"quantity\": 1}]',55.00,'pending','2025-05-18 10:21:56.832','2025-05-18 10:21:56.832'),(12,2,'[{\"id\": 1, \"name\": \"เอสเปรสโซ่\", \"image\": \"/assets/menu/espresso.jpg\", \"price\": \"45\", \"quantity\": 1}]',45.00,'pending','2025-05-18 10:22:25.761','2025-05-18 10:22:25.761');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'hot coffee',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'เอสเปรสโซ่',45.00,'กาแฟเข้มข้นแบบดั้งเดิม','/assets/menu/espresso.jpg',10,'hot coffee'),(2,'คาปูชิโน่',55.00,'เอสเปรสโซ่ผสมนมร้อนและโฟม','/assets/menu/cappuccino.jpg',10,'hot coffee'),(3,'ลาเต้',55.00,'เอสเปรสโซ่ผสมนมร้อน','/assets/menu/latte.jpg',10,'hot coffee'),(4,'มอคค่า',60.00,'เอสเปรสโซ่ผสมช็อคโกแลตและนมร้อน','/assets/menu/mocha.jpg',10,'hot coffee'),(5,'ไอซ์ลาเต้',60.00,'ลาเต้เย็น','/assets/menu/ice-latte.jpg',10,'cold coffee'),(6,'คาเฟ่ฟราเป้',65.00,'กาแฟปั่นเย็น','/assets/menu/frappe.jpg',10,'cold coffee'),(7,'ไอซ์มอคค่า',65.00,'มอคค่าเย็น','/assets/menu/ice-mocha.jpg',10,'cold coffee'),(8,'คาราเมลมัคคิอาโต้',65.00,'เอสเปรสโซ่ผสมคาราเมลและนมร้อน','/assets/menu/caramel-macchiato.jpg',10,'special drinks'),(9,'วานิลลาไลท์',65.00,'ลาเต้ผสมวานิลลา','/assets/menu/vanilla-latte.jpg',10,'special drinks'),(10,'เฮเซลนัทลาเต้',70.00,'ลาเต้ผสมเฮเซลนัท','/assets/menu/hazelnut-latte.jpg',10,'special drinks');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'thatphong8@gmail.com','$2b$10$agxaqBavacGRkaKHHkCEr.20qILWS9475YUDKYAh5PfzKxLEGysP2','user'),(2,'root8@gmail.com','$2b$10$jNyC8sKoycl5H6y5kOK5KeN4ialPsdo5bBSFuJGIoSMUEn/68DIPO','user'),(3,'helloworld@gmail.com','$2b$10$tzo3.uLwCIKod4hVG.viReGgIRMsFaa9LKUACc0/qbPGZeJyXiHkC','user');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-18 18:26:24
