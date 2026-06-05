import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import '../../styles/layout/Header.css';
import AuthService from '../../services/AuthService';

const Header = ({ isSidebarCollapsed, toggleSidebar }) => {
  const user = AuthService.getCurrentUser();

  const handleLogout = () => {
    AuthService.logout();
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="header-toggle" onClick={toggleSidebar} aria-label="Basculer le menu">
          <Menu size={20} />
        </button>
      </div>
      <div className="header-right">
        <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="user-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'AD'}</div>
          <div className="user-info">
            <span className="user-name">{user?.realname || user?.name || 'AD Admin'}</span>
            <span className="user-role">Utilisateur GLPI</span>
          </div>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              padding: '5px'
            }}
            title="Se déconnecter"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
