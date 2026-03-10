-- ╔══════════════════════════════════════════════════════════════╗
-- ║           EduLearn — Schéma MySQL complet                   ║
-- ║           Plateforme E-Learning GLSID                       ║
-- ╚══════════════════════════════════════════════════════════════╝

-- Créer et utiliser la base
CREATE DATABASE IF NOT EXISTS elearning_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE elearning_db;

-- ─── TABLE : filieres ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS filieres (
  id        BIGINT AUTO_INCREMENT PRIMARY KEY,
  sigle     VARCHAR(20)  NOT NULL UNIQUE COMMENT 'ex: GLSID, GINF',
  intitule  VARCHAR(255) NOT NULL COMMENT 'Nom complet de la filière'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE : users ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          BIGINT AUTO_INCREMENT PRIMARY KEY,
  prenom      VARCHAR(100) NOT NULL,
  nom         VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255) NOT NULL COMMENT 'Hash BCrypt',
  role        ENUM('STUDENT','PROFESSOR','ADMIN') NOT NULL DEFAULT 'STUDENT',
  filiere_id  BIGINT NULL,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (filiere_id) REFERENCES filieres(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE : modules ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS modules (
  id            BIGINT AUTO_INCREMENT PRIMARY KEY,
  nom           VARCHAR(200) NOT NULL,
  code          VARCHAR(20)  NOT NULL UNIQUE COMMENT 'ex: INF301',
  description   TEXT,
  filiere_id    BIGINT NOT NULL,
  professeur_id BIGINT NULL,
  FOREIGN KEY (filiere_id)    REFERENCES filieres(id) ON DELETE CASCADE,
  FOREIGN KEY (professeur_id) REFERENCES users(id)    ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE : documents ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS documents (
  id           BIGINT AUTO_INCREMENT PRIMARY KEY,
  nom          VARCHAR(255) NOT NULL COMMENT 'Nom affiché',
  nom_fichier  VARCHAR(255) NOT NULL COMMENT 'Nom du fichier sur disque',
  type         VARCHAR(20)  COMMENT 'PDF, DOCX, PPTX…',
  taille       BIGINT       COMMENT 'Taille en octets',
  module_id    BIGINT NOT NULL,
  uploaded_by  BIGINT NULL,
  uploaded_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id)   REFERENCES modules(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)   ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE : annonces ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS annonces (
  id         BIGINT AUTO_INCREMENT PRIMARY KEY,
  titre      VARCHAR(255) NOT NULL,
  contenu    TEXT         NOT NULL,
  is_urgent  BOOLEAN      NOT NULL DEFAULT FALSE,
  module_id  BIGINT NULL COMMENT 'NULL = annonce générale',
  auteur_id  BIGINT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE SET NULL,
  FOREIGN KEY (auteur_id) REFERENCES users(id)   ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ════════════════════════════════════════════════════════════════
--  DONNÉES DE TEST (Seed Data)
-- ════════════════════════════════════════════════════════════════

-- Filières
INSERT INTO filieres (sigle, intitule) VALUES
  ('GLSID', 'Génie Logiciel et Systèmes Informatiques Distribués'),
  ('GINF',  'Génie Informatique'),
  ('GRT',   'Génie des Réseaux et Télécommunications'),
  ('GESI',  'Génie des Systèmes Industriels');

-- Utilisateurs (mots de passe = "demo123" hashés avec BCrypt)
-- Hash de "demo123" : $2a$10$qeS0HEh7urweMojsnwNAR.Ows1q5Qp8WXFrLhGYvHGAhsOlX.mku
INSERT INTO users (prenom, nom, email, mot_de_passe, role, filiere_id) VALUES
  ('Super',  'Admin',  'admin@edu.ma',    '$2a$10$qeS0HEh7urweMojsnwNAR.Ows1q5Qp8WXFrLhGYvHGAhsOlX.mku', 'ADMIN',     NULL),
  ('Hassan', 'Alami',  'h.alami@edu.ma',  '$2a$10$qeS0HEh7urweMojsnwNAR.Ows1q5Qp8WXFrLhGYvHGAhsOlX.mku', 'PROFESSOR', NULL),
  ('Fatima', 'Benali', 'f.benali@edu.ma', '$2a$10$qeS0HEh7urweMojsnwNAR.Ows1q5Qp8WXFrLhGYvHGAhsOlX.mku', 'PROFESSOR', NULL),
  ('Sara',   'Chakir', 'sara@edu.ma',     '$2a$10$qeS0HEh7urweMojsnwNAR.Ows1q5Qp8WXFrLhGYvHGAhsOlX.mku', 'STUDENT',   1),
  ('Youssef','Driss',  'youssef@edu.ma',  '$2a$10$qeS0HEh7urweMojsnwNAR.Ows1q5Qp8WXFrLhGYvHGAhsOlX.mku', 'STUDENT',   1);

-- Modules
INSERT INTO modules (nom, code, description, filiere_id, professeur_id) VALUES
  ('Algorithmique Avancée',       'INF301', 'Graphes, programmation dynamique, NP-complétude', 1, 2),
  ('Bases de Données',            'INF302', 'SQL avancé, optimisation, NoSQL',                 1, 3),
  ('Développement Web',           'INF303', 'React, Spring Boot, REST APIs',                   1, 2),
  ('Systèmes d''Exploitation',    'INF304', 'Processus, threads, mémoire virtuelle',            1, 3),
  ('Réseaux Informatiques',       'RT201',  'TCP/IP, routage, sécurité réseau',                 3, 2);

-- Annonces
INSERT INTO annonces (titre, contenu, is_urgent, module_id, auteur_id) VALUES
  ('Bienvenue S5 2024-2025', 'Bienvenue à tous les étudiants ! Consultez régulièrement cette plateforme.', FALSE, NULL, 1),
  ('Report TP du 20 mars',   'Le TP de Bases de Données est reporté au 25 mars en salle 204.',             TRUE,  2,    3),
  ('Nouveau TD disponible',   'Le TD Chapitre 5 sur les graphes est maintenant disponible.',                FALSE, 1,    2);
