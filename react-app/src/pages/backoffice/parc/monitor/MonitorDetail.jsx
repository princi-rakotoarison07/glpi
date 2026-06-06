import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import MonitorService from '../../../../services/Monitor/MonitorService';
import '../../../../styles/pages/TicketDetail.css';

const MonitorDetail = () => {
  const { id } = useParams();
  const [monitor, setMonitor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonitor = async () => {
      try {
        setLoading(true);
        const data = await MonitorService.getMonitorById(id);
        setMonitor(data);
      } catch (error) {
        console.error('Error fetching monitor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMonitor();
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
        <div className="loading-state">Chargement du moniteur...</div>
      </div>
    );
  }

  if (!monitor) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Moniteur introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/monitors" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Moniteur #{monitor.id} - {monitor.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{monitor.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{monitor.name || 'Non défini'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Numéro d'inventaire</div>
              <div className="detail-value">{monitor.otherserial || 'Non défini'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Statut ID</div>
              <div className="detail-value">{monitor.states_id || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Localisation ID</div>
              <div className="detail-value">{monitor.locations_id || '-'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Fabricant ID</div>
              <div className="detail-value">{monitor.manufacturers_id || '-'}</div>
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
              <div className="detail-value">{formatDate(monitor.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(monitor.date_mod)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorDetail;
