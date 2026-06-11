# Documentation Technique : Page d'Importation GLPI

Ce document décrit l'architecture, le fonctionnement et la robustesse de la page d'importation GLPI (`GLPIImportPage.jsx`). Demain, cette page va subir une phase de tests contenant des scénarios complexes (edge cases, données altérées, coupures réseau). Cette documentation sert de référence pour comprendre et valider les comportements de la page.

---

## 1. Vue d'ensemble de la page

### Objectif principal
La page **Import GLPI (CSV)** permet d'alimenter massivement la base de données GLPI avec des équipements (ordinateurs, moniteurs, etc.), des tickets de support et des coûts associés, le tout de manière cohérente et structurée chronologiquement. Elle gère également l'importation de pièces jointes visuelles (images) sous format ZIP pour les associer à leurs équipements respectifs.

### Actions clés de l'utilisateur
1. **Sélectionner des fichiers sources** :
   * **Feuille 1 (Équipements)** : Fichier CSV décrivant les actifs matériels.
   * **Feuille 2 (Tickets)** : Fichier CSV décrivant l'assistance et les incidents déclarés.
   * **Feuille 3 (Coûts)** : Fichier CSV associant des données de facturation (temps et coûts fixes) aux tickets.
   * **Images (.zip)** : Dossier compressé contenant les photos nommées d'après le nom de l'équipement (ex: `PC-ADM-001.png`).
2. **Visualiser la conformité des fichiers** : Analyse instantanée et pré-validation locale des en-têtes et des valeurs des fichiers chargés avant le lancement de l'import.
3. **Lancer le traitement synchrone** : Traitement séquentiel avec barre de progression interactive et journal technique (Terminal) mis à jour en temps réel.

---

## 2. Éléments Techniques & Dépendances

### Les Services Clés

* **`GLPIImportServiceFast`** (`src/services/import/GLPIImportServiceFast.js`) :
  * Orchestre la validation globale des structures CSV (`validateItemFile`, `validateTicketFile`, `validateCostFile`).
  * Gère l'importation unitaire asynchrone des lignes de données (`importItemRow`, `importTicketRow`, `importCostRow`) en communiquant directement avec les APIs REST du backoffice.
* **`GLPIImageImportService`** (`src/services/import/GLPIImageImportService.js`) :
  * Extrait les images d'un fichier ZIP client à l'aide de `JSZip`.
  * Résout de manière dynamique l'existence de l'équipement destinataire dans GLPI.
  * Convertit automatiquement les fichiers PNG en JPEG via l'API Canvas pour éviter le bug de stockage GLPI (les fichiers PNG non autorisés finissant en `filepath = NULL` en base de données).
  * Effectue l'upload multipart sur `/Document` et crée l'association via `/Document_Item`.
* **`ImportValidationService`** (`src/services/import/ImportValidationService.js`) :
  * Valide les types de données (date au format `JJ/MM/AAAA`, heure en `HH:mm:ss`, valeurs numériques positives, en-têtes de colonnes exactes).
* **`GLPIImportHelpers`** (`src/services/import/GLPIImportHelpers.js`) :
  * Utilitaire de résolution de dépendances externes (recherche et création automatique à la volée des lieux, fabricants, états, modèles d'ordinateurs et utilisateurs si ces entités n'existent pas encore dans GLPI).

### Flux de données et State Management

* **Fichiers locaux et Previews** (`file1`, `file2`, `file3`, `fileImages`, `preview1`, `preview2`, `preview3`) : stockent les objets `File` bruts et les tableaux de données parsées (`headers` et `rows`).
* **Suivi de Progression** (`progress`, `isImporting`) :
  * `isImporting` : Verrouille l'interface pour empêcher toute interaction concurrente pendant le transfert.
  * `progress` : Entier calculé dynamiquement sur la base du ratio : `(lignes traitées / total des lignes des 3 fichiers) * 100`.
