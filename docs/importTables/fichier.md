# Mapping des fichiers d'import vers les tables GLPI

Ce document détaille les tables de la base de données GLPI dans lesquelles les données des différents fichiers CSV du dossier `d:\xampp\htdocs\glpi\model-import` doivent être insérées.

**ATTENTION : L'ordre présenté ci-dessous est l'ordre chronologique strict dans lequel les insertions en base de données doivent être effectuées pour respecter les clés étrangères (Foreign Keys).**

## 1. Import-data-juin-26 - Feuille 1.csv
**Contenu :** Parc informatique / Inventaire du matériel

Avant de pouvoir créer un équipement, toutes ses propriétés doivent d'abord exister dans les tables de configuration.

**A. Tables de configuration et utilisateurs (À insérer EN PREMIER) :**
- `Status` -> inséré dans `glpi_states` (champ `name`).
- `Location` -> inséré dans `glpi_locations` (champ `name`).
- `Manufacturer` -> inséré dans `glpi_manufacturers` (champ `name`).
- `Model` -> inséré dans la table de modèles correspondante (ex: `glpi_computermodels` pour un PC, `glpi_monitormodels` pour un écran) (champ `name`).
- `User` -> inséré dans `glpi_users` (champ `name` / `realname`).

**B. Table principale du matériel (À insérer EN SECOND) :**
La colonne **`Item_Type`** ne s'insère pas dans une colonne spécifique, elle **détermine la table cible** (`glpi_computers` pour 'Computer', `glpi_monitors` pour 'Monitor', etc.).

Mapping des colonnes vers la table cible (ex: `glpi_computers`) :
- `Name` -> inséré dans `name`
- `Inventory_Number` -> inséré dans **`otherserial`** (et non `serial` qui est le n° de série fabricant)
- Les autres colonnes sont insérées sous forme de clés étrangères (Foreign Keys) pointant vers les tables créées à l'étape A : `states_id`, `locations_id`, `manufacturers_id`, `computermodels_id` (ou `monitormodels_id`), `users_id`.

## 2. Import-data-juin-26 - Feuille 2.csv
**Contenu :** Gestion de l'assistance / Création des tickets

L'insertion des tickets nécessite que le matériel soit déjà présent dans GLPI.

**Ordre d'insertion :**
1. **`glpi_tickets`** (Table principale) :
   - `Titre` -> inséré dans `name`
   - `Description` -> inséré dans `content`
   - `Date` et `Heure` -> concaténés et insérés dans `date`
   - `Type` -> inséré dans `type` (1 = Incident, 2 = Demande)
   - `Status` -> inséré dans `status` (entier de 1 à 6)
   - `Priority` -> inséré dans `priority` (entier de 1 à 6)
   - *(Note: `Ref_Ticket` sert uniquement de référence pour l'import des coûts).*

2. **`glpi_items_tickets`** (Table de liaison) :
   - `Items` -> on cherche l'équipement dans GLPI. On insère l'ID trouvé dans `items_id`, l'ID du ticket dans `tickets_id`, et le type d'équipement exact (ex: `'Computer'` ou `'Monitor'`) dans la colonne texte `itemtype`.

## 3. Import-data-juin-26 - Feuille 3.csv
**Contenu :** Coûts et temps d'intervention associés aux tickets

Ces données viennent compléter les tickets existants (Feuille 2).

**Ordre d'insertion :**
1. **`glpi_ticketcosts`** :
   - `Num_Ticket` -> sert à retrouver l'ID réel du ticket dans GLPI pour remplir `tickets_id`.
   - `Fixed_Cost` -> inséré dans `cost_fixed`
   - `Time_Cost` -> inséré dans `cost_time`
   - `Duration_second` -> inséré dans `actiontime`

## 4. images.zip
**Contenu :** Fichiers d'images associés aux équipements (ex: MN-FORM-002.png, PC-ADM-001.png, PC-COMPTA-001.png, PC-LAB-002.jpeg).

**Ordre d'insertion :**
1. `glpi_documents` : Table principale pour enregistrer le fichier (nom du fichier, chemin de stockage, etc.).
2. `glpi_documents_items` : Table de liaison pour associer l'image (via `documents_id`) à l'équipement concerné (via `items_id` correspondant au PC/Moniteur, et `itemtype` = 'Computer' ou 'Monitor').
