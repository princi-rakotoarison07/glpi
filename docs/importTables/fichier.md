# Mapping des fichiers d'import vers les tables GLPI

Ce document détaille les tables de la base de données GLPI dans lesquelles les données des différents fichiers CSV du dossier `d:\xampp\htdocs\glpi\model-import` doivent être insérées.

**ATTENTION : L'ordre présenté ci-dessous est l'ordre chronologique strict dans lequel les insertions en base de données doivent être effectuées pour respecter les clés étrangères (Foreign Keys).**

## 1. Import-data-juin-26 - Feuille 1.csv
**Contenu :** Parc informatique / Inventaire du matériel

Avant de pouvoir créer un équipement (ordinateur), toutes ses propriétés doivent d'abord exister dans les tables de configuration.

**A. Tables de configuration et utilisateurs (À insérer EN PREMIER) :**
- `glpi_states` : Statut du matériel (ex: "En production", "Maintenance").
- `glpi_locations` : Lieux d'affectation (ex: "Administration", "Comptabilité").
- `glpi_manufacturers` : Fabricants (ex: "Dell", "HP", "Lenovo").
- `glpi_computermodels` : Modèles des équipements (ex: "OptiPlex 7010", "ProDesk 400 G9").
- `glpi_users` : Usagers du matériel (ex: "Rakoto Jean", "Rasoanaivo Marie").

**B. Table principale du matériel (À insérer EN SECOND) :**
- `glpi_computers` : Création de l'équipement (Name, Inventory_Number). Lors de l'insertion, vous devrez utiliser les ID générés à l'étape A pour remplir les clés étrangères (ex: `states_id`, `locations_id`, `manufacturers_id`, `computermodels_id`, `users_id`).

*(Note : Si le champ `Item_Type` contient d'autres types d'équipements, d'autres tables comme `glpi_monitors`, `glpi_printers`, etc. devront être alimentées à cette étape B).*

## 2. Import-data-juin-26 - Feuille 2.csv
**Contenu :** Gestion de l'assistance / Création des tickets

L'insertion des tickets nécessite que le matériel (les PC) soit déjà présent dans GLPI.

**Ordre d'insertion :**
1. `glpi_tickets` : Table principale pour l'insertion des tickets (Titre, Description, Date, Heure, Type, Status, Priority).
2. `glpi_items_tickets` : Table de liaison. Une fois le ticket créé, on insère ici une ligne pour lier le ticket (`tickets_id`) à l'équipement concerné (`items_id` correspondant au PC, et `itemtype` = 'Computer').

## 3. Import-data-juin-26 - Feuille 3.csv
**Contenu :** Coûts et temps d'intervention associés aux tickets

Ces données viennent compléter les tickets existants (Feuille 2).

**Ordre d'insertion :**
1. `glpi_ticketcosts` : Table pour enregistrer les coûts fixes (`Fixed_Cost`), les coûts liés au temps (`Time_Cost`) et la durée (`Duration_second`) associés à l'ID du ticket existant (`tickets_id` obtenu à partir de `Num_Ticket`).
2. `glpi_tickettasks` : (Éventuellement) Si vous souhaitez également créer des tâches spécifiques dans le ticket pour refléter les actions et la durée d'intervention.
