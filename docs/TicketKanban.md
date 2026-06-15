# Documentation Technique : Tableau de Suivi Kanban

Ce document détaille le fonctionnement, l'architecture technique, les services sollicités et les cas d'usage du composant de suivi Kanban (`TicketKanban.jsx`). Ce tableau permet aux utilisateurs et techniciens de visualiser et de modifier l'état d'avancement des tickets de support via une interface interactive de glisser-déposer (Drag & Drop).

---

## 1. Vue d'ensemble de la page

### Objectif principal
Le **Suivi Kanban** regroupe les tickets d'assistance (incidents ou demandes) dans trois colonnes distinctes représentant leur cycle de vie opérationnel :
1. **Nouveau** (Statut GLPI `1`) : Tickets récemment déclarés, en attente de prise en charge.
2. **In progress (assigné)** (Statut GLPI `2`) : Tickets pris en charge par un ou plusieurs techniciens et en cours de résolution.
3. **Terminé** (Statut GLPI `6`) : Tickets clos et résolus avec un commentaire de clôture.

### Actions clés de l'utilisateur
* **Glisser-Déposer (Drag & Drop)** : Déplacer un ticket d'une colonne à une autre pour modifier son statut en temps réel.
* **Création multiple (Quick Add)** : Créer en une seule soumission un ou plusieurs formulaires de tickets avec liaison optionnelle d'équipements du parc.
* **Attribution de techniciens** : Affecter ou retirer plusieurs techniciens à un ticket lors du passage à la colonne *In Progress*.
* **Clôture documentée** : Renseigner un commentaire de clôture et une date de réalisation obligatoire pour archiver un ticket dans la colonne *Terminé*.

---

## 2. Éléments Techniques & Dépendances

### Services Clés Utilisés

1. **`TicketService`** (`src/services/Ticket/TicketService.js`) :
   * `getTickets` : Récupère la liste globale des tickets.
   * `getTicket(id)` : Charge les détails d'un ticket spécifique (utilisé avant clôture).
   * `createTicket` : Déclare un nouveau ticket.
   * `updateTicket(id, data)` : Modifie les champs (statut, contenu) d'un ticket.
   * `assignUserToTicket(ticketId, userId)` : Lie un technicien (relation de type `2`).
   * `removeUserFromTicket(relationId)` : Supprime une affectation.
   * `countTicketsByStatus(tickets, statusId)` : Utilitaire de dénombrement.
2. **`ItemTicketService`** (`src/services/ItemTicket/ItemTicketService.js`) :
   * `linkItemToTicket` : Associe un actif informatique du parc (ordinateur, écran, logiciel) à un ticket.
3. **`UserService`** (`src/services/User/UserService.js`) :
   * `getAllUsers` : Récupère tous les profils d'utilisateurs (demandeurs).
   * `getProfileUsers` : Détermine qui possède des droits de technicien/administrateur.
4. **Services du Parc (Éléments)** :
   * Services de type `ComputerService`, `MonitorService`, `PrinterService`, etc., pour charger l'intégralité des équipements disponibles lors des liaisons rapides.
5. **`SettingsService`** (`src/services/Settings/SettingsService.js`) :
   * Charge la configuration visuelle personnalisée (couleurs et libellés des colonnes stockés localement).

---

## 3. Analyse des fonctions principales avec exemples de code

### A. Récupération et filtrage des tickets (`fetchTickets`)
La fonction charge les tickets et leurs relations de rôles. Elle filtre les tickets à l'affichage pour n'afficher que ceux liés à l'utilisateur connecté (créateur, bénéficiaire ou demandeur direct), garantissant le cloisonnement des données.

