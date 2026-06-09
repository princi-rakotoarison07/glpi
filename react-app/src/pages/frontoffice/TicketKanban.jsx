import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, AlertCircle, Ticket, X, Link as LinkIcon, Edit, User } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import ItemTicketService from '../../services/ItemTicket/ItemTicketService';
import UserService from '../../services/User/UserService';
import AuthService from '../../services/AuthService';
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
import PeripheralService from '../../services/Peripheral/PeripheralService';
import PassiveDCEquipmentService from '../../services/PassiveDCEquipment/PassiveDCEquipmentService';
import CartridgeItemService from '../../services/CartridgeItem/CartridgeItemService';
import ConsumableItemService from '../../services/ConsumableItem/ConsumableItemService';
import CableService from '../../services/Cable/CableService';
import DatabaseInstanceService from '../../services/DatabaseInstance/DatabaseInstanceService';
import DCRoomService from '../../services/DCRoom/DCRoomService';
import { getTicketItemTypes } from '../../config/itemTypes';
import '../../styles/FrontOffice.css';
import './TicketKanban.css';

const TicketKanban = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userMap, setUserMap] = useState({});
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [linkedItems, setLinkedItems] = useState([]);
  const [loadingLinkedItems, setLoadingLinkedItems] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [quickTitle, setQuickTitle] = useState('');
  const [quickDesc, setQuickDesc] = useState('');
  const [quickType, setQuickType] = useState(1);
  const [quickPriority, setQuickPriority] = useState(3);
  const [quickSubmitting, setQuickSubmitting] = useState(false);
  const [allItemsByType, setAllItemsByType] = useState({});
  const [fetchingAllItems, setFetchingAllItems] = useState(false);
  const [quickItemRows, setQuickItemRows] = useState([]);

  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const priorityOptions = [
    { value: 1, label: 'Très basse', color: '#9e9e9e', bg: '#f5f5f5' },
    { value: 2, label: 'Basse', color: '#4caf50', bg: '#e8f5e9' },
    { value: 3, label: 'Moyenne', color: '#ff9800', bg: '#fff3e0' },
    { value: 4, label: 'Haute', color: '#f44336', bg: '#ffebee' },
    { value: 5, label: 'Très haute', color: '#9c27b0', bg: '#f3e5f5' },
    { value: 6, label: 'Majeure', color: '#b71c1c', bg: '#ffebee' },
  ];

  const statusOptions = [
    { value: 1, label: 'Nouveau', color: '#03a9f4', bg: '#e1f5fe' },
    { value: 2, label: 'Attribué', color: '#2196f3', bg: '#e3f2fd' },
    { value: 3, label: 'En attente', color: '#ffc107', bg: '#fffde7' },
    { value: 4, label: 'Résolu', color: '#4caf50', bg: '#e8f5e9' },
    { value: 5, label: 'Fermé', color: '#9e9e9e', bg: '#f5f5f5' },
  ];

  const typeOptions = [
    { value: 1, label: 'Incident', color: '#f44336', bg: '#ffebee' },
    { value: 2, label: 'Demande', color: '#2196f3', bg: '#e3f2fd' },
  ];

  const itemTypeOptions = getTicketItemTypes().map(type => ({
    value: type.itemType,
    label: type.label
  }));

  const getStatusInfo = (statusId) => {
    const option = statusOptions.find(opt => opt.value === statusId);
    return option || { label: 'Inconnu', color: '#9e9e9e', bg: '#f5f5f5' };
  };

  const getPriorityInfo = (priorityId) => {
    const option = priorityOptions.find(opt => opt.value === priorityId);
    return option || { label: 'Inconnu', color: '#9e9e9e', bg: '#f5f5f5' };
  };

  const getTypeInfo = (typeId) => {
    const option = typeOptions.find(opt => opt.value === typeId);
    return option || { label: 'Inconnu', color: '#9e9e9e', bg: '#f5f5f5' };
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const result = await TicketService.getTickets({ start: 0, limit: 999 });
      let userTickets = result.tickets || [];

      // Filter for current user's tickets
      if (currentUser?.id) {
        userTickets = userTickets.filter(
          t => Number(t.users_id_recipient) === Number(currentUser.id)
        );
      }

      setTickets(userTickets);
    } catch (error) {
      console.error('Error fetching tickets for Kanban:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllItems = async () => {
    setFetchingAllItems(true);
    try {
      const ticketTypes = getTicketItemTypes();
      const serviceMap = {
        Computer: ComputerService.getAllComputers,
        Monitor: MonitorService.getAllMonitors,
        Software: SoftwareService.getAllSoftware,
        Printer: PrinterService.getAllPrinters,
        Pdu: PDUService.getAllPDUs,
        Rack: RackService.getAllRacks,
        Phone: PhoneService.getAllPhones,
        Enclosure: ChassisService.getAllChassis,
        NetworkEquipment: NetworkEquipmentService.getAllNetworkEquipment,
        SoftwareLicense: SoftwareLicenseService.getAllSoftwareLicenses,
        Peripheral: PeripheralService.getAllPeripherals,
        PassiveDCEquipment: PassiveDCEquipmentService.getAllPassiveDCEquipments,
        CartridgeItem: CartridgeItemService.getAllCartridgeItems,
        ConsumableItem: ConsumableItemService.getAllConsumableItems,
        Cable: CableService.getAllCables,
        DatabaseInstance: DatabaseInstanceService.getAllDatabaseInstances,
        DCRoom: DCRoomService.getAllDCRooms
      };

      const itemPromises = ticketTypes.map(type => 
        serviceMap[type.itemType] ? serviceMap[type.itemType]() : Promise.resolve([])
      );

      const itemsResults = await Promise.all(itemPromises);
      const itemsByType = {};
      ticketTypes.forEach((type, index) => {
        const data = itemsResults[index];
        itemsByType[type.itemType] = Array.isArray(data) ? data : (data && typeof data === 'object' ? Object.values(data) : []);
      });

      setAllItemsByType(itemsByType);
    } catch (error) {
      console.error('Error fetching items for quick add:', error);
    } finally {
      setFetchingAllItems(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await UserService.getAllUsers();
        const map = {};
        users.forEach(u => {
          map[u.id] = u.name;
        });
        setUserMap(map);
      } catch (e) {
        console.error('Error fetching users:', e);
      }
    };
    fetchUsers();
    fetchTickets();
    fetchAllItems();
  }, [currentUser?.id]);

  const generateTempId = () => Date.now() + Math.random().toString(36).substr(2, 9);

  const handleAddQuickRow = () => {
    setQuickItemRows(prev => [...prev, { tempId: generateTempId(), itemType: '', itemId: '' }]);
  };

  const handleQuickRowChange = (tempId, field, value) => {
    setQuickItemRows(prev => prev.map(row => 
      row.tempId === tempId ? { 
        ...row, 
        [field]: value, 
        itemId: field === 'itemType' ? '' : (field === 'itemId' ? value : row.itemId)
      } : row
    ));
  };

  const handleRemoveQuickRow = (tempId) => {
    setQuickItemRows(prev => prev.filter(row => row.tempId !== tempId));
  };

  const handleQuickAddSubmit = async (e, keepOpen = false) => {
    if (e) e.preventDefault();
    if (!quickTitle.trim() || !quickDesc.trim()) {
      alert('Veuillez remplir le titre et la description.');
      return;
    }

    setQuickSubmitting(true);
    try {
      const payload = {
        name: quickTitle.trim(),
        content: quickDesc.trim(),
        type: Number(quickType),
        status: 1, // Forced to Nouveau
        priority: Number(quickPriority),
        users_id_recipient: currentUser?.id || 0,
      };

      const ticketRes = await TicketService.createTicket(payload);
      const ticketId = ticketRes.id;

      if (ticketId && quickItemRows.length > 0) {
        for (const row of quickItemRows) {
          if (row.itemType && row.itemId) {
            await ItemTicketService.linkItemToTicket(ticketId, row.itemId, row.itemType);
          }
        }
      }

      // Reset form
      setQuickTitle('');
      setQuickDesc('');
      setQuickType(1);
      setQuickPriority(3);
      setQuickItemRows([]);

      if (!keepOpen) {
        setShowQuickAdd(false);
      }

      // Refresh tickets list
      await fetchTickets();
    } catch (err) {
      console.error('Error in quick ticket creation:', err);
      alert('Erreur lors de la création du ticket: ' + err.message);
    } finally {
      setQuickSubmitting(false);
    }
  };

  const handleCardClick = async (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
    setLoadingLinkedItems(true);
    setLinkedItems([]);
    try {
      const items = await ItemTicketService.getItemsForTicket(ticket.id);
      setLinkedItems(items || []);
    } catch (e) {
      console.error('Error fetching linked items for ticket:', e);
    } finally {
      setLoadingLinkedItems(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Group tickets into columns
  const getColumns = () => {
    const columns = {
      nouveau: {
        id: 'nouveau',
        title: 'Nouveau',
        tickets: [],
        color: '#3b82f6',
      },
      inProgress: {
        id: 'inProgress',
        title: 'In progress (assigné)',
        tickets: [],
        color: '#f59e0b',
      },
      termine: {
        id: 'termine',
        title: 'Terminé',
        tickets: [],
        color: '#10b981',
      },
    };

    tickets.forEach(ticket => {
      // Map GLPI statuses (1: Nouveau, 2: Attribué, 3: Planifié, 4: En attente, 5: Résolu, 6: Clos...)
      const statusNum = Number(ticket.status);
      if (statusNum === 1) {
        columns.nouveau.tickets.push(ticket);
      } else if (statusNum >= 2 && statusNum <= 4) {
        columns.inProgress.tickets.push(ticket);
      } else {
        columns.termine.tickets.push(ticket);
      }
    });

    return columns;
  };

  const cols = getColumns();

  return (
    <FrontOfficeLayout>
      <div className="frontoffice-page kanban-page">
        <div className="kanban-header">
          <div className="kanban-title-section">
            <Ticket size={24} className="title-icon" />
            <h1>Tableau de suivi (Kanban)</h1>
          </div>
          <Link to="/frontoffice/tickets/add" className="add-ticket-btn">
            + Nouveau Ticket
          </Link>
        </div>

        {loading ? (
          <div className="kanban-loading">Chargement du tableau...</div>
        ) : (
          <div className="kanban-board">
            {Object.values(cols).map(col => (
              <div key={col.id} className={`kanban-column col-${col.id}`}>
                <div className="column-header" style={{ borderTopColor: col.color }}>
                  <div className="column-title">
                    <span>{col.title}</span>
                    <span className="column-count">{col.tickets.length}</span>
                  </div>
                  {col.id === 'nouveau' && (
                    <button
                      className="column-add-btn"
                      onClick={() => setShowQuickAdd(true)}
                    >
                      + Ajouter 1 ticket
                    </button>
                  )}
                </div>

                <div className="column-cards-container">
                  {col.tickets.length > 0 ? (
                    col.tickets.map(ticket => {
                      const priority = getPriorityInfo(ticket.priority);
                      const type = getTypeInfo(ticket.type);
                      return (
                        <div
                          key={ticket.id}
                          className="kanban-card"
                          onClick={() => handleCardClick(ticket)}
                        >
                          <div className="card-top">
                            <span className="ticket-id">#{ticket.id}</span>
                            <span
                              className="type-badge"
                              style={{ color: type.color, backgroundColor: type.bg }}
                            >
                              {type.label}
                            </span>
                          </div>
                          <h3 className="card-title">{ticket.name || 'Sans titre'}</h3>
                          <p className="card-desc">
                            {ticket.content
                              ? ticket.content.length > 80
                                ? `${ticket.content.substring(0, 80)}...`
                                : ticket.content
                              : 'Aucune description'}
                          </p>
                          <div className="card-footer">
                            <span
                              className="priority-badge"
                              style={{ color: priority.color, backgroundColor: priority.bg }}
                            >
                              {priority.label}
                            </span>
                            <div className="card-date">
                              <Calendar size={12} />
                              <span>{ticket.date ? new Date(ticket.date).toLocaleDateString('fr-FR') : '-'}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="column-empty">Aucun ticket</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DETAILS MODAL */}
        {showModal && selectedTicket && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-container" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Détails du ticket #{selectedTicket.id}</h2>
                <button className="close-btn" onClick={() => setShowModal(false)}>
                  <X size={20} />
                </button>
              </div>

              <div className="modal-body">
                <div className="modal-section ticket-main-info">
                  <h3>{selectedTicket.name || 'Sans titre'}</h3>
                  <div className="metadata-row">
                    <span
                      className="meta-tag type"
                      style={{
                        color: getTypeInfo(selectedTicket.type).color,
                        backgroundColor: getTypeInfo(selectedTicket.type).bg,
                      }}
                    >
                      {getTypeInfo(selectedTicket.type).label}
                    </span>
                    <span
                      className="meta-tag status"
                      style={{
                        color: getStatusInfo(selectedTicket.status).color,
                        backgroundColor: getStatusInfo(selectedTicket.status).bg,
                      }}
                    >
                      {getStatusInfo(selectedTicket.status).label}
                    </span>
                    <span
                      className="meta-tag priority"
                      style={{
                        color: getPriorityInfo(selectedTicket.priority).color,
                        backgroundColor: getPriorityInfo(selectedTicket.priority).bg,
                      }}
                    >
                      Priorité: {getPriorityInfo(selectedTicket.priority).label}
                    </span>
                  </div>
                </div>

                <div className="modal-section description-section">
                  <h4>Description</h4>
                  <div className="description-box">
                    {selectedTicket.content || 'Aucune description fournie.'}
                  </div>
                </div>

                <div className="modal-section info-grid">
                  <div className="info-cell">
                    <Calendar size={16} />
                    <div>
                      <strong>Date de création</strong>
                      <span>{formatDate(selectedTicket.date)}</span>
                    </div>
                  </div>
                  <div className="info-cell">
                    <Clock size={16} />
                    <div>
                      <strong>Dernière modification</strong>
                      <span>{formatDate(selectedTicket.date_mod)}</span>
                    </div>
                  </div>
                  <div className="info-cell">
                    <User size={16} />
                    <div>
                      <strong>Destinataire</strong>
                      <span>{userMap[selectedTicket.users_id_recipient] || `Utilisateur ID: ${selectedTicket.users_id_recipient}`}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-section assets-section">
                  <h4>Éléments associés</h4>
                  {loadingLinkedItems ? (
                    <div className="loading-small">Chargement des éléments...</div>
                  ) : linkedItems.length > 0 ? (
                    <div className="linked-assets-list">
                      {linkedItems.map((link, idx) => (
                        <div key={idx} className="asset-tag">
                          <LinkIcon size={14} />
                          <span>
                            <strong>{link.itemtype}</strong>: {link.item?.name || `ID: ${link.items_id}`}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-assets">Aucun équipement lié à ce ticket.</div>
                  )}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  className="edit-nav-btn"
                  onClick={() => {
                    setShowModal(false);
                    navigate(`/frontoffice/tickets/${selectedTicket.id}`);
                  }}
                >
                  <Edit size={16} />
                  Modifier le ticket
                </button>
                <button className="cancel-modal-btn" onClick={() => setShowModal(false)}>
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QUICK ADD MODAL */}
        {showQuickAdd && (
          <div className="modal-overlay" onClick={() => setShowQuickAdd(false)}>
            <div className="modal-container" style={{ maxWidth: '750px' }} onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Créer un nouveau ticket</h2>
                <button className="close-btn" onClick={() => setShowQuickAdd(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleQuickAddSubmit}>
                <div className="modal-body">
                  <div className="form-group">
                    <label htmlFor="quickTitle">Titre *</label>
                    <input
                      type="text"
                      id="quickTitle"
                      value={quickTitle}
                      onChange={e => setQuickTitle(e.target.value)}
                      placeholder="Ex: Problème d'impression..."
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="quickDesc">Description *</label>
                    <textarea
                      id="quickDesc"
                      rows="4"
                      value={quickDesc}
                      onChange={e => setQuickDesc(e.target.value)}
                      placeholder="Décrivez votre problème en détail..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label htmlFor="quickType">Type</label>
                      <select
                        id="quickType"
                        value={quickType}
                        onChange={e => setQuickType(Number(e.target.value))}
                      >
                        <option value={1}>Incident</option>
                        <option value={2}>Demande</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="quickPriority">Priorité</label>
                      <select
                        id="quickPriority"
                        value={quickPriority}
                        onChange={e => setQuickPriority(Number(e.target.value))}
                      >
                        <option value={1}>Très basse</option>
                        <option value={2}>Basse</option>
                        <option value={3}>Moyenne</option>
                        <option value={4}>Haute</option>
                        <option value={5}>Très haute</option>
                        <option value={6}>Majeure</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Statut</label>
                    <input type="text" value="Nouveau (par défaut)" disabled style={{ backgroundColor: '#f1f5f9', color: '#64748b' }} />
                  </div>

                  {/* EQUIPMENT ASSOCIATION IN QUICK ADD */}
                  <div className="quick-equipments-section" style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#475569', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Équipements associés (optionnel)
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddQuickRow}
                        style={{
                          backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '6px 12px',
                          borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '12px'
                        }}
                      >
                        + Ajouter une ligne
                      </button>
                    </div>

                    {quickItemRows.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {quickItemRows.map((row) => (
                          <div key={row.tempId} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr auto', gap: '12px', alignItems: 'end' }}>
                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label style={{ fontSize: '12px' }}>Type</label>
                              <select
                                value={row.itemType}
                                onChange={(e) => handleQuickRowChange(row.tempId, 'itemType', e.target.value)}
                              >
                                <option value="">Sélectionner un type...</option>
                                {itemTypeOptions.map(opt => (
                                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                              </select>
                            </div>

                            <div className="form-group" style={{ marginBottom: 0 }}>
                              <label style={{ fontSize: '12px' }}>Élément</label>
                              <select
                                value={row.itemId}
                                onChange={(e) => handleQuickRowChange(row.tempId, 'itemId', e.target.value)}
                                disabled={!row.itemType}
                              >
                                <option value="">Sélectionner un élément...</option>
                                {(allItemsByType[row.itemType] || []).map(item => (
                                  <option key={item.id} value={item.id}>{item.name || `ID: ${item.id}`}</option>
                                ))}
                              </select>
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveQuickRow(row.tempId)}
                              style={{
                                backgroundColor: '#ef4444', color: '#ffffff', border: 'none', padding: '10px 16px',
                                borderRadius: '8px', fontWeight: '600', cursor: 'pointer', height: '42px', fontSize: '13px'
                              }}
                            >
                              Supprimer
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic' }}>Aucun équipement associé. Cliquez sur "+ Ajouter une ligne" pour commencer.</div>
                    )}
                  </div>
                </div>

                <div className="modal-footer" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="cancel-modal-btn"
                    style={{ backgroundColor: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0', marginRight: 'auto' }}
                    onClick={() => setShowQuickAdd(false)}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="edit-nav-btn"
                    style={{ backgroundColor: '#10b981' }}
                    disabled={quickSubmitting}
                    onClick={() => handleQuickAddSubmit(null, true)}
                  >
                    {quickSubmitting ? 'Création...' : 'Créer et ajouter un autre'}
                  </button>
                  <button type="submit" className="edit-nav-btn" disabled={quickSubmitting}>
                    {quickSubmitting ? 'Création...' : 'Créer le ticket'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </FrontOfficeLayout>
  );
};

export default TicketKanban;
