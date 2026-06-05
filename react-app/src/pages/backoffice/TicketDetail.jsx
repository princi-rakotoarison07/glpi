import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import TicketService from '../../services/Ticket/TicketService';
import '../../styles/pages/TicketDetail.css';

const TicketDetail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const data = await TicketService.getTicket(id);
        setTicket(data);
      } catch (error) {
        console.error('Error fetching ticket:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTicket();
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
      </div>
    </div>
  );
};

export default TicketDetail;
