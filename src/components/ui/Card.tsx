import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'glass' | 'solid' | 'elevated';
  hoverEffect?: boolean;
  scanline?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  hoverEffect = true,
  scanline = false,
  className = '',
  style,
  ...props
}) => {
  const baseClass = variant === 'glass' ? 'glass-card' : variant === 'solid' ? 'bg-card-solid' : 'glass-panel';
  const scanClass = scanline ? 'scan-line-card' : '';

  return (
    <div
      className={`${baseClass} ${scanClass} ${className}`}
      style={{
        padding: '20px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        transition: 'transform var(--transition-fast), border-color var(--transition-fast)',
        ...(hoverEffect ? { cursor: 'pointer' } : {}),
        ...style
      }}
      {...props}
    >
      {children}
    </div>
  );
};
