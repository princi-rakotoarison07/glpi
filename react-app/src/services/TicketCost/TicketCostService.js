import api, { initSession } from '../../config/api';

const TicketCostService = {
  /**
   * Ajouter un coût à un ticket (table glpi_ticketcosts)
   * 
   * @param {number|string} ticketId - L'ID du ticket
   * @param {Object} costData - Les données du coût
   *   - cost_fixed (Fixed_Cost) : Coût fixe
   *   - cost_time (Time_Cost) : Coût lié au temps
   *   - actiontime (Duration_second) : Durée en secondes
   *   - name : Nom/Description du coût
   */
  addCostToTicket: async (ticketId, costData) => {
    try {
      await initSession();
      const response = await api.post('/TicketCost', {
        input: {
          tickets_id: ticketId,
          ...costData
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error adding cost to ticket:', error);
      throw error;
    }
  },

  /**
   * Récupérer les coûts associés à un ticket
   * Note : searchText fait un match partiel (ticket 1 matche aussi 10, 11, 12...)
   * donc on récupère tout et on filtre côté client par tickets_id exact.
   */
  getTicketCosts: async (ticketId) => {
    try {
      await initSession();
      const response = await api.get('/TicketCost', {
        params: {
          range: '0-9999'
        }
      });
      const allCosts = response.data || [];
      // Filtrer côté client par tickets_id exact
      return allCosts.filter(cost => Number(cost.tickets_id) === Number(ticketId));
    } catch (error) {
      console.error(`Error fetching costs for ticket ${ticketId}:`, error);
      throw error;
    }
  }
};

export default TicketCostService;
