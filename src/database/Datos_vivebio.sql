-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: vivebio_db
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,1,1,1),(2,1,2,1);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'BioCapilar'),(2,'BioCorporal'),(3,'BioSpa');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'targeta'),(2,'efectivo');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Jabón Cítrico','Nos encanta ésta versión exfoliante y los resultados que brinda . Es una bomba para embellecer nuestra piel sin químicos dañinos. Naranja: el ácido cítrico seca el acné, es antioxidante . Café: reactiva la circulación, es antioxidante y funciona como exfoliante ',2,90,300,30,1,1,'Oleato de Naranja, Mandarina, Café y Cedrón.'),(2,'Jabón Rosas','Para ésta versión, gracias a la combinación de activos naturales con Oleato de Artemisa, ofrecemos una opción ideal para pieles sensibles . Posee propiedades humectantes, tonificantes, combate el acné, alivia zonas enrojecidas por lastimaduras, suavizando el cutis .',2,90,300,20,2,1,'Aloe Vera, Oleato de Artemisa, Rosas y Manzanilla.'),(3,'Jabón Lavanda','En ésta versión, combinamos el poder hidratante del Aloe Vera , las propiedades cicatrizantes, venotónicas y revitalizantes del Romero , además de los beneficios que la Lavanda aporta: es una gran antioxidante, antiséptica y antiinflamatoria .',2,90,300,20,3,1,'Aloe Vera, Romero, Lavanda'),(4,'Jabón Menta y Tea Tree','Para ésta versión combinamos ingredientes naturales que aportan sus propiedades antibacterianas, antiinflamatorias, analgésicas, refrescantes y tonificantes. Tea Tree: alivia quemaduras y cicatiza . El Oleato a base de aceite de Chía aporta Omega 3, aumentando la producción de colágeno en la piel .',2,90,300,40,1,1,'Aceite de Menta, Tea Three, Oleato de Cedrón, de Caléndula y de Aceite de Chía.'),(5,'Jabón Menta, y Eucalipto','Esta combinación es ideal para termminar el día dándole un toque relajante a tu cuerpo cansado . Éstas hierbas poseen un efecto refrescante sobre la piel, y el aceite esencial de Menta aporta sus propiedades analgésicas y antiinflamatorias; combatiendo además, la dermatitis y el acné. Animate a cambiar tu jabón industrial por ésta delicia saludable ',2,90,300,40,1,1,'Aceite de Menta, Eucalipto y Coco.'),(6,'Shampoo Argán','Tiene la capacidad de restaurar la suavidad, la fuerza y el brillo de tu cabello, gracias a las propiedades antioxidantes que posee, a la vitamina E, al Omega 3 y a los ácidos grasos que penetran en el cabello regenerándolo totalmente desde la raíz a las puntas. ',1,90,400,10,1,1,'Aceite de Argán, Manteca de Cacao.'),(7,'Shampoo Coco','Las múltiples propiedades del Aceite de Coco hidratan de manera natural, es anti-bacteriano, antifúngico y contiene nutrientes que ayudan a reparar la piel y el cabello . Ideal para reparar los cabellos maltratados, revitalizar los folículos y nutrir en profundidad el cuero cabelludo ',1,90,400,10,1,1,'Aceite de Coco, Lavanda.'),(8,'Acondicionador Argán','Gracias a sus antioxidantes y humectantes naturales, es un excelente aliado para agregar brillo y humedad natural a tu cabello, desapareciendo el frizz y dejándolo sedoso y de fácil manejo .',1,90,400,10,1,1,'Aceite de Argán, Manteca de Cacao.'),(9,'Acondicionador Coco','Para un cabello brillante, suave y saludable . Podrás desenredar tu cabello muy fácilmente y las puntas partidas serán reparadas. Fortalece los cabellos delgados, y así mejora el crecimiento natural .',1,90,400,10,1,1,'Aceite de Coco, de Lavanda.'),(10,'Shamp/Acond Karité','La formulación del aceite de karité es de vitamina A, E y F, que en conjunto le devuelven el brillo, suavidad, fuerza y le da una mejor resistencia. ',1,120,600,20,1,1,'Manteca de Karité, Aceite de Uva.'),(11,'Shamp/Acond Salvia','Las propiedades astringentes de la Salvia, hacen de esta receta, una solución ideal para la limpieza y belleza de tu cabello graso. ',1,120,600,20,1,1,'Aceite de Salvia, de Oliva.'),(12,'Kit Cítrico','Ideal para hacerle un mimo a nuestros pies . Es la base de nuestro cuerpo, en ellos residen muchísimas terminales nerviosas, que cargan y descargan energía constantemente, por eso es importante cuidarlos . Posee propiedades antisépticas, antibacterianas, humectantes y tonificantes. La luffa (o esponja vegetal) funciona como exfoliante natural, gracias a su textura. (El kit incluye Luffa, Jabón y Jabonera). ',3,140,800,25,1,1,'Naranja, Café, Canela, Caléndula, Manzanilla, Aceite de Coco.'),(13,'Kit Alcanfor','Una bomba de aromas frescos y propiedades terapéuticas que nos obsequian las hierbas . El Alcanfor regula la secreción sebácea, Laurel: ayuda a combatir la dermatitis. Lavanda: regenera células cutáneas, combate el acné. Romero: cicatriza, refresca y alisa la piel. Tea Tree: cicatrizante, antifúngico y desodorante. Regálate un momento de auto-cuidado y relax. (El kit incluye Luffa, Jabón y Jabonera).',3,140,800,25,1,1,'Alcanfor, Laurel, Lavanda, Romero, Tea Tree.');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `productsimages`
--

