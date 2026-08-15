import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useLiveJourney } from '../../hooks/useLiveJourney';
import { MapView } from '../../components/map/MapView';
import { JourneyProgressBar } from '../../components/journey/JourneyProgressBar';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { getStatusBadgeInfo, formatTimeAgo } from '../../utils/formatters';

export const SharedJourneyPage: React.FC = () => {
  const { shareId = '12727' } = useParams<{ shareId: string }>();
  const { journey, isLoading } = useLiveJourney(shareId);

  if (isLoading || !journey) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '10px' }}>
        <Loader2 className="animate-spin" size={24} color="var(--primary)" />
        <span style={{ color: 'var(--text-secondary)' }}>Loading live shared journey telemetry...</span>
      </div>
    );
  }

  const badgeInfo = getStatusBadgeInfo(journey.status, journey.delayMinutes);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 80px 20px' }}>
      {/* Top Banner */}
      <div
        style={{
          padding: '16px 20px',
          background: 'rgba(0, 229, 255, 0.08)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <ShieldCheck size={20} color="var(--primary)" />
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            Live Shared Journey Telemetry (Refreshes automatically)
          </span>
        </div>
        <Link to={`/journey/${journey.train.id}`}>
          <Button variant="primary" size="sm" icon={<ArrowRight size={14} />}>
            Open in RailGaadi
          </Button>
        </Link>
      </div>

      {/* Train Info Card */}
      <div
        style={{
          padding: '24px',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          marginBottom: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
            {journey.train.number}
          </span>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>{journey.train.name}</h1>
          <Badge label={badgeInfo.label} bg={badgeInfo.bg} color={badgeInfo.color} />
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {journey.train.source} → {journey.train.destination} • Updated {formatTimeAgo(journey.updatedAt)}
        </p>
      </div>

      {/* Interactive Map */}
      <div
        style={{
          width: '100%',
          height: '380px',
          marginBottom: '20px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      >
        <MapView journey={journey} />
      </div>

      {/* Progress Bar */}
      <JourneyProgressBar progress={journey.progress} />
    </div>
  );
};
