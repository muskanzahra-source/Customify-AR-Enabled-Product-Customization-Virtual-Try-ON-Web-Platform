
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- Database: `customizer_db`


-- Table structure for table `feedback`


CREATE TABLE `feedback` (
  `feedback_col` varchar(255) DEFAULT NULL,
  `sender_col` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- Dumping data for table `feedback`


INSERT INTO `feedback` (`feedback_col`, `sender_col`) VALUES
("hi")

-- Table structure for table `orders`


CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `order_id` varchar(50) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `address` text NOT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `product_images` text DEFAULT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `orders` (`id`, `order_id`, `full_name`, `email`, `phone`, `postal_code`, `address`, `payment_method`, `total_price`, `product_images`, `order_date`) VALUES("")
-- Table structure for table `userlogin`

CREATE TABLE `userlogin` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `userlogin` (`id`, `full_name`, `email`, `password`, `created_at`) VALUES ("")

