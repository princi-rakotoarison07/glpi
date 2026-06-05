import api, { initSession } from '../config/api';

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
};

export default TicketService;
