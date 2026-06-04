import React, { useState, useEffect } from 'react';
import {
  Laptop,
  Code,
  Monitor,
  Network,
  Printer,
  MousePointer,
  Activity,
  RefreshCw,
  TrendingUp,
  Server,
  AlertTriangle
} from 'lucide-react';
import ParcService from '../../services/ParcService';
import '../../styles/ParcDashboard.css';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [dataSource, setDataSource] = useState('mock'); // 'real' or 'mock'
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchStats = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const statsResponse = await ParcService.getStats();
      setData(statsResponse);
      // Par défaut, si l'API répond avec succès, on affiche le réel, sinon on reste en démo
      if (statsResponse && statsResponse.success) {
        setDataSource('real');
      } else {
        setDataSource('mock');
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des stats:", error);
      setDataSource('mock');
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

  // Sélection de la source des statistiques (Réel vs Mock)
  const stats = dataSource === 'real' ? data?.real : data?.mock;

  // Calcul du total des équipements matériels
  const totalHardware = 
    (stats?.computers?.total || 0) + 
    (stats?.monitors?.total || 0) + 
    (stats?.network?.total || 0) + 
    (stats?.printers?.total || 0) + 
    (stats?.peripherals?.total || 0);

  // Distribution des statuts pour le Donut chart
  const activeTotal = 
    (stats?.computers?.active || 0) + 
    (stats?.monitors?.active || 0) + 
    (stats?.network?.active || 0) + 
    (stats?.printers?.active || 0) + 
    (stats?.peripherals?.active || 0);

  const stockTotal = 
    (stats?.computers?.stock || 0) + 
    (stats?.monitors?.stock || 0) + 
    (stats?.network?.stock || 0) + 
    (stats?.printers?.stock || 0) + 
    (stats?.peripherals?.stock || 0);

  const maintenanceTotal = 
    (stats?.computers?.maintenance || 0) + 
    (stats?.monitors?.maintenance || 0) + 
    (stats?.network?.maintenance || 0) + 
    (stats?.printers?.maintenance || 0) + 
    (stats?.peripherals?.maintenance || 0);

  const brokenTotal = totalHardware - (activeTotal + stockTotal + maintenanceTotal);
  const brokenCount = brokenTotal > 0 ? brokenTotal : 0;

  // Calcul des pourcentages pour le Donut Chart (SVG stroke-dasharray)
  const activePct = totalHardware ? (activeTotal / totalHardware) * 100 : 0;
  const stockPct = totalHardware ? (stockTotal / totalHardware) * 100 : 0;
  const maintPct = totalHardware ? (maintenanceTotal / totalHardware) * 100 : 0;
  const brokenPct = totalHardware ? (brokenCount / totalHardware) * 100 : 0;

  // Configuration du cercle SVG (rayon = 50, circhemférence = 2 * pi * r = 314.16)
  const radius = 50;
  const circ = 2 * Math.PI * radius; // ~314.16
  
  const activeDash = (activePct / 100) * circ;
  const stockDash = (stockPct / 100) * circ;
  const maintDash = (maintPct / 100) * circ;
  const brokenDash = (brokenPct / 100) * circ;

  // offsets
  const activeOffset = 0;
  const stockOffset = activeDash;
  const maintOffset = activeDash + stockDash;
  const brokenOffset = activeDash + stockDash + maintDash;

  return (
    <div className="parc-dashboard">
      <div className="dashboard-header">
        <div className="header-title-area">
          <h2>Tableau de Bord du Parc</h2>
          <p>Visualisation globale de l'inventaire matériel et logiciel de GLPI</p>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* Sélecteur de source de données */}
          <div className="source-toggle">
            <button 
              className={`source-toggle-btn ${dataSource === 'real' ? 'active' : ''}`}
              onClick={() => data?.success && setDataSource('real')}
              disabled={!data?.success}
              title={data?.success ? 'Afficher les données réelles de l\'API' : 'API GLPI non accessible (mode démo forcé)'}
            >
              <Server size={13} />
              API GLPI (Réel)
            </button>
            <button 
              className={`source-toggle-btn ${dataSource === 'mock' ? 'active' : ''}`}
              onClick={() => setDataSource('mock')}
            >
              Mode Démo
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {data?.success ? (
              <span className="badge-live" title="Session API GLPI active">
                <span className="pulse-dot"></span>
                Connecté
              </span>
            ) : (
              <span className="badge-demo" title="Impossible de se connecter à l'API GLPI">Hors-ligne (Démo)</span>
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
      </div>

      {/* Banner d'avertissement si le parc réel est vide */}
      {dataSource === 'real' && totalHardware === 0 && (
        <div className="empty-state-banner">
          <AlertTriangle size={20} />
          <div>Votre parc GLPI est actuellement vide ou aucun équipement n'a été trouvé.</div>
          <div style={{ fontWeight: 'normal', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            L'API a répondu avec succès mais ne contient aucun matériel. Ajoutez des ordinateurs, logiciels ou moniteurs dans GLPI, ou basculez sur le <strong>Mode Démo</strong> pour prévisualiser l'interface.
          </div>
        </div>
      )}

      {/* Grid de 6 KPI Cards principales */}
      <div className="stats-grid">
        {/* Ordinateurs */}
        <div className="stat-card computers">
          <div className="stat-card-header">
            <span className="stat-card-title">Ordinateurs</span>
            <div className="stat-icon-wrapper">
              <Laptop size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.computers?.total || 0}</div>
          </div>
          <div className="stat-card-footer">
            <span className="stat-sub-item"><span className="dot active"></span>{stats?.computers?.active || 0} actifs</span>
            <span className="stat-sub-item"><span className="dot stock"></span>{stats?.computers?.stock || 0} stock</span>
          </div>
        </div>

        {/* Logiciels */}
        <div className="stat-card software">
          <div className="stat-card-header">
            <span className="stat-card-title">Logiciels</span>
            <div className="stat-icon-wrapper">
              <Code size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.software?.total || 0}</div>
          </div>
          <div className="stat-card-footer">
            <span className="stat-sub-item"><span className="dot active"></span>{stats?.software?.licenses || 0} Licences</span>
            <span className="stat-sub-item"><span className="dot stock"></span>{stats?.software?.free || 0} Open Source</span>
          </div>
        </div>

        {/* Moniteurs */}
        <div className="stat-card monitors">
          <div className="stat-card-header">
            <span className="stat-card-title">Moniteurs</span>
            <div className="stat-icon-wrapper">
              <Monitor size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.monitors?.total || 0}</div>
          </div>
          <div className="stat-card-footer">
            <span className="stat-sub-item"><span className="dot active"></span>{stats?.monitors?.active || 0} en service</span>
            <span className="stat-sub-item"><span className="dot stock"></span>{stats?.monitors?.stock || 0} stock</span>
          </div>
        </div>

        {/* Matériels Réseau */}
        <div className="stat-card network">
          <div className="stat-card-header">
            <span className="stat-card-title">Matériels Réseau</span>
            <div className="stat-icon-wrapper">
              <Network size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.network?.total || 0}</div>
          </div>
          <div className="stat-card-footer">
            <span className="stat-sub-item"><span className="dot active"></span>{stats?.network?.active || 0} actifs</span>
            <span className="stat-sub-item"><span className="dot stock"></span>{stats?.network?.stock || 0} stock</span>
          </div>
        </div>

        {/* Imprimantes */}
        <div className="stat-card printers">
          <div className="stat-card-header">
            <span className="stat-card-title">Imprimantes</span>
            <div className="stat-icon-wrapper">
              <Printer size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.printers?.total || 0}</div>
          </div>
          <div className="stat-card-footer">
            <span className="stat-sub-item"><span className="dot active"></span>{stats?.printers?.active || 0} en service</span>
            <span className="stat-sub-item"><span className="dot maintenance"></span>{stats?.printers?.maintenance || 0} maintenance</span>
          </div>
        </div>

        {/* Périphériques */}
        <div className="stat-card peripherals">
          <div className="stat-card-header">
            <span className="stat-card-title">Périphériques</span>
            <div className="stat-icon-wrapper">
              <MousePointer size={20} />
            </div>
          </div>
          <div className="stat-card-body">
            <div className="stat-value">{stats?.peripherals?.total || 0}</div>
          </div>
          <div className="stat-card-footer">
            <span className="stat-sub-item"><span className="dot active"></span>{stats?.peripherals?.active || 0} branchés</span>
            <span className="stat-sub-item"><span className="dot stock"></span>{stats?.peripherals?.stock || 0} réserve</span>
          </div>
        </div>
      </div>

      {/* Row de Détails et Graphiques */}
      <div className="details-grid">
       
        {/* Section Flux d'Activité Récente */}
        <div className="details-card">
          <div className="details-card-title">
            <span>Flux d'activités</span>
            <Activity size={18} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon-dot success"></span>
              <div className="activity-content">
                <p className="activity-text"><strong>Ordinateur PC-PRO-024</strong> a été affecté à l'utilisateur <em>Princi R.</em></p>
                <span className="activity-time">Il y a 10 minutes</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon-dot info"></span>
              <div className="activity-content">
                <p className="activity-text">Nouveau logiciel <strong>Visual Studio Code v1.90</strong> enregistré</p>
                <span className="activity-time">Il y a 1 heure</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon-dot warning"></span>
              <div className="activity-content">
                <p className="activity-text">Imprimante <strong>IMP-RH-02</strong> signalée en maintenance</p>
                <span className="activity-time">Il y a 3 heures</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon-dot success"></span>
              <div className="activity-content">
                <p className="activity-text">Inventaire GLPI synchronisé avec succès via l'API REST</p>
                <span className="activity-time">Ce matin à 08:30</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
