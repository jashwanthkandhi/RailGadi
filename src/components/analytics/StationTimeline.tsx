import React from 'react';
import type { Station } from '../../types';
import { Card } from '../ui/Card';
import { CheckCircle2, MapPin, Sparkles } from 'lucide-react';
import { formatDelay } from '../../utils/formatters';

interface StationTimelineProps {
  stations: Station[];
  currentStationId?: string;
}

export const StationTimeline: React.FC<StationTimelineProps> = ({ stations, currentStationId }) => {
  return (
    <Card style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
          Station Schedule & Live Timeline
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#00e5ff' }}>
          <Sparkles size={13} />
          <span>Predictive Arrival AI Enabled</span>
        </div>
      </div>

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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '1rem', fontWeight: isCurrent ? 700 : 600, color: 'var(--text-primary)' }}>
                      {st.name} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({st.code})</span>
                    </span>
                    {st.platformNumber && (
                      <span
                        style={{
                          marginLeft: '8px',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          color: '#e2e8f0'
                        }}
                      >
                        {st.platformNumber}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Sch: {st.scheduledArrival || 'N/A'} • Act: {st.actualArrival || 'N/A'}
                    </span>

                    {/* AI Predicted Arrival Badge for upcoming stations */}
                    {st.predictedArrival && !isCompleted && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor:
                            st.delayRisk === 'HIGH'
                              ? 'rgba(239, 68, 68, 0.18)'
                              : st.delayRisk === 'MEDIUM'
                              ? 'rgba(245, 158, 11, 0.18)'
                              : 'rgba(0, 229, 255, 0.15)',
                          color:
                            st.delayRisk === 'HIGH'
                              ? '#f87171'
                              : st.delayRisk === 'MEDIUM'
                              ? '#fbbf24'
                              : '#00e5ff',
                          border: `1px solid ${
                            st.delayRisk === 'HIGH'
                              ? 'rgba(239, 68, 68, 0.3)'
                              : st.delayRisk === 'MEDIUM'
                              ? 'rgba(245, 158, 11, 0.3)'
                              : 'rgba(0, 229, 255, 0.3)'
                          }`
                        }}
                      >
                        <span>ETA {st.predictedArrival}</span>
                        {st.predictionConfidenceMinutes && (
                          <span style={{ opacity: 0.8, fontSize: '0.7rem' }}>
                            (±{st.predictionConfidenceMinutes}m)
                          </span>
                        )}
                      </span>
                    )}

                    {st.delayMinutes && st.delayMinutes > 0 ? (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor:
                            delayInfo.statusClass === 'status-heavy-delay'
                              ? 'rgba(239,68,68,0.15)'
                              : 'rgba(245,158,11,0.15)',
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
