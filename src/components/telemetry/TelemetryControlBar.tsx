import React, { useEffect } from 'react';
import { useSimulationStore } from '../../stores/simulationStore';
import type { LiveJourney } from '../../types';
import { Play, Pause, RotateCcw, Zap, Gauge, Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

interface TelemetryControlBarProps {
  journey: LiveJourney;
}

export const TelemetryControlBar: React.FC<TelemetryControlBarProps> = ({ journey }) => {
  const {
    isPlaying,
    simulationSpeed,
    speedKmph,
    progressPercentage,
    distanceCoveredKm,
    togglePlay,
    setSimulationSpeed,
    updatePosition,
    resetSimulation
  } = useSimulationStore();

  const totalDistance = journey.train.totalDistanceKm || 600;
  const stations = journey.stations;

  // Initialize simulation bounds when train changes or on start
  useEffect(() => {
    if (stations.length > 0 && !isPlaying) {
      const first = stations[0];
      resetSimulation(first.latitude, first.longitude, totalDistance);
    }
  }, [journey.id, totalDistance, resetSimulation]);


  // Simulation Loop
  useEffect(() => {
    if (!isPlaying || stations.length < 2) return;

    const interval = setInterval(() => {
      const currentPct = useSimulationStore.getState().progressPercentage;
      const nextPct = Math.min(100, currentPct + 0.5 * simulationSpeed);
      const distCovered = (nextPct / 100) * totalDistance;

      // Find segment along stations based on distance covered
      let currentSegIndex = 0;
      for (let i = 0; i < stations.length - 1; i++) {
        const segDist = (i / (stations.length - 1)) * totalDistance;
        const nextSegDist = ((i + 1) / (stations.length - 1)) * totalDistance;
        if (distCovered >= segDist && distCovered <= nextSegDist) {
          currentSegIndex = i;
          break;
        }
      }

      const stA = stations[currentSegIndex] || stations[0];
      const stB = stations[currentSegIndex + 1] || stations[stations.length - 1];

      const segStartDist = (currentSegIndex / (stations.length - 1)) * totalDistance;
      const segEndDist = ((currentSegIndex + 1) / (stations.length - 1)) * totalDistance;
      const segLength = segEndDist - segStartDist || 1;
      const ratio = Math.min(1, Math.max(0, (distCovered - segStartDist) / segLength));

      // Interpolate Latitude and Longitude
      const lat = stA.latitude + (stB.latitude - stA.latitude) * ratio;
      const lng = stA.longitude + (stB.longitude - stA.longitude) * ratio;

      // Dynamic Speed calculation with station slowdown
      const isNearStation = ratio < 0.1 || ratio > 0.9;
      const baseSpeed = isNearStation ? 35 : 105;
      const simulatedSpeed = Math.round(baseSpeed + Math.sin(nextPct) * 12);

      updatePosition(lat, lng, simulatedSpeed, nextPct, distCovered);

      if (nextPct >= 100) {
        useSimulationStore.getState().setPlaying(false);
      }
    }, 300);

    return () => clearInterval(interval);
  }, [isPlaying, simulationSpeed, stations, totalDistance, updatePosition]);

  return (
    <div
      className="scan-line-card"
      style={{
        background: 'var(--bg-card-solid)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        marginBottom: '20px',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        {/* Controls: Play/Pause/Reset/Speed */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Button
            variant={isPlaying ? 'secondary' : 'primary'}
            size="md"
            onClick={togglePlay}
            icon={isPlaying ? <Pause size={16} /> : <Play size={16} />}
          >
            {isPlaying ? 'Pause Simulator' : 'Play Live GPS'}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (stations[0]) resetSimulation(stations[0].latitude, stations[0].longitude, totalDistance);
            }}
            icon={<RotateCcw size={14} />}
          >
            Reset
          </Button>

          {/* Speed Multiplier Pill Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 'var(--radius-full)',
              padding: '2px',
              border: '1px solid var(--border-color)'
            }}
          >
            {[1, 5, 10, 25].map((s) => (
              <button
                key={s}
                onClick={() => setSimulationSpeed(s)}
                style={{
                  background: simulationSpeed === s ? 'var(--primary)' : 'transparent',
                  color: simulationSpeed === s ? '#000' : 'var(--text-secondary)',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {/* Telemetry Realtime Metrics */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* Live Speed */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Gauge size={20} color="var(--primary)" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Live Speed
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {isPlaying ? speedKmph : journey.speedKmph || 92} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>km/h</span>
              </div>
            </div>
          </div>

          {/* Distance Covered */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Navigation size={20} color="#10b981" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Telemetry Progress
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {isPlaying ? distanceCoveredKm : journey.progress.distanceCoveredKm} / {totalDistance} <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>km</span>
              </div>
            </div>
          </div>

          {/* Status Indicator */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: isPlaying ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 229, 255, 0.1)',
              border: `1px solid ${isPlaying ? 'rgba(16, 185, 129, 0.4)' : 'rgba(0, 229, 255, 0.3)'}`,
              fontSize: '0.8rem',
              fontWeight: 700,
              color: isPlaying ? '#10b981' : 'var(--primary)'
            }}
          >
            <Zap size={14} className={isPlaying ? 'pulse-dot' : ''} />
            {isPlaying ? `SIMULATING LIVE TELEMETRY (${simulationSpeed}x)` : 'LIVE GPS FIXED'}
          </div>
        </div>
      </div>

      {/* Progress Bar Line */}
      <div style={{ marginTop: '14px', width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${isPlaying ? progressPercentage : journey.progress.percentage}%`,
            background: 'var(--primary-gradient)',
            transition: 'width 0.3s ease',
            boxShadow: '0 0 10px var(--primary)'
          }}
        />
      </div>
    </div>
  );
};
