import api, { initSession } from '../../config/api';
import ItemTicketService from '../ItemTicket/ItemTicketService';

// Helper to extract count from Content-Range header
const extractCountFromResponse = (response) => {
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
  return total;
};

const TicketService = {
  getTickets: async (params = {}) => {
    try {
      await initSession();
      const defaultParams = {
        range: '0-19', // 20 items per page by default
      };

      const searchParams = new URLSearchParams();

      // Add range (for pagination)
      if (params.start !== undefined && params.limit !== undefined) {
        searchParams.append('range', `${params.start}-${params.start + params.limit - 1}`);
      } else {
        searchParams.append('range', defaultParams.range);
      }

      // Add filters
      if (params.status) {
        searchParams.append('searchText[status]', params.status);
      }

      const queryString = searchParams.toString();
      const response = await api.get(`/Ticket${queryString ? `?${queryString}` : ''}`);

      // Get total items from Content-Range header
      const totalItems = extractCountFromResponse(response);

      return {
        tickets: response.data,
        totalItems,
      };
    } catch (error) {
      console.error('Error fetching tickets:', error);
      return { tickets: [], totalItems: 0 };
    }
  },

  getTicket: async (id) => {
    try {
      await initSession();
      const response = await api.get(`/Ticket/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ticket ${id}:`, error);
      throw error;
    }
  },

  // Création d'un ticket (table glpi_tickets)
  createTicket: async (ticketData) => {
    try {
      await initSession();
      // ticketData peut contenir : name (Titre), content (Description), date, type, status, priority, etc.
      const response = await api.post('/Ticket', { input: ticketData });
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw error;
    }
  },

  // Méthode combinée : Crée un ticket puis le lie directement à un PC
  createTicketForComputer: async (ticketData, computerId) => {
    try {
      // 1. Création du ticket
      const ticketResponse = await TicketService.createTicket(ticketData);
      const newTicketId = ticketResponse.id;

      // 2. Si le ticket est créé avec succès et qu'on a un PC, on les lie
      if (newTicketId && computerId) {
        await ItemTicketService.linkItemToTicket(newTicketId, computerId, 'Computer');
      }

      return ticketResponse;
    } catch (error) {
      console.error('Error in createTicketForComputer:', error);
      throw error;
    }
  }
};

export default TicketService;
