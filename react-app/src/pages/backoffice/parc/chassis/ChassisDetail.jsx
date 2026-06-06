import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import ChassisService from '../../../../services/Chassis/ChassisService';
import '../../../../styles/pages/TicketDetail.css';

const ChassisDetail = () => {
  const { id } = useParams();
  const [chassis, setChassis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChassis = async () => {
      try {
        setLoading(true);
        const data = await ChassisService.getChassisById(id);
        setChassis(data);
      } catch (error) {
        console.error('Error fetching chassis:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChassis();
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
        <div className="loading-state">Chargement du châssis...</div>
      </div>
    );
  }

  if (!chassis) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Châssis introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/chassis" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Châssis #{chassis.id} - {chassis.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{chassis.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{chassis.name || 'Non défini'}</div>
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
              <div className="detail-value">{formatDate(chassis.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(chassis.date_mod)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChassisDetail;
