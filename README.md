# 🎓 EduLearn — Plateforme E-Learning GLSID

> Plateforme d'apprentissage en ligne complète avec gestion des cours, modules, filières, annonces et documents pédagogiques.

**Stack :** React 18 · Spring Boot 3 · MySQL 8 · JWT Auth

---

## 📁 Structure du projet

```
elearning-platform/
├── frontend/          ← React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/    (Sidebar, Layout, ProtectedRoute)
│   │   ├── context/       (AuthContext)
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── student/StudentDashboard.jsx
│   │   │   ├── professor/ProfessorDashboard.jsx
│   │   │   └── admin/AdminDashboard.jsx
│   │   ├── services/api.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
├── backend/           ← Spring Boot 3 + MySQL
│   ├── src/main/java/com/elearning/
│   │   ├── model/         (User, Filiere, Module, Document, Annonce)
│   │   ├── repository/    (JPA Repositories)
│   │   ├── service/       (AuthService)
│   │   ├── controller/    (Auth, Filiere, Module, Annonce, Document)
│   │   ├── security/      (JwtUtil, JwtAuthFilter)
│   │   ├── config/        (SecurityConfig)
│   │   └── dto/           (AuthRequest, AuthResponse, RegisterRequest)
│   ├── src/main/resources/application.properties
│   └── pom.xml
│
└── database/
    └── schema.sql     ← Toutes les tables + données de test
```

---

## 🚀 ÉTAPE 1 — Mettre le projet sur GitHub

### 1.1 Créer un compte GitHub
→ Aller sur [github.com](https://github.com) et créer un compte gratuit.

### 1.2 Installer Git sur votre PC
- **Windows** : Télécharger sur [git-scm.com](https://git-scm.com/download/win)
- **Mac** : Dans le terminal : `brew install git`
- **Linux** : `sudo apt install git`

### 1.3 Configurer Git (une seule fois)
```bash
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"
```

### 1.4 Créer le dépôt GitHub
1. Sur GitHub → cliquer **"New repository"**
2. Nom : `elearning-platform`
3. Description : `Plateforme E-Learning GLSID – React + Spring Boot + MySQL`
4. Choisir **Public**
5. **Ne pas** cocher "Initialize with README"
6. Cliquer **"Create repository"**

### 1.5 Pousser le code
Dans votre terminal, depuis le dossier `elearning-platform/` :

```bash
git init
git add .
git commit -m "🎓 Initial commit – EduLearn Platform"
git branch -M main
git remote add origin https://github.com/VOTRE-USERNAME/elearning-platform.git
git push -u origin main
```

---

## 💻 ÉTAPE 2 — Installer les prérequis

| Outil | Version | Téléchargement |
|-------|---------|---------------|
| Node.js | 20+ | [nodejs.org](https://nodejs.org) |
| Java JDK | 17+ | [adoptium.net](https://adoptium.net) |
| Maven | 3.9+ | [maven.apache.org](https://maven.apache.org) |
| MySQL | 8.0+ | [mysql.com](https://dev.mysql.com/downloads/) |

---

## 🗄️ ÉTAPE 3 — Configurer la base de données

### 3.1 Ouvrir MySQL Workbench ou le terminal MySQL :
```bash
mysql -u root -p
```

### 3.2 Exécuter le schéma :
```bash
mysql -u root -p < database/schema.sql
```

Ou copier-coller le contenu de `schema.sql` dans MySQL Workbench.

### 3.3 Vérifier :
```sql
USE elearning_db;
SHOW TABLES;
SELECT email, role FROM users;
```

---

## ⚙️ ÉTAPE 4 — Lancer le Backend (Spring Boot)

### 4.1 Configurer la connexion MySQL
Ouvrir `backend/src/main/resources/application.properties` :

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/elearning_db
spring.datasource.username=root
spring.datasource.password=VOTRE_MOT_DE_PASSE_MYSQL
```

### 4.2 Démarrer le backend
```bash
cd backend
mvn spring-boot:run
```

✅ Le backend tourne sur **http://localhost:8080**

---

## 🎨 ÉTAPE 5 — Lancer le Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

✅ Le frontend tourne sur **http://localhost:3000**

---

## 🔑 Comptes de démonstration

| Rôle | Email | Mot de passe |
|------|-------|-------------|
| 👑 Administrateur | admin@edu.ma | demo123 |
| 👨‍🏫 Professeur | h.alami@edu.ma | demo123 |
| 🎓 Étudiant | sara@edu.ma | demo123 |

> **Note** : Le frontend fonctionne en mode démo sans backend. Cliquez sur les boutons "Démo rapide" dans la page de login.

---

## 🌐 API Endpoints

| Méthode | Endpoint | Accès | Description |
|---------|----------|-------|-------------|
| POST | `/api/auth/login` | Public | Connexion |
| POST | `/api/auth/register` | Public | Inscription |
| GET | `/api/filieres` | Authentifié | Liste des filières |
| POST | `/api/filieres` | Admin | Créer filière |
| GET | `/api/modules` | Authentifié | Tous les modules |
| GET | `/api/modules/filiere/{id}` | Authentifié | Modules par filière |
| GET | `/api/modules/professor/{id}` | Authentifié | Modules d'un prof |
| POST | `/api/modules` | Admin/Prof | Créer module |
| GET | `/api/annonces` | Authentifié | Toutes les annonces |
| POST | `/api/annonces` | Prof/Admin | Créer annonce |
| GET | `/api/documents/module/{id}` | Authentifié | Docs d'un module |
| POST | `/api/documents/upload` | Prof/Admin | Uploader document |
| GET | `/api/documents/{id}/download` | Authentifié | Télécharger document |
| GET | `/api/users/students` | Admin | Liste étudiants |
| GET | `/api/users/professors` | Admin | Liste professeurs |

---

## 🏗️ Pour aller plus loin

- [ ] Ajouter la gestion des notes / évaluations
- [ ] Système de notifications en temps réel (WebSocket)
- [ ] Profil utilisateur avec photo
- [ ] Page inscription étudiant
- [ ] Déploiement sur Railway / Render (gratuit)

---

## 📸 Technologies utilisées

- **Frontend** : React 18, React Router 6, Tailwind CSS, Lucide React, Framer Motion
- **Backend** : Spring Boot 3, Spring Security, Spring Data JPA, JWT
- **Base de données** : MySQL 8 avec Hibernate ORM
- **Architecture** : Monolithique REST API + SPA

---

*Projet académique — GLSID — 2024*
