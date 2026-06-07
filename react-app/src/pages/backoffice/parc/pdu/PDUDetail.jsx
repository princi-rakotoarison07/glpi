import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import PDUService from '../../../../services/PDU/PDUService';
import ItemPhotos from '../../../../components/common/ItemPhotos';
import '../../../../styles/pages/TicketDetail.css';

const PDUDetail = () => {
  const { id } = useParams();
  const [pdu, setPdu] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPdu = async () => {
      try {
        setLoading(true);
        const data = await PDUService.getPDUById(id);
        setPdu(data);
      } catch (error) {
        console.error('Error fetching pdu:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPdu();
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
        <div className="loading-state">Chargement du PDU...</div>
      </div>
    );
  }

  if (!pdu) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">PDU introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/pdus" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>PDU #{pdu.id} - {pdu.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{pdu.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{pdu.name || 'Non défini'}</div>
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
              <div className="detail-value">{formatDate(pdu.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(pdu.date_mod)}</div>
            </div>
          </div>
        </div>

        {/* Galerie photo réutilisable */}
        <ItemPhotos itemId={id} itemType="PDU" />
      </div>
    </div>
  );
};

export default PDUDetail;
