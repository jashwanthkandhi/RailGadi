import React from 'react';
import type { ElevationPoint } from '../../types';
import { Card } from '../ui/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ElevationProfileProps {
  elevationData: ElevationPoint[];
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({ elevationData }) => {
  return (
    <Card style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
        Route Elevation Profile
      </h3>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Terrain elevation (meters above sea level) along the train route.
      </p>

      <div style={{ width: '100%', height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={elevationData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="elevationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00e5ff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00e5ff" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="distanceKm" unit="km" stroke="#64748b" fontSize={12} />
            <YAxis unit="m" stroke="#64748b" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                color: '#f8fafc'
              }}
              formatter={(value: any) => [`${value} meters`, 'Elevation']}
              labelFormatter={(label) => `Distance: ${label} km`}
            />
            <Area type="monotone" dataKey="elevationMeters" stroke="#00e5ff" strokeWidth={2} fillOpacity={1} fill="url(#elevationGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