* **Retours Utilisateur** (`validationErrors`, `results`, `messages`) :
  * `validationErrors` : Tableau listant les anomalies structurelles bloquantes trouvées lors de la pré-lecture.
  * `results` : Compteur de succès/erreurs (`{ success, errors, details }`) pour le rapport de fin de traitement.
  * `messages` : Journal des actions techniques affiché dans le terminal simulé en bas de page.

---

## 3. Anticipation des Aléas (Pre-shot des risques)

### A. Aléas liés aux requêtes et au réseau
1. **Échec d'une requête unitaire d'import** : Une ligne échoue en plein milieu du traitement (ex: timeout de l'API GLPI lors de la création d'un Computer).
2. **Perte de connexion complète** : Coupure réseau au milieu d'un import de 500 lignes.
3. **Temps de réponse très élevé (Slow network)** : L'API GLPI met plusieurs secondes à répondre pour chaque équipement à cause d'une charge serveur externe.

### B. Aléas liés aux données
1. **Absence de dépendances de clés primaires dans les fichiers** :
   * Le fichier des Coûts (Feuille 3) fait référence à un `Num_Ticket` absent du fichier des Tickets (Feuille 2).
   * Le fichier des Tickets (Feuille 2) fait référence à des équipements (`Items`) qui n'ont pas encore été créés dans le fichier 1 ou qui n'existent pas du tout dans GLPI.
2. **Données manquantes ou valeurs nulles** : Colonnes requises (ex: `Name` pour un ordinateur ou `Ref_Ticket` pour un ticket) laissées vides dans le CSV.
3. **En-têtes incorrectes (Format inattendu)** : Le fichier CSV contient des colonnes dans le mauvais ordre ou avec des intitulés modifiés (ex: "Nom" au lieu de "Name").
4. **CSV mal formé ou corrompu** : Guillemets non refermés, sauts de lignes inattendus au sein d'une valeur de colonne, ou délimiteurs inadéquats (ex: point-virgule `;` au lieu de virgule `,`).

### C. Aléas liés à l'interface (UI/UX)
1. **Double-clic de soumission (Spamming)** : L'utilisateur clique plusieurs fois rapidement sur le bouton "Démarrer l'import" alors que le script s'initialise.
2. **Affichage mobile/petits écrans** : L'interface subit des contraintes d'espace (notamment le Terminal et la grille des fichiers).
3. **Fichiers gigantesques** : Téléchargement d'un fichier ZIP d'images de 300 Mo ou de CSV contenant 10 000 lignes, risquant de saturer la mémoire du navigateur.
4. **Bouton d'import cliquable malgré des erreurs** : Forcer l'importation de données structurellement invalides.

### D. Aléas liés à la logique métier
1. **Dépendance séquentielle stricte** : Tentative d'importation des Coûts sans charger le fichier de Tickets (ou l'inverse), brisant l'intégrité relationnelle (le coût ne pouvant être rattaché à aucun ID réel GLPI).
2. **Doublons d'équipements** : Exécuter l'import deux fois de suite, créant des doublons d'ordinateurs en base de données si l'unicité n'est pas gérée.
3. **Images orphelines dans le ZIP** : Fichier image nommé `PC-INEXISTANT.jpg` ne correspondant à aucun équipement présent dans la base de données GLPI.

---

## 4. Mitigations et Comportements Attendus

