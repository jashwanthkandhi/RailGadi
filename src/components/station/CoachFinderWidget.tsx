import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { TrainTrack, Search, MapPin, Info, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CoachFinderWidgetProps {
  trainNumber: string;
  defaultCoachList?: string[];
  platformNumber?: string;
}

const STANDARD_RAKE_COMPOSITION = [
  { code: 'ENG', type: 'ENGINE', label: 'WAP-7 Engine' },
  { code: 'SLR', type: 'LUGGAGE', label: 'Luggage / Guard' },
  { code: 'GEN', type: 'GENERAL', label: 'Unreserved Gen' },
  { code: 'S1', type: 'SLEEPER', label: 'Sleeper 1' },
  { code: 'S2', type: 'SLEEPER', label: 'Sleeper 2' },
  { code: 'S3', type: 'SLEEPER', label: 'Sleeper 3' },
  { code: 'S4', type: 'SLEEPER', label: 'Sleeper 4' },
  { code: 'S5', type: 'SLEEPER', label: 'Sleeper 5' },
  { code: 'S6', type: 'SLEEPER', label: 'Sleeper 6' },
  { code: 'PC', type: 'PANTRY', label: 'Pantry Car' },
  { code: 'M1', type: '3E', label: '3-Economy 1' },
  { code: 'M2', type: '3E', label: '3-Economy 2' },
  { code: 'B1', type: 'AC3', label: 'AC 3 Tier B1' },
  { code: 'B2', type: 'AC3', label: 'AC 3 Tier B2' },
  { code: 'B3', type: 'AC3', label: 'AC 3 Tier B3' },
  { code: 'B4', type: 'AC3', label: 'AC 3 Tier B4' },
  { code: 'A1', type: 'AC2', label: 'AC 2 Tier A1' },
  { code: 'A2', type: 'AC2', label: 'AC 2 Tier A2' },
  { code: 'H1', type: 'AC1', label: 'AC First Class H1' },
  { code: 'GEN', type: 'GENERAL', label: 'Unreserved Gen' },
  { code: 'SLR', type: 'LUGGAGE', label: 'Brake Van' }
];

export const CoachFinderWidget: React.FC<CoachFinderWidgetProps> = ({
  trainNumber,
  defaultCoachList,
  platformNumber = 'PF 2'
}) => {
  const [selectedCoach, setSelectedCoach] = useState<string>('B3');
  const [pnrInput, setPnrInput] = useState<string>('');

  const rake = defaultCoachList && defaultCoachList.length > 3
    ? defaultCoachList.map((code) => ({
        code,
        type: code.startsWith('B') || code.startsWith('M') ? 'AC3' : code.startsWith('A') ? 'AC2' : code.startsWith('H') ? 'AC1' : code.startsWith('S') ? 'SLEEPER' : 'GENERAL',
        label: `Coach ${code}`
      }))
    : STANDARD_RAKE_COMPOSITION;

  const handlePnrSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnrInput.trim()) return;

    // Deterministic demo coach lookup from PNR
    const lastDigit = parseInt(pnrInput.slice(-1), 10) || 3;
    const sampleCoaches = ['B2', 'B4', 'S4', 'A1', 'M2', 'S6', 'B1', 'H1', 'S2', 'B3'];
    const resolved = sampleCoaches[lastDigit % sampleCoaches.length];
    setSelectedCoach(resolved);
  };

  // Calculate platform position estimate
  const selectedIdx = rake.findIndex((c) => c.code.toUpperCase() === selectedCoach.toUpperCase());
  const platformLocation =
    selectedIdx === -1
      ? 'Middle of Platform'
      : selectedIdx < rake.length * 0.35
      ? 'Front (Engine End)'
      : selectedIdx > rake.length * 0.7
      ? 'Rear (Guard End)'
      : 'Middle (Near Foot Over Bridge)';

  return (
    <Card style={{ padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: 'rgba(0, 229, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00e5ff'
            }}
          >
            <TrainTrack size={20} />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Smart Coach & Platform Position Finder
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Train #{trainNumber} • Rake Composition & Boarding Guidance
            </p>
          </div>
        </div>

        {/* PNR Quick Auto-Select Form */}
        <form onSubmit={handlePnrSearch} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Enter 10-digit PNR"
            value={pnrInput}
            onChange={(e) => setPnrInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
            style={{
              padding: '6px 12px',
              fontSize: '0.82rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-dark)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              width: '150px'
            }}
          />
          <Button variant="secondary" size="sm" type="submit" icon={<Search size={13} />}>
            Find Coach
          </Button>
        </form>
      </div>

      {/* Platform Boarding Advice Callout */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(0, 229, 255, 0.07)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
          marginBottom: '18px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="#00e5ff" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            Boarding <strong>Coach {selectedCoach}</strong> on <strong>{platformNumber}</strong>:
          </span>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 700,
              color: '#00e5ff',
              background: 'rgba(0, 229, 255, 0.15)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            {platformLocation}
          </span>
        </div>

        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Info size={13} />
          <span>Click any coach below to inspect</span>
        </div>
      </div>

      {/* Interactive Rake Horizontal Scrollable Display */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '12px',
          scrollbarWidth: 'thin'
        }}
      >
        {rake.map((c, idx) => {
          const isSelected = c.code.toUpperCase() === selectedCoach.toUpperCase();
          const isEngine = c.code === 'ENG';

          let bg = 'rgba(255, 255, 255, 0.05)';
          let border = '1px solid var(--border-color)';
          let textColor = 'var(--text-secondary)';

          if (isSelected) {
            bg = 'var(--primary-gradient)';
            border = '1px solid #00e5ff';
            textColor = '#07090E';
          } else if (c.type === 'AC3' || c.type === '3E') {
            bg = 'rgba(14, 165, 233, 0.12)';
            textColor = '#38bdf8';
          } else if (c.type === 'AC2' || c.type === 'AC1') {
            bg = 'rgba(168, 85, 247, 0.12)';
            textColor = '#c084fc';
          } else if (c.type === 'SLEEPER') {
            bg = 'rgba(234, 179, 8, 0.12)';
            textColor = '#facc15';
          }

          return (
            <button
              key={`${c.code}-${idx}`}
              onClick={() => setSelectedCoach(c.code)}
              style={{
                flex: '0 0 auto',
                width: isEngine ? '68px' : '56px',
                height: '52px',
                borderRadius: '6px',
                background: bg,
                border,
                color: textColor,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                transition: 'all 0.15s ease',
                position: 'relative'
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>{c.code}</span>
              <span style={{ fontSize: '0.62rem', opacity: isSelected ? 0.9 : 0.7, whiteSpace: 'nowrap' }}>
                {isEngine ? 'ENGINE' : c.type}
              </span>
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: '#00e5ff',
                    boxShadow: '0 0 8px #00e5ff'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
        <span>⬅ Locomotive Engine</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          Platform Direction <ArrowRight size={12} />
        </span>
        <span>Guard / Brake Van ➡</span>
      </div>
    </Card>
  );
};
