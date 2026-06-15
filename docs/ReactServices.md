# Documentation Technique : Couche Services Front-End React

Ce document présente le fonctionnement et l'implémentation de la couche service (`react-app/src/services`) de l'application React. Ces modules permettent d'isoler la logique de requête HTTP (interfaçage avec l'API GLPI et le backend Express) de la partie rendu graphique des composants React.

---

## 1. Architecture Globale des Requêtes

Les services partagent une instance Axios centralisée située sous `react-app/src/config/api.js`. Cette instance gère automatiquement :
1. L'injection de l'**App-Token** et du **Session-Token** dans les en-têtes HTTP de chaque requête.
2. L'initialisation transparente de la session utilisateur GLPI.

---

## 2. Analyse des Services Clés (avec code)

### A. Service d'Authentification (`AuthService.js`)
Ce service gère la validation du code unique de sécurité configuré dans l'environnement, simule la connexion avec les accès d'API GLPI par défaut, initie la session GLPI REST, puis charge et enregistre les informations du compte dans la session locale du navigateur.

```javascript
import axios from 'axios';
import api from '../config/api';

const AuthService = {
    // Connexion via code d'authentification unique
    login: async (singleCode) => {
        try {
            if (!singleCode) {
                throw new Error('Code unique requis.');
            }

            // Récupération du code valide depuis les variables d'environnement
            const validCode = import.meta.env.VITE_SINGLE_AUTH_CODE || 'glpi123';
            if (singleCode !== validCode) {
                throw new Error('Code unique incorrect.');
            }

            // Identifiants de connexion GLPI par défaut
            const username = 'glpi';
            const password = 'glpi';

            // Encodage en Base64 pour l'en-tête Authorization (Basic Auth)
            const authHeader = 'Basic ' + btoa(username + ':' + password);
            const appToken = import.meta.env.VITE_APP_TOKEN;

            let sessionToken;
            try {
                // Requête directe d'initialisation de session GLPI
                const response = await axios.get(`/glpi-api/initSession`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'App-Token': appToken,
                        'Authorization': authHeader
                    }
                });
                sessionToken = response.data.session_token;
                
                // Injection du token de session dans l'instance API partagée
                api.defaults.headers.common['Session-Token'] = sessionToken;
            } catch (authError) {
                if (authError.response?.data?.[0] === 'ERROR_LOGIN_WITH_CREDENTIALS_DISABLED') {
                    throw new Error("La connexion par mot de passe est désactivée dans GLPI.");
                }
                throw new Error("Erreur de connexion au serveur GLPI.");
            }

            // Récupération des informations de l'utilisateur connecté
            const userResponse = await api.get(`/User?searchText[name]=${username}`);
            const users = userResponse.data;
            const user = Array.isArray(users) ? users.find(u => u.name === username) : null;

            if (!user) {
                throw new Error('Impossible de récupérer les informations de votre compte.');
            }

            const userData = {
                id: user.id,
                name: user.name,
                realname: user.realname,
                firstname: user.firstname,
                language: user.language,
                active: user.is_active === 1
            };

            // Stockage persistant de la session locale
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('user', JSON.stringify(userData));

            return userData;
        } catch (error) {
            console.error('Erreur Login:', error);
            throw new Error(error.message || 'Erreur lors de la connexion.');
        }
    },

    // Déconnexion et vidage des states
    logout: () => {
        sessionStorage.clear();
        window.location.href = '/login';
    },

    isAuthenticated: () => {
        return sessionStorage.getItem('isAuthenticated') === 'true';
    },

    getCurrentUser: () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};
```

---

