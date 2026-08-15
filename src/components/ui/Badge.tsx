import React from 'react';

interface BadgeProps {
  label: string;
  bg?: string;
  color?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ label, bg, color, icon }) => {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 700,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        backgroundColor: bg || 'rgba(59, 130, 246, 0.15)',
        color: color || '#3b82f6',
        border: `1px solid ${color ? `${color}33` : 'rgba(59, 130, 246, 0.3)'}`
      }}
    >
      {icon}
      {label}
    </span>
  );
};
