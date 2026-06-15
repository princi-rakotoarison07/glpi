# Documentation Technique : Cartographie et Résolution des Statuts lors de l'Import

Ce document détaille la logique de correspondance (mapping) et de traitement des statuts, priorités et types lors de l'importation de tickets GLPI à partir de fichiers CSV (implémentée dans `GLPIImportServiceFast.js`). Il décrit notamment comment le système gère l'insensibilité à la casse, le nettoyage des chaînes et le contournement de la restriction de création de tickets clos dans GLPI.

---

## 1. Dictionnaires de Correspondance (Mapping Standard)

Lors de la lecture du fichier CSV des tickets, les statuts, priorités et types textuels sont convertis en identifiants numériques requis par la base de données GLPI.

### A. Dictionnaire des Statuts
Ce dictionnaire fait correspondre les états textuels en anglais/français aux identifiants numériques de l'API GLPI.

```javascript
const statusMap = {
  'New': 1,
  'Assign': 2,
  'Assigned': 2,
  'In Progress': 2,
  'In progress (assigned)': 2,
  'Planned': 3,
  'Pending': 4,
  'Solved': 5,
  'Resolved': 5,
  'Closed': 6
};
```

### B. Dictionnaire des Priorités
Traduit le niveau de criticité du ticket.

```javascript
const priorityMap = {
  'Very Low': 1,
  'Low': 2,
  'Medium': 3,
  'High': 4,
  'Very High': 5,
  'Major': 6,
  'Critical': 6
};
```

### C. Dictionnaire des Types de Ticket
Traduit le type d'intervention en Incident (`1`) ou Demande (`2`).

```javascript
const typeMap = {
  'Incident': 1,
  'Demande': 2,
  'Request': 2
};
```

---

## 2. Résolution Insensible à la Casse (`getMapValue`)

Afin d'éviter les échecs d'importation causés par des fautes de frappe mineures, des espaces en trop ou des différences de casse dans le fichier CSV (ex: `"in progress "` ou `"CLOSED"`), la fonction `getMapValue` applique une recherche normalisée.

```javascript
/**
 * Recherche une valeur dans un dictionnaire de façon insensible à la casse et aux espaces.
 * 
 * @param {Object} map - Le dictionnaire de correspondance.
 * @param {string} key - La clé brute lue depuis le CSV.
 * @returns {number|undefined} L'ID GLPI ou undefined si non trouvé.
 */
const getMapValue = (map, key) => {
  if (!key) return undefined;
  
  // Nettoyage des espaces de début et de fin
  const normalizedKey = key.trim();
  
  // 1. Tentative de correspondance exacte (rapide)
  if (map[normalizedKey]) return map[normalizedKey];
  
  // 2. Recherche insensible à la casse
  const lowerKey = normalizedKey.toLowerCase();
  for (const [mapKey, mapValue] of Object.entries(map)) {
    if (mapKey.toLowerCase() === lowerKey) return mapValue;
  }
  
  return undefined;
};
```

---

## 3. Workflow Spécifique pour la Clôture des Tickets

### Le Problème GLPI API
L'API REST de GLPI interdit par défaut la création directe d'un ticket avec le statut **Terminé / Clos** (`6`). Toute tentative d'envoi d'un payload de création avec `status: 6` est rejetée ou réinitialisée par le moteur de règles de GLPI.

### La Solution d'Importation Séquentielle
Pour contourner cette règle tout en conservant les données historiques du CSV, le service d'importation procède en **deux étapes** :

1. **Création initiale** : Le ticket est créé avec le statut **Nouveau** (`1`) si le statut cible est Clos, ou avec son statut cible normal.
2. **Transition après création** : Une fois l'ID du ticket créé obtenu, une requête de mise à jour (`PUT`) est immédiatement envoyée pour forcer le statut à `6` (Clos) et injecter les dates de résolution et de clôture.

```javascript
// Résolution du statut cible
const targetStatusValue = getMapValue(statusMap, status) || 1;

// Étape 1 : Préparation du payload de création
// Si le statut ciblé est Clos (6), on le crée temporairement en Nouveau (1)
const ticketData = {
  name: titre,
  content: description,
  date: formattedDate, // Date et heure de déclaration historiques
  status: targetStatusValue === 6 ? 1 : targetStatusValue,
  priority: getMapValue(priorityMap, priority) || 3,
  type: getMapValue(typeMap, type) || 1
};

try {
  // Soumission du ticket parent
  const ticketResponse = await TicketService.createTicket(ticketData);
  const newTicketId = ticketResponse.id;

  // [...] Liaison des équipements ...

  // Étape 2 : Transition asynchrone vers le statut Clos
  if (targetStatusValue === 6) {
    try {
      await TicketService.updateTicket(newTicketId, {
        status: 6,
        solvedate: formattedDate, // Date de résolution historique
        closedate: formattedDate  // Date de clôture historique
      });
    } catch (err) {
      console.error(`Erreur lors de la mise à jour forcée vers Clos pour le ticket ${newTicketId}:`, err);
    }
  }

  return { success: true, id: newTicketId, refTicket: refTicket };
} catch (error) {
  console.error(`Erreur d'import du ticket ${refTicket}:`, error);
  throw error;
}
```

---

## 4. Recommandations pour la Phase de Tests

Durant les tests de robustesse (aléas de données), surveillez ces scénarios de mapping :
1. **Statut invalide dans le CSV** : Si un statut inconnu (ex: `"Erreur de saisie"`) est présent, valider que la fonction retourne par défaut le statut `1` (Nouveau) sans lever d'exception.
2. **Priorité inconnue** : Vérifier que la valeur par défaut `3` (Priorité Moyenne) est affectée.
3. **Saisie mal formatée** : Insérer des espaces en début/fin ou des variations de majuscules (ex: `"   planned   "`, `"in pRoGrEsS"`) dans le CSV et confirmer que l'importation résout correctement les statuts respectifs.
