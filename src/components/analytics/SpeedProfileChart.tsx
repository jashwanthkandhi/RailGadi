import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MOCK_SPEED_PROFILE } from '../../services/mockDataService';
import { Card } from '../ui/Card';
import { Gauge, Zap } from 'lucide-react';

export const SpeedProfileChart: React.FC = () => {
  const data = MOCK_SPEED_PROFILE;
  const maxSpeed = Math.max(...data.map((d) => d.speedKmph));
  const avgSpeed = Math.round(data.reduce((acc, curr) => acc + curr.speedKmph, 0) / data.length);

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
        Real-time telemetry speed trajectory across railway sections, bridges, and station yards.
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <Zap size={14} color="var(--primary)" /> Maximum cruising speed achieved on Khammam Express Corridor (115 km/h).
      </div>
    </Card>
  );
};