```javascript
const fetchTickets = async () => {
  try {
    setLoading(true);
    // Double appel parallèle : récupération des tickets et des relations d'utilisateurs
    const [result, relations] = await Promise.all([
      TicketService.getTickets({ start: 0, limit: 999 }),
      TicketService.getTicketUsers()
    ]);

    const userTicketsList = result.tickets || [];
    const rels = Array.isArray(relations) ? relations : [];

    // Construction d'une table de correspondance { ticketId: requesterUserId }
    const reqMap = {};
    rels.forEach(rel => {
      if (Number(rel.type) === 1) { // Type 1 = Requester / Demandeur
        reqMap[rel.tickets_id] = rel.users_id;
      }
    });
    setTicketRequesterMap(reqMap);
    setTicketUserRelations(rels);

    let userTickets = [...userTicketsList];

    // Restriction à l'utilisateur courant du Front Office
    if (currentUser?.id) {
      userTickets = userTickets.filter(t => {
        const reqId = reqMap[t.id];
        return Number(t.users_id_recipient) === Number(currentUser.id) || 
               (reqId && Number(reqId) === Number(currentUser.id));
      });
    }
    setTickets(userTickets);
  } catch (error) {
    console.error('Error fetching tickets for Kanban:', error);
  } finally {
    setLoading(false);
  }
};
```

---

### B. Gestion des transitions par Glisser-Déposer (`handleDrop`)
L'action utilisateur de dépôt déclenche des comportements différents selon la colonne cible :
* **Vers `termine`** : Ouvre un modal de clôture demandant des commentaires.
* **Vers `inProgress`** : Met à jour le statut en base (à `2`) et ouvre le modal d'affectation de techniciens.
* **Vers `nouveau`** : Met à jour le statut en base (à `1`) directement.

```javascript
const handleDrop = async (e, targetColumnId) => {
  e.preventDefault();
  const ticketId = e.dataTransfer.getData('text/plain');
  const fromColumnId = e.dataTransfer.getData('fromColumn');

  if (!ticketId || fromColumnId === targetColumnId) return;

  if (targetColumnId === 'termine') {
    // Étape intermédiaire requise : modal de clôture
    setCloseModalData({
      isOpen: true,
      ticketId: ticketId,
      comment: '',
      date: new Date().toISOString().split('T')[0]
    });
  } else if (targetColumnId === 'inProgress') {
    try {
      setLoading(true);
      // Mise à jour API immédiate vers statut 2 (Attribué)
      await TicketService.updateTicket(ticketId, { status: 2 });
      await fetchTickets();
      // Ouverture du modal de gestion d'équipe
      setAssignModalData({
        isOpen: true,
        ticketId: ticketId,
        selectedUserId: ''
      });
    } catch (err) {
      console.error('Error setting status to In Progress:', err);
    } finally {
      setLoading(false);
    }
  } else {
    try {
      setLoading(true);
      await TicketService.updateTicket(ticketId, { status: 1 }); // Retour à Nouveau
      await fetchTickets();
    } catch (err) {
      alert('Erreur lors de la mise à jour : ' + err.message);
    } finally {
      setLoading(false);
    }
  }
};
```

---

### C. Validation et confirmation de clôture (`handleConfirmClose`)
Lorsque l'utilisateur confirme la clôture d'un ticket, le système récupère d'abord le contenu existant du ticket, y concatène une note formatée contenant le commentaire et la date de résolution, puis passe le statut GLPI à `6` (Clos).

```javascript
const handleConfirmClose = async (e) => {
  if (e) e.preventDefault();
  const { ticketId, comment, date } = closeModalData;

  if (!ticketId) return;

  try {
    setLoading(true);
    
    // 1. Lecture de l'état actuel du ticket
    const ticketObj = await TicketService.getTicket(ticketId);
    const currentContent = ticketObj.content || '';
    
    // 2. Concaténation de la note de clôture
    const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR');
    const closingNote = `\n\n[Clôture - Date de réalisation : ${formattedDate}]${comment.trim() ? ` Commentaire : ${comment.trim()}` : ''}`;
    const updatedContent = currentContent + closingNote;

    // 3. Mise à jour API (statut 6 = Clos)
    await TicketService.updateTicket(ticketId, {
      status: 6,
      content: updatedContent
    });

    setCloseModalData({ isOpen: false, ticketId: null, comment: '', date: '' });
    await fetchTickets();
  } catch (err) {
    alert('Erreur lors de la clôture : ' + err.message);
  } finally {
    setLoading(false);
  }
};
```

