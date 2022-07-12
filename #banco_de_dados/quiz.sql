-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 19-Jan-2021 às 23:09
-- Versão do servidor: 10.1.32-MariaDB
-- PHP Version: 7.2.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quiz`
--
CREATE DATABASE IF NOT EXISTS `quiz` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `quiz`;

CREATE TABLE `configuracoes` (
  `id` int(11) NOT NULL,
  `de` int(11) NOT NULL,
  `inc_nivel_pontos` text NOT NULL,
  `som_ao_iniciar` text NOT NULL,
  `som_durante_jogo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `configuracoes` (`id`, `de`, `inc_nivel_pontos`, `som_ao_iniciar`, `som_durante_jogo`) VALUES
(1, 0, '50 100 200', 'som_no_inicio.mp3', 'som_durante_o_jogo.mp3'),
(8, 10, '', 'som_10.mp3', ''),
(9, 11, '', '', ''),
(10, 12, '', 'som_12.mp3', ''),
(11, 13, '', '', '');


CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL,
  `pergunta` text NOT NULL,
  `A` text NOT NULL,
  `B` text NOT NULL,
  `C` text NOT NULL,
  `D` text NOT NULL,
  `resposta_certa` text NOT NULL,
  `nivel` int(11) NOT NULL,
  `origem` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `perguntas`
--

INSERT INTO `perguntas` (`id`, `pergunta`, `A`, `B`, `C`, `D`, `resposta_certa`, `nivel`, `origem`) VALUES
(13, 'Como se chama, nos humanos, a bolsa onde se acumula a urina?', 'Rins', 'Vesicula', 'Utera', 'Bexiga(certa)', 'D', 1, '1'),
(14, 'Quantos dias tem um ano Bissexto?', '354', '366(certa)', '456', '365', 'B', 1, '1'),
(15, 'Quem foi Neil Armstrong?', 'Astronauta(certa)', 'Bombeiro', 'Tenista', 'Camionista', 'A', 1, '1'),
(16, 'Que nome se dá à agulha que indica as horas num relógio', 'Indicador', 'Seta', 'Alfinete', 'Ponteiro(certa)', 'D', 1, '1'),
(17, 'Como se chama a filha mais velha da série \"Os simpsons\"?', 'Marge', 'Maggie', 'Lisa(certa)', 'Bart', 'C', 1, '1'),
(18, 'Qual dos seguintes representa um operador lógico?', 'Subtração', 'Soma', 'Divisão', 'XOR(certa)', 'D', 1, '1'),
(19, 'Que nome se dá ao estudo do sistema imunitário?', 'Dermatologia', 'Hematologia', 'Anatomia', 'Imunologia(certa)', 'D', 1, '1'),
(20, 'Que nome se dá a um ângulo de 90 graus?', 'Reto(certa)', 'Obtuso', 'Raso', 'Agudo', 'A', 1, '1'),
(21, 'Qual é a sétima arte?', 'Teatro', 'Pintura', 'Cinema(certa)', 'Dança', 'C', 1, '3'),
(22, 'Qual dos seguintes não faz fronteira com Brasil?', 'Bolívia', 'Peru', 'Paraguai', 'Chile(certa)', 'D', 1, '3'),
(23, 'A que cantora pertence o álbum \"Good girl gone bad\"?', 'Jennifer Lopes', 'Amy Winehouse', 'Lady Gaga', 'Rihana(certa)', 'D', 2, '3'),
(24, 'Em que país se realizou o EURO 2004?', 'Espanha', 'Portugal(certa)', 'Turquia', 'Holanda', 'B', 2, '3'),
(25, 'Qual é a nacionalidade do estilista Giorgio Armani?', 'Alemão', 'Francês', 'Italiano(certa)', 'Português', 'C', 2, '3'),
(26, 'Qual das seguintes músicas pertence aos \"Linkin park\"?', 'Master of Puppets', 'Last Resort', 'Burn it Down(certa)', 'Killing in the Name', 'C', 2, '2'),
(27, 'Qual dos seguintes não é um web Browser?', 'Opera', 'Firefox', 'Thunderbird(certa)', 'Safari', 'C', 2, '3'),
(28, 'Quem foi o vocalista dos \"Nirvana?\"', 'Axl Rose', 'Kurt Cobain(certa)', 'Dave Grohl', 'Frank Sinatra', 'B', 2, '2'),
(29, 'A que cantora pertence a música \"Skyscraper\"?', 'Miley Cyrus', 'Demi Lovato(certa)', 'Adele', 'Katy Perry', 'B', 2, '3'),
(30, 'A estação das chuvas curtas em Angola vai de...', 'Fevereiro à Abril(certa)', 'Dezembro à Março', 'Janeiro à Junho', 'Agosto à Janeiro', 'A', 2, '3'),
(31, 'De que província é primeira Miss Angola?', 'Bié', 'Luanda', 'Benguela', 'Cabinda(certa)', 'D', 2, '3'),
(32, 'Qual dos países não faz fronteira com Angola?', 'Zâmbia', 'Namíbia', 'Congo', 'África do Sul(certa)', 'D', 2, '3'),
(33, 'O atentado de 11 de setembro aconteceu em que ano?', '2001(certa)', '2008', '1994', '1901', 'A', 3, '1'),
(34, 'Em que país se iniciou a revolução industrial?', 'Estados Unidos da Ámerica', 'Alemanha', 'Portugal', 'Inglaterra(certa)', 'D', 3, '1'),
(35, 'Quem criou este aplicativo?', 'Afonso Dumbo', 'Isaac Glória', 'Francisco Fetapi(certa)', 'Francisco dos Santos', 'C', 3, '1');



CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` text NOT NULL,
  `senha` text NOT NULL,
  `pontos` int(11) NOT NULL,
  `critica` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `usuario` (`id`, `nome`, `senha`, `pontos`, `critica`) VALUES
(10, 'Francisco Fetapi', '      ', 32880, 'Gostei da aplicação, tem uma jogabilidade ótima!'),
(11, 'Carlos Mateus', '      ', 1200, 'muito bom, só achei que devia ter uma forma de demonstrar o carregamento do dados nos modais, tipo uma barra de progresso ou aqueles circulos que ficam girando enquanto os dados são carregados, além disso, está ótimo!'),
(12, 'Maria Eduardo', '      ', 13550, 'Legal, gostei do fato de eu puder escolher qual musica quero para a abertura!'),
(13, 'Usuario Novo', '      ', 450, '');

ALTER TABLE `configuracoes`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);



ALTER TABLE `configuracoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;


ALTER TABLE `perguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;


ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

