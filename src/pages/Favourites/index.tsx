import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export const FavouritesPage: React.FC = () => {
  const { favourites, toggleFavourite } = useUserStore();
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 80px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Heart size={28} color="var(--primary)" fill="var(--primary)" />
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Saved Favourite Trains</h1>
      </div>
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '28px' }}>
        Quick access to your saved daily trains and journeys.
      </p>

      {favourites.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {favourites.map((fav) => (
            <Card
              key={fav.trainId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      fontFamily: 'var(--font-mono)'
                    }}
                  >
                    {fav.trainNumber}
                  </span>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {fav.trainName}
                  </h3>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {fav.source} → {fav.destination}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    toggleFavourite({
                      id: fav.trainId,
                      number: fav.trainNumber,
                      name: fav.trainName,
                      source: fav.source,
                      destination: fav.destination,
                      totalDistanceKm: 0
                    })
                  }
                  icon={<Trash2 size={16} color="#ef4444" />}
                />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/journey/${fav.trainId}`)}
                  icon={<ArrowRight size={16} />}
                >
                  Track Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Heart size={48} />}
          title="No Favourite Trains Saved"
          description="Save your frequently traveled trains by clicking the heart button on any train card for one-tap live tracking."
          actionLabel="Search Trains"
          onAction={() => navigate('/search')}
        />
      )}
    </div>
  );
};
