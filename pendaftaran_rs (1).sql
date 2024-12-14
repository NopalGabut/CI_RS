-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2024 at 06:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pendaftaran_rs`
--

-- --------------------------------------------------------

--
-- Table structure for table `antrianpoli`
--

CREATE TABLE `antrianpoli` (
  `antrianpoliId` int(11) NOT NULL,
  `antrianpoliNo` int(11) NOT NULL,
  `antrianpoliIdPasien` int(11) NOT NULL,
  `antrianpoliDataId` int(11) DEFAULT NULL,
  `antrianpoliKeluhan` varchar(255) DEFAULT NULL,
  `antrianpoliStatus` int(1) NOT NULL,
  `antrianpoliDaftar` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `antrianpoli`
--

INSERT INTO `antrianpoli` (`antrianpoliId`, `antrianpoliNo`, `antrianpoliIdPasien`, `antrianpoliDataId`, `antrianpoliKeluhan`, `antrianpoliStatus`, `antrianpoliDaftar`) VALUES
(38, 1, 15, 2, 'Batuk dan Pilek', 2, '2024-12-14'),
(39, 1, 15, 1, 'Batuk dan Pilek', 2, '2024-12-14'),
(40, 2, 15, 2, 'Batuk dan Pilek', 0, '2024-12-14'),
(41, 2, 15, 1, 'sa', 1, '2024-12-14'),
(42, 1, 15, 3, 'Batuk dan Pilek', 2, '2024-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `poliklinik`
--

CREATE TABLE `poliklinik` (
  `poliklinikId` int(11) NOT NULL,
  `poliklinikNama` varchar(255) DEFAULT NULL,
  `poliklinikKtp` varchar(20) DEFAULT NULL,
  `poliklinikIdPasien` varchar(255) DEFAULT NULL,
  `poliklinikAlamat` varchar(255) DEFAULT NULL,
  `poliklinikTempatLahir` varchar(255) NOT NULL,
  `poliklinikTanggalLahir` varchar(255) DEFAULT NULL,
  `poliklinikUsia` int(11) DEFAULT NULL,
  `poliklinikKeluhan` varchar(255) DEFAULT NULL,
  `poliklinikPhone` varchar(20) DEFAULT NULL,
  `poliklinikGolongan` varchar(10) DEFAULT NULL,
  `poliklinikKelamin` varchar(100) DEFAULT NULL,
  `poliklinikDaftar` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poliklinik`
--

INSERT INTO `poliklinik` (`poliklinikId`, `poliklinikNama`, `poliklinikKtp`, `poliklinikIdPasien`, `poliklinikAlamat`, `poliklinikTempatLahir`, `poliklinikTanggalLahir`, `poliklinikUsia`, `poliklinikKeluhan`, `poliklinikPhone`, `poliklinikGolongan`, `poliklinikKelamin`, `poliklinikDaftar`) VALUES
(15, 'Nana Arsena', '33720805050430003', 'RSHM/1214/008', 'Jln Yos Sudarso No.5 RT 04 RW 03 Surabaya', 'Solo', '13 Desember 2024', 20, 'Batuk dan Pilek', '089950120872', 'O', 'Wanita', '2024-12-14');

-- --------------------------------------------------------

--
-- Table structure for table `poliklinikdata`
--

CREATE TABLE `poliklinikdata` (
  `poliklinikDataId` int(11) NOT NULL,
  `poliklinikDataNama` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `poliklinikdata`
--

INSERT INTO `poliklinikdata` (`poliklinikDataId`, `poliklinikDataNama`) VALUES
(1, 'Poli Umum'),
(2, 'Poli Gigi'),
(3, 'Poli Gizi');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `antrianpoli`
--
ALTER TABLE `antrianpoli`
  ADD PRIMARY KEY (`antrianpoliId`);

--
-- Indexes for table `poliklinik`
--
ALTER TABLE `poliklinik`
  ADD PRIMARY KEY (`poliklinikId`);

--
-- Indexes for table `poliklinikdata`
--
ALTER TABLE `poliklinikdata`
  ADD PRIMARY KEY (`poliklinikDataId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `antrianpoli`
--
ALTER TABLE `antrianpoli`
  MODIFY `antrianpoliId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `poliklinik`
--
ALTER TABLE `poliklinik`
  MODIFY `poliklinikId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `poliklinikdata`
--
ALTER TABLE `poliklinikdata`
  MODIFY `poliklinikDataId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
