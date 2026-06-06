import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import ComputerService from '../../../../services/Computer/ComputerService';
import StateService from '../../../../services/State/StateService';
import ManufacturerService from '../../../../services/Manufacturer/ManufacturerService';
import LocationService from '../../../../services/Location/LocationService';
import ComputerModelService from '../../../../services/ComputerModel/ComputerModelService';
import ComputerTypeService from '../../../../services/ComputerType/ComputerTypeService';
import OperatingSystemService from '../../../../services/OperatingSystem/OperatingSystemService';
import UserService from '../../../../services/User/UserService';
import '../../../../styles/pages/ParcDetail.css';

const ComputerDetail = () => {
  const { id } = useParams();
  const [computer, setComputer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedData, setRelatedData] = useState({
    states: {},
    manufacturers: {},
    locations: {},
    computerModels: {},
    computerTypes: {},
    operatingSystems: {},
    users: {}
  });

  const getRelatedName = (map, id) => {
    return id ? map[id] || '-' : '-';
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch all related data in parallel
      const [
        computerData,
        statesData,
        manufacturersData,
        locationsData,
        computerModelsData,
        computerTypesData,
        operatingSystemsData,
        usersData
      ] = await Promise.all([
        ComputerService.getComputerById(id),
        StateService.getAllStates(),
        ManufacturerService.getAllManufacturers(),
        LocationService.getAllLocations(),
        ComputerModelService.getAllComputerModels(),
        ComputerTypeService.getAllComputerTypes(),
        OperatingSystemService.getAllOperatingSystems(),
        UserService.getAllUsers()
      ]);

      // Create maps for quick lookup
      const statesMap = {};
      statesData.forEach(state => statesMap[state.id] = state.name);

      const manufacturersMap = {};
      manufacturersData.forEach(mf => manufacturersMap[mf.id] = mf.name);

      const locationsMap = {};
      locationsData.forEach(loc => locationsMap[loc.id] = loc.name);

      const computerModelsMap = {};
      computerModelsData.forEach(model => computerModelsMap[model.id] = model.name);

      const computerTypesMap = {};
      computerTypesData.forEach(type => computerTypesMap[type.id] = type.name);

      const operatingSystemsMap = {};
      operatingSystemsData.forEach(os => operatingSystemsMap[os.id] = os.name);

      const usersMap = {};
      usersData.forEach(user => usersMap[user.id] = user.name || user.firstname + ' ' + user.lastname || '-');

      setRelatedData({
        states: statesMap,
        manufacturers: manufacturersMap,
        locations: locationsMap,
        computerModels: computerModelsMap,
        computerTypes: computerTypesMap,
        operatingSystems: operatingSystemsMap,
        users: usersMap
      });

      setComputer(computerData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAllData();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="parc-detail-page">
        <div className="loading-state">Chargement de l'ordinateur...</div>
      </div>
    );
  }

  if (!computer) {
    return (
      <div className="parc-detail-page">
        <div className="empty-state">Ordinateur introuvable</div>
      </div>
    );
  }

  return (
    <div className="parc-detail-page">
      <div className="detail-header">
        <Link to="/parc/computers" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Ordinateur #{computer.id} - {computer.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{computer.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{computer.name || 'Non défini'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Statut</div>
              <div className="detail-value">{getRelatedName(relatedData.states, computer.states_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Fabricant</div>
              <div className="detail-value">{getRelatedName(relatedData.manufacturers, computer.manufacturers_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Numéro de série</div>
              <div className="detail-value">{computer.serial || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Type</div>
              <div className="detail-value">{getRelatedName(relatedData.computerTypes, computer.computertypes_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Modèle</div>
              <div className="detail-value">{getRelatedName(relatedData.computerModels, computer.computermodels_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Système d'exploitation - Nom</div>
              <div className="detail-value">{getRelatedName(relatedData.operatingSystems, computer.operatingsystems_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Lieu</div>
              <div className="detail-value">{getRelatedName(relatedData.locations, computer.locations_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <User size={16} />
                Utilisateur
              </div>
              <div className="detail-value">{getRelatedName(relatedData.users, computer.users_id)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Numéro d'inventaire</div>
              <div className="detail-value">{computer.otherserial || '-'}</div>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2>Dates</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">
                <Calendar size={16} />
                Date de création
              </div>
              <div className="detail-value">{formatDate(computer.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(computer.date_mod)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerDetail;
