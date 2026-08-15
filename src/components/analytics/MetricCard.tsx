import React from 'react';
import { Card } from '../ui/Card';

interface MetricCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subtext,
  icon,
  accentColor = 'var(--primary)'
}) => {
  return (
    <Card style={{ flex: 1, minWidth: '180px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          {label}
        </span>
        {icon && <div style={{ color: accentColor }}>{icon}</div>}
      </div>
      <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
        {value}
      </div>
      {subtext && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{subtext}</div>}
    </Card>
  );
};
