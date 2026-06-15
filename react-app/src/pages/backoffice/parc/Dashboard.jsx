import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Cable,
  Droplet,
  Package,
  Layers
} from 'lucide-react';
import ParcService from '../../../services/ParcService';
import '../../../styles/ParcDashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const getTicketIcon = (iconName) => {
    switch (iconName) {
      case 'alert': return <AlertCircle size={20} />;
      case 'clock': return <Clock size={20} />;
      case 'warning': return <AlertTriangle size={20} />;
      case 'clipboard': return <ClipboardList size={20} />;
      case 'users': return <Users size={20} />;
      case 'check': return <CheckCircle size={20} />;
      case 'pause': return <PauseCircle size={20} />;
      case 'calendar': return <Calendar size={20} />;
      case 'trash': return <Trash2 size={20} />;
      default: return <AlertCircle size={20} />;
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
      <div className="dashboard-loader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#64748b' }}>
        <RefreshCw className="loader-icon spinning" size={40} />
        <p className="loader-text" style={{ marginTop: '16px', fontWeight: '500' }}>Chargement des statistiques du parc...</p>
      </div>
    );
  }

  const parcCategories = [
    { label: 'Ordinateurs', count: stats?.computers?.total || 0, path: '/parc/computers', icon: <Laptop size={18} /> },
    { label: 'Moniteurs', count: stats?.monitors?.total || 0, path: '/parc/monitors', icon: <Monitor size={18} /> },
    { label: 'Téléphones', count: stats?.phones?.total || 0, path: '/parc/phones', icon: <Smartphone size={18} /> },
    { label: 'Matériel réseau', count: stats?.network?.total || 0, path: '/parc/network', icon: <Network size={18} /> },
    { label: 'Logiciels', count: stats?.software?.total || 0, path: '/parc/software', icon: <Code size={18} /> },
    { label: 'Imprimantes', count: stats?.printers?.total || 0, path: '/parc/printers', icon: <Printer size={18} /> },
    { label: 'PDUs', count: stats?.pdus?.total || 0, path: '/parc/pdus', icon: <Server size={18} /> },
    { label: 'Baies', count: stats?.racks?.total || 0, path: '/parc/racks', icon: <Database size={18} /> },
    { label: 'Châssis', count: stats?.chassis?.total || 0, path: '/parc/chassis', icon: <Cpu size={18} /> },
    { label: 'Licences', count: stats?.licenses?.total || 0, path: '/parc/licenses', icon: <ShieldCheck size={18} /> },
    { label: 'Périphériques', count: stats?.peripherals?.total || 0, path: '/parc/peripherals', icon: <Usb size={18} /> },
    { label: 'Matériel passif', count: stats?.passiveEquipment?.total || 0, path: '/parc/passiveEquipment', icon: <Layers size={18} /> },
    { label: 'Cartouches', count: stats?.cartridges?.total || 0, path: '/parc/cartridges', icon: <Droplet size={18} /> },
    { label: 'Consommables', count: stats?.consumables?.total || 0, path: '/parc/consumables', icon: <Package size={18} /> },
    { label: 'Câbles', count: stats?.cables?.total || 0, path: '/parc/cables', icon: <Cable size={18} /> },
    { label: 'Bases de données', count: stats?.databaseInstances?.total || 0, path: '/parc/databaseInstances', icon: <Database size={18} /> },
    { label: 'Salles serveur', count: stats?.dcRooms?.total || 0, path: '/parc/dcRooms', icon: <Server size={18} /> },
  ];

  return (
    <div className="parc-dashboard" style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div className="header-title-area">
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#2f3f64', margin: 0 }}>Tableau de Bord du Parc</h2>
          <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.95rem' }}>Visualisation globale de l'inventaire matériel et logiciel de GLPI</p>
        </div>
        
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {error ? (
            <span className="badge-error" style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>
              Erreur de connexion API
            </span>
          ) : (
            <span className="badge-live" style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #dcfce7', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', background: '#16a34a', borderRadius: '50%' }}></span>
              Connecté API GLPI
            </span>
          )}
          <button 
            className="btn-refresh"
            onClick={() => fetchStats(true)} 
            disabled={isRefreshing}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '6px', 
              padding: '8px 16px', 
              borderRadius: '6px', 
              border: '1px solid #cbd5e1', 
              background: '#ffffff', 
              color: '#334155', 
              fontWeight: '600', 
              fontSize: '0.9rem',
              cursor: 'pointer'
            }}
          >
            <RefreshCw 
              size={14} 
              className={isRefreshing ? 'spinning' : ''}
            />
            {isRefreshing ? 'Actualisation...' : 'Actualiser'}
          </button>
        </div>
      </div>

      {error && (
        <div className="error-banner" style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#ef4444', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontSize: '0.9rem' }}>
          {error} Vérifiez vos jetons d'accès dans le fichier `.env` ou la configuration réseau de votre serveur local Apache.
        </div>
      )}

      {/* Grid Layout Principal : Côte à côte */}
      <div className="dashboard-grid-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
        
        {/* Colonne Gauche : Éléments du parc */}
        <div className="parc-list-section" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2f3f64', margin: 0 }}>Éléments du parc</h3>
            <span style={{ fontSize: '0.85rem', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
              Nombre d’éléments général : {stats?.totalItems || 0}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {parcCategories.map((cat, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  background: '#f8fafc', 
                  border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: '#2f3f64', display: 'flex', alignItems: 'center' }}>{cat.icon}</span>
                  <span style={{ fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>{cat.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontWeight: '700', color: '#2f3f64', fontSize: '1.1rem' }}>{cat.count}</span>
                  <Link 
                    to={cat.path} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '6px', 
                      background: '#ffffff', 
                      border: '1px solid #cbd5e1', 
                      color: '#2f3f64',
                      textDecoration: 'none',
                      fontWeight: '800',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#2f3f64';
                      e.target.style.color = '#ffffff';
                      e.target.style.borderColor = '#2f3f64';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#ffffff';
                      e.target.style.color = '#2f3f64';
                      e.target.style.borderColor = '#cbd5e1';
                    }}
                  >
                    &gt;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Statistiques des tickets */}
        <div className="tickets-section" style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2f3f64', margin: 0 }}>Statistiques des tickets</h3>
            <span style={{ fontSize: '0.85rem', color: '#64748b', background: '#f1f5f9', padding: '4px 10px', borderRadius: '12px', fontWeight: '600' }}>
              Nombre de tickets général : {stats?.tickets?.total || 0}
            </span>
          </div>

          {/* Incidents & Demandes Side-by-Side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', borderLeft: '4px solid #2f3f64' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Total Incidents</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2f3f64', marginTop: '4px' }}>{stats?.tickets?.byType?.incident || 0}</div>
            </div>
            <div style={{ padding: '16px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #f1f5f9', borderLeft: '4px solid #f59f00' }}>
              <div style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: '600' }}>Total Demandes</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#2f3f64', marginTop: '4px' }}>{stats?.tickets?.byType?.demande || 0}</div>
            </div>
          </div>

          {/* Liste des autres indicateurs de tickets */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.values(stats?.tickets?.cards || {}).map((card, index) => {
              // Accent color is #f59f00 for warning/late/pause, otherwise #2f3f64
              const isUrgent = card.name.toLowerCase().includes('retard') || 
                               card.name.toLowerCase().includes('panne') || 
                               card.name.toLowerCase().includes('haute') ||
                               card.name.toLowerCase().includes('urgence') ||
                               card.name.toLowerCase().includes('attente');
              const accentColor = isUrgent ? '#f59f00' : '#2f3f64';

              return (
                <div 
                  key={`ticket-card-${card.id || index}`} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    padding: '14px 18px', 
                    borderRadius: '8px', 
                    background: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderLeft: `4px solid ${accentColor}`
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ color: accentColor, display: 'flex', alignItems: 'center' }}>
                      {getTicketIcon(card.icon)}
                    </span>
                    <span style={{ fontWeight: '600', color: '#334155', fontSize: '0.95rem' }}>{card.name}</span>
                  </div>
                  <span style={{ fontSize: '1.4rem', fontWeight: '800', color: accentColor }}>{card.count}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
