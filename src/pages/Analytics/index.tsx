import React from 'react';
import { useParams } from 'react-router-dom';
import { useLiveJourney } from '../../hooks/useLiveJourney';
import { MOCK_ELEVATION_PROFILE } from '../../services/mockDataService';
import { MetricCard } from '../../components/analytics/MetricCard';
import { StationTimeline } from '../../components/analytics/StationTimeline';
import { ElevationProfile } from '../../components/analytics/ElevationProfile';
import { DelayDistributionChart } from '../../components/analytics/DelayDistributionChart';
import { SpeedProfileChart } from '../../components/analytics/SpeedProfileChart';
import { Gauge, Clock, Mountain, ArrowUpRight, Loader2 } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  const { id = '12727' } = useParams<{ id: string }>();
  const { journey, isLoading } = useLiveJourney(id);

  if (isLoading || !journey) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '10px' }}>
        <Loader2 className="animate-spin" size={24} color="var(--primary)" />
        <span style={{ color: 'var(--text-secondary)' }}>Loading analytics telemetry...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '6px' }}>Journey Analytics</h1>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Detailed performance, elevation profile, and delay telemetry for{' '}
        <strong style={{ color: 'var(--primary)' }}>
          {journey.train.number} {journey.train.name}
        </strong>
        .
      </p>

      {/* Metrics Row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <MetricCard
          label="Progress"
          value={`${journey.progress.percentage}%`}
          subtext={`${journey.progress.distanceCoveredKm} / ${journey.progress.totalDistanceKm} km`}
          icon={<Gauge size={22} />}
        />
        <MetricCard
          label="Delay Status"
          value={`+${journey.delayMinutes} min`}
          subtext="Recovering near Kazipet"
          icon={<Clock size={22} />}
          accentColor="#f59e0b"
        />
        <MetricCard
          label="Average Speed"
          value="92 km/h"
          subtext="Top speed: 115 km/h"
          icon={<ArrowUpRight size={22} />}
          accentColor="#10b981"
        />
        <MetricCard
          label="Highest Elevation"
          value="543 m"
          subtext="Secunderabad Jn"
          icon={<Mountain size={22} />}
          accentColor="#8b5cf6"
        />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px', marginBottom: '28px' }}>
        <DelayDistributionChart />
        <SpeedProfileChart />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <ElevationProfile elevationData={MOCK_ELEVATION_PROFILE} />
        <StationTimeline stations={journey.stations} currentStationId={journey.nextStation?.id} />
      </div>
    </div>
  );
};