| Identifiant Aléa | Description du Risque | Comportement Attendu / Atténuation Implémentée |
| :--- | :--- | :--- |
| **A-1 (Échec unitaire)** | Une ligne de données provoque une erreur API (ex: 500 Internal Error). | **Non-bloquant pour le reste du fichier** : L'erreur est capturée dans un bloc `try/catch` local. Le compteur `results.errors` s'incrémente, le détail de l'erreur est ajouté au rapport avec le numéro de ligne concerné, et le traitement passe immédiatement à la ligne suivante sans interrompre le processus global. |
| **A-2 (Coupure réseau)** | Perte totale de connexion internet ou serveur GLPI hors-ligne. | **Arrêt sécurisé et journalisé** : La requête en cours échouera en timeout/erreur réseau. Le terminal affichera un message d'erreur rouge explicite (ex: `Erreur critique: Network Error`). L'import s'arrête proprement et l'état `isImporting` est repassé à `false` pour permettre à l'utilisateur de ré-essayer ultérieurement. |
| **A-3 (Réseau lent)** | Temps de réponse longs provoquant un gel visuel. | **Désactivation globale + Barre de progression** : Tous les champs et le bouton d'importation sont désactivés (`disabled`). La barre de progression affiche le pourcentage exact d'avancement calculé dynamiquement après chaque résolution de ligne, assurant à l'utilisateur que le processus est actif. |
| **B-1 (Clés manquantes)** | Liaison impossible (ex: coût pour un ticket inexistant). | **Vérification et rejet propre** : Lors du traitement du fichier 3, si `ticketMap[numTicket]` est introuvable, une exception explicite est levée (`Ticket correspondant introuvable pour Num_Ticket: X`). L'erreur est logguée et ajoutée au rapport d'erreur final pour cette ligne de coût spécifique, sans planter l'application. |
| **B-2 (Données vides)** | Colonnes obligatoires vides dans le CSV. | **Rejet en pré-validation** : `ImportValidationService` analyse chaque ligne dès le chargement du fichier. S'il manque un champ obligatoire (ex: `Name`), l'erreur est ajoutée à `validationErrors`, bloquant immédiatement le bouton "Démarrer l'import". Un message d'alerte rouge indique la ligne et le champ fautif. |
| **B-3 (En-têtes erronés)** | Colonnes renommées ou inversées dans les CSV. | **Rejet immédiat au chargement** : La fonction `validateCSVHeaders` compare les en-têtes avec la liste de référence. Si une différence est détectée, le fichier est considéré comme invalide, un message d'erreur d'en-tête s'affiche, et le bouton d'importation est verrouillé. |
| **B-4 (CSV corrompu)** | Parsing chaotique dû à une mauvaise syntaxe CSV. | **Robuste parseur interne** : La méthode `parseCSV` implémente un parcours de caractères prenant en compte la gestion des guillemets (`inQuotes`), évitant que des virgules situées à l'intérieur de descriptions textuelles ne fragmentent faussement les colonnes. |
| **C-1 (Spamming)** | Clics répétés sur le bouton d'importation. | **Verrouillage de l'UI** : Dès le clic sur le bouton, `isImporting` passe à `true`. Ce state désactive instantanément le bouton de soumission et tous les contrôles d'upload de fichiers, empêchant le lancement de tâches d'importation parallèles. |
| **C-2 (Affichage mobile)** | UI inutilisable sur petits terminaux. | **Flexibilité responsive** : La grille de chargement utilise `.import-grid` avec un affichage adaptatif vertical sur petit écran (`flex-direction: column`). Le journal technique en bas de page est auto-scrollable verticalement avec une hauteur fixe pour préserver l'ergonomie. |
| **C-3 (Fichiers lourds)** | Crash du navigateur par saturation mémoire. | **Vérification de taille** : La taille de chaque fichier est validée à la sélection via `validateFile`. Si un fichier dépasse la limite configurée (par défaut 10 Mo pour les CSV), il est rejeté avec un message clair. |
| **D-1 (Séquentialité)** | Mauvais ordre d'importation des fichiers. | **Résilience de la liaison** : L'importation s'effectue dans un ordre logique strict codé en dur dans `handleImport` (1. Équipements, 2. Tickets, 3. Coûts, 4. Images). Même si les fichiers sont sélectionnés dans le désordre par l'utilisateur, l'exécution respectera toujours cet enchaînement afin de garantir la disponibilité des entités parentes. |
| **D-2 (Doublons)** | Lancement multiple de l'importation. | **Résolution dynamique (Idempotence)** : Lors de la création d'équipements, `GLPIImportHelpers.findOrCreateEntity` effectue systématiquement un appel de recherche (`getAll...`) pour vérifier si une entité de même nom existe déjà. Si oui, elle récupère son ID existant au lieu d'en recréer une nouvelle, limitant drastiquement la prolifération de doublons. |
| **D-3 (Images orphelines)**| Image présente dans le ZIP sans équipement associé dans GLPI. | **Rapport d'anomalie propre** : Si `findItemByName` ne retourne aucun équipement, l'image n'est pas envoyée au serveur GLPI. L'erreur est consignée dans le rapport final (`Équipement "X" introuvable dans GLPI`), et le script passe à l'image suivante. |

