import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../pages/Home';
import { SearchPage } from '../pages/Search';
import { JourneyPage } from '../pages/Journey';
import { AnalyticsPage } from '../pages/Analytics';
import { TravelCompanionPage } from '../pages/TravelCompanion';
import { FavouritesPage } from '../pages/Favourites';
import { SharedJourneyPage } from '../pages/SharedJourney';
import { SettingsPage } from '../pages/Settings';
import { TicketBookingPage } from '../pages/TicketBooking';
import { DesktopNavbar } from '../components/navigation/DesktopNavbar';
import { MobileNavbar } from '../components/navigation/MobileNavbar';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="cyber-hud-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <DesktopNavbar />

      <main style={{ flex: 1 }}>
        {children}
      </main>

      <MobileNavbar />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <HomePage />
      </Layout>
    )
  },

  {
    path: '/search',
    element: (
      <Layout>
        <SearchPage />
      </Layout>
    )
  },

  {
    path: '/journey/:id',
    element: (
      <Layout>
        <JourneyPage />
      </Layout>
    )
  },

  {
    path: '/analytics/:id',
    element: (
      <Layout>
        <AnalyticsPage />
      </Layout>
    )
  },

  {
    path: '/companion/:id',
    element: (
      <Layout>
        <TravelCompanionPage />
      </Layout>
    )
  },

  {
    path: '/favourites',
    element: (
      <Layout>
        <FavouritesPage />
      </Layout>
    )
  },

  {
    path: '/track/:shareId',
    element: (
      <Layout>
        <SharedJourneyPage />
      </Layout>
    )
  },

  {
    path: '/settings',
    element: (
      <Layout>
        <SettingsPage />
      </Layout>
    )
  },

  {
    path: '/booking',
    element: (
      <Layout>
        <TicketBookingPage />
      </Layout>
    )
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};