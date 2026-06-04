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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', gap: '16px' }}>
        <RefreshCw className="animate-spin" size={40} style={{ color: 'var(--color-primary)', animation: 'spin 1s linear infinite' }} />
        <p style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Chargement des statistiques du parc...</p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
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
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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
            onClick={() => fetchStats(true)} 
            disabled={isRefreshing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '13px',
              color: 'var(--text-primary)',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
            onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.backgroundColor = 'var(--bg-card)'; }}
          >
            <RefreshCw 
              size={15} 
              style={{ 
                animation: isRefreshing ? 'spin 1s linear infinite' : 'none',
                transition: 'transform 0.3s'
              }} 
            />
            {isRefreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          backgroundColor: 'rgba(224, 84, 83, 0.05)',
          border: '1px dashed rgba(224, 84, 83, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px',
          color: 'var(--color-danger)',
          fontWeight: 600,
          fontSize: '14px',
          marginBottom: '8px'
        }}>
          {error} Vérifiez vos jetons d'accès dans le fichier `.env` ou la configuration réseau de votre serveur local Apache.
        </div>
      )}

      {/* Grid de 6 KPI Cards principales */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        {/* Ordinateurs */}
        <div className="stat-card computers" style={{ minHeight: '140px' }}>
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
        <div className="stat-card software" style={{ minHeight: '140px' }}>
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
        <div className="stat-card monitors" style={{ minHeight: '140px' }}>
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
        <div className="stat-card network" style={{ minHeight: '140px' }}>
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
        <div className="stat-card printers" style={{ minHeight: '140px' }}>
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
        <div className="stat-card peripherals" style={{ minHeight: '140px' }}>
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