---

## 5. Recommandations pour la session de tests de demain

Pour garantir une couverture de tests optimale, il est recommandé de préparer :
1. **Un jeu de données CSV "nominal"** : Contenant tous les champs valides et les en-têtes corrects.
2. **Un jeu de données CSV "altéré"** :
   * Une en-tête mal écrite pour tester le blocage instantané.
   * Une date invalide (ex: `2026/12/31` au lieu de `31/12/2026`) pour valider le message de ligne d'erreur.
   * Une ligne avec un champ `Name` vide.
3. **Un fichier ZIP d'images mixtes** :
   * Une image correspondant à un équipement existant.
   * Une image PNG (pour tester la conversion automatique en JPEG).
   * Une image orpheline (nom d'équipement inexistant) pour valider le signalement d'erreur sans crash.

---

## 6. Exemples concrets de code pour la gestion des Aléas

Voici des exemples précis illustrant comment les aléas critiques sont interceptés et gérés par le code de l'application.

### A. Format de Date Incorrect (Aléa B-2)
* **Description** : L'utilisateur fournit une date au format `2026-06-11` ou `11-06-2026` au lieu de `11/06/2026`.
* **Exemple de CSV invalide** :
  ```csv
  Ref_Ticket,Date,Heure,Type,Titre,Description,Status,Priority,Items
  T-001,2026-06-11,08:30:00,Incident,Panne réseau,...,New,Medium,PC-ADM-001
  ```
* **Extrait de code de validation (`ImportValidationService.js`)** :
  ```javascript
  validateDate: (dateStr, fieldName = 'date', lineNumber = null) => {
    const errors = [];
    if (!dateStr || !dateStr.trim()) {
      errors.push(ImportValidationService.formatError(fieldName, 'ne doit pas être vide', lineNumber));
      return { valid: false, errors };
    }
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Impose strictement JJ/MM/AAAA
    if (!dateRegex.test(dateStr)) {
      errors.push(ImportValidationService.formatError(fieldName, 'doit être au format JJ/MM/AAAA', lineNumber));
      return { valid: false, errors };
    }
    return { valid: true, errors: [] };
  }
  ```
* **Comportement UI** : L'importation est bloquée. Un message d'alerte rouge s'affiche sous les champs : `Fichier 2 (Tickets): Ligne 2 : Le champ "Date" doit être au format JJ/MM/AAAA`.

### B. Lien vers un Ticket Inexistant dans les Coûts (Aléa B-1)
* **Description** : Le fichier des coûts fait référence à un ticket `T-999` qui n'a pas été défini dans le fichier des tickets.
* **Exemple de CSV invalide** :
  ```csv
  Num_Ticket,Duration_second,Time_Cost,Fixed_Cost
  T-999,3600,50,20
  ```
* **Extrait de code de gestion (`GLPIImportServiceFast.js`)** :
  ```javascript
  importCostRow: async (row, ticketMap) => {
    const [numTicket, durationSecond, timeCost, fixedCost] = row;
    
    // Résolution dans la table de correspondance construite à l'étape précédente
    const realTicketId = ticketMap[numTicket];
    
    if (!realTicketId) {
      // Lancement d'une erreur contrôlée pour cette ligne spécifique
      throw new Error(`Ticket correspondant introuvable pour Num_Ticket: ${numTicket}`);
    }
    ...
  }
  ```
* **Comportement UI** : La ligne est sautée lors de l'import, `results.errors` est incrémenté, et le journal technique affiche : `[18:52:00] Ticket T-999 : Ticket correspondant introuvable pour Num_Ticket: T-999`.

### C. Conversion de Format Image PNG vers JPEG (Aléa D-3)
* **Description** : Les fichiers PNG sont rejetés silencieusement par la base de données GLPI sous certaines configurations (champs `filepath` et `filename` à `NULL` en base de données).
* **Extrait de code de conversion à la volée (`GLPIImageImportService.js`)** :
  ```javascript
  const convertPngToJpeg = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#FFFFFF'; // Force un fond blanc sous la transparence PNG
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        URL.revokeObjectURL(objectUrl);
        canvas.toBlob((blob) => {
          const jpegName = file.name.replace(/\.png$/i, '.jpg');
          resolve(new File([blob], jpegName, { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.92);
      };
      img.src = objectUrl;
    });
  };
  ```
* **Comportement attendu** : Une image nommée `PC-ADM-001.png` dans l'archive ZIP est extraite, convertie en fichier `PC-ADM-001.jpg` dans la mémoire du navigateur, puis envoyée proprement à l'API GLPI `/Document` avec le type mime `image/jpeg`.

### D. Résolution dynamique et robuste d'entités avec auto-création (`GLPIImportHelpers.findOrCreateEntity`)
* **Description** : Si une entité comme un fabricant (`Dell`), un lieu (`Salle B`), ou un état (`En Service`) est mentionné dans le CSV mais n'existe pas dans GLPI, le script l'identifie et la crée automatiquement à la volée plutôt que de lever une erreur.
* **Extrait de code (`GLPIImportHelpers.js`)** :
  ```javascript
  findOrCreateEntity: async (service, entityName, nameField = 'name') => {
    if (!entityName || !entityName.trim()) return null;
    
    // 1. Recherche par correspondance insensible à la casse
    try {
      const items = await service[`getAll${service.name.replace('Service', 's')}`]();
      const existing = items.find(item => item[nameField] && item[nameField].toLowerCase() === entityName.toLowerCase());
      if (existing) {
        return existing.id; // Renvoie l'ID s'il existe déjà
      }
    } catch (e) {
      console.warn(`Erreur lors de la recherche de ${entityName}`, e);
    }
    
    // 2. Si l'entité n'existe pas, on tente une création à la volée
    try {
      const data = {};
      data[nameField] = entityName;
      const response = await service[`create${service.name.replace('Service', '')}`](data);
      return response.id; // Renvoie le nouvel ID créé
    } catch (e) {
      console.error(`Erreur lors de la création de ${entityName}`, e);
      return null;
    }
  }
  ```
* **Atténuation apportée** : Évite les blocages d'importation pour cause de référentiel vide. La base GLPI s'auto-complète de façon transparente.

### E. Scanner de chaînes CSV pour se prémunir des délimiteurs encapsulés (Aléa B-4)
* **Description** : Un simple `line.split(',')` découpera par erreur une description contenant des virgules (ex: `"Panne de secteur, le disjoncteur a sauté"`). Notre parseur utilise une logique d'état pour ignorer les délimiteurs encapsulés dans des guillemets.
* **Extrait de code (`GLPIImportPage.jsx`)** :
  ```javascript
  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length === 0) return { headers: [], rows: [] };
    
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
          inQuotes = !inQuotes; // Toggle de l'état "dans les guillemets"
        } else if (char === ',' && !inQuotes) {
          result.push(current); // Nouvelle colonne trouvée
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current);
      return result;
    };

    const headers = parseLine(lines[0]);
    const rows = lines.slice(1).map(parseLine);
    return { headers, rows };
  };
  ```
* **Atténuation apportée** : Immunise l'importation contre le décalage de colonnes causé par des virgules insérées dans des zones de texte libre (champs Description, Titre, etc.).

### F. Normalisation des séparateurs décimaux pour valeurs monétaires (Aléa B-2)
* **Description** : Les fichiers d'importation de coûts peuvent utiliser des virgules ou des points pour séparer les décimales (ex: `12,50` ou `12.50`). L'API de validation normalise ces entrées avant conversion numérique.
* **Extrait de code (`ImportValidationService.js`)** :
  ```javascript
  validateNumber: (value, fieldName, options = {}, lineNumber = null) => {
    const errors = [];
    if (value === undefined || value === null || value === '') {
      return { valid: false, errors: [ImportValidationService.formatError(fieldName, 'ne doit pas être vide', lineNumber)] };
    }

    // Remplace la virgule par un point pour être compatible avec Number()
    const cleanValue = typeof value === 'string' ? value.replace(',', '.') : value;
    const num = Number(cleanValue);

    if (isNaN(num)) {
      return { valid: false, errors: [ImportValidationService.formatError(fieldName, 'doit être un nombre valide', lineNumber)] };
    }

    if (options.min !== undefined && num < options.min) {
      errors.push(ImportValidationService.formatError(fieldName, `doit être >= ${options.min}`, lineNumber));
    }
    ...
    return { valid: true, errors: [], value: num };
  }
  ```
* **Atténuation apportée** : Évite les erreurs de conversion `NaN` lors du traitement des colonnes financières (`Time_Cost`, `Fixed_Cost`).

### G. Association tolérante des équipements aux tickets (Aléa D-1)
* **Description** : Si un ticket fait référence à plusieurs équipements (ex: `["PC-ADM-001", "PC-ABSENT"]`), et que l'un d'eux n'existe pas, l'importation du ticket doit tout de même réussir en liant l'équipement trouvé et en ignorant proprement le manquant avec un simple avertissement dans les logs de la console.
* **Extrait de code (`GLPIImportServiceFast.js`)** :
  ```javascript
  // Lier les équipements associés
  if (itemsStr && itemsStr.trim()) {
    try {
      let cleanStr = itemsStr.trim();
      // Nettoyage et formatage JSON sécurisé de la chaîne (ex: ["PC-1", "PC-2"])
      ...
      const itemsArray = JSON.parse(cleanStr);
      for (const itemRef of itemsArray) {
        // Recherche multi-équipements (Computer, Monitor, Printer, etc.)
        const itemData = await GLPIImportServiceFast.resolveItem(itemRef);
        if (itemData) {
          // Liaison via Document / Item
          await ItemTicketService.linkItemToTicket(newTicketId, itemData.id, itemData.type);
        } else {
          // Avertissement sans planter le script
          console.warn(`Équipement non trouvé pour liaison au ticket: ${itemRef}`);
        }
      }
    } catch (e) {
      console.warn(`Erreur lors du parsing des items pour le ticket ${titre}:`, e.message);
    }
  }
  ```
* **Atténuation apportée** : Garantit que des fautes de frappe sur des noms d'équipements liés ne bloquent pas la création du ticket de support sous-jacent.

### H. Double-transaction séquentielle pour le statut d'achèvement (Statut 6 - Closed) (Aléa D-1)
* **Description** : Dans GLPI, un ticket ne peut pas être créé directement avec le statut fermé sans avoir préalablement été enregistré avec les dates adéquates. Le script effectue une création initiale puis un patch de mise à jour.
* **Extrait de code (`GLPIImportServiceFast.js`)** :
  ```javascript
  // 1. Création initiale (Force temporairement un statut compatible)
  const ticketData = {
    name: titre,
    content: description,
    date: formattedDate,
    status: targetStatusValue === 6 ? 1 : targetStatusValue, // Statut 1 (Nouveau) si Closed
    priority: priorityVal,
    type: typeVal
  };
  
  const ticketResponse = await TicketService.createTicket(ticketData);
  const newTicketId = ticketResponse.id;

  // 2. Si le statut cible était "Closed" (6), appliquer la transition avec solvedate/closedate
  if (targetStatusValue === 6) {
    try {
      await TicketService.updateTicket(newTicketId, {
        status: 6,
        solvedate: formattedDate,
        closedate: formattedDate
      });
    } catch (err) {
      console.error(`Erreur mise à jour statut Closed pour ticket ${newTicketId}:`, err);
    }
  }
  ```
* **Atténuation apportée** : Prévient les rejets de l'API GLPI qui refuse d'enregistrer directement un ticket fermé sans historique de traitement.


