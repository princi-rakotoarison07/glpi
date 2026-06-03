import React from 'react';
import { Menu } from 'lucide-react';
import '../../styles/layout/Header.css';

const Header = ({ isSidebarCollapsed, toggleSidebar }) => {
  return (
    <header className="header">
      <div className="header-left">
        <button className="header-toggle" onClick={toggleSidebar} aria-label="Basculer le menu">
          <Menu size={20} />
        </button>
      </div>
      <div className="header-right">
        <div className="user-menu">
          <div className="user-avatar">AD</div>
          <div className="user-info">
            <span className="user-name">AD Admin</span>
            <span className="user-role">Administrateur</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
