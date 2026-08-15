/**
 * trainService.ts
 * Abstraction layer for train search and metadata.
 * Uses real RailRadar API when key present, falls back to mock data.
 */
import { MOCK_TRAINS } from './mockDataService';
import type { Train } from '../types';

const RAILRADAR_BASE = import.meta.env.VITE_RAILRADAR_BASE_URL ?? '';
const RAILRADAR_KEY = import.meta.env.VITE_RAILRADAR_API_KEY ?? '';

const hasRealKey = RAILRADAR_KEY && RAILRADAR_KEY !== 'your_railradar_api_key_here';

/** Search trains by number, name, source or destination */
export const searchTrains = async (query: string): Promise<Train[]> => {
  if (!query.trim()) return [];

  if (hasRealKey) {
    try {
      const url = `${RAILRADAR_BASE}/trains/search?q=${encodeURIComponent(query)}`;
      const res = await fetch(url, {
        headers: { 'x-api-key': RAILRADAR_KEY }
      });
      if (!res.ok) throw new Error(`RailRadar search failed: ${res.status}`);
      const data = await res.json();
      // Adapt API response shape to our Train type
      return (data.trains ?? []) as Train[];
    } catch (err) {
      console.warn('[trainService] RailRadar unavailable, using mock data.', err);
    }
  }

  // ——— Mock Fallback ———
  const q = query.toLowerCase();
  return MOCK_TRAINS.filter(
    (t) =>
      t.number.includes(q) ||
      t.name.toLowerCase().includes(q) ||
      t.source.toLowerCase().includes(q) ||
      t.destination.toLowerCase().includes(q)
  );
};

/** Get a single train by ID */
export const getTrainById = async (id: string): Promise<Train | null> => {
  if (hasRealKey) {
    try {
      const url = `${RAILRADAR_BASE}/trains/${id}`;
      const res = await fetch(url, {
        headers: { 'x-api-key': RAILRADAR_KEY }
      });
      if (!res.ok) throw new Error(`RailRadar getById failed: ${res.status}`);
      return (await res.json()) as Train;
    } catch (err) {
      console.warn('[trainService] RailRadar unavailable, using mock data.', err);
    }
  }

  return MOCK_TRAINS.find((t) => t.id === id || t.number === id) ?? null;
};
