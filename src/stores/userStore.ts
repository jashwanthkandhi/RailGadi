import { create } from 'zustand';
import type { RecentSearch, FavouriteTrain, Train } from '../types';

interface UserState {
  recentSearches: RecentSearch[];
  favourites: FavouriteTrain[];
  addRecentSearch: (train: Train) => void;
  removeRecentSearch: (trainId: string) => void;
  clearRecentSearches: () => void;
  toggleFavourite: (train: Train) => void;
  isFavourite: (trainId: string) => boolean;
}

const RECENT_KEY = 'railgaadi_recent_searches';
const FAVOURITES_KEY = 'railgaadi_favourites';

const loadRecent = (): RecentSearch[] => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const loadFavourites = (): FavouriteTrain[] => {
  try {
    const raw = localStorage.getItem(FAVOURITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const useUserStore = create<UserState>((set, get) => ({
  recentSearches: loadRecent(),
  favourites: loadFavourites(),

  addRecentSearch: (train) => {
    const current = get().recentSearches.filter((item) => item.trainId !== train.id);
    const updated: RecentSearch[] = [
      {
        trainId: train.id,
        trainNumber: train.number,
        trainName: train.name,
        source: train.source,
        destination: train.destination,
        searchedAt: new Date().toISOString()
      },
      ...current
    ].slice(0, 10);

    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    set({ recentSearches: updated });
  },

  removeRecentSearch: (trainId) => {
    const updated = get().recentSearches.filter((item) => item.trainId !== trainId);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
    set({ recentSearches: updated });
  },

  clearRecentSearches: () => {
    localStorage.removeItem(RECENT_KEY);
    set({ recentSearches: [] });
  },

  toggleFavourite: (train) => {
    const exists = get().favourites.some((f) => f.trainId === train.id);
    let updated: FavouriteTrain[];
    if (exists) {
      updated = get().favourites.filter((f) => f.trainId !== train.id);
    } else {
      updated = [
        ...get().favourites,
        {
          trainId: train.id,
          trainNumber: train.number,
          trainName: train.name,
          source: train.source,
          destination: train.destination,
          addedAt: new Date().toISOString()
        }
      ];
    }
    localStorage.setItem(FAVOURITES_KEY, JSON.stringify(updated));
    set({ favourites: updated });
  },

  isFavourite: (trainId) => {
    return get().favourites.some((f) => f.trainId === trainId);
  }
}));
