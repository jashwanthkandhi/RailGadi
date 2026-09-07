import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Train, Search, BarChart3, Compass, Heart, Settings, Sun, Moon } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';

export const DesktopNavbar: React.FC = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);
  useEffect(() => {
    document.body.classList.toggle('light-mode', !darkMode);
  }, [darkMode]);
  const recentSearches = useUserStore((state) => state.recentSearches);

  // Extract train ID from current URL (e.g. /journey/22436, /analytics/22436) or latest recent search
  const pathParts = location.pathname.split('/');
  const isTrainRoute = ['journey', 'analytics', 'companion', 'track'].includes(pathParts[1]);
  const activeTrainId = (isTrainRoute && pathParts[2]) ? pathParts[2] : (recentSearches[0]?.trainId || '12727');

  const navItems = [
    { label: 'Live Journey', path: `/journey/${activeTrainId}`, base: '/journey', icon: <Train size={18} /> },
    { label: 'Analytics', path: `/analytics/${activeTrainId}`, base: '/analytics', icon: <BarChart3 size={18} /> },
    { label: 'Travel Companion', path: `/companion/${activeTrainId}`, base: '/companion', icon: <Compass size={18} /> },
    { label: 'Favourites', path: '/favourites', base: '/favourites', icon: <Heart size={18} /> }
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: '64px',
        backgroundColor: 'var(--bg-dark)',
        backdropFilter: 'var(--glass-backdrop)',
        WebkitBackdropFilter: 'var(--glass-backdrop)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px'
      }}
    >
      {/* Brand Logo */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none'
        }}
      >
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--border-glow)'
          }}
        >
          <Train size={22} color="#07090E" />
        </div>
        <div>
          <span
            style={{
              fontSize: '1.3rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}
          >
            Rail<span className="gradient-text">Gaadi</span>
          </span>
          <span
            style={{
              display: 'block',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              color: 'var(--text-muted)',
              textTransform: 'uppercase',
              marginTop: '-2px'
            }}
          >
            Journey Intelligence
          </span>
        </div>
      </Link>

      {/* Navigation Links */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.base);
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'rgba(0, 229, 255, 0.08)' : 'transparent',
                border: isActive ? '1px solid rgba(0, 229, 255, 0.2)' : '1px solid transparent',
                textDecoration: 'none',
                transition: 'all var(--transition-fast)'
              }}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Right Search shortcut */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Link
          to="/search"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'var(--bg-input)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-full)',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
            textDecoration: 'none'
          }}
        >
          <Search size={14} />
          <span>Search train number or name...</span>
          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'var(--bg-surface)',
              fontSize: '0.7rem',
              color: 'var(--text-secondary)'
            }}
          >
            ⌘K
          </kbd>
        </Link>

        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            padding: '8px',
            border: 'none',
            background: 'transparent',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <Link
          to="/settings"
          style={{
            padding: '8px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            textDecoration: 'none'
          }}
        >
          <Settings size={20} />
        </Link>
      </div>
    </header>
  );
};
