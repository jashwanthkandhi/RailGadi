import React from 'react';
import { Card } from '../../components/ui/Card';
import { Settings as SettingsIcon, Map, RefreshCw, Shield } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <SettingsIcon size={28} color="var(--primary)" />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Settings & Preferences</h1>
      </div>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Configure application behavior, map styles, and refresh intervals.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <RefreshCw size={20} color="var(--primary)" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Auto Refresh Interval</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Poll live train telemetry every 60s</p>
            </div>
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 700 }}>60 seconds</span>
        </Card>

        <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Map size={20} color="#10b981" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Default Map Style</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>MapLibre Dark Telemetry Theme</p>
            </div>
          </div>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>Dark Vector</span>
        </Card>

        <Card style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield size={20} color="#8b5cf6" />
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>RailGaadi Intelligence Platform v2.0</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Built with React, TypeScript, MapLibre GL, Turf.js & Fastify API.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
