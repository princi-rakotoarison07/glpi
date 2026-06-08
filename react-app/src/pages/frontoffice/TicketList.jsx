import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Ticket, Calendar, Clock, User, AlertCircle, Filter } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import AuthService from '../../services/AuthService';
import UserService from '../../services/User/UserService';
import FrontOfficeLayout from '../../layouts/FrontOfficeLayout';
import '../../styles/FrontOffice.css';

const FrontOfficeTicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [userMap, setUserMap] = useState({}); // { userId: userName }

  // Filters
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();

  const priorityOptions = [
    { value: '', label: 'Toutes les priorités' },
    { value: 1, label: 'Très basse', color: '#9e9e9e' },
    { value: 2, label: 'Basse', color: '#4caf50' },
    { value: 3, label: 'Moyenne', color: '#ff9800' },
    { value: 4, label: 'Haute', color: '#f44336' },
    { value: 5, label: 'Très haute', color: '#9c27b0' },
    { value: 6, label: 'Majeure', color: '#b71c1c' },
  ];

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
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
      console.log('Current user:', currentUser);

      const params = {
        start: 0,
        limit: 999, // Fetch MANY tickets
      };
      
      if (statusFilter) {
        params.status = statusFilter;
      }

      const result = await TicketService.getTickets(params);
      console.log('Result from getTickets:', result);
      if (result.tickets.length > 0) {
        console.log('First ticket object:', result.tickets[0]);
        console.log('All fields in first ticket:', Object.keys(result.tickets[0]));
      }

      // Apply ALL filters client-side
      let filtered = [...result.tickets];
      
      // Filter for current user's tickets (using users_id_recipient!)
      console.log('Current user id:', currentUser?.id);
      if (currentUser?.id) {
        console.log(`Filtering tickets for user ${currentUser.id}. All tickets users_id_recipient:`, 
          result.tickets.map(t => ({ id: t.id, users_id_recipient: t.users_id_recipient, name: t.name }))
        );
        filtered = filtered.filter(t => {
          const match = Number(t.users_id_recipient) === Number(currentUser.id);
          if (match) {
            console.log('Match found:', t);
          }
          return match;
        });
      }
      
      if (priorityFilter) {
        filtered = filtered.filter(t => t.priority === Number(priorityFilter));
      }
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(t => 
          t.name?.toLowerCase().includes(query) ||
          t.content?.toLowerCase().includes(query) ||
          String(t.id).includes(query)
        );
      }

      console.log('Filtered tickets:', filtered);

      // Apply pagination on filtered results
      const start = (currentPage - 1) * itemsPerPage;
      const paginated = filtered.slice(start, start + itemsPerPage);
      
      setTickets(paginated);
      setTotalItems(filtered.length);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users once on mount
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
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [currentUser?.id, currentPage, itemsPerPage, statusFilter, userMap]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle search and priority filter changes
  useEffect(() => {
    fetchTickets();
  }, [searchQuery, priorityFilter]);

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

        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <label><Filter size={16} /> Recherche</label>
            <input
              type="text"
              placeholder="Rechercher par titre, ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Statut</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Priorité</label>
            <select
              value={priorityFilter}
              onChange={(e) => { setPriorityFilter(e.target.value); setCurrentPage(1); }}
            >
              {priorityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="loading-state">Chargement des tickets...</div>
        ) : (
          <>
            <div className="tickets-table-container">
              <table className="tickets-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Titre</th>
                    <th>Utilisateur</th>
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
                      // Get user name: ticket.User?.name or ticket.users_name or ticket.users_id
                      const userId = ticket.users_id_recipient;
                      const userName = userMap[userId] 
                        || (userId ? `Utilisateur #${userId}` : 'Inconnu');
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
                            <div className="ticket-user">
                              <User size={14} style={{ marginRight: '4px' }} />
                              {userName}
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
                      <td colSpan={7} className="empty-state">
                        Aucun ticket trouvé
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {!loading && totalItems > 0 && (
              <div className="pagination-bar" style={{ background: 'white', borderRadius: '12px', marginTop: '16px', padding: '16px' }}>
                <div className="pagination-info">
                  <select
                    value={itemsPerPage}
                    onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }}
                    className="per-page-select"
                  >
                    <option value={10}>10 par page</option>
                    <option value={20}>20 par page</option>
                    <option value={50}>50 par page</option>
                  </select>
                </div>
                <div className="pagination-controls">
                  <button
                    className="pagination-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Précédent
                  </button>
                  <span className="pagination-info-text">
                    Page {currentPage} sur {totalPages}
                  </span>
                  <button
                    className="pagination-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Suivant
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </FrontOfficeLayout>
  );
};

export default FrontOfficeTicketList;