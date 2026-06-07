import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import SoftwareService from '../../../../services/Software/SoftwareService';
import ItemPhotos from '../../../../components/common/ItemPhotos';
import '../../../../styles/detail.css';

const SoftwareDetail = () => {
  const { id } = useParams();
  const [software, setSoftware] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSoftware = async () => {
      try {
        setLoading(true);
        const data = await SoftwareService.getSoftwareById(id);
        setSoftware(data);
      } catch (error) {
        console.error('Error fetching software:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSoftware();
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
        <div className="loading-state">Chargement du logiciel...</div>
      </div>
    );
  }

  if (!software) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Logiciel introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/software" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Logiciel #{software.id} - {software.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{software.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{software.name || 'Non défini'}</div>
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
              <div className="detail-value">{formatDate(software.date_creation || software.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(software.date_mod)}</div>
            </div>
          </div>
        </div>

        {/* Galerie photo réutilisable */}
        <ItemPhotos itemId={id} itemType="Software" />
      </div>
    </div>
  );
};

export default SoftwareDetail;
