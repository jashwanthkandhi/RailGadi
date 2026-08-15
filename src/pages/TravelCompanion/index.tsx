import React from 'react';
import { useParams } from 'react-router-dom';
import { useLiveJourney } from '../../hooks/useLiveJourney';
import { MOCK_WEATHER_DATA, MOCK_GEOGRAPHIC_FEATURES } from '../../services/mockDataService';
import { WeatherCard } from '../../components/weather/WeatherCard';
import { Card } from '../../components/ui/Card';
import { Compass, Landmark, Mountain, Waves, Loader2 } from 'lucide-react';

export const TravelCompanionPage: React.FC = () => {
  const { id = '12727' } = useParams<{ id: string }>();
  const { journey, isLoading } = useLiveJourney(id);

  if (isLoading || !journey) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh', gap: '10px' }}>
        <Loader2 className="animate-spin" size={24} color="var(--primary)" />
        <span style={{ color: 'var(--text-secondary)' }}>Loading route travel intelligence...</span>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Compass size={28} color="var(--primary)" />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Travel Companion</h1>
      </div>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Weather forecasts, geographic landmarks, rivers, bridges, and points of interest along the route of{' '}
        <strong style={{ color: 'var(--primary)' }}>
          {journey.train.number} {journey.train.name}
        </strong>
        .
      </p>

      {/* Weather Forecast Row */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Route Weather Intelligence
      </h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '36px' }}>
        <WeatherCard title="Current Position Weather" weather={MOCK_WEATHER_DATA.current} />
        <WeatherCard title="Next Station Weather" weather={MOCK_WEATHER_DATA.next} />
        <WeatherCard title="Destination Weather" weather={MOCK_WEATHER_DATA.destination} />
      </div>

      {/* Geographic Highlights Grid */}
      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
        Geographic Landmarks & Railway Engineering Marvels
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {MOCK_GEOGRAPHIC_FEATURES.map((feature) => (
          <Card key={feature.id}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              {feature.type === 'BRIDGE' && <Landmark size={20} color="#00e5ff" />}
              {feature.type === 'RIVER' && <Waves size={20} color="#3b82f6" />}
              {feature.type === 'GHAT' && <Mountain size={20} color="#8b5cf6" />}
              {feature.type === 'ATTRACTION' && <Compass size={20} color="#f59e0b" />}

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {feature.name}
              </h3>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              Located at ~{feature.distanceKmFromStart} km from origin
            </div>

            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {feature.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
