import React from 'react';
import type { Station } from '../../types';
import { Card } from '../ui/Card';
import { CheckCircle2, MapPin } from 'lucide-react';
import { formatDelay } from '../../utils/formatters';

interface StationTimelineProps {
  stations: Station[];
  currentStationId?: string;
}

export const StationTimeline: React.FC<StationTimelineProps> = ({ stations, currentStationId }) => {
  return (
    <Card style={{ padding: '24px' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
        Station Schedule & Live Timeline
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {stations.map((st, index) => {
          const isLast = index === stations.length - 1;
          const isCurrent = st.id === currentStationId || st.status === 'CURRENT';
          const isCompleted = st.status === 'COMPLETED';

          const delayInfo = formatDelay(st.delayMinutes || 0);

          return (
            <div
              key={st.id}
              style={{
                display: 'flex',
                gap: '16px',
                position: 'relative',
                paddingBottom: isLast ? '0' : '24px'
              }}
            >
              {/* Timeline Line */}
              {!isLast && (
                <div
                  style={{
                    position: 'absolute',
                    left: '11px',
                    top: '24px',
                    bottom: '0',
                    width: '2px',
                    backgroundColor: isCompleted ? '#10b981' : 'rgba(255, 255, 255, 0.1)'
                  }}
                />
              )}

              {/* Station Dot Icon */}
              <div style={{ zIndex: 2, marginTop: '2px' }}>
                {isCurrent ? (
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--primary-gradient)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 0 10px #00e5ff'
                    }}
                  >
                    <MapPin size={14} color="#07090E" />
                  </div>
                ) : isCompleted ? (
                  <CheckCircle2 size={24} color="#10b981" />
                ) : (
                  <div
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: '2px solid var(--text-muted)',
                      backgroundColor: 'var(--bg-dark)'
                    }}
                  />
                )}
              </div>

              {/* Station Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: isCurrent ? 700 : 600, color: 'var(--text-primary)' }}>
                      {st.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({st.code})</span>
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Sch: {st.scheduledArrival || 'N/A'} • Act: {st.actualArrival || 'N/A'}
                    </span>
                    {st.delayMinutes && st.delayMinutes > 0 ? (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: delayInfo.statusClass === 'status-heavy-delay' ? 'rgba(239,68,68,0.15)' : 'rgba(245,158,11,0.15)',
                          color: delayInfo.color
                        }}
                      >
                        {delayInfo.text}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981' }}>On Time</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
