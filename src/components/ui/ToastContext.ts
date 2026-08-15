/**
 * ToastContext.ts
 * Context definition for Toast notifications.
 */
import { createContext } from 'react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}

export interface ToastContextValue {
  showToast: (opts: { message: string; type?: ToastType; duration?: number }) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);
