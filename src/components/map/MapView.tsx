import React, { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { LiveJourney, Station } from '../../types';
import { useMapStore } from '../../stores/mapStore';
import { useSimulationStore } from '../../stores/simulationStore';
import { buildRoutePolyline } from '../../services/trackGeometryService';
import { Navigation } from 'lucide-react';
import { Button } from '../ui/Button';

interface MapViewProps {
  journey: LiveJourney;
  onSelectStation?: (station: Station) => void;
}

// 100% reliable self-contained Dark raster style (zero external JSON/glyph dependency)
const FALLBACK_DARK_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    'carto-dark': {
      type: 'raster',
      tiles: [
        'https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png',
        'https://d.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png'
      ],
      tileSize: 256,
      attribution: '© OpenStreetMap © CARTO'
    }
  },
  layers: [
    {
      id: 'carto-dark-layer',
      type: 'raster',
      source: 'carto-dark',
      minzoom: 0,
      maxzoom: 20
    }
  ]
};

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

  const fallbackLat = journey.stations[0]?.latitude ?? 20.5937;
  const fallbackLng = journey.stations[0]?.longitude ?? 78.9629;

  const trainLat = isPlaying ? simLat : journey.location?.latitude || fallbackLat;
  const trainLng = isPlaying ? simLng : journey.location?.longitude || fallbackLng;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const maptilerKey = import.meta.env.VITE_MAPTILER_API_KEY;
    const hasMapTilerKey =
      Boolean(maptilerKey) &&
      maptilerKey !== 'your_maptiler_api_key_here' &&
      maptilerKey !== 'undefined' &&
      maptilerKey !== '';

    // If valid MapTiler key exists, use MapTiler Vector style; otherwise use rock-solid Dark style
    const initialStyle: maplibregl.StyleSpecification | string = hasMapTilerKey
      ? `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${maptilerKey}`
      : FALLBACK_DARK_STYLE;

    let map: maplibregl.Map;
    let r1: ReturnType<typeof setTimeout> | undefined;
    let r2: ReturnType<typeof setTimeout> | undefined;

    try {
      map = new maplibregl.Map({
        container: mapContainerRef.current,
        style: initialStyle,
        center: [trainLng, trainLat],
        zoom: 9,
        pitch: 35,
        bearing: -5,
        attributionControl: false
      });

      mapRef.current = map;

      // Force canvas layout calculation
      r1 = setTimeout(() => map.resize(), 100);
      r2 = setTimeout(() => map.resize(), 500);

      // Safe fallback if remote MapTiler style fails to load
      map.on('error', (e) => {
        console.warn('[MapView] Map tile warning:', e);
        if (hasMapTilerKey && !map.loaded()) {
          console.info('[MapView] Switching to guaranteed fallback dark style');
          map.setStyle(FALLBACK_DARK_STYLE);
        }
      });

      map.on('load', () => {
        setMapLoaded(true);
        map.resize();

        // Add Smooth GIS Route GeoJSON Line
        const coordinates = buildRoutePolyline(journey.stations);

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
        trainEl.style.background = 'var(--primary-gradient, linear-gradient(135deg, #00e5ff 0%, #3b82f6 100%))';
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
    } catch (err) {
      console.error('[MapView] Error initializing map:', err);
      setHasError(true);
    }

    const handleResize = () => mapRef.current?.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      if (r1) clearTimeout(r1);
      if (r2) clearTimeout(r2);
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
          minHeight: '420px',
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
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '420px' }}>
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '420px',
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
