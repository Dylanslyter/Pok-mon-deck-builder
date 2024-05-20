CREATE DATABASE pokemon_db;
USE pokemon_db;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,  
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `favorites` (
  `userId` int NOT NULL,
  `pokemonId` int NOT NULL,
  `pokemonName` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL, 
  PRIMARY KEY (`userId`,`pokemonId`),
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL, 
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- -- Create the deck table
--  CREATE TABLE `deck` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `userId` int NOT NULL,
--   `name` varchar(255) NOT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL, 
--   PRIMARY KEY (id),
--   CONSTRAINT deck_ibfk_1 FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- -- Create the deck_items table
-- CREATE TABLE `deck_items` (
--   `id` int NOT NULL AUTO_INCREMENT,
--   `deckId` int NOT NULL,
--   `pokemonName` varchar(255) NOT NULL,
--   `createdAt` datetime NOT NULL,
--   `updatedAt` datetime NOT NULL, 
--   PRIMARY KEY (id),
--   CONSTRAINT deck_items_ibfk_1 FOREIGN KEY (deckId) REFERENCES deck (id) ON DELETE CASCADE ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