---

### D. Traitement des créations groupées de tickets (`handleQuickAddSubmit`)
Cette fonction itère sur le tableau `quickTickets` pour générer des requêtes de création séquentielles. Elle lie ensuite chaque ticket créé aux équipements correspondants.

```javascript
const handleQuickAddSubmit = async (e) => {
  if (e) e.preventDefault();
  
  // Validation locale
  const hasInvalid = quickTickets.some(t => !t.name.trim() || !t.content.trim());
  if (hasInvalid) {
    alert('Veuillez remplir le titre et la description pour tous les tickets.');
    return;
  }

  setQuickSubmitting(true);
  try {
    for (const t of quickTickets) {
      const payload = {
        name: t.name.trim(),
        content: t.content.trim(),
        type: Number(t.type),
        status: 1, // Statut initial "Nouveau"
        priority: Number(t.priority),
        users_id_recipient: currentUser?.id || 0,
        _users_id_requester: Number(t.users_id_recipient) || currentUser?.id || 0,
      };

      // 1. Insertion du ticket parent
      const ticketRes = await TicketService.createTicket(payload);
      const ticketId = ticketRes.id;

      // 2. Liaison des matériels déclarés
      if (ticketId && t.itemRows.length > 0) {
        for (const row of t.itemRows) {
          if (row.itemType && row.itemId) {
            await ItemTicketService.linkItemToTicket(ticketId, row.itemId, row.itemType);
          }
        }
      }
    }

    // Réinitialisation du state du formulaire après succès
    setQuickTickets([{ tempId: generateTempId(), name: '', content: '', type: 1, priority: 3, users_id_recipient: currentUser?.id || '', itemRows: [] }]);
    setShowQuickAdd(false);
    await fetchTickets(); // Rechargement visuel du tableau
  } catch (err) {
    alert('Erreur lors de la création du ticket: ' + err.message);
  } finally {
    setQuickSubmitting(false);
  }
};
```

---

### E. Gestion des affectations de techniciens (`handleAddAssignee` & `handleRemoveAssignee`)
Lorsqu'un ticket passe à la colonne *In Progress*, l'utilisateur peut lui affecter un ou plusieurs techniciens. Ces fonctions interagissent asynchronement avec l'API GLPI REST pour ajouter ou retirer des liens d'affectation puis rechargent le Kanban.

```javascript
// Attribution d'un technicien à un ticket
const handleAddAssignee = async (ticketId, selectedUserId) => {
  if (!ticketId || !selectedUserId) return;
  try {
    setLoading(true);
    // Appel API pour lier l'utilisateur au ticket avec le rôle de technicien (type 2)
    await TicketService.assignUserToTicket(ticketId, selectedUserId);
    // Rafraîchissement complet des relations et tickets
    await fetchTickets();
  } catch (err) {
    console.error('Error assigning technician:', err);
    alert('Erreur lors de l\'attribution du technicien : ' + err.message);
  } finally {
    setLoading(false);
  }
};

// Retrait d'un technicien d'un ticket
const handleRemoveAssignee = async (relationId) => {
  try {
    setLoading(true);
    // Suppression de l'entité de liaison par son ID de relation unique
    await TicketService.removeUserFromTicket(relationId);
    await fetchTickets();
  } catch (err) {
    console.error('Error removing technician:', err);
    alert('Erreur lors du retrait du technicien : ' + err.message);
  } finally {
    setLoading(false);
  }
};
```

---

