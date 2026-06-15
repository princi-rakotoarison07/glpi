# GLPI 11.XX — Guide de démarrage

## Prérequis

| Logiciel | Version requise |
|----------|----------------|
| XAMPP | 8.x (Apache + MySQL/MariaDB + PHP 8.3+) |
| MariaDB | 10.6+ |
| Node.js | 18+ |
| npm | 9+ |
| Git | 2.x |

## 1. Cloner le projet

```bash
cd C:\xampp\htdocs
git clone <URL_DU_REPO> glpi
```

Le projet doit se trouver dans `C:\xampp\htdocs\glpi`.

## 2. Configuration de XAMPP

### Apache

1. Ouvrir **XAMPP Control Panel**
2. Démarrer le module **Apache**
3. Vérifier que `http://localhost` fonctionne

### MySQL / MariaDB

1. Démarrer le module **MySQL** dans XAMPP Control Panel
2. Vérifier la version MariaDB : **10.6+** est requise
3. Accéder à phpMyAdmin : `http://localhost/phpmyadmin`

## 3. Création de la base de données

### Via phpMyAdmin

1. Ouvrir `http://localhost/phpmyadmin`
2. Cliquer sur **Nouvelle base de données**
3. Nom : `glpi_db`
4. Interclassement : `utf8mb4_unicode_ci`
5. Cliquer sur **Créer**
6. Sélectionner la base `glpi_db`
7. Onglet **Importer** → Choisir le fichier `docs/database/glpi_db_v2.sql`
8. Cliquer sur **Exécuter**

### Via terminal MySQL

```bash
mysql -u root -p
```

```sql
CREATE DATABASE glpi_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE glpi_db;
SOURCE C:/xampp/htdocs/glpi/docs/database/glpi_db_v2.sql;
```

## 4. Installation et accès à GLPI

1. Accéder à `http://localhost/glpi` dans le navigateur
2. Si c'est la première installation, suivre l'assistant d'installation :
   - Langue : **Français**
   - Serveur MySQL : `localhost`
   - Utilisateur : `root`
   - Mot de passe : *(vide par défaut sur XAMPP)*
   - Base de données : `glpi_db` (sélectionner la base existante)
3. Identifiants par défaut après installation :

| Profil | Login | Mot de passe |
|--------|-------|-------------|
| Super-Admin | `glpi` | `glpi` |
| Admin | `tech` | `tech` |
| Normal | `normal` | `normal` |
| Post-only | `post-only` | `postonly` |

### Configuration de l'API GLPI

1. Aller dans **Configuration → Générale → API**
2. Activer l'**API REST**
3. Créer un **Client API** (App-Token) avec accès complet
4. Générer un **User Token** pour l'utilisateur souhaité (dans son profil)
5. Noter les tokens pour la configuration du frontend (étape 5)

## 5. Démarrage du Frontend (React App)

### Installation

```bash
cd C:\xampp\htdocs\glpi\react-app
npm install
```

### Configuration

Créer ou modifier le fichier `.env` dans `react-app/` :

```env
VITE_API_URL=/glpi-api
VITE_APP_TOKEN=<votre_app_token>
VITE_USER_TOKEN=<votre_user_token>
VITE_SINGLE_AUTH_CODE=glpi123
VITE_BACKEND_API_URL=http://localhost:3001/api
```

> Remplacer `<votre_app_token>` et `<votre_user_token>` par les tokens générés à l'étape 4.

### Démarrage

```bash
npm run dev
```

L'application est accessible sur : `http://localhost:5173`

## 6. Démarrage du Backend (Express + SQLite)

### Installation

```bash
cd C:\xampp\htdocs\glpi\express-back
npm install
```

### Configuration

Le fichier `.env` dans `express-back/` :

```env
PORT=3001
DB_PATH=./database/glpi.db
```

### Initialisation de la base SQLite

```bash
node database/init.js
```

Cette commande crée et initialise les tables SQLite : `settings`, `langue`, `settings_langue`, `couts`, `couts_independant`.

### Démarrage

```bash
npm run dev
```

Le serveur Express est accessible sur : `http://localhost:3001`

Test rapide : `http://localhost:3001/ping` → `{ "message": "✅ Express OK" }`

## 7. Résumé des commandes de démarrage

```bash
# Terminal 1 — Frontend React (Vite)
cd C:\xampp\htdocs\glpi\react-app
npm run dev

# Terminal 2 — Backend Express (SQLite)
cd C:\xampp\htdocs\glpi\express-back
npm run dev
```

> XAMPP (Apache + MySQL) doit être démarré en parallèle.

## Architecture du projet

```
glpi/
├── react-app/             # Frontend React + Vite (port 5173)
│   ├── src/
│   │   ├── components/    # Composants réutilisables (Sidebar, Layout...)
│   │   ├── pages/         # Pages frontoffice et backoffice
│   │   ├── services/      # Services API (GLPI + SQLite)
│   │   ├── config/        # Configuration Axios et types
│   │   ├── routes/        # Routeur principal (AppRouter)
│   │   └── styles/        # Fichiers CSS
│   ├── .env               # Variables d'environnement (tokens, URLs)
│   └── vite.config.js     # Config Vite + proxy GLPI
│
├── express-back/          # Backend Express + SQLite (port 3001)
│   ├── controllers/       # Logique métier (costs, settings, independent-costs)
│   ├── database/          # db.js (connexion) + init.js (schéma)
│   ├── routes/            # index.js (toutes les routes centralisées)
│   ├── server.js          # Point d'entrée Express
│   └── .env               # PORT + DB_PATH
│
├── docs/
│   └── database/
│       └── glpi_db_v2.sql # Dump complet de la base MySQL GLPI
│
└── README.md              # Ce fichier
```

## API Endpoints (Express - port 3001)

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/settings` | Récupérer les paramètres |
| `PUT` | `/api/settings` | Mettre à jour les paramètres |
| `GET` | `/api/costs` | Liste des coûts |
| `POST` | `/api/costs` | Créer un coût |
| `GET` | `/api/costs/ticket/:id` | Coût par ticket |
| `DELETE` | `/api/costs/ticket/:id` | Supprimer le dernier coût |
| `PUT` | `/api/costs/ticket/:id/reouverture` | Mise à jour coût réouverture |
| `GET` | `/api/independent-costs` | Rapport des coûts indépendants |
| `POST` | `/api/independent-costs/close` | Ajouter coûts de fermeture |
| `POST` | `/api/independent-costs/reopen` | Ajouter coûts de réouverture |
| `DELETE` | `/api/independent-costs/ticket/:id` | Annuler le dernier groupe |
