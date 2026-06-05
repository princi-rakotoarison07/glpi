import api, { initSession } from '../config/api';

const ParcService = {
  // Récupérer uniquement les statistiques globales réelles via l'API GLPI
  getStats: async () => {
    const assets = [
      { key: 'computers', endpoint: '/Computer', label: 'Ordinateurs' },
      { key: 'software', endpoint: '/Software', label: 'Logiciels' },
      { key: 'printers', endpoint: '/Printer', label: 'Imprimantes' },
      { key: 'pdus', endpoint: '/Pdu', label: 'PDU' },
      { key: 'racks', endpoint: '/Rack', label: 'Baie' },
      { key: 'phones', endpoint: '/Phone', label: 'Téléphone' },
      { key: 'chassis', endpoint: '/Enclosure', label: 'Châssis' },
      { key: 'network', endpoint: '/NetworkEquipment', label: 'Matériel réseau' },
      { key: 'licenses', endpoint: '/SoftwareLicense', label: 'Licence' },
      { key: 'monitors', endpoint: '/Monitor', label: 'Moniteur' }
    ];

    const stats = {
      computers: { total: 0 },
      software: { total: 0 },
      printers: { total: 0 },
      pdus: { total: 0 },
      racks: { total: 0 },
      phones: { total: 0 },
      chassis: { total: 0 },
      network: { total: 0 },
      licenses: { total: 0 },
      monitors: { total: 0 },
      tickets: { total: 0, byType: {} }
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

      // Ajouter la récupération des tickets par statut
      promises.push(
        (async () => {
          try {
            // Récupérer le nombre total de tickets
            const ticketResponse = await api.get('/Ticket?range=0-0');
            let totalTickets = 0;
            const contentRange = ticketResponse.headers['content-range'] || ticketResponse.headers['Content-Range'];
            
            if (contentRange) {
              const parts = contentRange.split('/');
              if (parts.length > 1) {
                totalTickets = parseInt(parts[1], 10);
              }
            } else if (Array.isArray(ticketResponse.data)) {
              totalTickets = ticketResponse.data.length;
            }

            // Définir les statuts GLPI standard (comme dans l'image)
            const ticketStatuses = [
              { id: 1, name: 'Ticket', color: '#fcd34d' },          // jaune
              { id: 2, name: 'Tickets entrants', color: '#86efac' }, // vert
              { id: 3, name: 'Tickets en attente', color: '#fdba74' }, // orange
              { id: 4, name: 'Tickets assignés', color: '#93c5fd' }, // bleu
              { id: 5, name: 'Tickets planifiés', color: '#c4b5fd' }, // violet
              { id: 6, name: 'Tickets résolus', color: '#d1d5db' }, // gris clair
              { id: 7, name: 'Tickets fermés', color: '#9ca3af' }  // gris foncé
            ];

            // Pour chaque statut, compter le nombre de tickets
            const byStatus = {};
            for (const status of ticketStatuses) {
              try {
                const statusResponse = await api.get(`/Ticket?searchText[status]=${status.id}&range=0-0`);
                let statusTotal = 0;
                const statusContentRange = statusResponse.headers['content-range'] || statusResponse.headers['Content-Range'];
                
                if (statusContentRange) {
                  const parts = statusContentRange.split('/');
                  if (parts.length > 1) {
                    statusTotal = parseInt(parts[1], 10);
                  }
                } else if (Array.isArray(statusResponse.data)) {
                  statusTotal = statusResponse.data.length;
                }
                
                byStatus[status.id] = { name: status.name, count: statusTotal, color: status.color };
              } catch (e) {
                console.warn(`Erreur lors de la récupération des tickets pour le statut ${status.id}:`, e);
                byStatus[status.id] = { name: status.name, count: 0, color: status.color };
              }
            }

            return { key: 'tickets', data: { total: totalTickets, byStatus }, success: true };
          } catch (e) {
            console.warn('Erreur lors de la récupération des tickets:', e);
            // Retourner les statuts par défaut avec 0
            const defaultStatuses = [
              { id: 1, name: 'Ticket', color: '#fcd34d' },
              { id: 2, name: 'Tickets entrants', color: '#86efac' },
              { id: 3, name: 'Tickets en attente', color: '#fdba74' },
              { id: 4, name: 'Tickets assignés', color: '#93c5fd' },
              { id: 5, name: 'Tickets planifiés', color: '#c4b5fd' },
              { id: 6, name: 'Tickets résolus', color: '#d1d5db' },
              { id: 7, name: 'Tickets fermés', color: '#9ca3af' }
            ];
            const byStatus = {};
            for (const s of defaultStatuses) {
              byStatus[s.id] = { ...s, count: 0 };
            }
            return { key: 'tickets', data: { total: 0, byStatus }, success: false };
          }
        })()
      );

      const results = await Promise.all(promises);
      
      results.forEach(res => {
        if (res.key === 'tickets') {
          stats.tickets = res.data;
        } else {
          stats[res.key].total = res.total;
        }
      });

      // Calculer le nombre total d'éléments (exclure les tickets)
      let totalItems = 0;
      Object.entries(stats).forEach(([key, stat]) => {
        if (key !== 'tickets' && key !== 'totalItems' && typeof stat === 'object' && 'total' in stat) {
          totalItems += stat.total;
        }
      });
      stats.totalItems = totalItems;

    } catch (error) {
      console.error("Impossible de récupérer les statistiques depuis l'API GLPI:", error);
      throw error;
    }

    return stats;
  }
};

export default ParcService;
