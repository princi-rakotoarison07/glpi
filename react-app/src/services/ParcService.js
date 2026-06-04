import api, { initSession } from '../config/api';

const ParcService = {
  // Récupérer uniquement les statistiques globales réelles via l'API GLPI
  getStats: async () => {
    const assets = [
      { key: 'computers', endpoint: '/Computer', label: 'Ordinateurs' },
      { key: 'software', endpoint: '/Software', label: 'Logiciels' },
      { key: 'monitors', endpoint: '/Monitor', label: 'Moniteurs' },
      { key: 'network', endpoint: '/NetworkEquipment', label: 'Matériels Réseau' },
      { key: 'printers', endpoint: '/Printer', label: 'Imprimantes' },
      { key: 'peripherals', endpoint: '/Peripheral', label: 'Périphériques' }
    ];

    const stats = {
      computers: { total: 0 },
      software: { total: 0 },
      monitors: { total: 0 },
      network: { total: 0 },
      printers: { total: 0 },
      peripherals: { total: 0 }
    };

    try {
      await initSession();

      // Effectuer les appels API en parallèle pour de meilleures performances
      const promises = assets.map(async (asset) => {
        try {
          // range=0-0 pour ne récupérer qu'un élément et avoir le count total dans le header Content-Range
          const response = await api.get(`${asset.endpoint}?range=0-0`);
          
          let total = 0;
          const contentRange = response.headers['content-range'] || response.headers['Content-Range'];
          
          if (contentRange) {
            const parts = contentRange.split('/');
            if (parts.length > 1) {
              total = parseInt(parts[1], 10);
            }
          } else if (Array.isArray(response.data)) {
            total = response.data.length;
          }
          
          return { key: asset.key, total, success: true };
        } catch (e) {
          console.warn(`Erreur lors de la récupération de ${asset.label}:`, e);
          return { key: asset.key, total: 0, success: false };
        }
      });

      const results = await Promise.all(promises);
      
      results.forEach(res => {
        stats[res.key].total = res.total;
      });

    } catch (error) {
      console.error("Impossible de récupérer les statistiques depuis l'API GLPI:", error);
      throw error;
    }

    return stats;
  }
};

export default ParcService;
