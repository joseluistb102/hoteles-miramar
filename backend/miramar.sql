-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-05-2024 a las 20:44:11
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `miramar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitacion`
--

CREATE TABLE `habitacion` (
  `id_habitacion` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `id_hotel` varchar(255) DEFAULT NULL,
  `nombre_hotel` varchar(255) DEFAULT NULL,
  `disponible` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitacion`
--

INSERT INTO `habitacion` (`id_habitacion`, `numero`, `tipo`, `precio`, `id_hotel`, `nombre_hotel`, `disponible`) VALUES
(1, 100, 'Individual', 100.00, 'CDZ', 'Hotel Gran Roca', 1),
(2, 101, 'Doble', 100.00, 'CDZ', 'Hotel Gran Roca', 0),
(3, 102, 'Suite', 250.00, 'CDZ', 'Hotel Gran Roca', 1),
(4, 200, 'Doble', 150.00, 'CDZ', 'Hotel Gran Roca', 0),
(5, 201, 'Doble', 150.00, 'CDZ', 'Hotel Gran Roca', 1),
(6, 202, 'Individual', 100.00, 'CDZ', 'Hotel Gran Roca', 0),
(7, 203, 'Suite', 250.00, 'CDZ', 'Hotel Gran Roca', 1),
(8, 100, 'Individual', 100.00, 'MLG', 'Hotel Mediterraneo', 0),
(9, 101, 'Doble', 150.00, 'MLG', 'Hotel Mediterraneo', 1),
(10, 102, 'Doble', 150.00, 'MLG', 'Hotel Mediterraneo', 0),
(11, 200, 'Suite', 250.00, 'MLG', 'Hotel Mediterraneo', 1),
(12, 201, 'Suite', 250.00, 'MLG', 'Hotel Mediterraneo', 0),
(13, 202, 'Individual', 100.00, 'MLG', 'Hotel Mediterraneo', 1),
(14, 203, 'Doble', 150.00, 'MLG', 'Hotel Mediterraneo', 1),
(15, 100, 'Individual', 100.00, 'VLC', 'Hotel Paraíso', 1),
(16, 101, 'Doble', 150.00, 'VLC', 'Hotel Paraíso', 1),
(17, 102, 'Doble', 150.00, 'VLC', 'Hotel Paraíso', 1),
(18, 200, 'Individual', 100.00, 'VLC', 'Hotel Paraíso', 1),
(19, 201, 'Individual', 100.00, 'VLC', 'Hotel Paraíso', 0),
(20, 202, 'Individual', 100.00, 'VLC', 'Hotel Paraíso', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotel`
--

CREATE TABLE `hotel` (
  `id_hotel` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `ciudad` varchar(100) NOT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `hotel`
--

INSERT INTO `hotel` (`id_hotel`, `nombre`, `direccion`, `ciudad`, `telefono`) VALUES
('CDZ', 'Hotel Gran Roca', 'C/ Alta 7', 'Cadiz', '555-1234'),
('MLG', 'Hotel Mediterraneo', 'C/ Corta 11', 'Malaga', '555-5678'),
('VLC', 'Hotel Paraiso', 'Avenida del Monte', 'Valencia', '555-7541');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reserva`
--

CREATE TABLE `reserva` (
  `id_reserva` int(11) NOT NULL,
  `id_habitacion` int(11) DEFAULT NULL,
  `fecha_entrada` date NOT NULL,
  `fecha_salida` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reserva`
--

INSERT INTO `reserva` (`id_reserva`, `id_habitacion`, `fecha_entrada`, `fecha_salida`) VALUES
(1, 2, '2024-06-01', '2024-06-07'),
(2, 4, '2024-08-20', '2024-08-22'),
(3, 6, '2024-08-29', '2024-08-30'),
(4, 8, '2024-09-04', '2024-09-05'),
(5, 10, '2024-09-06', '2024-09-08'),
(6, 12, '2024-10-01', '2024-10-02'),
(7, 19, '2024-12-20', '2024-12-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `fullName`, `email`, `password`) VALUES
(1, 'pepe11', 'pepelinares@mail.com', '*6691484EA6B50DDDE1926A220DA01FA9E575C18A'),
(2, 'luis_gomez', 'luis20@mail', '*438876950E591B3EF10D8BD3A72CA30A32B6BEA6');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD PRIMARY KEY (`id_habitacion`),
  ADD KEY `id_hotel` (`id_hotel`),
  ADD KEY `nombre_hotel` (`nombre_hotel`);

--
-- Indices de la tabla `hotel`
--
ALTER TABLE `hotel`
  ADD PRIMARY KEY (`id_hotel`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_habitacion` (`id_habitacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `habitacion`
--
ALTER TABLE `habitacion`
  MODIFY `id_habitacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `reserva`
--
ALTER TABLE `reserva`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `habitacion`
--
ALTER TABLE `habitacion`
  ADD CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`id_hotel`) REFERENCES `hotel` (`id_hotel`) ON DELETE CASCADE,
  ADD CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`nombre_hotel`) REFERENCES `hotel` (`nombre`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reserva`
--
ALTER TABLE `reserva`
  ADD CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_habitacion`) REFERENCES `habitacion` (`id_habitacion`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;