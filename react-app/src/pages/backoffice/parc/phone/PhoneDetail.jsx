import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import PhoneService from '../../../../services/Phone/PhoneService';
import '../../../../styles/pages/TicketDetail.css';

const PhoneDetail = () => {
  const { id } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        setLoading(true);
        const data = await PhoneService.getPhoneById(id);
        setPhone(data);
      } catch (error) {
        console.error('Error fetching phone:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPhone();
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
        <div className="loading-state">Chargement du téléphone...</div>
      </div>
    );
  }

  if (!phone) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Téléphone introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/phones" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Téléphone #{phone.id} - {phone.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{phone.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{phone.name || 'Non défini'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Numéro d'inventaire</div>
              <div className="detail-value">{phone.otherserial || 'Non défini'}</div>
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
              <div className="detail-value">{formatDate(phone.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(phone.date_mod)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDetail;