LOCK TABLES `productsimages` WRITE;
/*!40000 ALTER TABLE `productsimages` DISABLE KEYS */;
INSERT INTO `productsimages` VALUES (1,1,'Jabon-exfoliante-08.jpg',1),(2,2,'jabon-humectante-14.jpg',1),(3,3,'jabon-humectante-15.jpg',1),(4,4,'Jabon-antiseptico-07.jpg',1),(5,5,'Jabon-menta-16.jpg',1),(6,6,'Shampoo-geranio-12.png',1),(7,7,'Acondicionador-coco-3-4.jpg',1),(8,8,'Acondicionador-argán-05.jpg',1),(9,9,'Acondicionador-coco-4-4.jpg',1),(10,10,'Shampoo-karité-02.jpg',1),(11,11,'Acondicionador-salvia-06.png',1),(12,12,'JabonLuffa-09.jpg',1),(13,13,'JabonLuffa-11.jpg',1);
/*!40000 ALTER TABLE `productsimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (1,'exfoliante'),(2,'humectante'),(3,'antiséptico');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'en proceso'),(2,'finalizado');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'lautaro','Cersocimo','lautaro_cer@hotmail.com','Dicerso','$2a$10$CX4eXDLHNmGNz7sZ5Pp3G.McqWNQNgn8WsAhuuOitvJnh9.SG5XL2',1,'defaultAvatar.jpg'),(2,'fernando','zigarra','fer_0007_6@hotmail.com','cacao','$2a$10$GnTDgM2hhf55Cj66IiviUevg8X0t.RAIeD8ND.a1egmiLTUEhGnC2',1,'image-Avatar-1654737986404.png'),(3,'May','Cort','mayrautopia@gmail.com','Mayra','$2a$10$I4W.oC98cWCdvoATgz4n5.uaINwRAr5fBi85JdfoRNa03LfwlFXiC',1,'defaultAvatar.jpg'),(4,'adm','adm','adm@gmail.com','admadm','$2a$10$0C6YQmVu2cYXfnpbXnSkzu/rX6EhozlKb4mQC6k9NZwSLIo1yiQZW',2,'defaultAvatar.jpg');
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

-- Dump completed on 2022-07-13  9:15:11
