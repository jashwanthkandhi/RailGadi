import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Train, BarChart3, Heart } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';

export const MobileNavbar: React.FC = () => {
  const location = useLocation();
  const recentSearches = useUserStore((state) => state.recentSearches);

  // Extract train ID from current URL or latest recent search
  const pathParts = location.pathname.split('/');
  const isTrainRoute = ['journey', 'analytics', 'companion', 'track'].includes(pathParts[1]);
  const activeTrainId = (isTrainRoute && pathParts[2]) ? pathParts[2] : (recentSearches[0]?.trainId || '12727');

  const navItems = [
    { label: 'Home', path: '/', base: '/', icon: <Home size={20} /> },
    { label: 'Search', path: '/search', base: '/search', icon: <Search size={20} /> },
    { label: 'Live Track', path: `/journey/${activeTrainId}`, base: '/journey', icon: <Train size={20} /> },
    { label: 'Analytics', path: `/analytics/${activeTrainId}`, base: '/analytics', icon: <BarChart3 size={20} /> },
    { label: 'Saved', path: '/favourites', base: '/favourites', icon: <Heart size={20} /> }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '64px',
        zIndex: 100,
        backgroundColor: 'rgba(7, 9, 14, 0.95)',
        backdropFilter: 'var(--glass-backdrop)',
        WebkitBackdropFilter: 'var(--glass-backdrop)',
        borderTop: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 8px'
      }}
    >
      {navItems.map((item) => {
        const isActive = item.base === '/' ? location.pathname === '/' : location.pathname.startsWith(item.base);
        return (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              color: isActive ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '0.7rem',
              fontWeight: isActive ? 700 : 500,
              textDecoration: 'none',
              width: '20%'
            }}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
