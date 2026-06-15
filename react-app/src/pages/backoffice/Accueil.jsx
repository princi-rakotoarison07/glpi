import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Laptop, ClipboardList, Kanban, Upload, Settings, ChevronRight, Info, ShieldCheck, Activity } from 'lucide-react';
import AuthService from '../../services/AuthService';

const Accueil = () => {
  const navigate = useNavigate();
  const currentUser = AuthService.getCurrentUser();
  const userName = currentUser ? (currentUser.realname || currentUser.name || 'Administrateur') : 'Administrateur';

  const quickActions = [
    {
      title: 'Gestion du Parc',
      description: 'Supervisez vos ordinateurs, moniteurs, périphériques et licences.',
      icon: Laptop,
      path: '/parc/dashboard',
      color: '#2f3f64',
    },
    {
      title: 'Support & Assistance',
      description: 'Consultez la liste des tickets, incidents et demandes d\'assistance.',
      icon: ClipboardList,
      path: '/tickets',
      color: '#2f3f64',
    },
    {
      title: 'Tableau Kanban',
      description: 'Gérez visuellement le flux de résolution de vos tickets.',
      icon: Kanban,
      path: '/frontoffice/kanban',
      color: '#f59f00',
    },
    {
      title: 'Import de données',
      description: 'Importez vos données d\'équipements et tickets via CSV.',
      icon: Upload,
      path: '/import',
      color: '#2f3f64',
    },
  ];

  return (
    <div className="accueil-page" style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #2f3f64 0%, #1e2942 100%)',
        borderRadius: '16px',
        padding: '40px 32px',
        color: '#ffffff',
        boxShadow: '0 10px 25px rgba(47, 63, 100, 0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '650px' }}>
          <span style={{ 
            background: 'rgba(245, 159, 0, 0.2)', 
            color: '#f59f00', 
            padding: '6px 12px', 
            borderRadius: '20px', 
            fontSize: '12px', 
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Portail GLPI 11
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '800', margin: '16px 0 8px 0', letterSpacing: '-0.5px' }}>
            Bonjour, {userName}
          </h1>
          <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: '1.6', margin: 0 }}>
            Bienvenue sur votre espace d'administration de parc informatique et d'assistance technique. Utilisez les accès rapides ci-dessous pour démarrer vos tâches.
          </p>
        </div>
        
        {/* Subtle decorative background graphic */}
        <div style={{
          position: 'absolute',
          right: '-5%',
          bottom: '-30%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(245, 159, 0, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none'
        }} />
      </div>

      {/* Main Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
        {quickActions.map((action, idx) => {
          const IconComponent = action.icon;
          return (
            <div 
              key={idx}
              onClick={() => navigate(action.path)}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.05)';
                e.currentTarget.style.borderColor = '#cbd5e1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#e2e8f0';
              }}
            >
              <div>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: action.color === '#f59f00' ? 'rgba(245, 159, 0, 0.1)' : 'rgba(47, 63, 100, 0.08)',
                  color: action.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <IconComponent size={22} />
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#2f3f64', margin: '0 0 8px 0' }}>
                  {action.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.5', margin: 0 }}>
                  {action.description}
                </p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '20px', color: '#2f3f64', fontWeight: '600', fontSize: '13px' }}>
                <span>Ouvrir</span>
                <ChevronRight size={14} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Info Status Panel */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
      }}>
        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#2f3f64', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={18} color="#2f3f64" />
          État du système GLPI
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
            <ShieldCheck size={20} color="#16a34a" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>SESSION SERVICE</div>
              <div style={{ fontSize: '13px', color: '#334155', fontWeight: '700' }}>Actif (OAuth / Session)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
            <Activity size={20} color="#16a34a" />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>VERSION INSTALLEE</div>
              <div style={{ fontSize: '13px', color: '#334155', fontWeight: '700' }}>GLPI v11.0.0 (React Web)</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px' }}>
            <Settings size={20} color="#f59f00" onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }} />
            <div>
              <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>RÔLE UTILISATEUR</div>
              <div style={{ fontSize: '13px', color: '#334155', fontWeight: '700' }}>Super-Admin</div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Accueil;
