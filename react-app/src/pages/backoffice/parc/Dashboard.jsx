import React, { useState, useEffect } from 'react';
import {
  Laptop,
  Code,
  Monitor,
  Network,
  Printer,
  RefreshCw,
  Server,
  Database,
  Smartphone,
  Cpu,
  ShieldCheck,
  AlertCircle,
  Clock,
  AlertTriangle,
  ClipboardList,
  Users,
  CheckCircle,
  PauseCircle,
  Calendar,
  Trash2,
  Usb,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ParcService from '../../../services/ParcService';
import '../../../styles/ParcDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const parcItems = [
    { key: 'computers', label: 'Ordinateurs', icon: <Laptop size={20} />, path: '/parc/computers' },
    { key: 'monitors', label: 'Moniteurs', icon: <Monitor size={20} />, path: '/parc/monitors' },
    { key: 'peripherals', label: 'Périphériques', icon: <Usb size={20} />, path: '/parc/peripherals' },
    { key: 'software', label: 'Logiciels', icon: <Code size={20} />, path: '/parc/software' },
    { key: 'printers', label: 'Imprimantes', icon: <Printer size={20} />, path: '/parc/printers' },
    { key: 'pdus', label: 'PDUs', icon: <Server size={20} />, path: '/parc/pdus' },
    { key: 'racks', label: 'Baies', icon: <Database size={20} />, path: '/parc/racks' },
    { key: 'phones', label: 'Téléphones', icon: <Smartphone size={20} />, path: '/parc/phones' },
    { key: 'chassis', label: 'Châssis', icon: <Cpu size={20} />, path: '/parc/chassis' },
    { key: 'network', label: 'Matériel réseau', icon: <Network size={20} />, path: '/parc/network' },
    { key: 'licenses', label: 'Licences', icon: <ShieldCheck size={20} />, path: '/parc/licenses' }
  ];

  const getTicketIcon = (iconName) => {
    switch (iconName) {
      case 'alert': return <AlertCircle size={32} />;
      case 'clock': return <Clock size={32} />;
      case 'warning': return <AlertTriangle size={32} />;
      case 'clipboard': return <ClipboardList size={32} />;
      case 'users': return <Users size={32} />;
      case 'check': return <CheckCircle size={32} />;
      case 'pause': return <PauseCircle size={32} />;
      case 'calendar': return <Calendar size={32} />;
      case 'trash': return <Trash2 size={32} />;
      default: return <AlertCircle size={32} />;
    }
  };

  const fetchStats = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);
    setError(null);

    try {
      const data = await ParcService.getStats();
      setStats(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
      setError("Impossible de charger les statistiques depuis l'API GLPI.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="dashboard-loader">
        <RefreshCw className="loader-icon" size={40} />
        <p className="loader-text">Chargement des statistiques du parc...</p>
      </div>
    );
  }

  return (
    <div className="parc-dashboard">
      <div className="dashboard-header">
        <div className="header-title-area">
          <h2>Tableau de bord du Parc</h2>
          <p>Visualisation globale de l'inventaire matériel et logiciel de GLPI</p>
        </div>
        
        <div className="header-actions">
          <div className="total-items-badge">
            <span className="total-items-label">Nombre d'éléments général:</span>
            <span className="total-items-value">{stats?.totalItems || 0}</span>
          </div>
          
          {error ? (
            <span className="badge-demo" style={{ backgroundColor: 'rgba(224, 84, 83, 0.1)', color: 'var(--color-danger)', borderColor: 'rgba(224, 84, 83, 0.2)' }}>
              Erreur de connexion API
            </span>
          ) : (
            <span className="badge-live" title="Session API GLPI active">
              <span className="pulse-dot"></span>
              Connecté API GLPI
            </span>
          )}
          <button 
            className="btn-refresh"
            onClick={() => fetchStats(true)} 
            disabled={isRefreshing}
          >
            <RefreshCw 
              size={15} 
              className={`refresh-icon ${isRefreshing ? 'spinning' : ''}`}
            />
            {isRefreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner">
          {error} Vérifiez vos jetons d'accès dans le fichier ".env" ou la configuration réseau de votre serveur local Apache.
        </div>
      )}

      <div className="dashboard-content">
        {/* Left column: Parc items */}
        <div className="parc-section">
          <div className="section-header">
            <h3>Éléments du parc</h3>
          </div>
          <div className="parc-list">
            {parcItems.map((item) => (
              <Link key={item.key} to={item.path} className="parc-item">
                <div className="parc-item-left">
                  <div className="parc-item-icon">
                    {item.icon}
                  </div>
                  <div className="parc-item-info">
                    <div className="parc-item-label">{item.label}</div>
                    <div className="parc-item-count">{stats?.[item.key]?.total || 0}</div>
                  </div>
                </div>
                <ChevronRight size={20} className="parc-item-arrow" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right column: Tickets */}
        <div className="tickets-section">
          <div className="section-header">
            <h3>Statistiques des tickets</h3>
          </div>

          {/* Total Tickets */}
          <div className="total-tickets-card">
            <div className="total-tickets-label">Nombre de tickets général</div>
            <div className="total-tickets-value">{stats?.tickets?.total || 0}</div>
          </div>

          {/* Total Incident and Demande */}
          <div className="ticket-type-cards-grid">
            <div className="ticket-type-card incident">
              <div className="ticket-type-label">Total Incidents</div>
              <div className="ticket-type-value">{stats?.tickets?.byType?.incident || 0}</div>
            </div>
            <div className="ticket-type-card demande">
              <div className="ticket-type-label">Total Demandes</div>
              <div className="ticket-type-value">{stats?.tickets?.byType?.demande || 0}</div>
            </div>
          </div>

          {/* Détails par carte (style GLPI) */}
          <div className="ticket-cards-grid">
            {Object.values(stats?.tickets?.cards || {}).map((card, index) => (
              <div key={`ticket-card-${card.id || index}`} className="ticket-card" style={{ backgroundColor: card.color }}>
                <div className="ticket-card-top">
                  <div className="ticket-card-count">{card.count}</div>
                  <div className="ticket-card-icon">
                    {getTicketIcon(card.icon)}
                  </div>
                </div>
                <div className="ticket-card-name">{card.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
