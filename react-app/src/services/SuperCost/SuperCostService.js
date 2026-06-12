import axios from 'axios';

const SUPERCOST_API_URL = 'http://localhost:3001/api/super-cost';

const SuperCostService = {
  saveSuperCost: async (ticket_id, super_cost) => {
    try {
      const response = await axios.post(SUPERCOST_API_URL, { ticket_id, super_cost });
      return response.data;
    } catch (error) {
      console.error('Error saving super cost:', error);
      throw error;
    }
  },

  getAllSuperCosts: async () => {
    try {
      const response = await axios.get(SUPERCOST_API_URL);
      return response.data;
    } catch (error) {
      console.error('Error getting all super costs:', error);
      throw error;
    }
  },

  getSuperCost: async (ticket_id) => {
    try {
      const response = await axios.get(`${SUPERCOST_API_URL}/${ticket_id}`);
      return response.data;
    } catch (error) {
      console.error('Error getting super cost:', error);
      throw error;
    }
  }
};

export default SuperCostService;
