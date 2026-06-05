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
  ShieldCheck
} from 'lucide-react';
import ParcService from '../../../services/ParcService';
import '../../../styles/ParcDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

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
          <h2>Tableau de Bord du Parc</h2>
          <p>Visualisation globale de l'inventaire matériel et logiciel de GLPI</p>
        </div>
        
        <div className="header-actions">
          {/* Nombre total d'éléments */}
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
          {error} Vérifiez vos jetons d'accès dans le fichier `.env` ou la configuration réseau de votre serveur local Apache.
        </div>
      )}

      {/* Grid de 10 KPI Cards principales */}
      <div className="stats-grid stats-grid-dashboard">
        {/* Ordinateurs */}
        <div className="stat-card computers stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Ordinateur</span>
            <div className="stat-icon-wrapper">
              <Laptop size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.computers?.total || 0}</div>
          </div>
        </div>

        {/* Logiciels */}
        <div className="stat-card software stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Logiciel</span>
            <div className="stat-icon-wrapper">
              <Code size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.software?.total || 0}</div>
          </div>
        </div>

        {/* Imprimantes */}
        <div className="stat-card printers stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Imprimante</span>
            <div className="stat-icon-wrapper">
              <Printer size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.printers?.total || 0}</div>
          </div>
        </div>

        {/* PDU */}
        <div className="stat-card pdus stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">PDU</span>
            <div className="stat-icon-wrapper">
              <Server size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.pdus?.total || 0}</div>
          </div>
        </div>

        {/* Baie */}
        <div className="stat-card racks stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Baie</span>
            <div className="stat-icon-wrapper">
              <Database size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.racks?.total || 0}</div>
          </div>
        </div>

        {/* Téléphone */}
        <div className="stat-card phones stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Téléphone</span>
            <div className="stat-icon-wrapper">
              <Smartphone size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.phones?.total || 0}</div>
          </div>
        </div>

        {/* Châssis */}
        <div className="stat-card chassis stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Châssis</span>
            <div className="stat-icon-wrapper">
              <Cpu size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.chassis?.total || 0}</div>
          </div>
        </div>

        {/* Matériel réseau */}
        <div className="stat-card network stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Matériel réseau</span>
            <div className="stat-icon-wrapper">
              <Network size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.network?.total || 0}</div>
          </div>
        </div>

        {/* Licence */}
        <div className="stat-card licenses stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Licence</span>
            <div className="stat-icon-wrapper">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.licenses?.total || 0}</div>
          </div>
        </div>

        {/* Moniteur */}
        <div className="stat-card monitors stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Moniteur</span>
            <div className="stat-icon-wrapper">
              <Monitor size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.monitors?.total || 0}</div>
          </div>
        </div>
      </div>

      {/* Section Tickets (en bas) */}
      <div className="tickets-section">
        <div className="tickets-header">
          <h3>Statistiques des Tickets</h3>
        </div>

        {/* Total Tickets */}
        <div className="total-tickets-card">
          <div className="total-tickets-label">Nombre de tickets général</div>
          <div className="total-tickets-value">{stats?.tickets?.total || 0}</div>
        </div>

        {/* Détails par statut (style GLPI) */}
        <div className="ticket-status-grid">
          {Object.values(stats?.tickets?.byStatus || {}).map((status, index) => (
            <div key={`ticket-status-${status.id || index}`} className="ticket-status-card" style={{ backgroundColor: status.color }}>
              <div className="ticket-status-count">{status.count}</div>
              <div className="ticket-status-name">{status.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
