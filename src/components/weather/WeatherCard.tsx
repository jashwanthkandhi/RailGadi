import React from 'react';
import type { Weather } from '../../types';
import { Card } from '../ui/Card';
import { Sun, Cloud, CloudRain, Wind, Droplets } from 'lucide-react';

interface WeatherCardProps {
  title: string;
  weather?: Weather;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ title, weather }) => {
  if (!weather) return null;

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('shower')) return <CloudRain size={28} color="#3b82f6" />;
    if (c.includes('cloud') || c.includes('overcast')) return <Cloud size={28} color="#94a3b8" />;
    return <Sun size={28} color="#f59e0b" />;
  };

  return (
    <Card style={{ flex: 1, minWidth: '220px' }}>
      <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
        {title}
      </span>
      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px', marginBottom: '12px' }}>
        {weather.locationName}
      </h4>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {weather.temperature}°C
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{weather.condition}</div>
        </div>
        {getWeatherIcon(weather.condition)}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Droplets size={14} color="#3b82f6" /> {weather.humidity}% Humidity
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Wind size={14} color="#10b981" /> {weather.windKph} km/h
        </div>
      </div>
    </Card>
  );
};
