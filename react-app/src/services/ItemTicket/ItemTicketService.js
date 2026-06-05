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
  }
};

export default ItemTicketService;
