# Documentation de l'Application React (`react-app`)

Ce document présente une cartographie complète et détaillée des routes et pages de l'application React, divisée en deux sections principales : le **BackOffice** (administration du parc, importation, et purge des données) et le **FrontOffice** (interface utilisateur de support helpdesk, suivi Kanban, et inventaire simplifié).

---

## 1. Cartographie Globale des Routes (`AppRouter.jsx`)

Les routes de l'application sont configurées dans `src/routes/AppRouter.jsx`. Les accès sont sécurisés par le composant `<ProtectedRoute />` qui vérifie la présence d'une session utilisateur valide (stockée dans le `sessionStorage`).

### Tableau de Synthèse des URLs

| Section | URL | Composant React | Emplacement du Fichier | Rôle Principal |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/login` | `Login` | `src/pages/Auth/Login.jsx` | Authentification utilisateur. |
| **BackOffice** | `/accueil` | `Accueil` | `src/pages/backoffice/Accueil.jsx` | Page d'accueil générale d'administration. |
| **BackOffice** | `/parc/dashboard` | `Dashboard` | `src/pages/backoffice/parc/Dashboard.jsx` | Tableau de bord statistique du parc GLPI. |
| **BackOffice** | `/parc/computers` | `ComputerList` | `src/pages/backoffice/parc/computer/ComputerList.jsx` | Liste tabulaire de tous les ordinateurs. |
| **BackOffice** | `/parc/computers/:id` | `ComputerDetail` | `src/pages/backoffice/parc/computer/ComputerDetail.jsx` | Fiche détaillée d'un ordinateur. |
| **BackOffice** | `/tickets` | `TicketList` | `src/pages/backoffice/TicketList.jsx` | Liste et filtrage de tous les tickets GLPI. |
| **BackOffice** | `/tickets/:id` | `TicketDetail` | `src/pages/backoffice/TicketDetail.jsx` | Fiche d'information d'un ticket (Coûts & Éléments liés). |
| **BackOffice** | `/admin` | `AdminSettings` | `src/pages/backoffice/AdminSettings/AdminSettings.jsx` | Configuration personnalisée du Kanban (couleurs/trads SQLite). |
| **BackOffice** | `/import` | `GLPIImportPage` | `src/pages/backoffice/Import/GLPIImportPage.jsx` | Importation standard de données CSV (sans rollback). |
| **BackOffice** | `/import-images` | `GLPIImageImportPageV2` | `src/pages/backoffice/Import/GLPIImageImportPageV2.jsx` | Importation sécurisée V2 avec Rollback automatique. |
| **BackOffice** | `/reset` | `Reset` | `src/pages/backoffice/Reset/Reset.jsx` | Purge sélective de la base de données GLPI 11. |
| **FrontOffice** | `/frontoffice` | `Accueil` | `src/pages/frontoffice/Accueil.jsx` | Accueil utilisateur avec accès rapides. |
| **FrontOffice** | `/frontoffice/tickets` | `FrontOfficeTicketList` | `src/pages/frontoffice/TicketList.jsx` | Liste compacte des tickets de l'utilisateur connecté. |
| **FrontOffice** | `/frontoffice/tickets/add` | `TicketCreate` | `src/pages/frontoffice/TicketCreate.jsx` | Création de ticket avec liaison d'équipements multiple. |
| **FrontOffice** | `/frontoffice/tickets/:id` | `FrontOfficeTicketDetail` | `src/pages/frontoffice/TicketDetail.jsx` | Détails d'un ticket utilisateur. |
| **FrontOffice** | `/frontoffice/tickets/:id/edit` | `TicketUpdate` | `src/pages/frontoffice/TicketUpdate.jsx` | Formulaire d'édition d'un ticket. |
| **FrontOffice** | `/frontoffice/kanban` | `TicketKanban` | `src/pages/frontoffice/TicketKanban.jsx` | Kanban de suivi interactif (Drag & Drop). |
| **FrontOffice** | `/frontoffice/elements` | `ElementsList` | `src/pages/frontoffice/ElementsList.jsx` | Recherche globale multicritère du matériel du parc. |

---

## 2. Analyse Détaillée des Pages du BackOffice

### A. Tableau de Bord du Parc (`/parc/dashboard`)
Cette page offre une vue d'ensemble chiffrée sur l'inventaire matériel et les tickets de support.

* **Fichier** : `src/pages/backoffice/parc/Dashboard.jsx`
* **Fonctionnalités** :
  * Affiche la liste de tous les types d'équipements disponibles dans le parc informatique avec le nombre total d'éléments par catégorie.
  * Affiche des métriques clés de tickets : nombre total de tickets, nombre d'incidents, nombre de demandes, ainsi que des indicateurs spécifiques (ex: tickets en attente, urgences).
  * Bouton **"Actualiser"** pour recharger les statistiques en direct de GLPI.
* **Services & APIs** :
  * `ParcService.getStats()` : Récupère les données consolidées du parc informatique.
* **Variables d'état principales** :
  * `stats` : Objet contenant la totalité des statistiques récupérées.
  * `isLoading` & `isRefreshing` : Gèrent l'affichage des indicateurs visuels de chargement.

---

### B. Liste des Ordinateurs (`/parc/computers`)
Affiche la grille de tous les ordinateurs déclarés dans GLPI.

* **Fichier** : `src/pages/backoffice/parc/computer/ComputerList.jsx`
* **Fonctionnalités** :
  * Tableau dynamique répertoriant les ordinateurs avec : Nom, Statut, Fabricant, Modèle, OS, Lieu et Date de dernière modification.
  * Résolution automatique des ID relationnels (ex: afficher le nom d'un lieu à la place de son identifiant numérique).
  * Lien d'accès aux détails pour chaque ordinateur.
* **Services & APIs** :
  * `ComputerService.getAllComputers()`
  * Services de données liées (State, Manufacturer, Location, ComputerModel, ComputerType, OperatingSystem) appelés en parallèle via un `Promise.all`.
* **Variables d'état principales** :
  * `computers` : Tableau contenant les ordinateurs bruts.
  * `relatedData` : Cartographie de dictionnaires `{ id: nom }` pour chaque type de données liées afin d'optimiser le rendu visuel.

---

### C. Détails d'un Ordinateur (`/parc/computers/:id`)
Fiche descriptive complète d'un matériel informatique spécifique.

* **Fichier** : `src/pages/backoffice/parc/computer/ComputerDetail.jsx`
* **Fonctionnalités** :
  * Affichage structuré par sections : "Informations générales", "Dates", et "Documents".
  * Section **"Documents"** listant tous les fichiers attachés à cet ordinateur avec un bouton permettant de les télécharger directement.
* **Services & APIs** :
  * `ComputerService.getComputerById(id)`
  * `DocumentService.getDocumentsForItem('Computer', id)`
  * `DocumentService.getDocumentDownloadUrl(doc.id)` : URL directe de téléchargement.
* **Variables d'état principales** :
  * `computer` : L'objet ordinateur sélectionné.
  * `documents` : Tableau des fichiers joints trouvés dans GLPI pour cette ressource.

---

### D. Liste des Tickets (`/tickets`)
Vue de contrôle centrale des tickets d'incidents ou de demandes d'assistance.

* **Fichier** : `src/pages/backoffice/TicketList.jsx`
* **Fonctionnalités** :
  * Filtrage multi-critère : par statut (Nouveau, En cours, En attente, Résolu, Clos, etc.) et par type (Incident ou Demande).
  * Pagination paramétrable (10, 20, 50 ou 100 lignes par page).
  * Association automatique du nom complet de l'utilisateur bénéficiaire/demandeur.
* **Services & APIs** :
  * `TicketService.getTickets(params)`
  * `UserService.getAllUsers()`
* **Variables d'état principales** :
  * `tickets` : Liste des tickets filtrés retournés par l'API.
  * `currentPage` & `itemsPerPage` : Gèrent la pagination.
  * `statusFilter` & `typeFilter` : Stockent les options sélectionnées par l'administrateur.
  * `userMap` : Dictionnaire des utilisateurs `{ id: nom }` pour le rendu dans le tableau.

---

### E. Détails d'un Ticket (`/tickets/:id`)
Fiche de synthèse avancée combinant le cycle de vie du ticket, les matériels touchés et les coûts financiers.

* **Fichier** : `src/pages/backoffice/TicketDetail.jsx`
* **Fonctionnalités** :
  * **Informations générales & description** : Affiche les métadonnées (statut, priorité, type) ainsi que le texte descriptif du problème.
  * **Éléments liés** : Affiche la liste tabulaire de tous les équipements liés à l'incident (Ordinateur, Moniteur, Logiciel, Imprimante, etc.) avec un lien direct vers la fiche de chaque équipement.
  * **Coûts associés** : Calcule et affiche en direct les dépenses affectées au ticket (durée d'intervention convertie en heures facturées, coûts fixes, coûts matériels) avec une ligne de totalisation générale.
* **Services & APIs** :
  * `TicketService.getTicket(id)`
  * `ItemTicketService.getItemsForTicket(id)` : Liste les relations matérielles du ticket.
  * `TicketCostService.getTicketCosts(id)` : Charge les dépenses associées.
  * Services d'équipements individuels (`ComputerService`, `MonitorService`, etc.) pour résoudre les informations détaillées.
* **Variables d'état principales** :
  * `ticket` : Objet ticket en cours de consultation.
  * `linkedItems` : Contient la liste enrichie des équipements associés.
  * `ticketCosts` : Tableau des lignes de coût enregistrées.

---

### F. Configuration du Kanban (`/admin`)
Interface d'administration pour modifier dynamiquement les traductions et codes couleur du tableau Kanban.

* **Fichier** : `src/pages/backoffice/AdminSettings/AdminSettings.jsx`
* **Fonctionnalités** :
  * Permet de choisir une langue active (Français / Malgache).
  * Édition en temps réel des libellés des colonnes (Nouveau, En cours, Terminé) et de leurs couleurs associées avec un sélecteur graphique.
  * Enregistrement persistant dans une base SQLite du backend.
* **Services & APIs** :
  * `SettingsService.getSettings()` : Charge les paramètres.
  * `SettingsService.updateSettings(payload)` : Met à jour la configuration.
* **Variables d'état principales** :
  * `colors` : Objet des codes hexadécimaux des 3 colonnes.
  * `translations` : Traductions structurées par ID de langue.
  * `selectedLanguageId` : ID de la langue active.

---

### G. Importation CSV Standard (`/import`)
Permet l'intégration de fichiers d'équipements, tickets et coûts dans GLPI.

* **Fichier** : `src/pages/backoffice/Import/GLPIImportPage.jsx`
* **Fonctionnalités** :
  * Formulaire d'upload pour 3 fichiers CSV distincts (1. Équipements, 2. Tickets, 3. Coûts) et 1 fichier ZIP (images associées).
  * Analyse des CSV et vérification des entêtes (Headers).
  * Affichage d'un journal technique interactif mimant un terminal en bas de page.
  * L'importation s'effectue de manière séquentielle, les lignes erronées sont ignorées mais aucune opération de nettoyage (rollback) n'est lancée en cas d'erreur.
* **Services & APIs** :
  * `GLPIImportServiceFast` : Méthodes de validation et d'envoi.
  * `GLPIImageImportService` : Traitement d'extraction du fichier ZIP et téléversement.

---

### H. Importation V2 avec Rollback (`/import-images`)
Interface d'importation sécurisée garantissant l'intégrité transactionnelle des données importées.

* **Fichier** : `src/pages/backoffice/Import/GLPIImageImportPageV2.jsx`
* **Fonctionnalités** :
  * **Mécanisme de Transaction (Rollback)** : Si une seule ligne du CSV d'équipements, de tickets ou de coûts lève une exception, le processus s'arrête immédiatement et une pile de suppression (`rollbackStack`) est déroulée pour supprimer *toutes* les ressources créées pendant la session en cours.
  * **Import d'images zip** : Extrait et lie les images aux équipements. En cas de panne d'image, seul le document orphelin est supprimé (rollback local).
  * Journalisation instantanée dans la console de terminal graphique de la page.
* **Services & APIs** :
  * `GLPIImageImportServiceV2` : Service intégrant les méthodes de validation d'entêtes, validation de lignes, insertion transactionnelle et exécution de la pile de rollback.

---

### I. Réinitialisation des Données (`/reset`)
Outil de purge pour nettoyer les tables GLPI via l'API REST.

* **Fichier** : `src/pages/backoffice/Reset/Reset.jsx`
* **Fonctionnalités** :
  * Affiche la liste des tables GLPI 11 classées par groupe fonctionnel (Helpdesk, Logiciels, Parc Informatique, Réseau, Contrats, etc.).
  * **Gestion des dépendances (Cascade)** : Cocher une table parente (ex: `Ticket`) sélectionne automatiquement ses tables dépendantes associées (ex: `TicketTask`, `Solution`, `ITILFollowup`) pour éviter des contraintes de clés étrangères invalides dans GLPI.
  * Visualisation en direct de l'état de la suppression (badge de progression avec pourcentage d'avancement pour chaque table).
  * Demande de confirmation renforcée avant exécution (opération irréversible).
* **Services & APIs** :
  * Hook `useResetResources` : Orchestre les requêtes de suppression `DELETE` successives à l'API GLPI.
* **Variables d'état principales** :
  * `selected` : Set des ressources cochées pour la purge.
  * `progress` : Map contenant le statut (`running`, `done`, `forbidden`, `empty`, `error`) de chaque table.

---

## 3. Analyse Détaillée des Pages du FrontOffice

### A. Accueil du FrontOffice (`/frontoffice`)
Le point d'entrée utilisateur.

* **Fichier** : `src/pages/frontoffice/Accueil.jsx`
* **Fonctionnalités** :
  * Fournit des accès visuels directs sous forme de boutons d'action vers les 3 piliers du FrontOffice : les Éléments du parc, la Liste des tickets et le Kanban.

---

### B. Liste des Tickets (`/frontoffice/tickets`)
Version épurée de la liste de tickets, focalisée sur l'utilisateur connecté.

* **Fichier** : `src/pages/frontoffice/TicketList.jsx`
* **Fonctionnalités** :
  * Filtre localement les tickets pour n'afficher que ceux liés à l'utilisateur connecté (dont l'ID est stocké dans le `sessionStorage`).
  * Barre de recherche textuelle rapide et filtres par Statut et Priorité.
  * Récupère la configuration Kanban depuis SQLite pour appliquer des styles et libellés personnalisés aux statuts des tickets.

---

### C. Fiche de Création de Ticket (`/frontoffice/tickets/add`)
Permet de soumettre un incident ou une demande tout en y associant du matériel informatique.

* **Fichier** : `src/pages/frontoffice/TicketCreate.jsx`
* **Fonctionnalités** :
  * Formulaire standard : Titre, Description, Type (Demande ou Incident) et Priorité.
  * **Association de matériels multiple** : Permet de choisir une catégorie d'équipement (Ordinateur, Téléphone, Baie, Imprimante, etc.) puis de sélectionner un matériel spécifique dans un menu déroulant pour l'ajouter à un tableau temporaire d'éléments liés.
  * Lors de la soumission, le ticket est créé, puis les relations avec les matériels sont enregistrées successivement.
* **Services & APIs** :
  * `TicketService.createTicket()`
  * `ItemTicketService.linkItemToTicket(ticketId, itemId, itemType)`
  * Services d'inventaire généraux (`ComputerService.getAllComputers`, etc.) pour alimenter les listes déroulantes de matériels.

---

### D. Détails & Édition du Ticket (`/frontoffice/tickets/:id` & `/:id/edit`)
Consultation et modification d'un ticket.

* **Fichiers** : `src/pages/frontoffice/TicketDetail.jsx` & `src/pages/frontoffice/TicketUpdate.jsx`
* **Fonctionnalités** :
  * `TicketDetail` permet au demandeur de voir le suivi de sa requête, les équipements concernés et les coûts facturés.
  * `TicketUpdate` offre un formulaire simple pour corriger le titre, le texte de description, le type, le statut ou la priorité.

---

### E. Suivi Kanban (`/frontoffice/kanban`)
Tableau visuel de gestion de flux des incidents de l'organisation.

* **Fichier** : `src/pages/frontoffice/TicketKanban.jsx`
* **Fonctionnalités** :
  * Divise les tickets en 3 colonnes configurables : **Nouveau** (statut 1), **En cours** (statut 2 ou 3) et **Résolu/Clos** (statut 5 ou 6).
  * **Drag & Drop** natif HTML5 : Glisser un ticket d'une colonne à une autre met à jour son statut instantanément dans GLPI.
  * **Règles métier interactives lors du déplacement** :
    * Déplacement vers *En cours* : Ouvre un modal pour attribuer optionnellement un technicien parmi la liste des utilisateurs.
    * Déplacement vers *Résolu/Clos* : Ouvre un modal demandant d'entrer un commentaire de clôture et une date de réalisation. Ce commentaire est automatiquement stocké dans le descriptif du ticket.
* **Services & APIs** :
  * `TicketService.getTickets()`
  * `TicketService.updateTicket(id, payload)`
  * `UserService.getAllUsers()`
* **Variables d'état principales** :
  * `tickets` : Liste des tickets affichés sur le tableau.
  * `closeModalData` & `assignModalData` : Stockent les variables temporaires d'interaction utilisateur des modaux.

---

### F. Moteur de Recherche Global (`/frontoffice/elements`)
Un catalogue unifié de l'ensemble du matériel pour une recherche transversale simplifiée.

* **Fichier** : `src/pages/frontoffice/ElementsList.jsx`
* **Fonctionnalités** :
  * Effectue des requêtes en parallèle sur 17 catégories d'équipements matériels (ordinateurs, logiciels, périphériques, PDUs, câbles, moniteurs, etc.).
  * Fusionne les résultats dans un tableau unique paginé côté client.
  * Fournit des filtres dynamiques globaux : par Nom, par Fabricant, par Statut de l'équipement ou par Lieu.
* **Services & APIs** :
  * Interroge en parallèle l'ensemble des services d'inventaire matériels GLPI via des wrappers sécurisés.
