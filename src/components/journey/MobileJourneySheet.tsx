/**
 * MobileJourneySheet.tsx
 * A sticky bottom card for mobile viewports (<768px).
 * Shows train info, current station, next station ETA, delay,
 * and journey progress without requiring the user to scroll.
 */
import React, { useState } from 'react';
import type { LiveJourney } from '../../types';
import { getStatusBadgeInfo, formatTimeAgo } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { ChevronUp, ChevronDown, MapPin, Navigation } from 'lucide-react';

interface MobileJourneySheetProps {
  journey: LiveJourney;
}

export const MobileJourneySheet: React.FC<MobileJourneySheetProps> = ({ journey }) => {
  const [expanded, setExpanded] = useState(false);
  const badgeInfo = getStatusBadgeInfo(journey.status, journey.delayMinutes);
  const { train, nextStation, currentStation, delayMinutes, progress, speedKmph, updatedAt } = journey;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(7, 9, 14, 0.95)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderTop: '1px solid var(--border-color-hover)',
        boxShadow: '0 -8px 40px rgba(0,0,0,0.6)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        /* Only visible on mobile */
        display: 'none'
      }}
      className="mobile-journey-sheet"
    >
      {/* ── Collapsed Strip ── */}
      <button
        onClick={() => setExpanded((v) => !v)}
        aria-label={expanded ? 'Collapse journey sheet' : 'Expand journey details'}
        style={{
          width: '100%',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '10px',
          fontFamily: 'inherit'
        }}
      >
        {/* Left: train number + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.95rem',
              color: 'var(--primary)',
              whiteSpace: 'nowrap'
            }}
          >
            {train.number}
          </span>
          <span
            style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {train.name}
          </span>
          <Badge label={badgeInfo.label} bg={badgeInfo.bg} color={badgeInfo.color} />
        </div>

        {/* Right: expand toggle */}
        <div style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {expanded ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </div>
      </button>

      {/* Progress bar — always visible */}
      <div style={{ padding: '0 16px 4px 16px' }}>
        <div
          style={{
            height: '4px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255,255,255,0.06)',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: `${progress.percentage}%`,
              height: '100%',
              background: 'var(--primary-gradient)',
              boxShadow: '0 0 8px rgba(0,229,255,0.7)',
              transition: 'width 0.8s ease'
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4px',
            fontSize: '0.7rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>{progress.percentage}% complete</span>
          <span>{progress.distanceRemainingKm} km left</span>
        </div>
      </div>

      {/* ── Expanded Panel ── */}
      {expanded && (
        <div
          style={{
            padding: '12px 16px 16px 16px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            borderTop: '1px solid var(--border-color)'
          }}
        >
          {/* Current Station */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={12} color="#10b981" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                At / Last Passed
              </span>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {currentStation?.name ?? 'En Route'}
            </span>
            {speedKmph != null && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <Navigation size={10} style={{ display: 'inline', marginRight: '3px' }} />
                {speedKmph} km/h
              </span>
            )}
          </div>

          {/* Next Station */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MapPin size={12} color="var(--primary)" />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Next Station
              </span>
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {nextStation?.name ?? 'Destination'}
            </span>
            {nextStation?.scheduledArrival && (
              <span style={{ fontSize: '0.75rem', color: delayMinutes > 0 ? '#f59e0b' : '#10b981' }}>
                ETA {nextStation.actualArrival ?? nextStation.scheduledArrival}
                {delayMinutes > 0 && ` (+${delayMinutes}m)`}
              </span>
            )}
          </div>

          {/* Last Updated */}
          <div
            style={{
              gridColumn: '1 / -1',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              textAlign: 'right'
            }}
          >
            Updated {formatTimeAgo(updatedAt)}
          </div>
        </div>
      )}

      {/* CSS to toggle visibility */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-journey-sheet {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
};
