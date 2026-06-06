import api, { initSession } from '../../config/api';

const ChassisService = {
  getAllChassis: async () => {
    try {
      await initSession();
      const response = await api.get('/Chassis');
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des châssis', error);
      throw error;
    }
  },

  getChassisById: async (id) => {
    try {
      await initSession();
      const response = await api.get(`/Chassis/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération du châssis avec l'ID ${id}`, error);
      throw error;
    }
  },

  createChassis: async (chassisData) => {
    try {
      await initSession();
      const response = await api.post('/Chassis', { input: chassisData });
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la création du châssis', error);
      throw error;
    }
  },

  updateChassis: async (id, chassisData) => {
    try {
      await initSession();
      const response = await api.put(`/Chassis/${id}`, { input: chassisData });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la mise à jour du châssis avec l'ID ${id}`, error);
      throw error;
    }
  },

  deleteChassis: async (id) => {
    try {
      await initSession();
      const response = await api.delete(`/Chassis/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la suppression du châssis avec l'ID ${id}`, error);
      throw error;
    }
  }
};

export default ChassisService;
