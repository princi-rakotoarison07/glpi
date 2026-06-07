import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import PrinterService from '../../../../services/Printer/PrinterService';
import ItemPhotos from '../../../../components/common/ItemPhotos';
import '../../../../styles/detail.css';

const PrinterDetail = () => {
  const { id } = useParams();
  const [printer, setPrinter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrinter = async () => {
      try {
        setLoading(true);
        const data = await PrinterService.getPrinterById(id);
        setPrinter(data);
      } catch (error) {
        console.error('Error fetching printer:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPrinter();
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
        <div className="loading-state">Chargement de l'imprimante...</div>
      </div>
    );
  }

  if (!printer) {
    return (
      <div className="ticket-detail-page">
        <div className="empty-state">Imprimante introuvable</div>
      </div>
    );
  }

  return (
    <div className="ticket-detail-page">
      <div className="detail-header">
        <Link to="/parc/printers" className="back-btn">
          <ArrowLeft size={16} />
          Retour à la liste
        </Link>
        <h1>Imprimante #{printer.id} - {printer.name || 'Sans titre'}</h1>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <h2>Informations générales</h2>
          <div className="detail-grid">
            <div className="detail-item">
              <div className="detail-label">ID</div>
              <div className="detail-value">{printer.id}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Nom</div>
              <div className="detail-value">{printer.name || 'Non défini'}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Numéro d'inventaire</div>
              <div className="detail-value">{printer.otherserial || 'Non défini'}</div>
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
              <div className="detail-value">{formatDate(printer.date_creation || printer.date)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">
                <Clock size={16} />
                Dernière modification
              </div>
              <div className="detail-value">{formatDate(printer.date_mod)}</div>
            </div>
          </div>
        </div>

        {/* Galerie photo réutilisable */}
        <ItemPhotos itemId={id} itemType="Printer" />
      </div>
    </div>
  );
};

export default PrinterDetail;
