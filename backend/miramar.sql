-- Crear la base de datos
DROP DATABASE IF EXISTS `miramar`;
CREATE DATABASE `miramar`;

-- Usar la base de datos creada
USE `miramar`;

-- Crear la tabla 'hotel'
CREATE TABLE hotel (
    id_hotel VARCHAR(255) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL UNIQUE,
    direccion VARCHAR(255) NOT NULL,
    ciudad VARCHAR(100) NOT NULL,
    telefono VARCHAR(15)
);

-- Crear la tabla 'habitacion'
CREATE TABLE habitacion (
    id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
    numero INT NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    id_hotel VARCHAR(255),
    nombre_hotel VARCHAR(255),
    disponible BOOLEAN,
    FOREIGN KEY (id_hotel) REFERENCES hotel(id_hotel) ON DELETE CASCADE,
    FOREIGN KEY (nombre_hotel) REFERENCES hotel(nombre) ON DELETE CASCADE
);

-- Crear la tabla 'usuario'
CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullName VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

-- Crear la tabla 'reserva'
CREATE TABLE reserva (
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_habitacion INT,
    fecha_entrada DATE NOT NULL,
    fecha_salida DATE NOT NULL,
    FOREIGN KEY (id_habitacion) REFERENCES habitacion(id_habitacion) ON DELETE CASCADE
);


ALTER TABLE reserva ADD COLUMN nombre_hotel VARCHAR(255);

ALTER TABLE habitacion DROP FOREIGN KEY habitacion_ibfk_2; -- Quita la FK si existe
ALTER TABLE habitacion DROP COLUMN nombre_hotel;
ALTER TABLE habitacion ADD COLUMN nombre_hotel VARCHAR(255) AFTER id_hotel;
ALTER TABLE habitacion ADD CONSTRAINT habitacion_ibfk_2 FOREIGN KEY (nombre_hotel) REFERENCES hotel(nombre) ON DELETE CASCADE;

-- Insertar datos de prueba en la tabla 'hotel'
INSERT INTO hotel (id_hotel, nombre, direccion, ciudad, telefono) VALUES
('CDZ', 'Hotel Gran Roca', '123 Sunset Blvd', 'Cadiz', '555-1234'),
('MLG', 'Hotel Mediterraneo', '456 Spooky Ln', 'Malaga', '555-5678'),
('VLC', 'Hotel Paraiso', '456 Rust St', 'Valencia', '555-7541');

-- Insertar datos de prueba en la tabla 'habitacion'
INSERT INTO habitacion (numero, tipo, precio, id_hotel, nombre_hotel, disponible) VALUES
(101, 'Individual', 100.00, 'CDZ', 'Hotel Gran Roca', true),
(102, 'Doble', 150.00, 'CDZ', 'Hotel Gran Roca', false),
(201, 'Suite', 250.00, 'MLG', 'Hotel Mediterraneo', false),
(303, 'Individual', 100.00, 'MLG', 'Hotel Mediterraneo', true),
(202, 'Doble', 150.00, 'MLG', 'Hotel Mediterraneo', true);

-- Insertar datos de prueba en la tabla 'usuario'
INSERT INTO usuario (fullName, email, password) VALUES
('pepe11', 'pepemail@jota.com', 'abc123'),
('luis_gomez', 'luisito@gol' ,  'opo3');

-- Insertar datos de prueba en la tabla 'reserva'
INSERT INTO reserva (id_habitacion, fecha_entrada, fecha_salida, nombre_hotel) VALUES
(2, '2024-06-01', '2024-06-07', 'Hotel Gran Roca'),
(3, '2024-07-01', '2024-07-10', 'Hotel Mediterraneo');

UPDATE `usuario` SET `password` = PASSWORD('abc123') WHERE id = 1;
UPDATE `usuario` SET `password` = PASSWORD('opo3') WHERE id = 2;