import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/userStore';
import { useTrainSearch } from '../../hooks/useTrainSearch';
import { useToast } from '../../hooks/useToast';
import { Search, Train, ArrowRight, Heart, X, Loader2 } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { Skeleton } from '../../components/ui/Skeleton';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const navigate = useNavigate();
  const { addRecentSearch, isFavourite, toggleFavourite } = useUserStore();
  const { showToast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);

  const { results: filteredTrains, isLoading, debouncedQuery } = useTrainSearch(query);

  // Sync URL search params
  useEffect(() => {
    if (debouncedQuery) {
      setSearchParams({ q: debouncedQuery });
    } else {
      setSearchParams({});
    }
  }, [debouncedQuery, setSearchParams]);

  // Reset keyboard selection on query change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [debouncedQuery]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const cleanNum = query.trim().replace(/[^0-9]/g, '');

      if (cleanNum.length === 5) {
        navigate(`/journey/${cleanNum}`);
        return;
      }

      if (filteredTrains.length === 0) return;

      const targetTrain =
        selectedIndex >= 0
          ? filteredTrains[selectedIndex]
          : filteredTrains[0];

      if (targetTrain) {
        addRecentSearch(targetTrain);
        navigate(`/journey/${targetTrain.id}`);
      }

      return;
    }

    if (filteredTrains.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredTrains.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredTrains.length - 1
      );
    } else if (e.key === 'Escape') {
      setQuery('');
      inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <div
      style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '32px 24px 80px 24px'
      }}
    >
      <h1
        style={{
          fontSize: '1.8rem',
          fontWeight: 800,
          marginBottom: '8px'
        }}
      >
        Search Trains
      </h1>

      <p
        style={{
          fontSize: '0.95rem',
          color: 'var(--text-secondary)',
          marginBottom: '24px'
        }}
      >
        Find any Indian Railway train by train number, train name, or city.
      </p>

      {/* Search Input Box */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 18px',
          background: 'var(--bg-card-solid)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color-hover)',
          boxShadow: 'var(--shadow-md)',
          marginBottom: '32px'
        }}
      >
        <Search size={20} color="var(--primary)" />

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by train number, name, or city..."
          autoFocus
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '1rem',
            fontFamily: 'inherit'
          }}
        />

        {isLoading ? (
          <Loader2
            size={18}
            color="var(--primary)"
            style={{ animation: 'spin 1s linear infinite' }}
          />
        ) : query ? (
          <button
            onClick={handleClear}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              padding: '2px'
            }}
            title="Clear search"
          >
            <X size={18} />
          </button>
        ) : null}
      </div>

      {/* Results Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '16px',
          alignItems: 'center'
        }}
      >
        <span
          style={{
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.05em'
          }}
        >
          {isLoading
            ? 'SEARCHING...'
            : `${filteredTrains.length} TRAIN${
                filteredTrains.length !== 1 ? 'S' : ''
              } FOUND`}
        </span>

        {filteredTrains.length > 0 && (
          <span
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
          >
            Tip: Press{' '}
            <kbd
              style={{
                padding: '2px 6px',
                background: 'var(--bg-surface)',
                borderRadius: '4px'
              }}
            >
              ↑
            </kbd>{' '}
            <kbd
              style={{
                padding: '2px 6px',
                background: 'var(--bg-surface)',
                borderRadius: '4px'
              }}
            >
              ↓
            </kbd>{' '}
            to navigate
          </span>
        )}
      </div>

      {/* Loading Skeleton */}
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <Skeleton
            style={{
              height: '80px',
              borderRadius: 'var(--radius-lg)'
            }}
          />

          <Skeleton
            style={{
              height: '80px',
              borderRadius: 'var(--radius-lg)'
            }}
          />

          <Skeleton
            style={{
              height: '80px',
              borderRadius: 'var(--radius-lg)'
            }}
          />
        </div>
      ) : filteredTrains.length > 0 ? (
        /* Results List */
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          {filteredTrains.map((train, idx) => {
            const fav = isFavourite(train.id);
            const isSelected = idx === selectedIndex;

            return (
              <Card
                key={train.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  borderColor: isSelected
                    ? 'var(--primary)'
                    : undefined,
                  boxShadow: isSelected
                    ? 'var(--shadow-glow)'
                    : undefined,
                  backgroundColor: isSelected
                    ? 'rgba(0, 229, 255, 0.04)'
                    : undefined,
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '4px'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: 'var(--primary)',
                        fontFamily: 'var(--font-mono)'
                      }}
                    >
                      {train.number}
                    </span>

                    <h3
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {train.name}
                    </h3>
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {train.source} → {train.destination} •{' '}
                    {train.totalDistanceKm} km
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  {/* Favourite Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      toggleFavourite(train);

                      showToast({
                        message: fav
                          ? `Removed ${train.name} from Favourites`
                          : `Added ${train.name} to Favourites`,
                        type: fav ? 'info' : 'success'
                      });
                    }}
                    icon={
                      <Heart
                        size={18}
                        fill={fav ? 'var(--primary)' : 'none'}
                        color={
                          fav
                            ? 'var(--primary)'
                            : 'var(--text-muted)'
                        }
                      />
                    }
                  />

                  {/* Track Journey Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      addRecentSearch(train);
                      navigate(`/journey/${train.id}`);
                    }}
                    icon={<ArrowRight size={16} />}
                  >
                    Track Journey
                  </Button>

                  {/* Book Ticket Button */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      navigate(`/booking?trainId=${train.id}`);
                    }}
                  >
                    Book Ticket
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <EmptyState
          icon={<Train size={48} />}
          title="No Trains Found"
          description={`We couldn't find any trains matching "${query}". Try searching by train number (e.g. 12727) or train name.`}
          actionLabel="Clear Search"
          onAction={handleClear}
        />
      )}

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};