import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Layers, ArrowUpRight } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import ItemTicketService from '../../services/ItemTicket/ItemTicketService';
import '../../styles/pages/TicketDetail.css';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [linkedItems, setLinkedItems] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [ticketData, itemsData] = await Promise.all([
          TicketService.getTicket(id),
          ItemTicketService.getItemsForTicket(id)
        ]);
        console.log('Ticket data:', ticketData);
        console.log('Linked items:', itemsData);
        setTicket(ticketData);
        setLinkedItems(itemsData);
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
          {linkedItems && linkedItems.length > 0 ? (
            <div className="linked-items-list">
              {linkedItems.map((linkedItem) => {
                const itemLink = getItemLink(linkedItem.itemtype, linkedItem.items_id);
                return (
                  <div key={linkedItem.id} className="linked-item-card">
                    <div className="linked-item-icon">
                      <Layers size={24} />
                    </div>
                    <div className="linked-item-info">
                      <div className="linked-item-type">
                        {getItemTypeLabel(linkedItem.itemtype)}
                      </div>
                      <div className="linked-item-name">
                        {linkedItem.item && linkedItem.item.name 
                          ? linkedItem.item.name 
                          : `ID: ${linkedItem.items_id}`}
                      </div>
                    </div>
                    {itemLink && (
                      <Link 
                        to={itemLink} 
                        className="view-item-btn"
                        title="Voir les détails de l'élément"
                      >
                        <ArrowUpRight size={16} />
                        Voir détails
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              Aucun élément lié à ce ticket.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;
