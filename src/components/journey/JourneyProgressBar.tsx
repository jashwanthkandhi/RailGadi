import React from 'react';
import type { JourneyProgress } from '../../types';

interface JourneyProgressBarProps {
  progress: JourneyProgress;
}

export const JourneyProgressBar: React.FC<JourneyProgressBarProps> = ({ progress }) => {
  const { percentage, distanceCoveredKm, distanceRemainingKm, totalDistanceKm } = progress;

  return (
    <div
      style={{
        padding: '16px 20px',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '20px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
          fontSize: '0.9rem',
          fontWeight: 600
        }}
      >
        <span style={{ color: 'var(--text-primary)' }}>
          Journey Progress: <strong style={{ color: 'var(--primary)' }}>{percentage}% Complete</strong>
        </span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          {distanceCoveredKm} km covered • {distanceRemainingKm} km remaining
        </span>
      </div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: '100%',
          height: '10px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(255, 255, 255, 0.08)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            background: 'var(--primary-gradient)',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 0 12px rgba(0, 229, 255, 0.6)',
            transition: 'width 0.6s ease-in-out'
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '6px',
          fontSize: '0.75rem',
          color: 'var(--text-muted)'
        }}
      >
        <span>0 km</span>
        <span>Total: {totalDistanceKm} km</span>
      </div>
    </div>
  );
};