### F. Manipulation dynamique des lignes d'équipements (`handleQuickRowChange` & `handleRemoveQuickRow`)
Dans le formulaire de création multiple, chaque ticket peut être associé à plusieurs équipements matériels. Les lignes de saisie sont ajoutées de manière dynamique et réagissent en cascade (la sélection du type d'équipement charge les éléments associés).

```javascript
// Gère le changement d'une colonne (Type ou ID d'équipement) pour une ligne spécifique d'un ticket
const handleQuickRowChange = (ticketTempId, rowTempId, field, value) => {
  setQuickTickets(prev => prev.map(t => 
    t.tempId === ticketTempId 
      ? { 
          ...t, 
          itemRows: t.itemRows.map(row => 
            row.tempId === rowTempId 
              ? { 
                  ...row, 
                  [field]: value, 
                  // Si on change le type d'équipement, on réinitialise l'ID précédemment choisi
                  itemId: field === 'itemType' ? '' : (field === 'itemId' ? value : row.itemId)
                } 
              : row
          }
        }
      : t
  ));
};

// Retire une ligne d'équipement du state local
const handleRemoveQuickRow = (ticketTempId, rowTempId) => {
  setQuickTickets(prev => prev.map(t => 
    t.tempId === ticketTempId 
      ? { ...t, itemRows: t.itemRows.filter(row => row.tempId !== rowTempId) }
      : t
  ));
};
```

---

### G. Conversion de couleur Hex vers RGBA avec opacité configurable (`hexToRgba`)
Pour assurer l'harmonie visuelle du Kanban, la couleur de fond des colonnes est dérivée de la couleur principale configurée (stockée en héxadécimal dans SQLite) à laquelle on applique une opacité subtile pour créer un effet de transparence professionnel.

```javascript
const hexToRgba = (hex, opacity = 0.08) => {
  if (!hex) return `rgba(241, 245, 249, ${opacity})`;
  
  // Retire le caractère '#' si présent
  const cleanHex = hex.replace('#', '');
  
  // Extraction des valeurs de couleur rouge, verte et bleue en base 16
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  
  // Formatage final en notation css rgba
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
```

---

### H. Initialisation du déplacement par glissement (`handleDragStart`)
La fonction capture l'identifiant du ticket et sa colonne d'origine pour les injecter dans le payload de transfert de données du navigateur.

```javascript
const handleDragStart = (e, ticketId, fromColumnId) => {
  // Stocke l'ID et la colonne de départ pour la lecture dans handleDrop
  e.dataTransfer.setData('text/plain', ticketId);
  e.dataTransfer.setData('fromColumn', fromColumnId);
};
```

---

## 4. Anticipation des Aléas & Mitigations (Session de tests)

### A. Glisser-déposer concurrentiel (Aléa Métier / Réseau)
* **Risque** : L'utilisateur glisse un ticket alors qu'une requête de rafraîchissement est en cours, ou que sa connexion est coupée.
* **Comportement attendu** : Une variable de verrouillage global `loading` affiche un spinner ou texte indicateur. En cas d'erreur de requête asynchrone lors de `updateTicket`, une alerte visuelle s'affiche et le tableau est restauré à son état initial en appelant à nouveau `fetchTickets`.

### B. Omission de technicien assignable (Aléa Données)
* **Risque** : Tenter d'attribuer un ticket à un technicien absent de la liste locale.
* **Comportement attendu** : La sélection filtre uniquement les utilisateurs possédant un droit d'intervention dans GLPI (profils 3 à 7 : Admin, Tech, Supervisor, Hotliner). Si aucun technicien n'est sélectionné, le bouton d'ajout reste inactif (`disabled`).

### C. Concaténation de notes trop volumineuses (Aléa UI/UX)
* **Risque** : L'utilisateur saisit des commentaires de clôture de plusieurs paragraphes qui cassent le design ou s'ajoutent de manière illisible.
* **Comportement attendu** : Le contenu textuel long est tronqué dans l'aperçu de la carte Kanban à 80 caractères (`substring(0, 80)...`). La note est formatée avec des sauts de ligne clairs (`\n\n[Clôture...]`) pour la rendre structurée et lisible sur la fiche détaillée du ticket.

