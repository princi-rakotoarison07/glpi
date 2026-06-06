import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import ItemTicketService from '../../services/ItemTicket/ItemTicketService';
import FrontOfficeLayout from '../../layouts/FrontOfficeLayout';
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
import '../../styles/FrontOffice.css';

const FrontOfficeTicketForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: '',
    content: '',
    type: 1, // 1 = Demande, 2 = Incident
    status: 1, // 1 = Nouveau
    priority: 3, // 3 = Moyenne
  });

  const [linkedItems, setLinkedItems] = useState([]); // Éléments sélectionnés, format: [{ id, itemType, name, typeLabel }]
  const [itemRows, setItemRows] = useState([]); // Lignes pour ajouter des éléments, format: [{ tempId, itemType, itemId }]
  const [allItemsByType, setAllItemsByType] = useState({}); // Tous les éléments triés par type
  const [loading, setLoading] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(true);

  const priorityOptions = [
    { value: 1, label: 'Très basse' },
    { value: 2, label: 'Basse' },
    { value: 3, label: 'Moyenne' },
    { value: 4, label: 'Haute' },
    { value: 5, label: 'Très haute' },
    { value: 6, label: 'Majeure' },
  ];

  const typeOptions = [
    { value: 1, label: 'Demande' },
    { value: 2, label: 'Incident' },
  ];

  const itemTypeOptions = [
    { value: 'Computer', label: 'Ordinateur' },
    { value: 'Monitor', label: 'Moniteur' },
    { value: 'Software', label: 'Logiciel' },
    { value: 'Printer', label: 'Imprimante' },
    { value: 'Pdu', label: 'PDU' },
    { value: 'Rack', label: 'Baie' },
    { value: 'Phone', label: 'Téléphone' },
    { value: 'Enclosure', label: 'Châssis' },
    { value: 'NetworkEquipment', label: 'Matériel réseau' },
    { value: 'SoftwareLicense', label: 'Licence logiciel' },
  ];

  // Fonction pour générer un ID temporaire pour les lignes
  const generateTempId = () => Date.now() + Math.random().toString(36).substr(2, 9);

  // Helper pour convertir objet en tableau si nécessaire
  const toArray = (data) => {
    if (Array.isArray(data)) return data;
    if (data && typeof data === 'object') return Object.values(data);
    return [];
  };

  // Récupérer tous les éléments triés par type
  const fetchAllItems = async () => {
    setFetchingItems(true);
    try {
      const [
        computers, monitors, software, printers, pdus, racks, phones, chassis, networkEquipment, licenses
      ] = await Promise.all([
        ComputerService.getAllComputers(),
        MonitorService.getAllMonitors(),
        SoftwareService.getAllSoftware(),
        PrinterService.getAllPrinters(),
        PDUService.getAllPDUs(),
        RackService.getAllRacks(),
        PhoneService.getAllPhones(),
        ChassisService.getAllChassis(),
        NetworkEquipmentService.getAllNetworkEquipment(),
        SoftwareLicenseService.getAllSoftwareLicenses(),
      ]);

      const itemsByType = {
        Computer: toArray(computers),
        Monitor: toArray(monitors),
        Software: toArray(software),
        Printer: toArray(printers),
        Pdu: toArray(pdus),
        Rack: toArray(racks),
        Phone: toArray(phones),
        Enclosure: toArray(chassis),
        NetworkEquipment: toArray(networkEquipment),
        SoftwareLicense: toArray(licenses),
      };

      setAllItemsByType(itemsByType);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setFetchingItems(false);
    }
  };

  const fetchTicket = async () => {
    if (!isEdit) return;

    setLoading(true);
    try {
      const ticket = await TicketService.getTicket(id);
      setFormData({
        name: ticket.name,
        content: ticket.content,
        type: ticket.type,
        status: ticket.status,
        priority: ticket.priority,
      });

      const items = await ItemTicketService.getItemsForTicket(id);
      const mappedItems = items.map(item => ({
        id: item.items_id,
        itemType: item.itemtype,
        name: item.item?.name || `ID: ${item.items_id}`,
        typeLabel: itemTypeOptions.find(t => t.value === item.itemtype)?.label || item.itemtype,
      }));
      setLinkedItems(mappedItems);
    } catch (error) {
      console.error('Error fetching ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllItems();
    if (isEdit) {
      fetchTicket();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Ajouter une nouvelle ligne
  const handleAddRow = () => {
    setItemRows(prev => [...prev, { tempId: generateTempId(), itemType: '', itemId: '' }]);
  };

  // Mettre à jour une ligne
  const handleRowChange = (tempId, field, value) => {
    console.log('handleRowChange:', { tempId, field, value });
    setItemRows(prev => {
      const newRows = prev.map(row => 
        row.tempId === tempId ? { 
          ...row, 
          [field]: value, 
          itemId: field === 'itemType' ? '' : (field === 'itemId' ? value : row.itemId)
        } : row
      );
      console.log('Updated itemRows:', newRows);
      return newRows;
    });
  };

  // Supprimer une ligne
  const handleRemoveRow = (tempId) => {
    setItemRows(prev => prev.filter(row => row.tempId !== tempId));
  };

  // Retirer un élément déjà ajouté
  const handleRemoveLinkedItem = (index) => {
    setLinkedItems(prev => prev.filter((_, i) => i !== index));
  };

  // Valider et ajouter les éléments des lignes
  const addItemsFromRows = () => {
    const newItems = [];
    for (const row of itemRows) {
      if (row.itemType && row.itemId) {
        const items = allItemsByType[row.itemType];
        const item = items.find(i => String(i.id) === String(row.itemId));
        if (item) {
          // Vérifier si l'élément n'est pas déjà dans la liste
          const alreadyExists = linkedItems.some(
            linked => linked.id === item.id && linked.itemType === row.itemType
          );
          if (!alreadyExists) {
            newItems.push({
              id: item.id,
              itemType: row.itemType,
              name: item.name || `ID: ${item.id}`,
              typeLabel: itemTypeOptions.find(t => t.value === row.itemType)?.label || row.itemType,
            });
          }
        }
      }
    }
    setLinkedItems(prev => [...prev, ...newItems]);
    setItemRows([]); // Vider les lignes après ajout
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Ajouter les éléments en attente des lignes avant de soumettre
    addItemsFromRows();

    try {
      let ticketId;
      if (isEdit) {
        // Update ticket (you'd need to implement updateTicket in TicketService if needed)
        ticketId = id;
      } else {
        // Create new ticket
        const ticket = await TicketService.createTicket(formData);
        ticketId = ticket.id;

        // Link all selected items
        for (const item of linkedItems) {
          await ItemTicketService.linkItemToTicket(ticketId, item.id, item.itemType);
        }
      }

      navigate('/frontoffice/tickets');
    } catch (error) {
      console.error('Error saving ticket:', error);
      alert('Erreur lors de la sauvegarde du ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrontOfficeLayout>
      <div className="frontoffice-page ticket-form-page">
        <div className="form-header">
          <Link to="/frontoffice/tickets" className="back-btn-form">
            <ArrowLeft size={18} />
            Retour
          </Link>
          <h1>{isEdit ? 'Modifier le ticket' : 'Créer un ticket'}</h1>
        </div>

        <form onSubmit={handleSubmit} className="ticket-form">
          <div className="form-section">
            <h2>Informations du ticket</h2>

            <div className="form-group">
              <label>Titre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Titre du ticket"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                placeholder="Description du problème"
                rows={5}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  {typeOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Priorité</label>
                <select name="priority" value={formData.priority} onChange={handleInputChange}>
                  {priorityOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Éléments associés</h2>

            <div className="linked-items-section">
              <h3>Éléments déjà ajoutés ({linkedItems.length})</h3>
              <div className="added-items-list">
                {linkedItems.length > 0 ? (
                  linkedItems.map((item, index) => (
                    <div key={index} className="added-item">
                      <div className="added-item-info">
                        <span className="item-type-badge">{item.typeLabel}</span>
                        <span className="item-name">{item.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveLinkedItem(index)}
                        className="remove-item-btn"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="empty-state small">Aucun élément ajouté</div>
                )}
              </div>

              <h3>Ajouter des éléments</h3>
              <div className="items-rows-container">
                {itemRows.map((row) => (
                  <div key={row.tempId} className="item-row">
                    {console.log('Rendering row:', row)}
                    <div className="form-group row-field">
                      <select
                        value={row.itemType}
                        onChange={(e) => handleRowChange(row.tempId, 'itemType', e.target.value)}
                        className="item-type-select"
                      >
                        <option value="">-- Sélectionner un type --</option>
                        {itemTypeOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group row-field">
                      <select
                        value={String(row.itemId || '')}
                        onChange={(e) => handleRowChange(row.tempId, 'itemId', e.target.value)}
                        disabled={!row.itemType}
                        className="item-select"
                      >
                        <option value="">-- Sélectionner un élément --</option>
                        {row.itemType && allItemsByType[row.itemType]?.map((item) => (
                          <option key={item.id} value={String(item.id)}>{item.name || `ID: ${item.id}`}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(row.tempId)}
                      className="remove-row-btn"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddRow}
                  className="add-row-btn"
                >
                  <Plus size={16} />
                  Ajouter une ligne
                </button>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <Link to="/frontoffice/tickets" className="btn-cancel">
              Annuler
            </Link>
            <button type="submit" disabled={loading} className="btn-save">
              {loading ? 'Enregistrement...' : isEdit ? 'Mettre à jour' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </FrontOfficeLayout>
  );
};

export default FrontOfficeTicketForm;