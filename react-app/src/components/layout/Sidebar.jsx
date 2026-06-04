import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  ChevronLeft,
  ChevronDown,
  LayoutDashboard,
  Box,
  List,
  Monitor,
} from 'lucide-react';
import '../../styles/layout/Sidebar.css';

const MENU_ITEMS = [
  { 
    icon: <Home size={20} />, 
    label: 'Accueil', 
    path: '/accueil' 
  },
  {
    icon: <Monitor size={20} />,
    label: 'Parc',
    submenu: [
      { label: 'Tableau de bord', path: '/parc/dashboard' }
    ]
  },
  { 
    icon: <List size={20} />, 
    label: 'Simple CRUD', 
    path: '/crud' 
  },
  { 
    icon: <Box size={20} />, 
    label: 'Autre Page', 
    path: '/autre-page' 
  },
];

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState('');

  const toggleSubmenu = (label) => {
    setOpenSubmenu(openSubmenu === label ? '' : label);
  };

  const handleSubmenuClick = (label) => {
    if (isCollapsed) {
      toggleSidebar();
      setOpenSubmenu(label);
    } else {
      toggleSubmenu(label);
    }
  };

  useEffect(() => {
    if (!isCollapsed) {
      const activeItem = MENU_ITEMS.find(item => 
        item.submenu && item.submenu.some(sub => location.pathname === sub.path)
      );
      if (activeItem) {
        setOpenSubmenu(activeItem.label);
      } else {
        setOpenSubmenu('');
      }
    } else {
      setOpenSubmenu('');
    }
  }, [location.pathname, isCollapsed]);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">
            <LayoutDashboard size={20} />
          </div>
          <span className="sidebar-logo-text">GLPI 11</span>
        </div>
        {!isCollapsed && (
          <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Réduire le menu">
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      <nav className="sidebar-nav">
        {MENU_ITEMS.map((item, index) => {
          const isActive = location.pathname === item.path ||
            (item.submenu && item.submenu.some(sub => location.pathname === sub.path));
          const isOpen = openSubmenu === item.label;

          return (
            <React.Fragment key={index}>
              {item.separator && <div className="sidebar-separator" />}
              {item.submenu ? (
                <div>
                  <div
                    className={`nav-item has-submenu ${isActive ? 'active' : ''}`}
                    onClick={() => handleSubmenuClick(item.label)}
                  >
                    <div className="nav-item-content">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`chevron-icon ${isOpen ? 'rotated' : ''}`}
                    />
                  </div>
                  <div className={`nav-submenu ${isOpen ? 'open' : ''}`}>
                    {item.submenu.map((sub, subIndex) => {
                      const isSubActive = location.pathname === sub.path;
                      return (
                        <Link
                          key={subIndex}
                          to={sub.path}
                          className={`submenu-item ${isSubActive ? 'active' : ''}`}
                        >
                          <span>{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className={`nav-item ${isActive ? 'active' : ''}`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
