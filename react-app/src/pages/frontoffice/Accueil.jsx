import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Ticket, LayoutDashboard } from 'lucide-react';
import FrontOfficeLayout from '../../layouts/FrontOfficeLayout';
import '../../styles/FrontOffice.css';

const Accueil = () => {
  return (
    <FrontOfficeLayout>
      <div className="frontoffice-page welcome-container" style={{ textAlign: 'center', padding: '80px 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#2f3f64' }}>
          Bienvenue sur le FrontOffice GLPI
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: '1.6' }}>
          Gérez facilement vos tickets de support et explorez les différents équipements du parc informatique via les accès directs ci-dessous.
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', margin: '0 auto', maxWidth: '900px' }}>
          <Link to="/frontoffice/elements" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#2f3f64',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(47, 63, 100, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e2942'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2f3f64'}
          >
            <Box size={18} />
            Éléments du parc
          </Link>

          <Link to="/frontoffice/kanban" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#f59f00',
            color: '#2f3f64',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '700',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(245, 159, 0, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e08e00'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f59f00'}
          >
            <LayoutDashboard size={18} />
            Suivi Kanban
          </Link>

          <Link to="/frontoffice/tickets" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            backgroundColor: '#2f3f64',
            color: '#ffffff',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.2s',
            boxShadow: '0 2px 4px rgba(47, 63, 100, 0.1)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e2942'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2f3f64'}
          >
            <Ticket size={18} />
            Liste des tickets
          </Link>
        </div>
      </div>
    </FrontOfficeLayout>
  );
};

export default Accueil;
