import api, { initSession } from '../../config/api';

const ItemTicketService = {
  // Création du lien entre le ticket et un équipement (table glpi_items_tickets)
  linkItemToTicket: async (ticketId, itemId, itemType = 'Computer') => {
    try {
      await initSession();
      const response = await api.post('/Item_Ticket', {
        input: {
          tickets_id: ticketId,
          items_id: itemId,
          itemtype: itemType
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error linking item to ticket:', error);
      throw error;
    }
  },

  // Récupérer tous les items liés à un ticket
  getItemsForTicket: async (ticketId) => {
    try {
      await initSession();
      const response = await api.get(`/Item_Ticket`, {
        params: {
          searchText: {
            tickets_id: ticketId
          },
          expand: ['item', 'item.State', 'item.Location'] // Expand more related data
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching items for ticket:', error);
      return [];
    }
  }
};

export default ItemTicketService;
