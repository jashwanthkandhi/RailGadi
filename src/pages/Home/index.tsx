import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TRAINS } from '../../services/mockDataService';
import { useUserStore } from '../../stores/userStore';
import { useToast } from '../../hooks/useToast';
import type { Train as TrainType } from '../../types';
import { Search, Train, ArrowRight, History, Plus, X, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { CustomTrainModal } from '../../components/train/CustomTrainModal';

export const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [trainsList, setTrainsList] = useState<TrainType[]>(MOCK_TRAINS);
  const navigate = useNavigate();
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useUserStore();
  const { showToast } = useToast();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const match = trainsList.find(
      (t) => t.number.includes(query) || t.name.toLowerCase().includes(query.toLowerCase())
    );
    if (match) {
      addRecentSearch(match);
      navigate(`/journey/${match.id}`);
    } else {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const handleAddCustomTrain = (newTrain: TrainType) => {
    setTrainsList((prev) => [newTrain, ...prev]);
    addRecentSearch(newTrain);
    showToast({ message: `Custom Train ${newTrain.number} created!`, type: 'success' });
    navigate(`/journey/${newTrain.id}`);
  };

  const handleRemoveRecentItem = (e: React.MouseEvent, trainId: string) => {
    e.stopPropagation();
    removeRecentSearch(trainId);
    showToast({ message: 'Removed from recent searches', type: 'info' });
  };

  const handleClearAllRecents = () => {
    clearRecentSearches();
    showToast({ message: 'Recent searches cleared', type: 'info' });
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      {/* Hero Section */}
      <section
        style={{
          padding: '60px 24px 40px 24px',
          maxWidth: '1000px',
          margin: '0 auto',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(0, 229, 255, 0.1)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            color: 'var(--primary)',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '24px'
          }}
        >
          <div className="pulse-dot" /> Live Railway Intelligence & Telemetry Simulator
        </div>

        <h1
          style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '20px'
          }}
        >
          Know Your Train. <br />
          <span className="gradient-text">See Your Journey Live.</span>
        </h1>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: '640px',
            margin: '0 auto 32px auto',
            lineHeight: 1.6
          }}
        >
          Track live Indian Railway trains with interactive map telemetry, station ETAs, platform numbers, coach positions, delay analytics, and GPS simulation.
        </p>

        {/* Train Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          style={{
            maxWidth: '620px',
            margin: '0 auto 24px auto',
            display: 'flex',
            gap: '10px',
            background: 'var(--bg-card-solid)',
            padding: '8px',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color-hover)',
            boxShadow: 'var(--shadow-lg), var(--shadow-glow)'
          }}
        >
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              paddingLeft: '16px'
            }}
          >
            <Search size={22} color="var(--primary)" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter train number or name (e.g. 12727 or Godavari)..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                fontFamily: 'inherit'
              }}
            />
          </div>
          <Button type="submit" variant="primary" size="lg" icon={<ArrowRight size={18} />}>
            Track Live
          </Button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsCustomModalOpen(true)}
            icon={<Plus size={16} color="var(--primary)" />}
          >
            Create Custom Train & Route
          </Button>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Recent Searches */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <History size={18} color="var(--primary)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Recent Searches</h3>
              </div>
              {recentSearches.length > 0 && (
                <button
                  onClick={handleClearAllRecents}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="Clear all recent searches"
                >
                  <Trash2 size={12} /> Clear all
                </button>
              )}
            </div>

            {recentSearches.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {recentSearches.slice(0, 5).map((item) => (
                  <div
                    key={item.trainId}
                    onClick={() => navigate(`/journey/${item.trainId}`)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)'
                    }}
                  >
                    <div>
                      <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                        {item.trainNumber}
                      </strong>{' '}
                      <span style={{ color: 'var(--text-primary)' }}>{item.trainName}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={(e) => handleRemoveRecentItem(e, item.trainId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        title="Remove from recent searches"
                      >
                        <X size={14} />
                      </button>
                      <ArrowRight size={14} color="var(--text-muted)" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>No recent searches yet.</p>
            )}
          </Card>

          {/* Popular & Custom Trains */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Train size={18} color="#10b981" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Featured & Custom Express Fleet</h3>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {trainsList.slice(0, 5).map((train) => (
                <div
                  key={train.id}
                  onClick={() => {
                    addRecentSearch(train);
                    navigate(`/journey/${train.id}`);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: train.isCustom ? 'rgba(0, 229, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    border: train.isCustom ? '1px solid rgba(0, 229, 255, 0.3)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                        {train.number}
                      </strong>{' '}
                      <span style={{ color: 'var(--text-primary)' }}>{train.name}</span>
                      {train.isCustom && (
                        <span style={{ fontSize: '0.65rem', background: 'var(--primary)', color: '#000', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                          CUSTOM
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {train.source.split(' ')[0]} → {train.destination.split(' ')[0]}
                    </div>
                  </div>
                  <ArrowRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Custom Train Creation Modal */}
      <CustomTrainModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
        onAddTrain={handleAddCustomTrain}
      />
    </div>
  );
};
