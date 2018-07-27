-- phpMyAdmin SQL Dump
-- version 4.8.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09-Jun-2018 às 05:49
-- Versão do servidor: 10.1.31-MariaDB
-- PHP Version: 7.0.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cadastrados`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cadastrados`
--

CREATE TABLE `cadastrados` (
  `id` int(11) NOT NULL,
  `nome` varchar(90) NOT NULL,
  `email` varchar(70) NOT NULL,
  `cpf` varchar(11) NOT NULL DEFAULT '0',
  `dtnasc` date NOT NULL,
  `telefone` varchar(10) NOT NULL DEFAULT '0',
  `celular` varchar(11) NOT NULL DEFAULT '0',
  `sexo` tinytext NOT NULL,
  `password` varchar(25) NOT NULL,
  `cep` int(8) NOT NULL,
  `rua` text NOT NULL,
  `numero` int(10) NOT NULL,
  `bairro` text NOT NULL,
  `cidade` text NOT NULL,
  `estado` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `cadastrados`
--

INSERT INTO `cadastrados` (`id`, `nome`, `email`, `cpf`, `dtnasc`, `telefone`, `celular`, `sexo`, `password`, `cep`, `rua`, `numero`, `bairro`, `cidade`, `estado`) VALUES
(8, 'Bruno Coppi da Silva', 'brakiel40@gmail.com', '10205847935', '2000-10-11', '47 3323-87', '47 99691-38', 'masculino', 'bruno111000', 89051400, 'Rua Domingos Manoel de Borba', 42, 'Nova EsperanÃ§a', 'Blumenau', 'SC'),
(9, 'Vera LÃºcia Coppi da Silva', 'veralucia@hotmail.com', '99876543211', '1980-12-14', '47 3323-87', '47 95493-21', 'feminino', 'veralucia', 89051320, 'Rua Olga Fumagali', 78, 'Nova EsperanÃ§a', 'Blumenau', 'SC'),
(10, 'Thiago Coppi', 'coppithiago@gmail.com', '12312312312', '1997-04-24', '47 3323-87', '4791594959', 'masculino', '1234321', 89251400, 'Rua BarÃ£o do Rio Branco', 42, 'Centro', 'JaraguÃ¡ do Sul', 'SC'),
(11, 'Rudolfo Alexandre da silva', 'rudolfoalexandre1@gmail.com', '11223344556', '1974-08-10', '47 3323-87', '47 99691-38', 'masculino', '123123123123123123', 89051100, 'Rua Caracas', 33, 'Ponta Aguda', 'Blumenau', 'SC');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cadastrados`
--
ALTER TABLE `cadastrados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cadastrados`
--
ALTER TABLE `cadastrados`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
