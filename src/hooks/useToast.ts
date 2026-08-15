/**
 * useToast.ts
 * Dedicated hook to access ToastContext cleanly.
 */
import { useContext } from 'react';
import { ToastContext } from '../components/ui/ToastContext';
import type { ToastContextValue } from '../components/ui/ToastContext';

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};
