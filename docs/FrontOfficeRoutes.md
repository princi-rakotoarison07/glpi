# Documentation Technique : Cartographie des URLs du Front Office

Ce document cartographie les URLs clés de la partie Front Office (`react-app/src/pages/frontoffice`), en reliant chaque route à son composant React, ses fichiers associés, ses variables d'état (state) et ses fonctions clés.

---

## 1. Structure Globale des Routes (`AppRouter.jsx`)

Les routes du Front Office sont configurées dans `routes/AppRouter.jsx` à l'aide de React Router Dom. Les routes sensibles sont enveloppées par le middleware `<ProtectedRoute />` pour exiger une authentification préalable.

```javascript
// Extrait de routes/AppRouter.jsx
<Route path="/frontoffice" element={<FrontOfficeAccueil />} />
<Route path="/frontoffice/elements" element={<FrontOfficeElementsList />} />

<Route element={<ProtectedRoute />}>
  <Route path="/frontoffice/tickets" element={<FrontOfficeTicketList />} />
  <Route path="/frontoffice/kanban" element={<TicketKanban />} />
  <Route path="/frontoffice/tickets/add" element={<TicketCreate />} />
  <Route path="/frontoffice/tickets/:id" element={<FrontOfficeTicketDetail />} />
  <Route path="/frontoffice/tickets/:id/edit" element={<TicketUpdate />} />
</Route>
```

---

## 2. Tableau de Synthèse des URLs

| URL | Composant React | Emplacement du Fichier | Rôle & Fonctionnalités clés |
| :--- | :--- | :--- | :--- |
| `/frontoffice/tickets` | `TicketList` | `src/pages/frontoffice/TicketList.jsx` | Grille de recherche compacte des tickets associés à l'utilisateur connecté. |
| `/frontoffice/tickets/:id` | `TicketDetail` | `src/pages/frontoffice/TicketDetail.jsx` | Fiche d'information exhaustive du ticket (Description, Matériels liés, Coûts et Historique). |
| `/frontoffice/tickets/:id/edit`| `TicketUpdate` | `src/pages/frontoffice/TicketUpdate.jsx` | Formulaire d'édition (Titre, Contenu, Statut, Priorité) et attribution de techniciens. |
| `/frontoffice/kanban` | `TicketKanban` | `src/pages/frontoffice/TicketKanban.jsx` | Tableau de suivi interactif en colonnes (Nouveau, En cours, Clos) avec Drag & Drop. |
| `/frontoffice/elements` | `ElementsList` | `src/pages/frontoffice/ElementsList.jsx` | Moteur de recherche multicritères unifié sur l'ensemble du parc informatique. |

---

## 3. Analyse Détaillée par URL

### A. Liste des Tickets (`http://localhost:5173/frontoffice/tickets`)
Ce composant affiche la liste tabulaire des tickets déclarés par l'utilisateur connecté ou le concernant.

* **Fichier** : `src/pages/frontoffice/TicketList.jsx`
* **Principaux States (Variables d'état)** :
  * `tickets` : Tableau d'objets tickets retournés par l'API.
  * `filters` : Objet stockant les filtres de recherche (`searchText`, `status`, `priority`, `type`).
  * `settings` : Paramètres esthétiques de statut chargés depuis le backend SQLite.
* **Fonctions clés** :
  * **`fetchTickets`** : Récupère les tickets et filtre localement en fonction de l'utilisateur stocké dans `sessionStorage`.
  ```javascript
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const [res, relations] = await Promise.all([
        TicketService.getTickets({ start: 0, limit: 100 }),
        TicketService.getTicketUsers()
      ]);
      // Filtrage selon l'utilisateur connecté (Bénéficiaire ou Demandeur)
      const userTickets = (res.tickets || []).filter(t => 
        Number(t.users_id_recipient) === Number(currentUser.id)
      );
      setTickets(userTickets);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  ```

---

### B. Détails du Ticket (`http://localhost:5173/frontoffice/tickets/11`)
Cette page affiche les détails d'un ticket spécifique identifié par le paramètre d'URL `:id` (exemple : `11`).

* **Fichier** : `src/pages/frontoffice/TicketDetail.jsx`
* **Principaux States** :
  * `ticket` : L'objet du ticket courant.
  * `linkedItems` : Les matériels associés avec leurs fiches d'inventaire détaillées.
  * `ticketCosts` : Dépenses et heures facturées pour ce ticket.
* **Fonctions clés** :
  * **`fetchTicketDetails`** : Regroupement parallèle des appels API.
  * **`fetchFullItem`** : Résout les caractéristiques du matériel (ex: modèle d'ordinateur) en interrogeant la classe d'API appropriée.
  ```javascript
  const fullItem = await fetchFullItem(linkedItem.itemtype, linkedItem.items_id);
  ```

---

### C. Édition du Ticket (`http://localhost:5173/frontoffice/tickets/11/edit`)
Formulaire d'édition permettant de modifier les attributs fonctionnels d'un incident ou d'une demande.

* **Fichier** : `src/pages/frontoffice/TicketUpdate.jsx`
* **Principaux States** :
  * `ticketName`, `ticketContent` : Titre et description modifiables.
  * `status`, `priority`, `type` : Attributs catégoriels du ticket.
* **Fonctions clés** :
  * **`handleSubmit`** : Envoie la requête `PUT` de mise à jour à l'API GLPI.
  ```javascript
  const handleSubmit = async (e) => {
    e.preventDefault();
    await TicketService.updateTicket(id, {
      name: ticketName,
      content: ticketContent,
      status: Number(status),
      priority: Number(priority),
      type: Number(type)
    });
    navigate(`/frontoffice/tickets/${id}`);
  };
  ```

---

### D. Suivi Kanban (`http://localhost:5173/frontoffice/kanban`)
Tableau visuel d'étapes de résolution avec drag-and-drop.

* **Fichier** : `src/pages/frontoffice/TicketKanban.jsx`
* **Principaux States** :
  * `tickets` : Liste des tickets filtrés.
  * `closeModalData` : Informations pour le modal de clôture (commentaire, date de réalisation).
  * `assignModalData` : Techniciens à affecter lors du passage à "In Progress".
* **Fonctions clés** :
  * **`handleDragStart` & `handleDrop`** : Capture de l'événement HTML5 drag/drop pour initier la transition d'état.
  * **`handleConfirmClose`** : Concatène la note de clôture dans le ticket parent et passe son statut à `6` (Clos).

---

### E. Liste des Éléments du Parc (`http://localhost:5173/frontoffice/elements`)
Page de recherche globale et multicritères de l'inventaire matériel du parc (ordinateurs, périphériques, etc.).

* **Fichier** : `src/pages/frontoffice/ElementsList.jsx`
* **Principaux States** :
  * `allElements` : Contient l'ensemble des matériels fusionnés.
  * `filteredElements` : Sous-ensemble filtré affiché dans le tableau.
  * `currentPage`, `itemsPerPage` : Pagination côté client.
* **Fonctions clés** :
  * **`fetchAllElements`** : Requêtes parallèles sécurisées avec wrapper d'erreur `safeFetch`.
  * **`useEffect` (filtres)** : Filtre et rafraîchit la pagination locale à chaque modification des champs de recherche.
