import axios from 'axios';

// 1. On crée une instance d'Axios configurée avec notre base URL et nos headers par défaut
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'App-Token': import.meta.env.VITE_APP_TOKEN,
    'Authorization': `user_token ${import.meta.env.VITE_USER_TOKEN}`,
    'User-Token': import.meta.env.VITE_USER_TOKEN
  }
});

// Variable globale pour stocker le token de session une fois initialisé
let sessionToken = null;

// 2. Fonction pour initialiser la session GLPI
export const initSession = async () => {
  if (sessionToken) return sessionToken; // Si on l'a déjà, on ne refait pas l'appel

  try {
    // On ajoute explicitement le user_token en paramètre de requête pour contourner 
    // la suppression de l'entête Authorization par certaines configurations Apache.
    const response = await api.get('/initSession', {
      params: {
        user_token: import.meta.env.VITE_USER_TOKEN
      }
    });
    sessionToken = response.data.session_token;
    
    // 3. MAGIE D'AXIOS : On injecte automatiquement ce Session-Token
    // dans toutes les futures requêtes que l'on fera avec cette instance 'api' !
    api.defaults.headers.common['Session-Token'] = sessionToken;
    
    return sessionToken;
  } catch (error) {
    console.error("Erreur lors de l'initialisation de la session GLPI", error);
    throw error;
  }
};

export default api;