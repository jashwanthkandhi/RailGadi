import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    opacity: disabled || isLoading ? 0.6 : 1,
    transition: 'all var(--transition-fast)',
    border: 'none',
    outline: 'none',
    fontFamily: 'inherit'
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: '0.85rem' },
    md: { padding: '10px 18px', fontSize: '0.95rem' },
    lg: { padding: '14px 24px', fontSize: '1.05rem', borderRadius: 'var(--radius-lg)' }
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      background: 'var(--primary-gradient)',
      color: 'var(--text-primary-on-accent)',
      boxShadow: '0 4px 14px rgba(0, 229, 255, 0.3)'
    },
    secondary: {
      background: 'var(--bg-surface)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--primary)',
      border: '1px solid var(--primary)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-secondary)'
    },
    destructive: {
      background: 'rgba(239, 68, 68, 0.15)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.3)'
    }
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
      className={className}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span
          style={{
            width: '16px',
            height: '16px',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }}
        />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};
