import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowUpDown, Eye } from 'lucide-react';
import TicketService from '../../services/TicketService';
import '../../styles/pages/TicketList.css';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  // Filters
  const [statusFilter, setStatusFilter] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    const start = (currentPage - 1) * itemsPerPage;
    const params = {
      start,
      limit: itemsPerPage,
    };
    if (statusFilter) {
      params.status = statusFilter;
    }
    try {
      const result = await TicketService.getTickets(params);
      setTickets(result.tickets);
      setTotalItems(result.totalItems);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [currentPage, itemsPerPage, statusFilter]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: '1', label: 'Nouveau' },
    { value: '2', label: 'En cours (Attribué)' },
    { value: '3', label: 'En attente' },
    { value: '4', label: 'Résolu' },
    { value: '5', label: 'Fermé' },
  ];

  const getStatusName = (statusId) => {
    const option = statusOptions.find(opt => opt.value === String(statusId));
    return option ? option.label : 'Statut inconnu';
  };

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

  return (
    <div className="ticket-list-page">
      <div className="page-header">
        <h1>Liste des tickets</h1>
      </div>

      {/* Filters */}
      <div className="filters-bar">
        <div className="filter-item">
          <Filter size={16} />
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="ticket-table-container">
        {loading ? (
          <div className="loading-state">Chargement...</div>
        ) : (
          <table className="ticket-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Titre</th>
                <th>Statut</th>
                <th>Dernière modification</th>
                <th>Date d'ouverture</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td className="ticket-title">
                      {ticket.name || `Ticket #${ticket.id}`}
                    </td>
                    <td>
                      <span className="status-badge">
                        {getStatusName(ticket.status)}
                      </span>
                    </td>
                    <td>{formatDate(ticket.date_mod)}</td>
                    <td>{formatDate(ticket.date)}</td>
                    <td className="action-cell">
                      <Link to={`/tickets/${ticket.id}`} className="action-btn view-btn">
                        <Eye size={16} />
                        Détails
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="empty-state">
                    Aucun ticket trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && totalItems > 0 && (
        <div className="pagination-bar">
          <div className="pagination-info">
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="per-page-select"
            >
              <option value={10}>10 lignes / page</option>
              <option value={20}>20 lignes / page</option>
              <option value={50}>50 lignes / page</option>
              <option value={100}>100 lignes / page</option>
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
    </div>
  );
};

export default TicketList;
