import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { Station, Weather, ElevationPoint } from '../../types';
import { useLiveJourney } from '../../hooks/useLiveJourney';
import { fetchWeatherAtCoords } from '../../services/weatherService';
import { useToast } from '../../hooks/useToast';
import { JourneyHeader } from '../../components/journey/JourneyHeader';
import { MapView } from '../../components/map/MapView';
import { JourneyProgressBar } from '../../components/journey/JourneyProgressBar';
import { StationCard } from '../../components/journey/StationCard';
import { StationTimeline } from '../../components/analytics/StationTimeline';
import { ElevationProfile } from '../../components/analytics/ElevationProfile';
import { WeatherCard } from '../../components/weather/WeatherCard';
import { TelemetryControlBar } from '../../components/telemetry/TelemetryControlBar';
import { StationDetailModal } from '../../components/station/StationDetailModal';
import { DelayDistributionChart } from '../../components/analytics/DelayDistributionChart';
import { SpeedProfileChart } from '../../components/analytics/SpeedProfileChart';
import { MobileJourneySheet } from '../../components/journey/MobileJourneySheet';
import { CrowdsourceBanner } from '../../components/journey/CrowdsourceBanner';
import { CoachFinderWidget } from '../../components/station/CoachFinderWidget';
import { fetchRouteElevations } from '../../services/elevationService';
import { MOCK_ELEVATION_PROFILE, MOCK_WEATHER_DATA } from '../../services/mockDataService';
import { BarChart3, Compass, MapPin, Gauge, Loader2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';

export const JourneyPage: React.FC = () => {
  const { id = '12727' } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'timeline' | 'analytics' | 'elevation' | 'weather'>('overview');
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [weatherData, setWeatherData] = useState<{ current?: Weather; next?: Weather; destination?: Weather }>({});
  const [elevationData, setElevationData] = useState<ElevationPoint[]>([]);
  const { showToast } = useToast();

  const { journey, isLoading, isError, isFetching, isStale, refetch } = useLiveJourney(id);

  useEffect(() => {
    if (!journey) return;

    // Fetch Live Weather for train coordinates
    const loadWeather = async () => {
      try {
        const promises: Promise<Weather | null>[] = [];

        if (journey.location) {
          promises.push(fetchWeatherAtCoords(journey.location.latitude, journey.location.longitude));
        } else {
          promises.push(Promise.resolve(null));
        }

        if (journey.nextStation) {
          promises.push(fetchWeatherAtCoords(journey.nextStation.latitude, journey.nextStation.longitude));
        } else {
          promises.push(Promise.resolve(null));
        }

        if (journey.destination) {
          promises.push(fetchWeatherAtCoords(journey.destination.latitude, journey.destination.longitude));
        } else {
          promises.push(Promise.resolve(null));
        }

        const [cur, nxt, dest] = await Promise.all(promises);
        setWeatherData({
          current: cur || MOCK_WEATHER_DATA.current,
          next: nxt || MOCK_WEATHER_DATA.next,
          destination: dest || MOCK_WEATHER_DATA.destination
        });
      } catch (e) {
        console.warn('[JourneyPage] Live weather fetch failed:', e);
      }
    };

    loadWeather();

    // Fetch Real Terrain Elevation Profile via elevationService
    if (journey.stations && journey.stations.length > 0) {
      fetchRouteElevations(journey.stations).then((points) => {
        setElevationData(points);
      });
    }
  }, [journey]);

  const handleRefresh = async () => {
    await refetch();
    showToast({ message: 'Journey data refreshed', type: 'success' });
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: journey
          ? `${journey.train.number} ${journey.train.name} Live Status`
          : 'RailGaadi Live Journey',
        url
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        showToast({ message: 'Journey link copied to clipboard!', type: 'success' });
      });
    }
  };

  /* ──────────────────────────────────────────
   * Loading state
   * ────────────────────────────────────────── */
  if (isLoading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px' }}>
        <Skeleton style={{ height: '90px', borderRadius: 'var(--radius-lg)', marginBottom: '16px' }} />
        <Skeleton style={{ height: '420px', borderRadius: 'var(--radius-lg)', marginBottom: '16px' }} />
        <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
          <Skeleton style={{ height: '100px', flex: 1, borderRadius: 'var(--radius-lg)' }} />
          <Skeleton style={{ height: '100px', flex: 1, borderRadius: 'var(--radius-lg)' }} />
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────
   * Error state
   * ────────────────────────────────────────── */
  if (isError || !journey) {
    return (
      <div
        style={{
          maxWidth: '600px',
          margin: '80px auto',
          padding: '40px 24px',
          textAlign: 'center'
        }}
      >
        <AlertTriangle size={52} color="#ef4444" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
          Unable to Load Journey
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Could not retrieve live data for train{' '}
          <strong style={{ fontFamily: 'var(--font-mono)' }}>{id}</strong>. Please check the train
          number or try again.
        </p>
        <Button variant="primary" onClick={() => refetch()} icon={<Loader2 size={16} />}>
          Retry
        </Button>
      </div>
    );
  }

  /* ──────────────────────────────────────────
   * COMPLETED state
   * ────────────────────────────────────────── */
  if (journey.status === 'COMPLETED') {
    return (
      <div
        style={{
          maxWidth: '600px',
          margin: '80px auto',
          padding: '40px 24px',
          textAlign: 'center'
        }}
      >
        <CheckCircle2 size={56} color="#10b981" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '8px' }}>
          Journey Completed
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
            {journey.train.number} {journey.train.name}
          </strong>{' '}
          has arrived at{' '}
          <strong>{journey.train.destination}</strong>. The train has completed its journey.
        </p>
        <div
          style={{
            marginTop: '24px',
            padding: '16px',
            background: 'rgba(16,185,129,0.08)',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 'var(--radius-lg)',
            fontSize: '0.9rem',
            color: '#10b981'
          }}
        >
          Total Distance: {journey.train.totalDistanceKm} km · {journey.stations.length} stations
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────
   * NOT_RUNNING state
   * ────────────────────────────────────────── */
  if (journey.status === 'NOT_RUNNING') {
    return (
      <div
        style={{
          maxWidth: '600px',
          margin: '80px auto',
          padding: '40px 24px',
          textAlign: 'center'
        }}
      >
        <Clock size={52} color="#64748b" style={{ marginBottom: '16px' }} />
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>
          Train Not Operating Today
        </h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>
          <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
            {journey.train.number} {journey.train.name}
          </strong>{' '}
          is not currently running.
          {journey.train.runsOn && journey.train.runsOn.length > 0 && (
            <> This train runs on: <strong>{journey.train.runsOn.join(', ')}</strong>.</>
          )}
        </p>
        <Button variant="secondary" onClick={() => window.history.back()}>
          ← Go Back
        </Button>
      </div>
    );
  }

  /* ──────────────────────────────────────────
   * Normal live journey render
   * ────────────────────────────────────────── */
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px 80px 20px' }}>
      {/* Stale Data Warning Banner */}
      {isStale && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 16px',
            marginBottom: '12px',
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 'var(--radius-md)',
            fontSize: '0.85rem',
            color: '#f59e0b'
          }}
        >
          <AlertTriangle size={16} />
          <span>Data may be stale — last updated over 2 minutes ago.</span>
          <Button variant="ghost" size="sm" onClick={handleRefresh}>
            {isFetching ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : 'Refresh'}
          </Button>
        </div>
      )}

      {/* Top Header */}
      <JourneyHeader journey={journey} onRefresh={handleRefresh} onShare={handleShare} />

      {/* Live GPS Telemetry Simulator Bar */}
      <TelemetryControlBar journey={journey} />

      {/* Main Interactive Map */}
      <div
        style={{
          width: '100%',
          height: '420px',
          marginBottom: '20px',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)'
        }}
      >
        <MapView journey={journey} onSelectStation={(st) => setSelectedStation(st)} />
      </div>

      {/* Journey Progress Bar */}
      <JourneyProgressBar progress={journey.progress} />

      {/* Current & Next Station Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div
          onClick={() => journey.currentStation && setSelectedStation(journey.currentStation)}
          style={{ flex: 1, minWidth: '300px', cursor: 'pointer' }}
        >
          <StationCard
            title="Current Location / Station (Click for Amenities)"
            station={journey.currentStation}
            timeInfo={`Speed: ${journey.speedKmph ?? 85} km/h · ${journey.delayMinutes > 0 ? `+${journey.delayMinutes}m delay` : 'On Time'}`}
          />
        </div>
        <div
          onClick={() => journey.nextStation && setSelectedStation(journey.nextStation)}
          style={{ flex: 1, minWidth: '300px', cursor: 'pointer' }}
        >
          <StationCard
            title="Next Station (Click for Amenities)"
            station={journey.nextStation}
            isNext
            delayMinutes={journey.delayMinutes}
          />
        </div>
      </div>

      {/* Tab Switcher */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap'
        }}
      >
        <Button variant={activeTab === 'overview' ? 'primary' : 'ghost'} size="sm" onClick={() => setActiveTab('overview')}>
          Overview
        </Button>
        <Button variant={activeTab === 'timeline' ? 'primary' : 'ghost'} size="sm" onClick={() => setActiveTab('timeline')} icon={<MapPin size={14} />}>
          Station Schedule
        </Button>
        <Button variant={activeTab === 'analytics' ? 'primary' : 'ghost'} size="sm" onClick={() => setActiveTab('analytics')} icon={<Gauge size={14} />}>
          Speed & Delay Analytics
        </Button>
        <Button variant={activeTab === 'elevation' ? 'primary' : 'ghost'} size="sm" onClick={() => setActiveTab('elevation')} icon={<BarChart3 size={14} />}>
          Elevation
        </Button>
        <Button variant={activeTab === 'weather' ? 'primary' : 'ghost'} size="sm" onClick={() => setActiveTab('weather')} icon={<Compass size={14} />}>
          Weather
        </Button>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Crowdsourced Onboard GPS Telemetry Mesh Banner */}
          <CrowdsourceBanner
            trainNumber={journey.train.number}
            trainName={journey.train.name}
          />

          {/* Smart Coach Position & Platform Guidance */}
          <CoachFinderWidget
            trainNumber={journey.train.number}
            platformNumber={journey.nextStation?.platformNumber || 'PF 1'}
          />

          {/* Main Grid: Timeline + Delay Analytics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            <StationTimeline stations={journey.stations} currentStationId={journey.nextStation?.id} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <DelayDistributionChart stations={journey.stations} />
              <SpeedProfileChart stations={journey.stations} speedKmph={journey.speedKmph} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <StationTimeline stations={journey.stations} currentStationId={journey.nextStation?.id} />
      )}

      {activeTab === 'analytics' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <DelayDistributionChart stations={journey.stations} />
          <SpeedProfileChart stations={journey.stations} speedKmph={journey.speedKmph} />
        </div>
      )}

      {activeTab === 'elevation' && (
        <ElevationProfile elevationData={elevationData.length > 0 ? elevationData : MOCK_ELEVATION_PROFILE} />
      )}

      {activeTab === 'weather' && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {weatherData.current && (
            <WeatherCard title={`Current (${journey.location?.latitude.toFixed(2)}°, ${journey.location?.longitude.toFixed(2)}°)`} weather={weatherData.current} />
          )}
          {weatherData.next && (
            <WeatherCard title={`Next Stop: ${journey.nextStation?.name}`} weather={weatherData.next} />
          )}
          {weatherData.destination && (
            <WeatherCard title={`Destination: ${journey.destination?.name}`} weather={weatherData.destination} />
          )}
        </div>
      )}

      {/* Station Detail Modal */}
      <StationDetailModal station={selectedStation} onClose={() => setSelectedStation(null)} />

      {/* Mobile Bottom Sheet */}
      <MobileJourneySheet journey={journey} />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

