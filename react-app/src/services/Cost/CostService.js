import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';
const API_URL = `${BASE_URL}/costs`;

const CostService = {
  getCosts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createCost: async (costData) => {
    try {
      const response = await axios.post(API_URL, costData);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getCostByTicketId: async (ticketId) => {
    try {
      const response = await axios.get(`${API_URL}/ticket/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteCostByTicketId: async (ticketId) => {
    try {
      const response = await axios.delete(`${API_URL}/ticket/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  updateCostReouverture: async (ticketId, coutReouverture) => {
    try {
      const response = await axios.put(`${API_URL}/ticket/${ticketId}/reouverture`, { coutReouverture });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default CostService;
