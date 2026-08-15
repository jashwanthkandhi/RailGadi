import React from 'react';
import type { Station } from '../../types';
import { MOCK_COACH_COMPOSITION } from '../../services/mockDataService';
import { X, Mountain } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface StationDetailModalProps {
  station: Station | null;
  onClose: () => void;
}

export const StationDetailModal: React.FC<StationDetailModalProps> = ({ station, onClose }) => {
  if (!station) return null;

  const isCompleted = station.status === 'COMPLETED';
  const isCurrent = station.status === 'CURRENT';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(7, 9, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-color-hover)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-xl), 0 0 30px rgba(0, 229, 255, 0.15)',
          padding: '28px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  fontWeight: 800,
                  color: 'var(--primary)',
                  background: 'rgba(0, 229, 255, 0.1)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid rgba(0, 229, 255, 0.3)'
                }}
              >
                {station.code}
              </span>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{station.name}</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <span>Stop #{station.sequence}</span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Mountain size={14} color="#8b5cf6" /> Elev: {station.elevationMeters || 0}m
              </span>
              {station.platformNumber && (
                <>
                  <span>•</span>
                  <span style={{ color: '#10b981', fontWeight: 700 }}>{station.platformNumber}</span>
                </>
              )}
            </div>
          </div>

          <Button variant="ghost" size="sm" onClick={onClose} icon={<X size={18} />} />
        </div>

        {/* Status Badge & Delay */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
          <Badge
            label={isCompleted ? 'Departed Station' : isCurrent ? 'Train Currently Here' : 'Upcoming Halt'}
            color={isCompleted ? '#10b981' : isCurrent ? '#f59e0b' : '#3b82f6'}
            bg={isCompleted ? 'rgba(16, 185, 129, 0.15)' : isCurrent ? 'rgba(245, 158, 11, 0.15)' : 'rgba(59, 130, 246, 0.15)'}
          />

          {station.delayMinutes !== undefined && (
            <Badge
              label={station.delayMinutes > 0 ? `+${station.delayMinutes} min delay` : 'On Time'}
              color={station.delayMinutes > 0 ? '#f59e0b' : '#10b981'}
              bg={station.delayMinutes > 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)'}
            />
          )}
        </div>


        {/* Schedule & Halt Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            border: '1px solid var(--border-color)',
            marginBottom: '24px'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Arrival Time
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {station.actualArrival || station.scheduledArrival || '--:--'}
            </div>
            {station.scheduledArrival && station.actualArrival && station.actualArrival !== station.scheduledArrival && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sch: {station.scheduledArrival}</div>
            )}
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Departure Time
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {station.actualDeparture || station.scheduledDeparture || '--:--'}
            </div>
            {station.scheduledDeparture && station.actualDeparture && station.actualDeparture !== station.scheduledDeparture && (
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sch: {station.scheduledDeparture}</div>
            )}
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>
              Halt Duration
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>
              {station.haltMinutes !== undefined ? `${station.haltMinutes} min` : '2 min'}
            </div>
          </div>
        </div>

        {/* Station Facilities & Amenities */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
            Station Amenities & Services
          </h4>
          {station.amenities && station.amenities.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {station.amenities.map((item, idx) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(0, 229, 255, 0.08)',
                    border: '1px solid rgba(0, 229, 255, 0.2)',
                    borderRadius: 'var(--radius-md)',
                    padding: '6px 12px',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)',
                    fontWeight: 500
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Standard passenger amenities available at platform.</p>
          )}
        </div>

        {/* Interactive Coach Composition Finder */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Coach Position Finder at Platform
            </h4>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Engine to Rear Guard</span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '6px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'thin'
            }}
          >
            {MOCK_COACH_COMPOSITION.map((coach) => {
              const isEngine = coach.type === 'ENGINE';
              const isAC = coach.type.includes('AC');
              const isPantry = coach.type === 'PANTRY';

              return (
                <div
                  key={coach.code}
                  title={coach.label}
                  style={{
                    minWidth: '54px',
                    padding: '10px 6px',
                    borderRadius: 'var(--radius-md)',
                    background: isEngine
                      ? '#ef4444'
                      : isPantry
                      ? '#f59e0b'
                      : isAC
                      ? 'rgba(0, 229, 255, 0.2)'
                      : 'rgba(255, 255, 255, 0.06)',
                    border: isEngine
                      ? '1px solid #f87171'
                      : isAC
                      ? '1px solid rgba(0, 229, 255, 0.4)'
                      : '1px solid var(--border-color)',
                    color: isEngine ? '#fff' : isPantry ? '#000' : 'var(--text-primary)',
                    textAlign: 'center',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>{coach.code}</div>
                  <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '2px' }}>{coach.type.split('_')[0]}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
