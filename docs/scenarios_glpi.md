# Scénarios d'utilisation de GLPI

GLPI (Gestionnaire Libre de Parc Informatique) est une solution complète de gestion de services informatiques (ITSM). Voici les principaux scénarios d'utilisation (cas d'usage) que l'application permet de gérer.

## Résumé des accès dans le menu
 - Le Helpdesk : Assistance > Tickets (ou Problèmes , Changements ) 
 - La Gestion de l'Inventaire : Parc > Ordinateurs (ou Moniteurs , Logiciels , Matériels réseau , etc.) 
 - La Base de Connaissances : Outils > Base de connaissances 
 - La Gestion Administrative et Financière : Gestion > Contrats (ou Fournisseurs , Budgets , Licences ) 
 - Les Réservations de Matériel : Outils > Réservations 
 - La Gestion de Projets : Outils > Projets

## 1. Le Helpdesk (Gestion des tickets et de l'assistance)
C'est le cœur de l'interaction entre les utilisateurs et le service informatique.
* **Chemin dans le menu (Admin) :** `Assistance` > `Tickets` (ou `Problèmes`, `Changements`)

* **Scénario Utilisateur (Demandeur) :** Un employé rencontre un problème (ex: "Mon PC ne s'allume plus") ou a une demande (ex: "J'ai besoin d'une licence pour un logiciel"). Il se connecte à GLPI et crée un ticket via un formulaire simplifié. Il peut suivre l'état d'avancement de sa demande et interagir avec les techniciens.
* **Scénario Technicien :** Le technicien reçoit le ticket, l'analyse, se l'attribue ou l'attribue à un groupe de techniciens compétents. Il documente ses actions (tâches, suivis), communique avec l'utilisateur et ferme le ticket une fois le problème résolu.
* **Concepts clés :** SLA (délais maximum de prise en charge et de résolution), escalade de tickets, validation par un supérieur (ex: approbation pour l'achat de nouveau matériel).

## 2. La Gestion de l'Inventaire (Asset Management)
Ce scénario permet de savoir exactement ce que possède l'entreprise, où cela se trouve et qui l'utilise.
* **Chemin dans le menu (Admin) :** `Parc` > `Ordinateurs` (ou `Moniteurs`, `Logiciels`, `Matériels réseau`, etc.)

* **Scénario Administrateur / Gestionnaire de parc :** L'administrateur référence tous les équipements physiques (ordinateurs, écrans, serveurs, routeurs, imprimantes) et logiques (logiciels, licences).
* **Cas d'usage :** Lorsqu'un nouvel employé arrive, le gestionnaire lui attribue un PC spécifique. Si ce PC tombe en panne plus tard, le technicien verra directement sur le ticket la configuration exacte du PC (RAM, disque dur, système d'exploitation) et s'il est encore sous garantie.
* **Concepts clés :** Remontée automatique de l'inventaire (via GLPI Inventory), cycle de vie du matériel (en stock, en service, en réparation, au rebut).

## 3. La Base de Connaissances (Knowledge Base / FAQ)
Ce scénario vise à capitaliser sur le savoir et à réduire le nombre de tickets d'assistance récurrents.
* **Chemin dans le menu (Admin) :** `Outils` > `Base de connaissances`

* **Scénario Technicien :** Après avoir résolu le même problème 3 fois de suite, le technicien rédige un article expliquant comment le résoudre (ex: "Comment configurer le VPN sur son smartphone").
* **Scénario Utilisateur :** Avant de créer un ticket, l'utilisateur consulte la base de connaissances (FAQ). Il trouve l'article, suit les instructions et se dépanne tout seul. Le support informatique gagne un temps précieux.

## 4. La Gestion Administrative et Financière
GLPI ne gère pas que l'aspect technique, mais aussi le coût de l'informatique.
* **Chemin dans le menu (Admin) :** `Gestion` > `Contrats` (ou `Fournisseurs`, `Budgets`, `Licences`)

* **Scénario Responsable IT / Acheteur :** Il enregistre les contrats de maintenance, les garanties constructeurs, les abonnements et les fournisseurs. 
* **Cas d'usage :** GLPI génère une alerte automatique 30 jours avant l'échéance d'un contrat d'hébergement ou d'une licence logicielle pour éviter une coupure de service. Le module permet aussi de suivre la consommation des budgets IT.

## 5. Les Réservations de Matériel
Pour la gestion des ressources partagées au sein de l'organisation.
* **Chemin dans le menu (Admin) :** `Outils` > `Réservations`

* **Scénario Utilisateur :** Un employé a besoin d'un vidéoprojecteur et d'un ordinateur portable de prêt pour une conférence de 3 jours. Il utilise le calendrier de réservation de GLPI pour réserver ce matériel sur ce créneau horaire précis.
* **Scénario Technicien / Accueil :** L'équipe valide la réservation et prépare le matériel pour l'utilisateur.

## 6. La Gestion de Projets
Pour les tâches complexes nécessitant de multiples étapes, des sous-tâches et plusieurs intervenants.
* **Chemin dans le menu (Admin) :** `Outils` > `Projets`

* **Scénario Chef de projet IT :** Lors du déploiement d'une nouvelle infrastructure réseau, il crée un projet global. Il y ajoute des tâches (tirage de câbles, configuration des switchs, tests), assigne ces tâches à différents techniciens, relie des tickets existants au projet et suit l'avancement global via un diagramme de Gantt intégré.
