/**
 * Toast.tsx
 * Lightweight toast notification system with context.
 * Usage:
 *   const { showToast } = useToast();
 *   showToast({ message: 'Link copied!', type: 'success' });
 */
import React, { useState, useCallback, useRef } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastContext } from './ToastContext';
import type { ToastType, ToastMessage } from './ToastContext';

export type { ToastType, ToastMessage };

const icons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle2 size={18} color="#10b981" />,
  error: <AlertCircle size={18} color="#ef4444" />,
  info: <Info size={18} color="#00e5ff" />
};

const borderColors: Record<ToastType, string> = {
  success: 'rgba(16, 185, 129, 0.4)',
  error: 'rgba(239, 68, 68, 0.4)',
  info: 'rgba(0, 229, 255, 0.4)'
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss
}) => (
  <div
    role="alert"
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '12px 16px',
      background: 'var(--bg-elevated)',
      backdropFilter: 'var(--glass-backdrop)',
      WebkitBackdropFilter: 'var(--glass-backdrop)',
      border: `1px solid ${borderColors[toast.type]}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-xl)',
      maxWidth: '360px',
      minWidth: '240px',
      animation: 'toast-slide-in 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
    }}
  >
    {icons[toast.type]}
    <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>
      {toast.message}
    </span>
    <button
      onClick={() => onDismiss(toast.id)}
      aria-label="Dismiss notification"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <X size={14} />
    </button>
  </div>
);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const counterRef = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    ({
      message,
      type = 'info',
      duration = 3500
    }: {
      message: string;
      type?: ToastType;
      duration?: number;
    }) => {
      const id = `toast-${++counterRef.current}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Stack — fixed bottom-right */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        style={{
          position: 'fixed',
          bottom: '80px', // above mobile navbar
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 9999,
          pointerEvents: 'none'
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={t} onDismiss={dismiss} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toast-slide-in {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
