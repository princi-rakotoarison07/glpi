import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Box, Ticket } from 'lucide-react';

const FrontOfficeNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'active' : '';
  };

  return (
    <nav className="frontoffice-navbar">
      <div className="nav-container">
        <div className="nav-logo">GLPI FrontOffice</div>
        <div className="nav-links">
          <Link to="/frontoffice" className={`nav-link ${isActive('/frontoffice') && !isActive('/frontoffice/tickets') && !isActive('/frontoffice/elements')}`}>
            <Home size={18} />
            Accueil
          </Link>
          <Link to="/frontoffice/tickets" className={`nav-link ${isActive('/frontoffice/tickets')}`}>
            <Ticket size={18} />
            Tickets
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
