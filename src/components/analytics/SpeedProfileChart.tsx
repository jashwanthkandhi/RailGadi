import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Station } from '../../types';
import { MOCK_SPEED_PROFILE } from '../../services/mockDataService';
import { Card } from '../ui/Card';
import { Gauge } from 'lucide-react';

interface SpeedProfileChartProps {
  stations?: Station[];
  speedKmph?: number;
}

export const SpeedProfileChart: React.FC<SpeedProfileChartProps> = ({ stations, speedKmph = 90 }) => {
  const data = stations && stations.length > 1
    ? stations.map((s, idx) => {
        const pct = idx / (stations.length - 1);
        const isHalt = s.status === 'CURRENT' || idx === 0 || idx === stations.length - 1;
        const speed = isHalt ? 0 : Math.round(speedKmph + Math.sin(pct * Math.PI * 4) * 20);
        return {
          distanceKm: Math.round(pct * 500),
          speedKmph: Math.max(0, speed),
          sectionName: `${s.code} Section`
        };
      })
    : MOCK_SPEED_PROFILE;

  const maxSpeed = Math.max(0, ...data.map((d) => d.speedKmph));
  const avgSpeed = data.length > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.speedKmph, 0) / data.length) : 0;

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Gauge size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Speed Profile vs Distance
          </h3>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--primary)',
            background: 'rgba(0, 229, 255, 0.12)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(0, 229, 255, 0.3)'
          }}
        >
          Top Speed: {maxSpeed} km/h (Avg {avgSpeed})
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Real-time telemetry speed trajectory across railway sections and station yards.
      </p>

      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="distanceKm" stroke="#64748b" tick={{ fontSize: 11 }} unit="km" />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="k/h" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div
                      style={{
                        background: '#0f172a',
                        border: '1px solid rgba(0,229,255,0.4)',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <strong style={{ color: '#00e5ff' }}>{d.sectionName}</strong>
                      <div style={{ marginTop: '4px', color: '#cbd5e1' }}>
                        Distance: <strong>{d.distanceKm} km</strong>
                      </div>
                      <div style={{ color: '#10b981', fontWeight: 700 }}>
                        Speed: {d.speedKmph} km/h
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="speedKmph"
              stroke="#00e5ff"
              strokeWidth={3}
              dot={{ r: 4, fill: '#00e5ff', strokeWidth: 1 }}
              activeDot={{ r: 7, fill: '#ffffff', stroke: '#00e5ff', strokeWidth: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

