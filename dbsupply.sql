-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2025 at 05:37 AM
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
-- Database: `dbsupply`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_04_28_083243_create_tblstockin_table', 2),
(5, '2025_04_28_083701_create_tblinventory_items_table', 3),
(8, '2025_04_29_013839_create_tbluom', 4),
(9, '2025_04_30_053651_create_tblmaterials_issued_summary', 5),
(10, '2025_04_30_053651_create_tblstockin', 6),
(11, '2025_05_13_003620_create_tbluseraccounts_table', 7),
(12, '2025_05_22_024731_create_tblris_summary', 8);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('7bYqkPR9nIiC6XGpkkkK3sUPp0kAISgPOc2RAqAb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieFZ5NWU2ZzhKYzZRQmZvRGpybGVONUZjUEczNDFpaDh0eTlSUTc3VCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9pbnZlbnRvcnkvaXRlbXMvYXZhaWxhYmxlIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1748575571);

-- --------------------------------------------------------

--
-- Table structure for table `tblinventory_items`
--

CREATE TABLE `tblinventory_items` (
  `invitemsid` int(11) UNSIGNED NOT NULL,
  `serialnumber` varchar(45) NOT NULL,
  `stock_no` varchar(255) DEFAULT NULL,
  `quantity` double(15,2) NOT NULL,
  `item` varchar(255) NOT NULL,
  `unit_cost` double(15,2) DEFAULT NULL,
  `uacs_code` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblinventory_items`
--

INSERT INTO `tblinventory_items` (`invitemsid`, `serialnumber`, `stock_no`, `quantity`, `item`, `unit_cost`, `uacs_code`) VALUES
(2276, '2025-03-0003', '110-01A', 37.00, 'PAPER, Multi-Purpose (COPY) Legal, 70gsm', 204.56, NULL),
(2277, '2025-03-0003', '110-01B', 6.00, 'PAPER, Multi-Purpose (COPY) Short, 70gsm', 174.00, NULL),
(2278, '2025-03-0003', '110-01C', 191.00, 'PAPER, Multi-Purpose (COPY) A4, 70gsm', 170.77, NULL),
(2279, '2025-03-0003', '110-03A', 43.00, 'NOTE PAD, stick-on, (3\"x3\"), 100 sheets per pad', 17.00, NULL),
(2280, '2025-03-0003', '110-03B', 52.00, 'NOTE PAD, stick-on, (3\"x4\"), 100 sheets per pad', 23.54, NULL),
(2281, '2025-03-0003', '110-03C', 47.00, 'NOTE PAD, stick-on, (2\"x1.5\"), 100 sheets per pad', 7.38, NULL),
(2282, '2025-03-0003', '110-03D', 61.00, 'NOTE PAD, stick-on, (3\"x2\"), 100 sheets per pad', 13.22, NULL),
(2283, '2025-03-0003', '110-03F', 10.00, 'STICK-ON NOTE, Translucent Design - 45x12mm (single)', 28.00, NULL),
(2284, '2025-03-0003', '110-03G', 31.00, 'STICK-ON NOTE, 3 Colors - 1\"x3\"', 11.00, NULL),
(2285, '2025-03-0003', '110-10B', 197.00, 'CARBON PAPER, short size, plastfoil 100 sheets per box', 2.30, NULL),
(2286, '2025-03-0003', '110-13A', 207.00, 'CARTOLINA, Assorted Color', 6.07, NULL),
(2287, '2025-03-0003', '110-15A', 8164.00, 'ENVELOPE, DOCUMENTARY, for Legal size document (Brown)', 2.27, NULL),
(2288, '2025-03-0003', '110-15B', 10707.00, 'ENVELOPE, DOCUMENTARY, for A4 size document (Brown)', 1.80, NULL),
(2289, '2025-03-0003', '110-15C', 43.00, 'ENVELOPE, DOCUMENTARY, for short size document (Brown)', 1.50, NULL),
(2290, '2025-03-0003', '110-15D', 204.00, 'ENVELOPE, for Coins', 0.40, NULL),
(2291, '2025-03-0003', '110-16A', 396.00, 'ENVELOPE, EXPANDING, KRAFTBOARD, for legal size documents', 13.25, NULL),
(2292, '2025-03-0003', '110-16B', 265.00, 'ENVELOPE, EXPANDING, KRAFTBOARD, for short size documents', 14.92, NULL),
(2293, '2025-03-0003', '110-16C', 680.00, 'ENVELOPE, EXPANDING, Plastic, for Legal size documents', 22.04, NULL),
(2294, '2025-03-0003', '110-17A', 770.00, 'ENVELOPE, MAILING, without logo, ordinary 80 gsm', 0.64, NULL),
(2295, '2025-03-0003', '110-17D', 869.00, 'ENVELOPE, MAILING, with window, ordinary 80 gsm', 0.76, NULL),
(2296, '2025-03-0003', '110-18', 265.00, 'FOLDER, Ordinary White, short size', 2.94, NULL),
(2297, '2025-03-0003', '110-18A', 281.00, 'FOLDER, Ordinary White,Tagboard Legal size', 6.00, NULL),
(2298, '2025-03-0003', '110-18B', 496.00, 'FOLDER with TAB-A4 size BROWN', 2.43, NULL),
(2299, '2025-03-0003', '110-18C', 1611.00, 'FOLDER with TAB-A4 size WHITE', 4.97, NULL),
(2300, '2025-03-0003', '110-20A', 50.00, 'FOLDER, Expanding (Pressboard), Legal size', 14.75, NULL),
(2301, '2025-03-0003', '110-20B', 87.00, 'FOLDER, Expanding (Pressboard), Short size', 9.11, NULL),
(2302, '2025-03-0003', '110-24C', 6.00, 'INDEX TAB', 50.00, NULL),
(2303, '2025-03-0003', '110-26A', 1.00, 'RECORD BOOK, small, 300 pages', 49.36, NULL),
(2304, '2025-03-0003', '110-26C', 8.00, 'RECORD BOOK, small, 200 pages', 40.00, NULL),
(2305, '2025-03-0003', '110-26D', 1.00, 'RECORD BOOK, small, 150 pages', 36.00, NULL),
(2306, '2025-03-0003', '110-26E', 1.00, 'RECORD BOOK, small, 510 pages', 64.00, NULL),
(2307, '2025-03-0003', '110-26G', 10.00, 'RECORD BOOK, big, 160 pages', 42.00, NULL),
(2308, '2025-03-0003', '110-27B', 10.00, 'RECORD BOOK, big, 500 pages', 94.50, NULL),
(2309, '2025-03-0003', '110-27C', 28.00, 'RECORD BOOK, big, 300 pages', 60.33, NULL),
(2310, '2025-03-0003', '110-27D', 28.00, 'RECORD BOOK, big, 150 pages', 51.00, NULL),
(2311, '2025-03-0003', '110-29', 55.00, 'CLEAR Book, for Legal documents', 36.00, NULL),
(2312, '2025-03-0003', '110-33', 443.00, 'LAMINATING FILM', 13.00, NULL),
(2313, '2025-03-0003', '110-45A', 79.00, 'SPECIAL PAPER, short size/A4', 18.00, NULL),
(2314, '2025-03-0003', '110-47A', 420.00, 'STICKER PAPER, A4 size', 2.85, NULL),
(2315, '2025-03-0003', '110-48', 1820.00, 'PHOTO PAPER, A4 size', 3.05, NULL),
(2316, '2025-03-0003', '130-01A', 196.00, 'BALLPEN, blue', 4.65, NULL),
(2317, '2025-03-0003', '130-01B', 114.00, 'BALLPEN, black', 3.41, NULL),
(2318, '2025-03-0003', '130-01C', 2.00, 'BALLPEN, red', 10.48, NULL),
(2319, '2025-03-0003', '130-02A', 531.00, 'SIGNPEN, blue', 6.00, NULL),
(2320, '2025-03-0003', '130-02B', 35.00, 'SIGNPEN, black', 6.28, NULL),
(2321, '2025-03-0003', '130-02C', 16.00, 'SIGNPEN, red', 6.00, NULL),
(2322, '2025-03-0003', '130-03A', 30.00, 'MARKER, permanent pen, blue', 25.00, NULL),
(2323, '2025-03-0003', '130-03B', 29.00, 'MARKER, permanent pen, black', 22.65, NULL),
(2324, '2025-03-0003', '130-03C', 34.00, 'MARKER, permanent pen, red', 17.82, NULL),
(2325, '2025-03-0003', '130-04A', 34.00, 'WHITEBOARD PEN, blue', 28.91, NULL),
(2326, '2025-03-0003', '130-04B', 35.00, 'WHITEBOARD PEN, black', 25.65, NULL),
(2327, '2025-03-0003', '130-04C', 59.00, 'WHITEBOARD PEN, red', 17.08, NULL),
(2328, '2025-03-0003', '130-06', 100.00, 'PENCIL', 3.87, NULL),
(2329, '2025-03-0003', '130-08', 88.00, 'TEXT HIGHLIGHTER/LINER', 13.30, NULL),
(2330, '2025-03-0003', '140-04B', 3.00, 'INK, Stamp pad, purple', 15.50, NULL),
(2331, '2025-03-0003', '140-09E', 7.00, 'TONER, HP CB4 35A, Black', 2336.37, NULL),
(2332, '2025-03-0003', '140-09G', 17.00, 'TONER, HP CE2 85A (HP85A), Black', 2336.51, NULL),
(2333, '2025-03-0003', '140-09I', 3.00, 'TONER, HP 128, Black', 3000.00, NULL),
(2334, '2025-03-0003', '140-09I', 6.00, 'TONER, HP 128, Assorted color', 4572.00, NULL),
(2335, '2025-03-0003', '140-09K', 8.00, 'TONER for HP LaserJet Pro MFP M227fdw 30A', 3150.16, NULL),
(2336, '2025-03-0003', '140-10L', 5.00, 'TONER for HP LaserJet 76A', 6039.09, NULL),
(2337, '2025-03-0003', '140-10A', 1.00, 'TONER, HP C360A, Black (508A)', 9250.00, NULL),
(2338, '2025-03-0003', '140-10B', 4.00, 'TONER, HP C360A, Cyan (508A)', 11330.00, NULL),
(2339, '2025-03-0003', '140-10C', 5.00, 'TONER, HP C360A, Yellow (508A)', 11850.00, NULL),
(2340, '2025-03-0003', '140-10D', 6.00, 'TONER, HP C360A, Magenta (508A)', 11330.00, NULL),
(2341, '2025-03-0003', '160-03', 35.00, 'CORRECTION TAPE', 10.25, NULL),
(2342, '2025-03-0003', '160-04', 15.00, 'RUBBER ERASER', 3.16, NULL),
(2343, '2025-03-0003', '160-05', 8.00, 'STAMP PAD', 35.00, NULL),
(2344, '2025-03-0003', '170-01A', 126.00, 'TAPE, TRANSPARENT, width: 24mm (±1mm)', 18.00, NULL),
(2345, '2025-03-0003', '170-01B', 24.00, 'TAPE, TRANSPARENT, width: 48mm (±1mm)', 16.25, NULL),
(2346, '2025-03-0003', '170-02', 29.00, 'TAPE, duct 50M', 50.00, NULL),
(2347, '2025-03-0003', '170-03A', 47.00, 'TAPE, MASKING, width: 24mm (±1mm)', 36.24, NULL),
(2348, '2025-03-0003', '170-03B', 30.00, 'TAPE, MASKING, width: 48mm (±1mm)', 50.00, NULL),
(2349, '2025-03-0003', '170-04B', 23.00, 'TAPE, PACKAGING, width: 48mm (±1mm)', 16.25, NULL),
(2350, '2025-03-0003', '170-05', 6.00, 'TAPE, Electrical', 18.00, NULL),
(2351, '2025-03-0003', '170-06', 42.00, 'TAPE, Mounting (double sided)', 19.00, NULL),
(2352, '2025-03-0003', '180-01A', 10.00, 'BATTERY, dry cell, D, 1.5 volts, alkaline', 80.00, NULL),
(2353, '2025-03-0003', '180-01C', 50.00, 'BATTERY, dry cell, AA', 17.50, NULL),
(2354, '2025-03-0003', '180-01D', 463.00, 'BATTERY, dry cell, AAA', 31.94, NULL),
(2355, '2025-03-0003', '180-01E', 12.00, 'BATTERY, dry cell, C', 29.73, NULL),
(2356, '2025-03-0003', '180-01I', 7.00, 'BATTERY, dry cell, 9V', 88.00, NULL),
(2357, '2025-03-0003', '180-04', 106.00, 'FLASH DRIVE, 16 GB capacity', 303.23, NULL),
(2358, '2025-03-0003', '180-06A', 23.00, 'GLUE multi  purpose 130g', 17.91, NULL),
(2359, '2025-03-0003', '180-07B', 8.00, 'CUTTER KNIFE, big, ordinary', 13.13, NULL),
(2360, '2025-03-0003', '180-07C', 3.00, 'SCISSORS, symmetrical, blade length: 65mm min', 68.04, NULL),
(2361, '2025-03-0003', '180-07D', 10.00, 'PUNCHER, paper, heavy duty, with two hole guide', 174.00, NULL),
(2362, '2025-03-0003', '180-08A', 4.00, 'TAPE DISPENSER, TABLE TOP, for 24mm width tape', 100.12, NULL),
(2363, '2025-03-0003', '180-08B', 3.00, 'TAPE DISPENSER, Handheld, for 48mm width tape', 36.00, NULL),
(2364, '2025-03-0003', '180-09', 20.00, 'MAP/PUSH PINS', 15.19, NULL),
(2365, '2025-03-0003', '180-10A', 67.00, 'PAPER CLIP, vinyl/plastic coated, 33mm (small) 50 gms', 11.88, NULL),
(2366, '2025-03-0003', '180-10B', 68.00, 'PAPER CLIP, vinyl/plastic coated, 50mm (jumbo) 150 gms', 20.00, NULL),
(2367, '2025-03-0003', '180-10D', 67.00, 'CLIP, BACKFOLD, all metal, clamping: 25mm (-1mm) (1\")', 20.60, NULL),
(2368, '2025-03-0003', '180-10E', 101.00, 'CLIP, BACKFOLD, all metal, clamping: 50mm (-1mm) (2\")', 52.55, NULL),
(2369, '2025-03-0003', '180-10F', 57.00, 'CLIP, BACKFOLD, all metal, clamping: 19mm (-1mm) (3/4\")', 11.01, NULL),
(2370, '2025-03-0003', '180-10G', 57.00, 'CLIP, BACKFOLD, all metal, clamping: 32mm (-1mm) (1 1/4\")', 22.34, NULL),
(2371, '2025-03-0003', '180-11', 27.00, 'FASTENER, METAL, 70mm between prongs', 45.00, NULL),
(2372, '2025-03-0003', '180-11B', 37.00, 'FASTENER, PLASTIC', 32.35, NULL),
(2373, '2025-03-0003', '180-12', 2.00, 'PASTE, Redstone', 32.50, NULL),
(2374, '2025-03-0003', '180-13B', 2.00, 'ACETATE, thickness: 0.075mm min (gauge #3)', 682.00, NULL),
(2375, '2025-03-0003', '180-15A', 6.00, 'RUBBER BAND, 70mm min lay flat length (#18)', 163.33, NULL),
(2376, '2025-03-0003', '180-16A', 48.00, 'STAPLE WIRE, STANDARD, (26/6) #35', 22.86, NULL),
(2377, '2025-03-0003', '180-17', 16.00, 'THUMBTACKS', 5.00, NULL),
(2378, '2025-03-0003', '180-19C', 14.00, 'RIBBON, Epson LQ-590 Printer', 450.00, NULL),
(2379, '2025-03-0003', '180-19K', 4.00, 'INK, HP 678, black', 530.00, NULL),
(2380, '2025-03-0003', '180-19L', 5.00, 'INK, HP 678, tri-color', 530.00, NULL),
(2381, '2025-03-0003', '180-19T', 29.00, 'INK, HP 704, black', 550.00, NULL),
(2382, '2025-03-0003', '180-19U', 8.00, 'INK, HP 704, tri-color', 550.00, NULL),
(2383, '2025-03-0003', '180-19V', 4.00, 'INK, Epson 137, black', 1104.00, NULL),
(2384, '2025-03-0003', '180-19W', 28.00, 'INK, HP 680, black', 520.00, NULL),
(2385, '2025-03-0003', '180-19X', 20.00, 'INK, HP 680, tri-color', 520.00, NULL),
(2386, '2025-03-0003', '180-22', 2.00, 'PORTA FILE', 130.00, NULL),
(2387, '2025-03-0003', '180-23', 20.00, 'STAPLER, #35', 204.25, NULL),
(2388, '2025-03-0003', '180-24', 26.00, 'STAPLE WIRE REMOVER', 50.33, NULL),
(2389, '2025-03-0003', '180-28', 33.00, 'PHILIPPINE FLAG', 151.03, NULL),
(2390, '2025-03-0003', '180-29B', 13.00, 'RINGBINDER, 1\" (24mm x 1 M)', 28.00, NULL),
(2391, '2025-03-0003', '180-29C', 42.00, 'RINGBINDER, 3/4\"', 43.78, NULL),
(2392, '2025-03-0003', '180-29D', 19.00, 'RINGBINDER, 1/2\"', 22.03, NULL),
(2393, '2025-03-0003', '180-29E', 3.00, 'RINGBINDER, 1/4\"', 9.00, NULL),
(2394, '2025-03-0003', '180-37', 8.00, 'MOP HANDLE, metal', 208.97, NULL),
(2395, '2025-03-0003', '180-37B', 15.00, 'MOPHEAD, made of rayon, weight: 400 grams min', 110.00, NULL),
(2396, '2025-03-0003', '180-37C', 6.00, 'MOP BUCKET, heavy duty, hard plastic, 30L capacity', 4200.00, NULL),
(2397, '2025-03-0003', '180-38', 32.00, 'RULER, Plastic', 18.27, NULL),
(2398, '2025-03-0003', '180-41A', 11.00, 'INK, Epson 188, Cyan', 1142.62, NULL),
(2399, '2025-03-0003', '180-41B', 10.00, 'INK, Epson 188, Magenta', 1153.00, NULL),
(2400, '2025-03-0003', '180-41C', 12.00, 'INK, Epson 188, Yellow', 1149.49, NULL),
(2401, '2025-03-0003', '180-41D', 7.00, 'INK, Epson 188, Black', 1811.43, NULL),
(2402, '2025-03-0003', '180-41E', 47.00, 'INK, Epson 003 cyan', 200.00, NULL),
(2403, '2025-03-0003', '180-41F', 56.00, 'INK, Epson 003 magenta', 210.00, NULL),
(2404, '2025-03-0003', '180-41G', 47.00, 'INK, Epson 003 yellow', 200.00, NULL),
(2405, '2025-03-0003', '180-41H', 92.00, 'INK, Epson 003 Black', 203.93, NULL),
(2406, '2025-03-0003', '180-41I', 3.00, 'INK, Epson 664 magenta', 300.00, NULL),
(2407, '2025-03-0003', '180-41J', 6.00, 'INK, Epson 664 yellow', 300.00, NULL),
(2408, '2025-03-0003', '180-41K', 7.00, 'INK, Epson 664 cyan', 300.00, NULL),
(2409, '2025-03-0003', '180-41L', 12.00, 'INK, Epson 664, Black', 268.00, NULL),
(2410, '2025-03-0003', '180-42C', 14.00, 'INK, Brother MFC-J200 (LC 539), Black', 419.36, NULL),
(2411, '2025-03-0003', '180-42D', 9.00, 'INK, Brother MFC-J200 (LC 535), Cyan', 420.00, NULL),
(2412, '2025-03-0003', '180-42E', 9.00, 'INK, Brother MFC-J200 (LC 535), Magenta', 420.00, NULL),
(2413, '2025-03-0003', '180-42F', 12.00, 'INK, Brother MFC-J200 (LC 535), Yellow', 419.62, NULL),
(2414, '2025-03-0003', '180-42G', 19.00, 'INK BROTHER BT6000 BLACK', 327.14, NULL),
(2415, '2025-03-0003', '180-42H', 2.00, 'INK BROTHER BT5000 cyan', 250.00, NULL),
(2416, '2025-03-0003', '180-42I', 4.00, 'INK BROTHER BT5000 magenta', 250.00, NULL),
(2417, '2025-03-0003', '180-42J', 4.00, 'INK BROTHER BT5000 yellow', 250.00, NULL),
(2418, '2025-03-0003', '180-42K', 13.00, 'INK BROTHER DT60, BLACK', 390.00, NULL),
(2419, '2025-03-0003', '180-43', 6.00, 'PENCIL SHARPENER, table top', 272.10, NULL),
(2420, '2025-03-0003', '180-43B', 8.00, 'PENCIL SHARPENER', 3.00, NULL),
(2421, '2025-03-0003', '190-01A', 370.00, 'ALCOHOL', 63.10, NULL),
(2422, '2025-03-0003', '190-01B', 47.00, 'ALCOHOL 3785 ml/gal', 420.83, NULL),
(2423, '2025-03-0003', '190-02A', 493.00, 'AIRFRESHENER, aerosol spray', 100.17, NULL),
(2424, '2025-03-0003', '190-03A', 7.00, 'BROOM, soft (tambo)', 72.00, NULL),
(2425, '2025-03-0003', '190-03B', 10.00, 'BROOM, STICK (TING-TING), usable length: 760mm min', 26.00, NULL),
(2426, '2025-03-0003', '190-04A', 106.00, 'SOAP, LIQUID, dishwashing, 500 mL bottle', 50.90, NULL),
(2427, '2025-03-0003', '190-04B', 142.00, 'SOAP, DISHWASHING Paste', 34.12, NULL),
(2428, '2025-03-0003', '190-04D', 49.00, 'SOAP, BATHROOM, 85 grams', 34.45, NULL),
(2429, '2025-03-0003', '190-04E', 74.00, 'SOAP, Powder (DETERGENT POWDER, all purpose, 1kg)', 44.33, NULL),
(2430, '2025-03-0003', '190-04F', 30.00, 'SOAP, HAND LIQUID', 88.00, NULL),
(2431, '2025-03-0003', '190-04H', 71.00, 'HAND SANITIZER liquid gel/bottle', 191.17, NULL),
(2432, '2025-03-0003', '190-05', 129.00, 'SCRUBBING PAD (SCOURING PAD, made of synthetic nylon, 140 x 220mm)', 5.08, NULL),
(2433, '2025-03-0003', '190-05A', 28.00, 'DISHWASHING SPONGE', 15.00, NULL),
(2434, '2025-03-0003', '190-07A', 17.00, 'DUST PAN, non-rigid plastic, w/ detachable handle', 61.13, NULL),
(2435, '2025-03-0003', '190-08C', 32.00, 'RAGS (POT HOLDER), all cotton, round', 3.00, NULL),
(2436, '2025-03-0003', '190-09A', 46.00, 'INSECTICIDE, aerosol type (Insect Killer)', 182.00, NULL),
(2437, '2025-03-0003', '190-10A', 27.00, 'CLEANSER, SCOURING POWDER, 350g min./can', 74.67, NULL),
(2438, '2025-03-0003', '190-10B', 9.00, 'GLASS CLEANSER, 500ml per bottle', 185.00, NULL),
(2439, '2025-03-0003', '190-12', 1920.00, 'TOILET TISSUE PAPER 2-plys sheets, 150 pulls', 8.40, NULL),
(2440, '2025-03-0003', '190-12A', 138.00, 'TISSUE, INTERFOLDED PAPER TOWEL, 150 pulls/pack', 48.55, NULL),
(2441, '2025-03-0003', '190-15B', 28.00, 'FURNITURE CLEANER, aerosol type, 330ml min per can (Polish)', 146.51, NULL),
(2442, '2025-03-0003', '190-16A', 75.00, 'TRASHBAG, plastic, transparent/Black', 71.90, NULL),
(2443, '2025-03-0003', '190-18B', 222.00, 'CLEANER TOILET BOWL 500ml', 73.72, NULL),
(2444, '2025-03-0003', '190-19', 9.00, 'BRUSH, Toilet Bowl', 37.37, NULL),
(2445, '2025-03-0003', '190-20', 11.00, 'RUBBER PUMP, Toilet', 38.00, NULL),
(2446, '2025-03-0003', '190-22A', 186.00, 'DISINFECTANT SPRAY, aerosol type, 280ml/400gms', 311.88, NULL),
(2447, '2025-03-0003', '190-28', 8.00, 'BLEACHING AGENT 3785ml', 222.19, NULL),
(2448, '2025-03-0003', '190-30', 39.00, 'Disinfectant bleaching solution 1liter', 49.72, NULL),
(2449, '2025-03-0003', '200-03D', 169.00, 'Light Bulb, LED, 7 watts 1 pc in individual box', 83.00, NULL),
(2450, '2025-03-0003', '200-07', 122.00, 'CERTIFICATE HOLDER', 36.00, NULL),
(2451, '2025-03-0005', '110-01A', 37.00, 'PAPER, Multi-Purpose (COPY) Legal, 70gsm', 204.56, NULL),
(2452, '2025-03-0005', '110-01B', 6.00, 'PAPER, Multi-Purpose (COPY) Short, 70gsm', 174.00, NULL),
(2453, '2025-03-0005', '110-01C', 191.00, 'PAPER, Multi-Purpose (COPY) A4, 70gsm', 170.77, NULL),
(2454, '2025-03-0005', '110-03A', 43.00, 'NOTE PAD, stick-on, (3\"x3\"), 100 sheets per pad', 17.00, NULL),
(2455, '2025-03-0005', '110-03B', 52.00, 'NOTE PAD, stick-on, (3\"x4\"), 100 sheets per pad', 23.54, NULL),
(2456, '2025-03-0005', '110-03C', 47.00, 'NOTE PAD, stick-on, (2\"x1.5\"), 100 sheets per pad', 7.38, NULL),
(2457, '2025-03-0005', '110-03D', 61.00, 'NOTE PAD, stick-on, (3\"x2\"), 100 sheets per pad', 13.22, NULL),
(2458, '2025-03-0005', '110-03F', 10.00, 'STICK-ON NOTE, Translucent Design - 45x12mm (single)', 28.00, NULL),
(2459, '2025-03-0005', '110-03G', 31.00, 'STICK-ON NOTE, 3 Colors - 1\"x3\"', 11.00, NULL),
(2460, '2025-03-0005', '110-10B', 197.00, 'CARBON PAPER, short size, plastfoil 100 sheets per box', 2.30, NULL),
(2461, '2025-03-0005', '110-13A', 207.00, 'CARTOLINA, Assorted Color', 6.07, NULL),
(2462, '2025-03-0005', '110-15A', 8164.00, 'ENVELOPE, DOCUMENTARY, for Legal size document (Brown)', 2.27, NULL),
(2463, '2025-03-0005', '110-15B', 10707.00, 'ENVELOPE, DOCUMENTARY, for A4 size document (Brown)', 1.80, NULL),
(2464, '2025-03-0005', '110-15C', 43.00, 'ENVELOPE, DOCUMENTARY, for short size document (Brown)', 1.50, NULL),
(2465, '2025-03-0005', '110-15D', 204.00, 'ENVELOPE, for Coins', 0.40, NULL),
(2466, '2025-03-0005', '110-16A', 396.00, 'ENVELOPE, EXPANDING, KRAFTBOARD, for legal size documents', 13.25, NULL),
(2467, '2025-03-0005', '110-16B', 265.00, 'ENVELOPE, EXPANDING, KRAFTBOARD, for short size documents', 14.92, NULL),
(2468, '2025-03-0005', '110-16C', 680.00, 'ENVELOPE, EXPANDING, Plastic, for Legal size documents', 22.04, NULL),
(2469, '2025-03-0005', '110-17A', 770.00, 'ENVELOPE, MAILING, without logo, ordinary 80 gsm', 0.64, NULL),
(2470, '2025-03-0005', '110-17D', 869.00, 'ENVELOPE, MAILING, with window, ordinary 80 gsm', 0.76, NULL),
(2471, '2025-03-0005', '110-18', 265.00, 'FOLDER, Ordinary White, short size', 2.94, NULL),
(2472, '2025-03-0005', '110-18A', 281.00, 'FOLDER, Ordinary White,Tagboard Legal size', 6.00, NULL),
(2473, '2025-03-0005', '110-18B', 496.00, 'FOLDER with TAB-A4 size BROWN', 2.43, NULL),
(2474, '2025-03-0005', '110-18C', 1611.00, 'FOLDER with TAB-A4 size WHITE', 4.97, NULL),
(2475, '2025-03-0005', '110-20A', 50.00, 'FOLDER, Expanding (Pressboard), Legal size', 14.75, NULL),
(2476, '2025-03-0005', '110-20B', 87.00, 'FOLDER, Expanding (Pressboard), Short size', 9.11, NULL),
(2477, '2025-03-0005', '110-24C', 6.00, 'INDEX TAB', 50.00, NULL),
(2478, '2025-03-0005', '110-26A', 1.00, 'RECORD BOOK, small, 300 pages', 49.36, NULL),
(2479, '2025-03-0005', '110-26C', 8.00, 'RECORD BOOK, small, 200 pages', 40.00, NULL),
(2480, '2025-03-0005', '110-26D', 1.00, 'RECORD BOOK, small, 150 pages', 36.00, NULL),
(2481, '2025-03-0005', '110-26E', 1.00, 'RECORD BOOK, small, 510 pages', 64.00, NULL),
(2482, '2025-03-0005', '110-26G', 10.00, 'RECORD BOOK, big, 160 pages', 42.00, NULL),
(2483, '2025-03-0005', '110-27B', 10.00, 'RECORD BOOK, big, 500 pages', 94.50, NULL),
(2484, '2025-03-0005', '110-27C', 28.00, 'RECORD BOOK, big, 300 pages', 60.33, NULL),
(2485, '2025-03-0005', '110-27D', 28.00, 'RECORD BOOK, big, 150 pages', 51.00, NULL),
(2486, '2025-03-0005', '110-29', 55.00, 'CLEAR Book, for Legal documents', 36.00, NULL),
(2487, '2025-03-0005', '110-33', 443.00, 'LAMINATING FILM', 13.00, NULL),
(2488, '2025-03-0005', '110-45A', 79.00, 'SPECIAL PAPER, short size/A4', 18.00, NULL),
(2489, '2025-03-0005', '110-47A', 420.00, 'STICKER PAPER, A4 size', 2.85, NULL),
(2490, '2025-03-0005', '110-48', 1820.00, 'PHOTO PAPER, A4 size', 3.05, NULL),
(2491, '2025-03-0005', '130-01A', 196.00, 'BALLPEN, blue', 4.65, NULL),
(2492, '2025-03-0005', '130-01B', 114.00, 'BALLPEN, black', 3.41, NULL),
(2493, '2025-03-0005', '130-01C', 2.00, 'BALLPEN, red', 10.48, NULL),
(2494, '2025-03-0005', '130-02A', 531.00, 'SIGNPEN, blue', 6.00, NULL),
(2495, '2025-03-0005', '130-02B', 35.00, 'SIGNPEN, black', 6.28, NULL),
(2496, '2025-03-0005', '130-02C', 16.00, 'SIGNPEN, red', 6.00, NULL),
(2497, '2025-03-0005', '130-03A', 30.00, 'MARKER, permanent pen, blue', 25.00, NULL),
(2498, '2025-03-0005', '130-03B', 29.00, 'MARKER, permanent pen, black', 22.65, NULL),
(2499, '2025-03-0005', '130-03C', 34.00, 'MARKER, permanent pen, red', 17.82, NULL),
(2500, '2025-03-0005', '130-04A', 34.00, 'WHITEBOARD PEN, blue', 28.91, NULL),
(2501, '2025-03-0005', '130-04B', 35.00, 'WHITEBOARD PEN, black', 25.65, NULL),
(2502, '2025-03-0005', '130-04C', 59.00, 'WHITEBOARD PEN, red', 17.08, NULL),
(2503, '2025-03-0005', '130-06', 100.00, 'PENCIL', 3.87, NULL),
(2504, '2025-03-0005', '130-08', 88.00, 'TEXT HIGHLIGHTER/LINER', 13.30, NULL),
(2505, '2025-03-0005', '140-04B', 3.00, 'INK, Stamp pad, purple', 15.50, NULL),
(2506, '2025-03-0005', '140-09E', 7.00, 'TONER, HP CB4 35A, Black', 2336.37, NULL),
(2507, '2025-03-0005', '140-09G', 17.00, 'TONER, HP CE2 85A (HP85A), Black', 2336.51, NULL),
(2508, '2025-03-0005', '140-09I', 3.00, 'TONER, HP 128, Black', 3000.00, NULL),
(2509, '2025-03-0005', '140-09I', 6.00, 'TONER, HP 128, Assorted color', 4572.00, NULL),
(2510, '2025-03-0005', '140-09K', 8.00, 'TONER for HP LaserJet Pro MFP M227fdw 30A', 3150.16, NULL),
(2511, '2025-03-0005', '140-10L', 5.00, 'TONER for HP LaserJet 76A', 6039.09, NULL),
(2512, '2025-03-0005', '140-10A', 1.00, 'TONER, HP C360A, Black (508A)', 9250.00, NULL),
(2513, '2025-03-0005', '140-10B', 4.00, 'TONER, HP C360A, Cyan (508A)', 11330.00, NULL),
(2514, '2025-03-0005', '140-10C', 5.00, 'TONER, HP C360A, Yellow (508A)', 11850.00, NULL),
(2515, '2025-03-0005', '140-10D', 6.00, 'TONER, HP C360A, Magenta (508A)', 11330.00, NULL),
(2516, '2025-03-0005', '160-03', 35.00, 'CORRECTION TAPE', 10.25, NULL),
(2517, '2025-03-0005', '160-04', 15.00, 'RUBBER ERASER', 3.16, NULL),
(2518, '2025-03-0005', '160-05', 8.00, 'STAMP PAD', 35.00, NULL),
(2519, '2025-03-0005', '170-01A', 126.00, 'TAPE, TRANSPARENT, width: 24mm (±1mm)', 18.00, NULL),
(2520, '2025-03-0005', '170-01B', 24.00, 'TAPE, TRANSPARENT, width: 48mm (±1mm)', 16.25, NULL),
(2521, '2025-03-0005', '170-02', 29.00, 'TAPE, duct 50M', 50.00, NULL),
(2522, '2025-03-0005', '170-03A', 47.00, 'TAPE, MASKING, width: 24mm (±1mm)', 36.24, NULL),
(2523, '2025-03-0005', '170-03B', 30.00, 'TAPE, MASKING, width: 48mm (±1mm)', 50.00, NULL),
(2524, '2025-03-0005', '170-04B', 23.00, 'TAPE, PACKAGING, width: 48mm (±1mm)', 16.25, NULL),
(2525, '2025-03-0005', '170-05', 6.00, 'TAPE, Electrical', 18.00, NULL),
(2526, '2025-03-0005', '170-06', 42.00, 'TAPE, Mounting (double sided)', 19.00, NULL),
(2527, '2025-03-0005', '180-01A', 10.00, 'BATTERY, dry cell, D, 1.5 volts, alkaline', 80.00, NULL),
(2528, '2025-03-0005', '180-01C', 50.00, 'BATTERY, dry cell, AA', 17.50, NULL),
(2529, '2025-03-0005', '180-01D', 463.00, 'BATTERY, dry cell, AAA', 31.94, NULL),
(2530, '2025-03-0005', '180-01E', 12.00, 'BATTERY, dry cell, C', 29.73, NULL),
(2531, '2025-03-0005', '180-01I', 7.00, 'BATTERY, dry cell, 9V', 88.00, NULL),
(2532, '2025-03-0005', '180-04', 106.00, 'FLASH DRIVE, 16 GB capacity', 303.23, NULL),
(2533, '2025-03-0005', '180-06A', 23.00, 'GLUE multi  purpose 130g', 17.91, NULL),
(2534, '2025-03-0005', '180-07B', 8.00, 'CUTTER KNIFE, big, ordinary', 13.13, NULL),
(2535, '2025-03-0005', '180-07C', 3.00, 'SCISSORS, symmetrical, blade length: 65mm min', 68.04, NULL),
(2536, '2025-03-0005', '180-07D', 10.00, 'PUNCHER, paper, heavy duty, with two hole guide', 174.00, NULL),
(2537, '2025-03-0005', '180-08A', 4.00, 'TAPE DISPENSER, TABLE TOP, for 24mm width tape', 100.12, NULL),
(2538, '2025-03-0005', '180-08B', 3.00, 'TAPE DISPENSER, Handheld, for 48mm width tape', 36.00, NULL),
(2539, '2025-03-0005', '180-09', 20.00, 'MAP/PUSH PINS', 15.19, NULL),
(2540, '2025-03-0005', '180-10A', 67.00, 'PAPER CLIP, vinyl/plastic coated, 33mm (small) 50 gms', 11.88, NULL),
(2541, '2025-03-0005', '180-10B', 68.00, 'PAPER CLIP, vinyl/plastic coated, 50mm (jumbo) 150 gms', 20.00, NULL),
(2542, '2025-03-0005', '180-10D', 67.00, 'CLIP, BACKFOLD, all metal, clamping: 25mm (-1mm) (1\")', 20.60, NULL),
(2543, '2025-03-0005', '180-10E', 101.00, 'CLIP, BACKFOLD, all metal, clamping: 50mm (-1mm) (2\")', 52.55, NULL),
(2544, '2025-03-0005', '180-10F', 57.00, 'CLIP, BACKFOLD, all metal, clamping: 19mm (-1mm) (3/4\")', 11.01, NULL),
(2545, '2025-03-0005', '180-10G', 57.00, 'CLIP, BACKFOLD, all metal, clamping: 32mm (-1mm) (1 1/4\")', 22.34, NULL),
(2546, '2025-03-0005', '180-11', 27.00, 'FASTENER, METAL, 70mm between prongs', 45.00, NULL),
(2547, '2025-03-0005', '180-11B', 37.00, 'FASTENER, PLASTIC', 32.35, NULL),
(2548, '2025-03-0005', '180-12', 2.00, 'PASTE, Redstone', 32.50, NULL),
(2549, '2025-03-0005', '180-13B', 2.00, 'ACETATE, thickness: 0.075mm min (gauge #3)', 682.00, NULL),
(2550, '2025-03-0005', '180-15A', 6.00, 'RUBBER BAND, 70mm min lay flat length (#18)', 163.33, NULL),
(2551, '2025-03-0005', '180-16A', 48.00, 'STAPLE WIRE, STANDARD, (26/6) #35', 22.86, NULL),
(2552, '2025-03-0005', '180-17', 16.00, 'THUMBTACKS', 5.00, NULL),
(2553, '2025-03-0005', '180-19C', 14.00, 'RIBBON, Epson LQ-590 Printer', 450.00, NULL),
(2554, '2025-03-0005', '180-19K', 4.00, 'INK, HP 678, black', 530.00, NULL),
(2555, '2025-03-0005', '180-19L', 5.00, 'INK, HP 678, tri-color', 530.00, NULL),
(2556, '2025-03-0005', '180-19T', 29.00, 'INK, HP 704, black', 550.00, NULL),
(2557, '2025-03-0005', '180-19U', 8.00, 'INK, HP 704, tri-color', 550.00, NULL),
(2558, '2025-03-0005', '180-19V', 4.00, 'INK, Epson 137, black', 1104.00, NULL),
(2559, '2025-03-0005', '180-19W', 28.00, 'INK, HP 680, black', 520.00, NULL),
(2560, '2025-03-0005', '180-19X', 20.00, 'INK, HP 680, tri-color', 520.00, NULL),
(2561, '2025-03-0005', '180-22', 2.00, 'PORTA FILE', 130.00, NULL),
(2562, '2025-03-0005', '180-23', 20.00, 'STAPLER, #35', 204.25, NULL),
(2563, '2025-03-0005', '180-24', 26.00, 'STAPLE WIRE REMOVER', 50.33, NULL),
(2564, '2025-03-0005', '180-28', 33.00, 'PHILIPPINE FLAG', 151.03, NULL),
(2565, '2025-03-0005', '180-29B', 13.00, 'RINGBINDER, 1\" (24mm x 1 M)', 28.00, NULL),
(2566, '2025-03-0005', '180-29C', 42.00, 'RINGBINDER, 3/4\"', 43.78, NULL),
(2567, '2025-03-0005', '180-29D', 19.00, 'RINGBINDER, 1/2\"', 22.03, NULL),
(2568, '2025-03-0005', '180-29E', 3.00, 'RINGBINDER, 1/4\"', 9.00, NULL),
(2569, '2025-03-0005', '180-37', 8.00, 'MOP HANDLE, metal', 208.97, NULL),
(2570, '2025-03-0005', '180-37B', 15.00, 'MOPHEAD, made of rayon, weight: 400 grams min', 110.00, NULL),
(2571, '2025-03-0005', '180-37C', 6.00, 'MOP BUCKET, heavy duty, hard plastic, 30L capacity', 4200.00, NULL),
(2572, '2025-03-0005', '180-38', 32.00, 'RULER, Plastic', 18.27, NULL),
(2573, '2025-03-0005', '180-41A', 11.00, 'INK, Epson 188, Cyan', 1142.62, NULL),
(2574, '2025-03-0005', '180-41B', 10.00, 'INK, Epson 188, Magenta', 1153.00, NULL),
(2575, '2025-03-0005', '180-41C', 12.00, 'INK, Epson 188, Yellow', 1149.49, NULL),
(2576, '2025-03-0005', '180-41D', 7.00, 'INK, Epson 188, Black', 1811.43, NULL),
(2577, '2025-03-0005', '180-41E', 47.00, 'INK, Epson 003 cyan', 200.00, NULL),
(2578, '2025-03-0005', '180-41F', 56.00, 'INK, Epson 003 magenta', 210.00, NULL),
(2579, '2025-03-0005', '180-41G', 47.00, 'INK, Epson 003 yellow', 200.00, NULL),
(2580, '2025-03-0005', '180-41H', 92.00, 'INK, Epson 003 Black', 203.93, NULL),
(2581, '2025-03-0005', '180-41I', 3.00, 'INK, Epson 664 magenta', 300.00, NULL),
(2582, '2025-03-0005', '180-41J', 6.00, 'INK, Epson 664 yellow', 300.00, NULL),
(2583, '2025-03-0005', '180-41K', 7.00, 'INK, Epson 664 cyan', 300.00, NULL),
(2584, '2025-03-0005', '180-41L', 12.00, 'INK, Epson 664, Black', 268.00, NULL),
(2585, '2025-03-0005', '180-42C', 14.00, 'INK, Brother MFC-J200 (LC 539), Black', 419.36, NULL),
(2586, '2025-03-0005', '180-42D', 9.00, 'INK, Brother MFC-J200 (LC 535), Cyan', 420.00, NULL),
(2587, '2025-03-0005', '180-42E', 9.00, 'INK, Brother MFC-J200 (LC 535), Magenta', 420.00, NULL),
(2588, '2025-03-0005', '180-42F', 12.00, 'INK, Brother MFC-J200 (LC 535), Yellow', 419.62, NULL),
(2589, '2025-03-0005', '180-42G', 19.00, 'INK BROTHER BT6000 BLACK', 327.14, NULL),
(2590, '2025-03-0005', '180-42H', 2.00, 'INK BROTHER BT5000 cyan', 250.00, NULL),
(2591, '2025-03-0005', '180-42I', 4.00, 'INK BROTHER BT5000 magenta', 250.00, NULL),
(2592, '2025-03-0005', '180-42J', 4.00, 'INK BROTHER BT5000 yellow', 250.00, NULL),
(2593, '2025-03-0005', '180-42K', 13.00, 'INK BROTHER DT60, BLACK', 390.00, NULL),
(2594, '2025-03-0005', '180-43', 6.00, 'PENCIL SHARPENER, table top', 272.10, NULL),
(2595, '2025-03-0005', '180-43B', 8.00, 'PENCIL SHARPENER', 3.00, NULL),
(2596, '2025-03-0005', '190-01A', 370.00, 'ALCOHOL', 63.10, NULL),
(2597, '2025-03-0005', '190-01B', 47.00, 'ALCOHOL 3785 ml/gal', 420.83, NULL),
(2598, '2025-03-0005', '190-02A', 493.00, 'AIRFRESHENER, aerosol spray', 100.17, NULL),
(2599, '2025-03-0005', '190-03A', 7.00, 'BROOM, soft (tambo)', 72.00, NULL),
(2600, '2025-03-0005', '190-03B', 10.00, 'BROOM, STICK (TING-TING), usable length: 760mm min', 26.00, NULL),
(2601, '2025-03-0005', '190-04A', 106.00, 'SOAP, LIQUID, dishwashing, 500 mL bottle', 50.90, NULL),
(2602, '2025-03-0005', '190-04B', 142.00, 'SOAP, DISHWASHING Paste', 34.12, NULL),
(2603, '2025-03-0005', '190-04D', 49.00, 'SOAP, BATHROOM, 85 grams', 34.45, NULL),
(2604, '2025-03-0005', '190-04E', 74.00, 'SOAP, Powder (DETERGENT POWDER, all purpose, 1kg)', 44.33, NULL),
(2605, '2025-03-0005', '190-04F', 30.00, 'SOAP, HAND LIQUID', 88.00, NULL),
(2606, '2025-03-0005', '190-04H', 71.00, 'HAND SANITIZER liquid gel/bottle', 191.17, NULL),
(2607, '2025-03-0005', '190-05', 129.00, 'SCRUBBING PAD (SCOURING PAD, made of synthetic nylon, 140 x 220mm)', 5.08, NULL),
(2608, '2025-03-0005', '190-05A', 28.00, 'DISHWASHING SPONGE', 15.00, NULL),
(2609, '2025-03-0005', '190-07A', 17.00, 'DUST PAN, non-rigid plastic, w/ detachable handle', 61.13, NULL),
(2610, '2025-03-0005', '190-08C', 32.00, 'RAGS (POT HOLDER), all cotton, round', 3.00, NULL),
(2611, '2025-03-0005', '190-09A', 46.00, 'INSECTICIDE, aerosol type (Insect Killer)', 182.00, NULL),
(2612, '2025-03-0005', '190-10A', 27.00, 'CLEANSER, SCOURING POWDER, 350g min./can', 74.67, NULL),
(2613, '2025-03-0005', '190-10B', 9.00, 'GLASS CLEANSER, 500ml per bottle', 185.00, NULL),
(2614, '2025-03-0005', '190-12', 1920.00, 'TOILET TISSUE PAPER 2-plys sheets, 150 pulls', 8.40, NULL),
(2615, '2025-03-0005', '190-12A', 138.00, 'TISSUE, INTERFOLDED PAPER TOWEL, 150 pulls/pack', 48.55, NULL),
(2616, '2025-03-0005', '190-15B', 28.00, 'FURNITURE CLEANER, aerosol type, 330ml min per can (Polish)', 146.51, NULL),
(2617, '2025-03-0005', '190-16A', 75.00, 'TRASHBAG, plastic, transparent/Black', 71.90, NULL),
(2618, '2025-03-0005', '190-18B', 222.00, 'CLEANER TOILET BOWL 500ml', 73.72, NULL),
(2619, '2025-03-0005', '190-19', 9.00, 'BRUSH, Toilet Bowl', 37.37, NULL),
(2620, '2025-03-0005', '190-20', 11.00, 'RUBBER PUMP, Toilet', 38.00, NULL),
(2621, '2025-03-0005', '190-22A', 186.00, 'DISINFECTANT SPRAY, aerosol type, 280ml/400gms', 311.88, NULL),
(2622, '2025-03-0005', '190-28', 8.00, 'BLEACHING AGENT 3785ml', 222.19, NULL),
(2623, '2025-03-0005', '190-30', 39.00, 'Disinfectant bleaching solution 1liter', 49.72, NULL),
(2624, '2025-03-0005', '200-03D', 169.00, 'Light Bulb, LED, 7 watts 1 pc in individual box', 83.00, NULL),
(2625, '2025-03-0005', '200-07', 122.00, 'CERTIFICATE HOLDER', 36.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblrequest_details`
--

CREATE TABLE `tblrequest_details` (
  `requestdetailsid` int(11) NOT NULL,
  `requestsummaryid` int(11) DEFAULT NULL,
  `stock_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` double(15,2) NOT NULL,
  `is_served` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblrequest_details`
--

INSERT INTO `tblrequest_details` (`requestdetailsid`, `requestsummaryid`, `stock_no`, `quantity`, `is_served`) VALUES
(22, 19, '110-03A', 3.00, 0),
(23, 19, '110-13A', 2.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `tblrequest_summary`
--

CREATE TABLE `tblrequest_summary` (
  `requestsummaryid` int(11) NOT NULL,
  `requester` varchar(45) NOT NULL,
  `supervisor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requestdate` date NOT NULL DEFAULT current_timestamp(),
  `purpose` text DEFAULT NULL,
  `xstatus` varchar(45) NOT NULL DEFAULT 'Pending',
  `remarks` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tblrequest_summary`
--

INSERT INTO `tblrequest_summary` (`requestsummaryid`, `requester`, `supervisor`, `requestdate`, `purpose`, `xstatus`, `remarks`, `created_at`, `updated_at`) VALUES
(19, 'ROCJ1010', 'JJCD0104', '2025-05-29', 'Office Supplies', 'Pending', NULL, '2025-05-28 19:52:37', '2025-05-28 19:52:37');

-- --------------------------------------------------------

--
-- Table structure for table `tblris`
--

CREATE TABLE `tblris` (
  `risid` bigint(20) UNSIGNED NOT NULL,
  `empNumber` varchar(255) DEFAULT NULL,
  `stock_no` varchar(45) NOT NULL,
  `quantity` double(15,2) NOT NULL,
  `month` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblris`
--

INSERT INTO `tblris` (`risid`, `empNumber`, `stock_no`, `quantity`, `month`, `year`, `created_at`, `updated_at`) VALUES
(9, 'JAHB0523', '110-03A', 3.00, 5, 2025, NULL, NULL),
(10, 'JAHB0523', '110-13A', 34.00, 5, 2025, NULL, NULL),
(11, 'LGM0102', '110-33', 20.00, 5, 2025, NULL, NULL),
(12, 'JAHB0523', '110-13A', 3.00, 5, 2025, NULL, NULL),
(13, 'JAHB0523', '110-13A', 3.00, 5, 2025, NULL, NULL),
(14, 'JAHB0523', '110-13A', 1.00, 5, 2025, NULL, NULL),
(15, 'DMBJ1221', '110-15D', 20.00, 5, 2025, NULL, NULL),
(16, 'DMBJ1221', '130-01A', 3.00, 5, 2025, NULL, NULL),
(17, 'DMBJ1221', '110-13A', 10.00, 5, 2025, NULL, NULL),
(18, 'JOP0928', '110-10B', 30.00, 5, 2025, NULL, NULL),
(19, 'JJCD0104', '130-01A', 10.00, 5, 2025, NULL, NULL),
(20, 'JJCD0104', '110-13A', 10.00, 5, 2025, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tblstockin`
--

CREATE TABLE `tblstockin` (
  `stockinid` int(11) UNSIGNED NOT NULL,
  `serialnumber` varchar(255) NOT NULL,
  `fundcluster` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tblstockin`
--

INSERT INTO `tblstockin` (`stockinid`, `serialnumber`, `fundcluster`, `created_at`, `updated_at`) VALUES
(20, '2025-03-0003', NULL, '2025-05-22 23:38:27', '2025-05-22 23:38:27'),
(21, '2025-03-0005', NULL, '2025-05-22 23:50:48', '2025-05-22 23:50:48');

-- --------------------------------------------------------

--
-- Table structure for table `tbluom`
--

CREATE TABLE `tbluom` (
  `uomid` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `abbreviation` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbluom`
--

INSERT INTO `tbluom` (`uomid`, `name`, `abbreviation`) VALUES
(1, 'piece', 'pc'),
(2, 'box', 'bx'),
(3, 'can', 'can'),
(4, 'pack', 'pk'),
(5, 'cart', 'crt'),
(6, 'bottle', 'btl'),
(7, 'roll', 'rl');

-- --------------------------------------------------------

--
-- Table structure for table `tbluseraccounts`
--

CREATE TABLE `tbluseraccounts` (
  `useraccountid` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(45) DEFAULT 'user',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbluseraccounts`
--

INSERT INTO `tbluseraccounts` (`useraccountid`, `username`, `password`, `role`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$12$Jt3w5aJDtRrMx9aSFO63eeYir8eUB67T9exC6jj.IvO1lbK2LiHgS', 'admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `tblinventory_items`
--
ALTER TABLE `tblinventory_items`
  ADD PRIMARY KEY (`invitemsid`),
  ADD KEY `inv_fk_idx` (`serialnumber`);

--
-- Indexes for table `tblrequest_details`
--
ALTER TABLE `tblrequest_details`
  ADD PRIMARY KEY (`requestdetailsid`),
  ADD KEY `reqdet_reqsum_reqid_fk_idx` (`requestsummaryid`);

--
-- Indexes for table `tblrequest_summary`
--
ALTER TABLE `tblrequest_summary`
  ADD PRIMARY KEY (`requestsummaryid`);

--
-- Indexes for table `tblris`
--
ALTER TABLE `tblris`
  ADD PRIMARY KEY (`risid`);

--
-- Indexes for table `tblstockin`
--
ALTER TABLE `tblstockin`
  ADD PRIMARY KEY (`stockinid`),
  ADD UNIQUE KEY `tblstockin_serialnumber_unique` (`serialnumber`);

--
-- Indexes for table `tbluom`
--
ALTER TABLE `tbluom`
  ADD PRIMARY KEY (`uomid`);

--
-- Indexes for table `tbluseraccounts`
--
ALTER TABLE `tbluseraccounts`
  ADD PRIMARY KEY (`useraccountid`),
  ADD UNIQUE KEY `tbluseraccounts_username_unique` (`username`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tblinventory_items`
--
ALTER TABLE `tblinventory_items`
  MODIFY `invitemsid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2626;

--
-- AUTO_INCREMENT for table `tblrequest_details`
--
ALTER TABLE `tblrequest_details`
  MODIFY `requestdetailsid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tblrequest_summary`
--
ALTER TABLE `tblrequest_summary`
  MODIFY `requestsummaryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `tblris`
--
ALTER TABLE `tblris`
  MODIFY `risid` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tblstockin`
--
ALTER TABLE `tblstockin`
  MODIFY `stockinid` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbluom`
--
ALTER TABLE `tbluom`
  MODIFY `uomid` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbluseraccounts`
--
ALTER TABLE `tbluseraccounts`
  MODIFY `useraccountid` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblinventory_items`
--
ALTER TABLE `tblinventory_items`
  ADD CONSTRAINT `inv_fk` FOREIGN KEY (`serialnumber`) REFERENCES `tblstockin` (`serialnumber`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tblrequest_details`
--
ALTER TABLE `tblrequest_details`
  ADD CONSTRAINT `reqdet_reqsum_reqid_fk` FOREIGN KEY (`requestsummaryid`) REFERENCES `tblrequest_summary` (`requestsummaryid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
