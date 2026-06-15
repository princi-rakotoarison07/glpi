# Documentation Technique : Front Office React (Pages & UI)

Ce document décrit l'implémentation, la structure et la logique de l'espace Front Office (`react-app/src/pages/frontoffice`) de l'application GLPI. Cet espace offre aux demandeurs et techniciens une interface simplifiée et esthétique pour la déclaration de tickets, le suivi Kanban et la consultation multi-critères des actifs.

---

## 1. Vue d'ensemble de l'espace Front Office

Le Front Office regroupe 7 vues principales articulées autour du layout global `FrontOfficeLayout` :
1. **`Accueil.jsx`** : Page d'accueil portail contenant des raccourcis sous forme de tuiles interactives.
2. **`ElementsList.jsx`** : Grille de recherche multicritères unifiée interrogeant l'ensemble des types d'équipements du parc.
3. **`TicketList.jsx`** : Tableau paginé répertoriant les tickets associés à l'utilisateur connecté.
4. **`TicketCreate.jsx`** : Formulaire de création de ticket avec sélection de priorité, type et association d'équipements.
5. **`TicketDetail.jsx`** : Vue détaillée avec fil de discussion, historique d'activité, documents et tâches.
6. **`TicketUpdate.jsx`** : Interface d'édition des métadonnées du ticket et d'assignation de techniciens.
7. **`TicketKanban.jsx`** : Tableau Kanban de suivi des statuts (Nouveau## 2. Analyse et Exemples de Code des Fonctionnalités Clés

### A. Chargement de l'élément de parc par type dynamique (`fetchFullItem`)
Dans `TicketDetail.jsx`, lorsqu'un ticket est lié à plusieurs matériels, l'API GLPI REST ne retourne que les ID et le type (`Computer`, `Monitor`, etc.). La fonction `fetchFullItem` effectue un appel asynchrone ciblé sur le service adéquat selon le type pour récupérer la fiche complète du matériel (modèle, numéro de série, lieu).

```javascript
const fetchFullItem = async (itemType, itemId) => {
  try {
    switch (itemType) {
      case 'Computer':
        return await ComputerService.getComputerById(itemId);
      case 'Monitor':
        return await MonitorService.getMonitorById(itemId);
      case 'Software':
        return await SoftwareService.getSoftwareById(itemId);
      case 'Printer':
        return await PrinterService.getPrinterById(itemId);
      case 'Pdu':
      case 'PDU':
        return await PDUService.getPDUById(itemId);
      case 'Rack':
        return await RackService.getRackById(itemId);
      case 'Phone':
        return await PhoneService.getPhoneById(itemId);
      case 'Chassis':
      case 'Enclosure':
        return await ChassisService.getChassisById(itemId);
      case 'NetworkEquipment':
        return await NetworkEquipmentService.getNetworkEquipmentById(itemId);
      case 'SoftwareLicense':
        return await SoftwareLicenseService.getSoftwareLicenseById(itemId);
      case 'Peripheral':
        return await PeripheralService.getPeripheralById(itemId);
      case 'DatabaseInstance':
        return await DatabaseInstanceService.getDatabaseInstanceById(itemId);
      case 'DCRoom':
        return await DCRoomService.getDCRoomById(itemId);
      default:
        return null;
    }
  } catch (error) {
    console.error(`Error fetching ${itemType} with id ${itemId}:`, error);
    return null;
  }
};
```

---

### B. Chargement des détails complexes du ticket (`fetchTicketDetails`)
Cette fonction centralise la récupération de toutes les relations d'un ticket en une seule fois via `Promise.all` : les caractéristiques du ticket, les matériels liés, les états, emplacements, fabricants, coûts, et l'ensemble des relations utilisateurs.

```javascript
const fetchTicketDetails = async () => {
  setLoading(true);
  try {
    const [
      ticketData,
      itemsData,
      statesData,
      locationsData,
      manufacturersData,
      computerModelsData,
      costsData,
      relationsData
    ] = await Promise.all([
      TicketService.getTicket(id),
      ItemTicketService.getItemsForTicket(id),
      StateService.getAllStates().catch(() => []),
      LocationService.getAllLocations().catch(() => []),
      ManufacturerService.getAllManufacturers().catch(() => []),
      ComputerModelService.getAllComputerModels().catch(() => []),
      TicketCostService.getTicketCosts(id).catch(() => []),
      TicketService.getTicketUsers().catch(() => [])
    ]);

    setTicket(ticketData);
    setTicketCosts(Array.isArray(costsData) ? costsData : []);

    // Identification du demandeur direct (relation type === 1)
    const rels = Array.isArray(relationsData) ? relationsData : [];
    const reqLink = rels.find(rel => Number(rel.tickets_id) === Number(id) && Number(rel.type) === 1);
    setRequesterId(reqLink ? reqLink.users_id : null);

    // Chargement détaillé des matériels liés (Appel asynchrone parallèle pour chaque lien)
    setLoadingLinkedItems(true);
    const itemsWithDetails = await Promise.all(
      (itemsData || []).map(async (linkedItem) => {
        const fullItem = await fetchFullItem(linkedItem.itemtype, linkedItem.items_id);
        return { ...linkedItem, fullItem };
      })
    );

    // Mappage des informations pour l'affichage dans le tableau
    const mappedItems = itemsWithDetails.map(item => {
      const typeLabel = itemTypeOptions.find(t => t.value.toLowerCase() === item.itemtype.toLowerCase())?.label || item.itemtype;
      const rawItem = item.fullItem || {};
      return {
        id: item.items_id,
        itemType: item.itemtype,
        name: rawItem.name || `ID: ${item.items_id}`,
        typeLabel: typeLabel,
        serial: rawItem.serial || '-',
        linkId: item.id
      };
    });
    setLinkedItems(mappedItems);
  } catch (error) {
    console.error('Error fetching ticket details:', error);
  } finally {
    setLoading(false);
    setLoadingLinkedItems(false);
  }
};
```

---

### C. Formateurs de dates et sélecteurs de badges (`formatDate` & `getStatusInfo`)
Afin d'offrir une interface soignée et lisible, le Front Office transforme les dates ISO complexes en notations locales françaises et applique des styles CSS colorés selon le statut ou la priorité.

```javascript
// Formate les dates ISO au format local JJ/MM/AAAA HH:MM
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Récupère les métadonnées esthétiques (couleurs et libellés) d'un statut
const getStatusInfo = (statusId) => {
  const option = statusOptions.find(opt => opt.value === Number(statusId));
  return option || { label: 'Inconnu', color: '#9e9e9e', bg: '#f5f5f5' };
};
```

---

### D. Agrégation sécurisée et robuste du parc informatique (`ElementsList.jsx`)
Pour afficher tous les types d'équipements dans une grille de recherche unique, l'application exécute des requêtes de lecture en parallèle. 
* **Gestion du risque** : Si le serveur GLPI ou les droits utilisateur bloquent l'accès à un type d'équipement spécifique, le chargement global ne doit pas planter. Un wrapper d'interception `safeFetch` est implémenté pour capturer individuellement les erreurs et retourner un tableau vide en fallback.

```javascript
const fetchAllElements = async () => {
  setLoading(true);
  try {
    const safeFetch = async (fetchFn, fallback = []) => {
      try {
        return await fetchFn();
      } catch (error) {
        console.warn('Échec de récupération unitaire, utilisation du fallback', error.message);
        return fallback;
      }
    };

    const elementsListTypes = getElementsListItemTypes();
    
    // Mappage dynamique des types vers les méthodes des services correspondants
    const serviceMap = {
      Computer: ComputerService.getAllComputers,
      Monitor: MonitorService.getAllMonitors,
      Software: SoftwareService.getAllSoftware,
      Printer: PrinterService.getAllPrinters,
      Pdu: PDUService.getAllPDUs,
      Rack: RackService.getAllRacks,
      Phone: PhoneService.getAllPhones,
      Enclosure: ChassisService.getAllChassis,
      NetworkEquipment: NetworkEquipmentService.getAllNetworkEquipment,
      SoftwareLicense: SoftwareLicenseService.getAllSoftwareLicenses,
      Peripheral: PeripheralService.getAllPeripherals,
      PassiveDCEquipment: PassiveDCEquipmentService.getAllPassiveDCEquipments,
      CartridgeItem: CartridgeItemService.getAllCartridgeItems,
      ConsumableItem: ConsumableItemService.getAllConsumableItems,
      Cable: CableService.getAllCables,
      DatabaseInstance: DatabaseInstanceService.getAllDatabaseInstances,
      DCRoom: DCRoomService.getAllDCRooms
    };

    // 1. Lancement parallèle des requêtes pour les équipements
    const itemPromises = elementsListTypes.map(type => 
      safeFetch(serviceMap[type.itemType])
    );

    // 2. Lancement parallèle des dictionnaires de correspondances (Lieux, Fabricants, États)
    const [states, locations, manufacturers] = await Promise.all([
      safeFetch(StateService.getAllStates),
      safeFetch(LocationService.getAllLocations),
      safeFetch(ManufacturerService.getAllManufacturers)
    ]);

    // Conversion des dictionnaires en tables de hachage associatives { ID: Nom }
    const statesMap = {};
    (states || []).forEach(state => statesMap[state.id] = state.name);

    const locationsMap = {};
    (locations || []).forEach(loc => locationsMap[loc.id] = loc.name);

    const manufacturersMap = {};
    (manufacturers || []).forEach(mf => manufacturersMap[mf.id] = mf.name);

    // 3. Attente des résultats unitaires du parc
    const itemsResults = await Promise.all(itemPromises);

    // Fusion de tous les tableaux en une seule structure de données
    const elements = [];
    elementsListTypes.forEach((type, index) => {
      elements.push(...itemsResults[index].map(item => ({ ...item, type: type.itemType })));
    });

    setRelatedData({
      states: statesMap,
      locations: locationsMap,
      manufacturers: manufacturersMap
    });

    setAllElements(elements);
    setFilteredElements(elements);
  } catch (error) {
    console.error('Error fetching elements:', error);
    setAllElements([]);
    setFilteredElements([]);
  } finally {
    setLoading(false);
  }
};
```

---

### E. Filtrage dynamique et réactif en mémoire (`ElementsList.jsx`)
Une fois les données combinées dans le state `allElements`, les filtres (Recherche textuelle par Nom ou Numéro de Série, filtrage par Fabricant ou Emplacement) sont appliqués côté client au sein d'un hook `useEffect`, évitant de surcharger le réseau GLPI REST.

```javascript
useEffect(() => {
  let filtered = [...allElements];

  // 1. Filtrage par type d'élément
  if (filters.type) {
    filtered = filtered.filter(el => el.type === filters.type);
  }

  // 2. Recherche textuelle insensible à la casse sur le nom ou le numéro de série
  if (filters.searchText) {
    const searchLower = filters.searchText.toLowerCase();
    filtered = filtered.filter(el => {
      return (el.name && el.name.toLowerCase().includes(searchLower)) ||
             (el.serial && el.serial.toLowerCase().includes(searchLower));
    });
  }

  // 3. Filtrage par emplacement (via ID étranger)
  if (filters.location) {
    filtered = filtered.filter(el => String(el.locations_id) === filters.location);
  }

  // 4. Filtrage par fabricant / éditeur (via ID étranger)
  if (filters.manufacturer) {
    filtered = filtered.filter(el => String(el.manufacturers_id) === filters.manufacturer);
  }

  setFilteredElements(filtered);
  setCurrentPage(1); // Retour automatique à la première page
}, [filters, allElements]);
```

---

### F. Déclaration de ticket avec liaison de matériels (`TicketCreate.jsx`)
La vue de création d'un ticket demande d'abord l'insertion de l'incident ou de la demande dans GLPI via `TicketService.createTicket`. En cas de succès, elle itère sur le tableau local d'équipements sélectionnés par l'utilisateur pour créer les associations dans la table `glpi_items_tickets` via `/Document_Item`.

```javascript
const handleCreateTicket = async (e) => {
  e.preventDefault();
  
  if (!ticketName.trim() || !ticketContent.trim()) {
    alert('Veuillez remplir le titre et la description.');
    return;
  }

  try {
    setSubmitting(true);
    
    // 1. Création du payload principal du ticket
    const payload = {
      name: ticketName.trim(),
      content: ticketContent.trim(),
      status: 1, // Statut initial "Nouveau"
      priority: Number(priority),
      type: Number(type),
      users_id_recipient: currentUser?.id || 0,
      _users_id_requester: currentUser?.id || 0
    };

    // Soumission du ticket parent
    const response = await TicketService.createTicket(payload);
    const newTicketId = response.id;

    // 2. Si des équipements ont été sélectionnés, créer les liens correspondants
    if (newTicketId && selectedItems.length > 0) {
      for (const item of selectedItems) {
        if (item.id && item.type) {
          // Liaison asynchrone via le service d'association
          await ItemTicketService.linkItemToTicket(newTicketId, item.id, item.type);
        }
      }
    }

    alert('Ticket créé avec succès !');
    navigate('/frontoffice/tickets');
  } catch (error) {
    console.error('Erreur de création du ticket:', error);
    alert('Une erreur est survenue : ' + error.message);
  } finally {
    setSubmitting(false);
  }
};
```

---

### G. Rendu robuste des champs avec valeurs par défaut (Fallback UI)
Puisque GLPI retourne des valeurs facultatives (champs `null` ou `undefined`), l'interface doit s'en prémunir pour éviter les crashs de rendu (ex: `Cannot read properties of null`). Un utilitaire d'affichage sécurisé `getValue` renvoie un indicateur visuel `-` par défaut.

```javascript
const getValue = (value, id, map) => {
  if (value) return value; // Si valeur directe renseignée
  if (id && map[id]) return map[id]; // Si ID à chercher dans le dictionnaire
  return '-'; // Fallback
};

// Exemple d'utilisation dans le tableau de rendu HTML :
<td>{getValue(element.serial)}</td>
<td>{getValue(null, element.locations_id, relatedData.locations)}</td>
<td>{getValue(null, element.manufacturers_id, relatedData.manufacturers)}</td>
```

---

## 3. Recommandations pour les Scénarios de Robustesse

Pour la session de tests de robustesse, vérifiez les comportements visuels suivants :
1. **Élément sans fabricant ni lieu** : Vérifier que la ligne dans le tableau `ElementsList` affiche bien un tiret `-` pour les colonnes concernées sans provoquer d'exception JavaScript.
2. **Recherche de caractères accentués** : Saisir des caractères spéciaux ou des accents (ex: `é`, `à`) dans le filtre de recherche de la page des éléments pour valider que la recherche reste fluide.
3. **Chargement avec droits insuffisants** : Bloquer volontairement l'accès à un service d'élément du parc pour valider que la page des éléments charge correctement les autres matériels grâce au mécanisme `safeFetch`.
ent du parc pour valider que la page des éléments charge correctement les autres matériels grâce au mécanisme `safeFetch`.
