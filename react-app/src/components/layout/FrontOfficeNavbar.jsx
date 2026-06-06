import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Box } from 'lucide-react';

const FrontOfficeNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="frontoffice-navbar">
      <div className="nav-container">
        <div className="nav-logo">GLPI FrontOffice</div>
        <div className="nav-links">
          <Link to="/frontoffice" className={`nav-link ${isActive('/frontoffice')}`}>
            <Home size={18} />
            Accueil
          </Link>
          <Link to="/frontoffice/elements" className={`nav-link ${isActive('/frontoffice/elements')}`}>
            <Box size={18} />
            Éléments
          </Link>
          <Link to="/" className="nav-link back-link">
            Retour au BackOffice
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default FrontOfficeNavbar;
