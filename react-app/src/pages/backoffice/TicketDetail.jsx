import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Layers, ArrowUpRight, DollarSign } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import ItemTicketService from '../../services/ItemTicket/ItemTicketService';
import TicketCostService from '../../services/TicketCost/TicketCostService';
import ComputerService from '../../services/Computer/ComputerService';
import MonitorService from '../../services/Monitor/MonitorService';
import SoftwareService from '../../services/Software/SoftwareService';
import PrinterService from '../../services/Printer/PrinterService';
import PDUService from '../../services/PDU/PDUService';
import RackService from '../../services/Rack/RackService';
import PhoneService from '../../services/Phone/PhoneService';
import ChassisService from '../../services/Chassis/ChassisService';
import NetworkEquipmentService from '../../services/NetworkEquipment/NetworkEquipmentService';
import SoftwareLicenseService from '../../services/SoftwareLicense/SoftwareLicenseService';
import StateService from '../../services/State/StateService';
import LocationService from '../../services/Location/LocationService';
import ManufacturerService from '../../services/Manufacturer/ManufacturerService';
import ComputerModelService from '../../services/ComputerModel/ComputerModelService';
import ComputerTypeService from '../../services/ComputerType/ComputerTypeService';
import '../../styles/pages/TicketDetail.css';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [linkedItems, setLinkedItems] = useState([]);
  const [ticketCosts, setTicketCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCost, setIsAddingCost] = useState(false);
  
  // État pour le formulaire de nouveau coût
  const [newCost, setNewCost] = useState({
    name: '',
    begin_date: '',
    end_date: '',
    comment: '',
    budget: '',
    duration_value: '',
    duration_unit: 'minutes', // ou 'seconds', 'hours'
    cost_hourly: '',
    cost_fixed: '',
    cost_material: '',
  });

  const priorityOptions = [
    { value: 1, label: 'Très basse', color: '#9e9e9e' },
    { value: 2, label: 'Basse', color: '#4caf50' },
    { value: 3, label: 'Moyenne', color: '#ff9800' },
    { value: 4, label: 'Haute', color: '#f44336' },
    { value: 5, label: 'Très haute', color: '#9c27b0' },
    { value: 6, label: 'Majeure', color: '#b71c1c' },
  ];

  const getPriorityInfo = (priorityId) => {
    const option = priorityOptions.find(opt => opt.value === priorityId);
    return option || { label: 'Priorité inconnue', color: '#9e9e9e' };
  };

  // Function to get the correct link path for an item type
  const getItemLink = (itemType, itemId) => {
    const typeMap = {
      'Computer': '/parc/computers',
      'Monitor': '/parc/monitors',
      'Software': '/parc/software',
      'Printer': '/parc/printers',
      'PDU': '/parc/pdus',
      'Rack': '/parc/racks',
      'Phone': '/parc/phones',
      'Chassis': '/parc/chassis',
      'NetworkEquipment': '/parc/network-equipment',
      'SoftwareLicense': '/parc/licenses'
    };
    const basePath = typeMap[itemType];
    if (basePath) {
      return `${basePath}/${itemId}`;
    }
    return null;
  };

  // Function to get a user-friendly label for item type
  const getItemTypeLabel = (itemType) => {
    const labelMap = {
      'Computer': 'Ordinateur',
      'Monitor': 'Écran',
      'Software': 'Logiciel',
      'Printer': 'Imprimante',
      'PDU': 'PDU',
      'Rack': 'Baie',
      'Phone': 'Téléphone',
      'Chassis': 'Châssis',
      'NetworkEquipment': 'Matériel réseau',
      'SoftwareLicense': 'Licence logiciel'
    };
    return labelMap[itemType] || itemType;
  };

  // Function to fetch a full item by its type and id
  const fetchFullItem = async (itemType, itemId) => {
    try {
      switch (itemType) {
        case 'Computer':
          return await ComputerService.getComputerById(itemId);
        case 'Monitor':
          return await MonitorService.getMonitorById(itemId);
        case 'Software':
          return await SoftwareService.getSoftwareById(itemId);
        case 'Printer':
          return await PrinterService.getPrinterById(itemId);
        case 'PDU':
          return await PDUService.getPDUById(itemId);
        case 'Rack':
          return await RackService.getRackById(itemId);
        case 'Phone':
          return await PhoneService.getPhoneById(itemId);
        case 'Chassis':
          return await ChassisService.getChassisById(itemId);
        case 'NetworkEquipment':
          return await NetworkEquipmentService.getNetworkEquipmentById(itemId);
        case 'SoftwareLicense':
          return await SoftwareLicenseService.getSoftwareLicenseById(itemId);
        default:
          return null;
      }
    } catch (error) {
      console.error(`Error fetching ${itemType} with id ${itemId}:`, error);
      return null;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [ticketData, itemsData, statesData, locationsData, manufacturersData, computerModelsData, computerTypesData, costsData] = await Promise.all([
          TicketService.getTicket(id),
          ItemTicketService.getItemsForTicket(id),
          StateService.getAllStates(),
          LocationService.getAllLocations(),
          ManufacturerService.getAllManufacturers(),
          ComputerModelService.getAllComputerModels(),
          ComputerTypeService.getAllComputerTypes(),
          TicketCostService.getTicketCosts(id)
        ]);
        
        console.log('Données brutes des coûts:', costsData);
        
        // Create maps for related data
        const statesMap = {};
        statesData.forEach(state => statesMap[state.id] = state.name);
        
        const locationsMap = {};
        locationsData.forEach(loc => locationsMap[loc.id] = loc.name);
        
        const manufacturersMap = {};
        manufacturersData.forEach(mf => manufacturersMap[mf.id] = mf.name);
        
        const computerModelsMap = {};
        computerModelsData.forEach(model => computerModelsMap[model.id] = model.name);
        
        const computerTypesMap = {};
        computerTypesData.forEach(type => computerTypesMap[type.id] = type.name);
        
        // Fetch full details for each linked item
        const itemsWithDetails = await Promise.all(
          itemsData.map(async (linkedItem) => {
            const fullItem = await fetchFullItem(linkedItem.itemtype, linkedItem.items_id);
            return {
              ...linkedItem,
              fullItem: fullItem
            };
          })
        );
        
        console.log('Items with full details:', itemsWithDetails);
        
        setTicket(ticketData);
        // Gérer différents formats de réponse (avec ou sans .data)
        const costsArray = costsData.data || costsData || [];
        console.log('Tableau des coûts traité:', costsArray);
        setTicketCosts(costsArray);
        setLinkedItems({
          items: itemsWithDetails,
          statesMap,
          locationsMap,
          manufacturersMap,
          computerModelsMap,
          computerTypesMap
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAllData();
    }
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Formater la durée (secondes -> format lisible)
  const formatDuration = (seconds) => {
    const secs = parseInt(seconds) || 0;
    if (secs === 0) return '0 seconde';
    
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    
    let result = [];
    if (h > 0) result.push(`${h} heure${h > 1 ? 's' : ''}`);
    if (m > 0) result.push(`${m} minute${m > 1 ? 's' : ''}`);
    if (s > 0) result.push(`${s} seconde${s > 1 ? 's' : ''}`);
    
    return result.join(' ');
  };
  
  // Gérer les changements du formulaire
  const handleNewCostChange = (e) => {
    const { name, value } = e.target;
    setNewCost(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Convertir la durée en secondes
  const convertDurationToSeconds = (value, unit) => {
    const numValue = parseFloat(value) || 0;
    switch (unit) {
      case 'seconds':
        return numValue;
      case 'minutes':
        return numValue * 60;
      case 'hours':
        return numValue * 3600;
      default:
        return numValue;
    }
  };
  
  // Gérer la soumission du formulaire
  const handleAddCost = async (e) => {
    e.preventDefault();
    setIsAddingCost(true);
    
    try {
      const actiontime = convertDurationToSeconds(newCost.duration_value, newCost.duration_unit);
      const costHourly = parseFloat(newCost.cost_hourly) || 0;
      const costFixed = parseFloat(newCost.cost_fixed) || 0;
      const costMaterial = parseFloat(newCost.cost_material) || 0;
      const budget = parseFloat(newCost.budget) || 0;
      
      // Calculer le coût temporel pour l'API
      const durationInHours = actiontime / 3600;
      const costTime = costHourly * durationInHours;
      
      const costData = {
        name: newCost.name || 'Coût ajouté',
        begin_date: newCost.begin_date || null,
        end_date: newCost.end_date || null,
        comment: newCost.comment || '',
        budget: budget,
        actiontime: actiontime,
        cost_hourly: costHourly,
        cost_fixed: costFixed,
        cost_material: costMaterial,
        cost_time: costTime
      };
      
      // Appeler le service pour ajouter le coût
      const result = await TicketCostService.addCostToTicket(id, costData);
      
      // Récupérer à nouveau les coûts pour mettre à jour le tableau
      const updatedCosts = await TicketCostService.getTicketCosts(id);
      setTicketCosts(updatedCosts.data || updatedCosts || []);
      
      // Réinitialiser le formulaire
      setNewCost({
        name: '',
        begin_date: '',
        end_date: '',
        comment: '',
        budget: '',
        duration_value: '',
        duration_unit: 'minutes',
        cost_hourly: '',
        cost_fixed: '',
        cost_material: '',
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout du coût:', error);
      alert('Impossible d\'ajouter le coût. Veuillez réessayer.');
    } finally {
      setIsAddingCost(false);
    }
  };

  if (loading) {
    return (
      <div className="ticket-detail-page">
        <div className="loading-state">Chargement du ticket...</div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Ticket introuvable</div>
      </div>
    );
  }

  const priorityInfo = getPriorityInfo(ticket.priority);

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/tickets" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Ticket #{ticket.id} - {ticket.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{ticket.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Titre</div>
              <div className="detail-value">{ticket.name || 'Non défini'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Statut</div>
              <div className="detail-value">
                <span className="status-badge">
                  {ticket.status === 1 ? 'Nouveau' :
                   ticket.status === 2 ? 'En cours (Attribué)' :
                   ticket.status === 3 ? 'En attente' :
                   ticket.status === 4 ? 'Résolu' :
                   ticket.status === 5 ? 'Fermé' : 'Statut inconnu'}
                </span>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Priorité</div>
              <div className="detail-value">
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: priorityInfo.color + '20', color: priorityInfo.color, borderColor: priorityInfo.color }}
                >
                  {priorityInfo.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2>Dates</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">
                <Calendar size={16} />
                Date d'ouverture
              </div>
              <div className="detail-value">{formatDate(ticket.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(ticket.date_mod)}</div>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <h2>Description</h2>
          <div className="detail-description">
            {ticket.content || 'Aucune description fournie.'}
          </div>
        </div>

        <div className="detail-card">
          <h2>
            <Layers size={18} style={{ marginRight: '8px' }} />
            Éléments liés
          </h2>
          {linkedItems.items && linkedItems.items.length > 0 ? (
            <div className="linked-items-table-container">
              <table className="linked-items-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Nom</th>
                    <th>Modèle</th>
                    <th>Numéro de série</th>
                    <th>Numéro d'inventaire</th>
                    <th>Statut</th>
                    <th>Lieu</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedItems.items.map((linkedItem) => {
                    const itemLink = getItemLink(linkedItem.itemtype, linkedItem.items_id);
                    const item = linkedItem.fullItem || linkedItem.item || {};
                    const { statesMap, locationsMap, computerModelsMap } = linkedItems;
                    
                    // Get model name based on item type
                    let modelName = '-';
                    if (item.computermodels_id) {
                      modelName = computerModelsMap[item.computermodels_id] || '-';
                    } else if (item.computermodels_name) {
                      modelName = item.computermodels_name;
                    } else if (item.monitormodels_name) {
                      modelName = item.monitormodels_name;
                    } else if (item.printermodels_name) {
                      modelName = item.printermodels_name;
                    }
                    
                    return (
                      <tr key={linkedItem.id}>
                        <td>{getItemTypeLabel(linkedItem.itemtype)}</td>
                        <td className="item-name-cell">
                          {item.name || item.name || `ID: ${linkedItem.items_id}`}
                        </td>
                        <td>{modelName}</td>
                        <td>{item.serial || '-'}</td>
                        <td>{item.otherserial || '-'}</td>
                        <td>
                          {item.states_name || 
                           (item.state && item.state.name) || 
                           (item.states_id && statesMap[item.states_id]) || 
                           '-'}
                        </td>
                        <td>
                          {item.locations_name || 
                           (item.location && item.location.name) || 
                           (item.locations_id && locationsMap[item.locations_id]) || 
                           '-'}
                        </td>
                        <td className="item-actions-cell">
                          {itemLink && (
                            <Link 
                              to={itemLink} 
                              className="view-item-link"
                              title="Voir les détails de l'élément"
                            >
                              <ArrowUpRight size={14} />
                              Voir détails
                            </Link>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              Aucun élément lié à ce ticket.
            </div>
          )}
        </div>

        {/* Formulaire d'ajout de coût */}
        <div className="detail-card">
          <h2>
            <DollarSign size={18} style={{ marginRight: '8px' }} />
            Ajouter un coût
          </h2>
          <form onSubmit={handleAddCost} style={{ padding: '16px 0' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Nom</label>
                  <input
                    type="text"
                    name="name"
                    value={newCost.name}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Date de début</label>
                  <input
                    type="datetime-local"
                    name="begin_date"
                    value={newCost.begin_date}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Date de fin</label>
                  <input
                    type="datetime-local"
                    name="end_date"
                    value={newCost.end_date}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Commentaires</label>
                  <textarea
                    name="comment"
                    value={newCost.comment}
                    onChange={handleNewCostChange}
                    rows={3}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>
              
              <div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Budget</label>
                  <input
                    type="number"
                    step="0.01"
                    name="budget"
                    value={newCost.budget}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Durée</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="number"
                      step="0.01"
                      name="duration_value"
                      value={newCost.duration_value}
                      onChange={handleNewCostChange}
                      style={{ flex: 1, padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <select
                      name="duration_unit"
                      value={newCost.duration_unit}
                      onChange={handleNewCostChange}
                      style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                    >
                      <option value="seconds">Secondes</option>
                      <option value="minutes">Minutes</option>
                      <option value="hours">Heures</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Coût horaire</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cost_hourly"
                    value={newCost.cost_hourly}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Coût fixe</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cost_fixed"
                    value={newCost.cost_fixed}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>Coût matériel</label>
                  <input
                    type="number"
                    step="0.01"
                    name="cost_material"
                    value={newCost.cost_material}
                    onChange={handleNewCostChange}
                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="submit"
                disabled={isAddingCost}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#ffc107',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 'bold',
                  cursor: isAddingCost ? 'not-allowed' : 'pointer',
                  opacity: isAddingCost ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                + Ajouter
              </button>
            </div>
          </form>
        </div>

        <div className="detail-card">
          <h2>
            <DollarSign size={18} style={{ marginRight: '8px' }} />
            Coûts associés
          </h2>
          {ticketCosts.length > 0 ? (
            <div className="linked-items-table-container">
              <table className="linked-items-table">
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Budget</th>
                    <th>Durée</th>
                    <th>Coût horaire (€)</th>
                    <th>Coût fixe (€)</th>
                    <th>Coût matériel (€)</th>
                    <th>Coût total (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketCosts.map((cost, index) => {
                    console.log(`Coût ${index} données complètes:`, cost);
                    
                    // Récupérer toutes les valeurs
                    const costFixed = parseFloat(cost.cost_fixed || 0);
                    const costMaterial = parseFloat(cost.cost_material || 0);
                    const costHourly = parseFloat(cost.cost_hourly || cost.cost_time || 0); // Utiliser cost_time comme fallback pour cost_hourly
                    const actiontime = parseInt(cost.actiontime || 0);
                    
                    let total;
                    
                    // Calcul selon la règle métier strictement comme dans GLPI
                    const durationInHours = actiontime / 3600;
                    const calculatedTimeCost = costHourly * durationInHours;
                    total = costFixed + costMaterial + calculatedTimeCost;
                    
                    // Arrondir à 2 décimales
                    const totalRounded = Math.round(total * 100) / 100;

                    return (
                      <tr key={cost.id}>
                        <td>{cost.name || 'Sans description'}</td>
                        <td>{formatDate(cost.begin_date)}</td>
                        <td>{formatDate(cost.end_date)}</td>
                        <td>{cost.budget ? parseFloat(cost.budget).toFixed(2) : '-'}</td>
                        <td>{formatDuration(cost.actiontime)}</td>
                        <td>{costHourly.toFixed(2)}</td>
                        <td>{costFixed.toFixed(2)}</td>
                        <td>{costMaterial.toFixed(2)}</td>
                        <td>{totalRounded.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  {/* Ligne de total */}
                  <tr style={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{ticketCosts.reduce((sum, cost) => sum + parseFloat(cost.cost_fixed || 0), 0).toFixed(2)}</td>
                    <td>{ticketCosts.reduce((sum, cost) => sum + parseFloat(cost.cost_material || 0), 0).toFixed(2)}</td>
                    <td>
                      {ticketCosts.reduce((sum, cost) => {
                        const costFixed = parseFloat(cost.cost_fixed || 0);
                        const costMaterial = parseFloat(cost.cost_material || 0);
                        const costHourly = parseFloat(cost.cost_hourly || cost.cost_time || 0);
                        const actiontime = parseInt(cost.actiontime || 0);
                        
                        const durationInHours = actiontime / 3600;
                        const calculatedTimeCost = costHourly * durationInHours;
                        const total = costFixed + costMaterial + calculatedTimeCost;
                        
                        return sum + total;
                      }, 0).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              Aucun coût associé à ce ticket.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
