import React from 'react';
import { AppProviders } from './providers';
import { AppRouter } from './router';
import { ToastProvider } from '../components/ui/Toast';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <ToastProvider>
        <AppRouter />
      </ToastProvider>
    </AppProviders>
  );
};
