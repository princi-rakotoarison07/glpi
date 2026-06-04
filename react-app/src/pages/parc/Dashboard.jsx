import React, { useState, useEffect } from 'react';
import {
  Laptop,
  Code,
  Monitor,
  Network,
  Printer,
  MousePointer,
  RefreshCw
} from 'lucide-react';
import ParcService from '../../services/ParcService';
import '../../styles/ParcDashboard.css';

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

      {/* Grid de 6 KPI Cards principales */}
      <div className="stats-grid stats-grid-dashboard">
        {/* Ordinateurs */}
        <div className="stat-card computers stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Ordinateurs</span>
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
            <span className="stat-card-title">Logiciels</span>
            <div className="stat-icon-wrapper">
              <Code size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.software?.total || 0}</div>
          </div>
        </div>

        {/* Moniteurs */}
        <div className="stat-card monitors stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Moniteurs</span>
            <div className="stat-icon-wrapper">
              <Monitor size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.monitors?.total || 0}</div>
          </div>
        </div>

        {/* Matériels Réseau */}
        <div className="stat-card network stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Matériels Réseau</span>
            <div className="stat-icon-wrapper">
              <Network size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.network?.total || 0}</div>
          </div>
        </div>

        {/* Imprimantes */}
        <div className="stat-card printers stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Imprimantes</span>
            <div className="stat-icon-wrapper">
              <Printer size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.printers?.total || 0}</div>
          </div>
        </div>

        {/* Périphériques */}
        <div className="stat-card peripherals stat-card-custom">
          <div className="stat-card-header">
            <span className="stat-card-title">Périphériques</span>
            <div className="stat-icon-wrapper">
              <MousePointer size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.peripherals?.total || 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
