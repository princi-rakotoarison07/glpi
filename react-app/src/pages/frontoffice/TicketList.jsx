import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Ticket, Calendar, Clock, User, AlertCircle } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import FrontOfficeLayout from '../../layouts/FrontOfficeLayout';
import '../../styles/FrontOffice.css';

const FrontOfficeTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const priorityOptions = [
    { value: 1, label: 'Très basse', color: '#9e9e9e' },
    { value: 2, label: 'Basse', color: '#4caf50' },
    { value: 3, label: 'Moyenne', color: '#ff9800' },
    { value: 4, label: 'Haute', color: '#f44336' },
    { value: 5, label: 'Très haute', color: '#9c27b0' },
    { value: 6, label: 'Majeure', color: '#b71c1c' },
  ];

  const statusOptions = [
    { value: 1, label: 'Nouveau', color: '#03a9f4' },
    { value: 2, label: 'Attribué', color: '#2196f3' },
    { value: 3, label: 'En attente', color: '#ffc107' },
    { value: 4, label: 'Résolu', color: '#4caf50' },
    { value: 5, label: 'Fermé', color: '#9e9e9e' },
  ];

  const getStatusInfo = (statusId) => {
    const option = statusOptions.find(opt => opt.value === statusId);
    return option || { label: 'Inconnu', color: '#9e9e9e' };
  };

  const getPriorityInfo = (priorityId) => {
    const option = priorityOptions.find(opt => opt.value === priorityId);
    return option || { label: 'Inconnu', color: '#9e9e9e' };
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const result = await TicketService.getTickets({ start: 0, limit: 50 });
      setTickets(result.tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <FrontOfficeLayout>
      <div className="frontoffice-page">
        <div className="ticket-list-header">
          <h1>Tickets</h1>
          <Link to="/frontoffice/tickets/add" className="btn-add-ticket">
            <Plus size={18} />
            Créer un ticket
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">Chargement des tickets...</div>
        ) : (
          <div className="tickets-table-container">
            <table className="tickets-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Titre</th>
                  <th>Statut</th>
                  <th>Priorité</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map((ticket) => {
                    const statusInfo = getStatusInfo(ticket.status);
                    const priorityInfo = getPriorityInfo(ticket.priority);
                    return (
                      <tr key={ticket.id} className="ticket-row">
                        <td>{ticket.id}</td>
                        <td className="ticket-name">
                          <div className="ticket-name-content">
                            <AlertCircle size={16} style={{ marginRight: '8px', color: statusInfo.color }} />
                            {ticket.name}
                          </div>
                        </td>
                        <td>
                          <span className="status-badge" style={{ backgroundColor: statusInfo.color + '20', color: statusInfo.color }}>
                            {statusInfo.label}
                          </span>
                        </td>
                        <td>
                          <span className="priority-badge" style={{ backgroundColor: priorityInfo.color + '20', color: priorityInfo.color }}>
                            {priorityInfo.label}
                          </span>
                        </td>
                        <td>
                          <div className="ticket-date">
                            <Calendar size={14} style={{ marginRight: '4px' }} />
                            {new Date(ticket.date).toLocaleDateString('fr-FR')}
                          </div>
                        </td>
                        <td>
                          <Link to={`/frontoffice/tickets/${ticket.id}`} className="view-details-link">
                            Voir détails
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="empty-state">
                      Aucun ticket trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </FrontOfficeLayout>
  );
};

export default FrontOfficeTicketList;