### B. Service Générique d'Éléments (`ItemService.js`)
Ce service implémente un modèle CRUD standardisé pour manipuler n'importe quelle entité de l'API GLPI REST (les exemples ci-dessous sont appliqués sur l'entité `/Ticket`).

```javascript
import api, { initSession } from '../config/api';

const ItemService = {
  // Lecture de tous les éléments (avec jointure expand_dropdowns)
  getAll: async () => {
    try {
      await initSession();
      const response = await api.get('/Ticket?expand_dropdowns=true');
      return response.data.map(ticket => ({
        id: ticket.id,
        nom: ticket.name,
        categorie: ticket.itilcategories_id || 'Aucune' 
      }));
    } catch (error) {
      console.error("Erreur getAll:", error);
      return [];
    }
  },

  // Création d'un élément
  create: async (item) => {
    try {
      await initSession();
      const response = await api.post('/Ticket', {
        input: {
          name: item.nom,
          content: "Ticket créé depuis l'application React",
        }
      });
      return { ...item, id: response.data.id }; 
    } catch (error) {
      console.error("Erreur create:", error);
      throw error;
    }
  },

  // Mise à jour d'un élément
  update: async (id, updatedItem) => {
    try {
      await initSession();
      await api.put(`/Ticket/${id}`, {
        input: {
          id: id,
          name: updatedItem.nom
        }
      });
      return updatedItem;
    } catch (error) {
      console.error("Erreur update:", error);
      throw error;
    }
  },

  // Suppression d'un élément
  delete: async (id) => {
    try {
      await initSession();
      await api.delete(`/Ticket/${id}`);
      return id;
    } catch (error) {
      console.error("Erreur delete:", error);
      throw error;
    }
  }
};
```

---

### C. Service de Nettoyage et Réinitialisation de Masse (`ResetService.js`)
Afin de nettoyer le parc informatique et les tickets lors des phases de tests sans bloquer ou faire crasher le serveur local PHP de GLPI, ce service divise les suppressions massives en requêtes concurrentes limitées exécutées par lots (Batch de 3 pour les suppressions unitaires et de 10 pour le pilotage de ressource).

```javascript
import api, { initSession } from '../config/api';

const ResetService = {
  // Récupération paginée de l'ensemble des IDs d'un endpoint
  getAllIds: async (endpoint, skipIds = []) => {
    try {
      const response = await api.get(`${endpoint}?range=0-1000`);
      let items = Array.isArray(response.data) ? response.data : [];
      return items
        .map(item => item.id)
        .filter(id => id !== undefined && id !== null && !skipIds.includes(id));
    } catch (err) {
      const status = err?.response?.status;
      if (status === 400 || status === 404 || status === 204) return [];
      throw err;
    }
  },

  // Purge définitive unitaire (force_purge évite le passage en corbeille)
  deleteOne: async (endpoint, id) => {
    try {
      await api.delete(`${endpoint}/${id}`, {
        params: { force_purge: true }
      });
      return { id, success: true };
    } catch (err) {
      return { id, success: false, error: err.message };
    }
  },

  // Nettoyage par paquet de requêtes parallèles (limitation de charge)
  deleteAll: async (endpoint, ids) => {
    if (!ids || ids.length === 0) return { deleted: 0, errors: [] };
    const PARALLEL = 3; // 3 requêtes HTTP simultanées max
    let deleted = 0;
    const errors = [];

    for (let i = 0; i < ids.length; i += PARALLEL) {
      const batch = ids.slice(i, i + PARALLEL);
      // Exécution parallèle asynchrone sécurisée par Promise.allSettled
      const results = await Promise.allSettled(
        batch.map(id => ResetService.deleteOne(endpoint, id))
      );
      
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value.success) {
          deleted++;
        } else if (r.status === 'fulfilled' && !r.value.success) {
          errors.push(r.value);
        }
      }
      
      // Pause de 100ms entre chaque groupe pour soulager le CPU du serveur Apache local
      if (i + PARALLEL < ids.length) {
        await new Promise(r => setTimeout(r, 100));
      }
    }
    return { deleted, errors };
  },

  // Orchestrateur global de réinitialisation de ressource
  resetResource: async (resourceName, endpoint, skipIds = [], onProgress = null) => {
    try {
      await initSession();
      const ids = await ResetService.getAllIds(endpoint, skipIds);
      if (ids.length === 0) {
        return { resource: resourceName, total: 0, deleted: 0, errors: [], status: 'empty' };
      }

      if (onProgress) onProgress(0, ids.length);

      const BATCH_SIZE = 10;
      let totalDeleted = 0;
      let allErrors = [];

      for (let i = 0; i < ids.length; i += BATCH_SIZE) {
        const batch = ids.slice(i, i + BATCH_SIZE);
        const { deleted, errors } = await ResetService.deleteAll(endpoint, batch);
        totalDeleted += deleted;
        allErrors = [...allErrors, ...errors];
        
        if (onProgress) onProgress(totalDeleted, ids.length);
        if (i + BATCH_SIZE < ids.length) {
          await new Promise(resolve => setTimeout(resolve, 150));
        }
      }

      return {
        resource: resourceName,
        total: ids.length,
        deleted: totalDeleted,
        errors: allErrors,
        status: allErrors.length === 0 ? 'done' : 'partial'
      };
    } catch (err) {
      return { resource: resourceName, total: 0, deleted: 0, errors: [{ error: err.message }], status: 'error' };
    }
  }
};
```

---

### D. Service de Configuration du Kanban (`Settings/SettingsService.js`)
Ce service communique avec notre backend Node.js (SQLite) et non pas avec le framework PHP de GLPI. Il permet de récupérer et de mettre à jour les couleurs de colonnes et les traductions.

```javascript
import axios from 'axios';

// URL du serveur Express local
const SETTINGS_API_URL = 'http://localhost:3001/api/settings';

const SettingsService = {
  // Récupère la configuration (langues, libellés, codes couleurs)
  getSettings: async () => {
    try {
      const response = await axios.get(SETTINGS_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching settings from SQLite:', error);
      throw error;
    }
  },

  // Envoie les modifications de configuration
  updateSettings: async (settings) => {
    try {
      const response = await axios.put(SETTINGS_API_URL, settings);
      return response.data;
    } catch (error) {
      console.error('Error updating settings in SQLite:', error);
      throw error;
    }
  }
};
```
