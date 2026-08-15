import React from 'react';
import type { LiveJourney } from '../../types';
import { getStatusBadgeInfo, formatTimeAgo } from '../../utils/formatters';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Share2, Heart, RefreshCw } from 'lucide-react';
import { useUserStore } from '../../stores/userStore';

interface JourneyHeaderProps {
  journey: LiveJourney;
  onRefresh?: () => void;
  onShare?: () => void;
}

export const JourneyHeader: React.FC<JourneyHeaderProps> = ({ journey, onRefresh, onShare }) => {
  const { train, status, delayMinutes, updatedAt } = journey;
  const badgeInfo = getStatusBadgeInfo(status, delayMinutes);
  const { isFavourite, toggleFavourite } = useUserStore();
  const fav = isFavourite(train.id);

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        padding: '20px 24px',
        background: 'var(--bg-card)',
        backdropFilter: 'var(--glass-backdrop)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '20px'
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
          <span
            style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.02em',
              fontFamily: 'var(--font-mono)',
              color: 'var(--primary)'
            }}
          >
            {train.number}
          </span>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {train.name}
          </h1>
          <Badge label={badgeInfo.label} bg={badgeInfo.bg} color={badgeInfo.color} />
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {train.source} → {train.destination} • Last updated {formatTimeAgo(updatedAt)}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Button
          variant={fav ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => toggleFavourite(train)}
          icon={<Heart size={16} fill={fav ? '#07090E' : 'none'} />}
        >
          {fav ? 'Saved' : 'Save'}
        </Button>
        <Button variant="secondary" size="sm" onClick={onShare} icon={<Share2 size={16} />}>
          Share
        </Button>
        <Button variant="ghost" size="sm" onClick={onRefresh} icon={<RefreshCw size={16} />} />
      </div>
    </div>
  );
};
