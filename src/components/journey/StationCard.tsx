import React from 'react';
import type { Station } from '../../types';
import { Card } from '../ui/Card';
import { MapPin, Clock, AlertCircle } from 'lucide-react';

interface StationCardProps {
  title: string;
  station?: Station;
  /** Simple fallback string (used for current station "Departed X min ago") */
  timeInfo?: string;
  isNext?: boolean;
  delayMinutes?: number;
}

export const StationCard: React.FC<StationCardProps> = ({
  title,
  station,
  timeInfo,
  isNext = false,
  delayMinutes = 0
}) => {
  if (!station) return null;

  const accentColor = isNext ? 'var(--primary)' : '#10b981';
  const hasDelay = isNext && delayMinutes > 0;

  // Build structured ETA row for next station
  const scheduledTime = station.scheduledArrival ?? station.scheduledDeparture;
  const expectedTime = station.actualArrival ?? station.actualDeparture;

  return (
    <Card
      style={{
        flex: 1,
        minWidth: '240px',
        borderLeft: `4px solid ${accentColor}`,
        transition: 'all var(--transition-normal)'
      }}
    >
      {/* Title row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
        <MapPin size={16} color={accentColor} />
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)'
          }}
        >
          {title}
        </span>
      </div>

      {/* Station name */}
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
        {station.name}{' '}
        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          ({station.code})
        </span>
      </h3>

      {/* ETA row — structured for next station, simple for current */}
      {isNext && scheduledTime ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
            <Clock size={13} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-secondary)' }}>
              Scheduled{' '}
              <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {scheduledTime}
              </strong>
            </span>
          </div>

          {expectedTime && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <Clock size={13} color={hasDelay ? '#f59e0b' : '#10b981'} />
              <span style={{ color: 'var(--text-secondary)' }}>
                Expected{' '}
                <strong
                  style={{
                    color: hasDelay ? '#f59e0b' : '#10b981',
                    fontFamily: 'var(--font-mono)'
                  }}
                >
                  {expectedTime}
                </strong>
              </span>
              {hasDelay && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '3px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: delayMinutes > 45 ? '#ef4444' : '#f59e0b',
                    background: delayMinutes > 45 ? 'rgba(239,68,68,0.12)' : 'rgba(245,158,11,0.12)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <AlertCircle size={10} />
                  +{delayMinutes} min
                </span>
              )}
            </div>
          )}

          {station.platformNumber && (
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Platform {station.platformNumber}
              {station.haltMinutes ? ` · ${station.haltMinutes} min halt` : ''}
            </p>
          )}
        </div>
      ) : (
        /* Current station — simple text */
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          <Clock size={14} />
          <span>{timeInfo ?? `Scheduled: ${scheduledTime ?? 'N/A'}`}</span>
        </div>
      )}
    </Card>
  );
};
