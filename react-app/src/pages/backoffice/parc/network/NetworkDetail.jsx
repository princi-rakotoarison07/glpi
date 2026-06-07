import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import NetworkEquipmentService from '../../../../services/NetworkEquipment/NetworkEquipmentService';
import ItemPhotos from '../../../../components/common/ItemPhotos';
import '../../../../styles/pages/TicketDetail.css';

const NetworkDetail = () => {
  const { id } = useParams();
  const [network, setNetwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        setLoading(true);
        const data = await NetworkEquipmentService.getNetworkEquipmentById(id);
        setNetwork(data);
      } catch (error) {
        console.error('Error fetching network:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNetwork();
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
        <div className="loading-state">Chargement du matériel réseau...</div>
      </div>
    );
  }

  if (!network) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Matériel réseau introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/network" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Matériel réseau #{network.id} - {network.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{network.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{network.name || 'Non défini'}</div>
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
              <div className="detail-value">{formatDate(network.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(network.date_mod)}</div>
            </div>
          </div>
        </div>

        {/* Galerie photo réutilisable */}
        <ItemPhotos itemId={id} itemType="NetworkEquipment" />
      </div>
    </div>
  );
};

export default NetworkDetail;
