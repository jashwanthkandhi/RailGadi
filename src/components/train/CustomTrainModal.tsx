import React, { useState } from 'react';
import type { Train } from '../../types';
import { X, Train as TrainIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';

interface CustomTrainModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTrain: (train: Train) => void;
}

export const CustomTrainModal: React.FC<CustomTrainModalProps> = ({ isOpen, onClose, onAddTrain }) => {
  const [trainNumber, setTrainNumber] = useState('');
  const [trainName, setTrainName] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [distanceKm, setDistanceKm] = useState('500');
  const [trainType, setTrainType] = useState('Superfast Express');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trainNumber || !trainName || !source || !destination) return;

    const newTrain: Train = {
      id: `custom-${Date.now()}`,
      number: trainNumber,
      name: trainName,
      source,
      destination,
      totalDistanceKm: parseInt(distanceKm, 10) || 500,
      trainType,
      runsOn: ['Daily'],
      isCustom: true
    };

    onAddTrain(newTrain);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(7, 9, 14, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--bg-card-solid)',
          border: '1px solid var(--border-color-hover)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '540px',
          boxShadow: 'var(--shadow-xl), 0 0 30px rgba(0, 229, 255, 0.15)',
          padding: '28px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrainIcon size={24} color="var(--primary)" />
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Create Custom Train & Route
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} icon={<X size={18} />} />
        </div>

        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
          Add custom train details to simulate live tracking and telemetry on custom routes.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Train Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 12805"
                value={trainNumber}
                onChange={(e) => setTrainNumber(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.95rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Train Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Jan Shatabdi Express"
                value={trainName}
                onChange={(e) => setTrainName(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Source Station *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Visakhapatnam (VSKP)"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Destination Station *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Vijayawada (BZA)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Total Distance (km)
              </label>
              <input
                type="number"
                value={distanceKm}
                onChange={(e) => setDistanceKm(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>
                Train Category
              </label>
              <select
                value={trainType}
                onChange={(e) => setTrainType(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0f172a',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '10px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem'
                }}
              >
                <option value="Superfast Express">Superfast Express</option>
                <option value="Vande Bharat">Vande Bharat Express</option>
                <option value="Rajdhani">Rajdhani Express</option>
                <option value="Shatabdi">Shatabdi Express</option>
                <option value="Passenger">Passenger Special</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={<CheckCircle2 size={16} />}>
              Create & Track Live
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
