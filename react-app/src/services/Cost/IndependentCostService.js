import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001/api';
const API_URL = `${BASE_URL}/independent-costs`;

const IndependentCostService = {
  getIndependentCosts: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createCloseCosts: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/close`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  createReopenCost: async (data) => {
    try {
      const response = await axios.post(`${API_URL}/reopen`, data);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  deleteLatestCostGroup: async (ticketId) => {
    try {
      const response = await axios.delete(`${API_URL}/ticket/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

export default IndependentCostService;
