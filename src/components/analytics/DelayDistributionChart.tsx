import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Station } from '../../types';
import { MOCK_DELAY_HISTORY } from '../../services/mockDataService';
import { Card } from '../ui/Card';
import { Clock } from 'lucide-react';

interface DelayDistributionChartProps {
  stations?: Station[];
}

export const DelayDistributionChart: React.FC<DelayDistributionChartProps> = ({ stations }) => {
  const data = stations && stations.length > 0
    ? stations.map((s) => ({
        stationCode: s.code,
        stationName: s.name,
        scheduledTime: s.scheduledArrival || s.scheduledDeparture || '--:--',
        actualTime: s.actualArrival || s.actualDeparture || '--:--',
        delayMinutes: Math.max(0, s.delayMinutes || 0)
      }))
    : MOCK_DELAY_HISTORY;

  const maxDelay = Math.max(0, ...data.map((d) => d.delayMinutes));
  const avgDelay = data.length > 0 ? Math.round(data.reduce((acc, curr) => acc + curr.delayMinutes, 0) / data.length) : 0;

  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="#f59e0b" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Station Delay Distribution
          </h3>
        </div>
        <div
          style={{
            fontSize: '0.8rem',
            fontWeight: 700,
            color: '#f59e0b',
            background: 'rgba(245, 158, 11, 0.12)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(245, 158, 11, 0.3)'
          }}
        >
          Avg Delay: +{avgDelay} min (Max +{maxDelay}m)
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
        Tracks real-time delay build-up and recovery trends across railway junctions.
      </p>

      <div style={{ width: '100%', height: 240 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="delayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="stationCode" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} unit="m" />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div
                      style={{
                        background: '#0f172a',
                        border: '1px solid rgba(0,229,255,0.3)',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '0.85rem'
                      }}
                    >
                      <strong style={{ color: '#00e5ff' }}>
                        {d.stationName} ({d.stationCode})
                      </strong>
                      <div style={{ marginTop: '4px', color: '#cbd5e1' }}>
                        Delay: <strong style={{ color: '#f59e0b' }}>+{d.delayMinutes} mins</strong>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Sch: {d.scheduledTime} • Act: {d.actualTime}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area type="monotone" dataKey="delayMinutes" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#delayGradient)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

