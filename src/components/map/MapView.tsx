import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import type { LiveJourney, Station } from '../../types';
import { useMapStore } from '../../stores/mapStore';
import { useSimulationStore } from '../../stores/simulationStore';
import { Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

interface MapViewProps {
  journey: LiveJourney;
  onSelectStation?: (station: Station) => void;
}

// Reliable dark vector map style fallback
const CARTO_DARK_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json';

export const MapView: React.FC<MapViewProps> = ({ journey, onSelectStation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const trainMarkerRef = useRef<maplibregl.Marker | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { followMode, setFollowMode } = useMapStore();

  const simLat = useSimulationStore((state) => state.currentLat);
  const simLng = useSimulationStore((state) => state.currentLng);
  const isPlaying = useSimulationStore((state) => state.isPlaying);

  const trainLat = isPlaying ? simLat : journey.location?.latitude || 17.965;
  const trainLng = isPlaying ? simLng : journey.location?.longitude || 79.591;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const maptilerKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const hasMapTilerKey = maptilerKey && maptilerKey !== 'your_maptiler_api_key_here';

    // Primary style candidate
    const primaryStyle = hasMapTilerKey
      ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${maptilerKey}`
      : CARTO_DARK_STYLE;

    let map: maplibregl.Map;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: primaryStyle,
        center: [trainLng, trainLat],
        zoom: 9,
        pitch: 40,
        bearing: -10,
        attributionControl: false
      });

      mapRef.current = map;

      // Force resize to ensure canvas matches container bounds
      setTimeout(() => {
        map.resize();
      }, 200);

      // Timeout fallback: If MapTiler key is blocked/invalid, fallback to Carto Dark after 2.5s
      const fallbackTimer = setTimeout(() => {
        if (!map.loaded() && hasMapTilerKey) {
          console.warn('[MapView] MapTiler style loading timed out, falling back to CartoDB Dark.');
          map.setStyle(CARTO_DARK_STYLE);
        }
      }, 2500);

      map.on('load', () => {
        clearTimeout(fallbackTimer);
        setMapLoaded(true);
        map.resize();

        // Add Route GeoJSON Line
        const coordinates = journey.stations.map((st) => [st.longitude, st.latitude]);

        if (!map.getSource('route-line')) {
          map.addSource('route-line', {
            type: 'geojson',
            data: {
              type: 'Feature',
              properties: {},
              geometry: {
                type: 'LineString',
                coordinates
              }
            }
          });
        }

        // Completed / Full Route glow
        if (!map.getLayer('route-glow')) {
          map.addLayer({
            id: 'route-glow',
            type: 'line',
            source: 'route-line',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#00e5ff',
              'line-width': 8,
              'line-opacity': 0.45
            }
          });
        }

        if (!map.getLayer('route-line-main')) {
          map.addLayer({
            id: 'route-line-main',
            type: 'line',
            source: 'route-line',
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#00e5ff',
              'line-width': 3.5
            }
          });
        }

        // Add Station Markers
        journey.stations.forEach((st) => {
          const el = document.createElement('div');
          const isCurrent = st.id === journey.nextStation?.id || st.id === journey.currentStation?.id;
          const isCompleted = st.status === 'COMPLETED';

          el.className = 'station-map-marker';
          el.style.width = isCurrent ? '18px' : '12px';
          el.style.height = isCurrent ? '18px' : '12px';
          el.style.borderRadius = '50%';
          el.style.backgroundColor = isCurrent ? '#00e5ff' : isCompleted ? '#10b981' : '#64748b';
          el.style.border = isCurrent ? '3px solid #ffffff' : '2px solid #0f172a';
          el.style.boxShadow = isCurrent ? '0 0 14px #00e5ff' : 'none';
          el.style.cursor = 'pointer';

          new maplibregl.Marker({ element: el })
            .setLngLat([st.longitude, st.latitude])
            .setPopup(
              new maplibregl.Popup({ offset: 12 }).setHTML(
                `<strong style="color:#f8fafc;font-size:0.95rem">${st.name} (${st.code})</strong><br/><span style="color:#94a3b8;font-size:0.8rem">PF: ${st.platformNumber || 'PF 1'} | Elev: ${st.elevationMeters || 0}m | Delay: +${st.delayMinutes || 0}m</span>`
              )
            )
            .addTo(map);

          el.addEventListener('click', () => {
            if (onSelectStation) onSelectStation(st);
          });
        });

        // Custom Train Marker
        const trainEl = document.createElement('div');
        trainEl.style.width = '38px';
        trainEl.style.height = '38px';
        trainEl.style.borderRadius = '50%';
        trainEl.style.background = 'var(--primary-gradient)';
        trainEl.style.display = 'flex';
        trainEl.style.alignItems = 'center';
        trainEl.style.justifyContent = 'center';
        trainEl.style.boxShadow = '0 0 20px #00e5ff';
        trainEl.style.color = '#07090E';
        trainEl.style.fontSize = '20px';
        trainEl.innerHTML = '🚆';

        trainMarkerRef.current = new maplibregl.Marker({ element: trainEl })
          .setLngLat([trainLng, trainLat])
          .addTo(map);
      });

      // Pause follow mode on user pan
      map.on('dragstart', () => {
        setFollowMode(false);
      });

      // Handle style load error gracefully
      map.on('error', (e) => {
        console.warn('[MapView] MapLibre tile warning/error:', e);
        // Only set error state if map canvas couldn't render at all
        if (!map.loaded() && !mapRef.current) {
          setHasError(true);
        }
      });
    } catch (err) {
      console.error('[MapView] Error initializing map:', err);
      setHasError(true);
    }

    // Handle window resize
    const handleResize = () => mapRef.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mapRef.current?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync train marker coordinates live during simulation
  useEffect(() => {
    if (trainMarkerRef.current) {
      trainMarkerRef.current.setLngLat([trainLng, trainLat]);
    }
  }, [trainLat, trainLng]);

  // Center camera on train when follow mode is active
  useEffect(() => {
    if (mapRef.current && followMode && mapLoaded) {
      mapRef.current.easeTo({
        center: [trainLng, trainLat],
        zoom: 10.5,
        duration: 800
      });
    }
  }, [trainLat, trainLng, followMode, mapLoaded]);

  if (hasError) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '360px',
          background: 'var(--bg-card-solid)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          textAlign: 'center',
          border: '1px solid var(--border-color)'
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚆</div>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Live Telemetry Route Map
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '340px' }}>
          Tracking <strong>{journey.train.name}</strong> near <strong>{journey.nextStation?.name || 'En Route'}</strong> (+
          {journey.delayMinutes} min delay).
        </p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '360px' }}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden'
        }}
      />

      {/* Floating Map Overlay Controls */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 10
        }}
      >
        <Button
          variant={followMode ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setFollowMode(!followMode)}
          icon={<Navigation size={14} />}
        >
          {followMode ? 'Following Train' : 'Follow Train'}
        </Button>
      </div>

      {!followMode && (
        <div
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10
          }}
        >
          <Button variant="secondary" size="sm" onClick={() => setFollowMode(true)}>
            Resume Camera Follow
          </Button>
        </div>
      )}
    </div>
  );
};
