/**
 * journeyService.ts
 * Abstraction layer for live journey data.
 * Uses real RailRadar API when key present, falls back to mock data.
 */
import { getJourneyForTrain } from './mockDataService';
import type { LiveJourney } from '../types';

const RAILRADAR_BASE = import.meta.env.VITE_RAILRADAR_BASE_URL ?? '';
const RAILRADAR_KEY = import.meta.env.VITE_RAILRADAR_API_KEY ?? '';

const hasRealKey = RAILRADAR_KEY && RAILRADAR_KEY !== 'your_railradar_api_key_here';

/** Fetch live journey data for a train ID */
export const fetchLiveJourney = async (trainId: string): Promise<LiveJourney> => {
  if (hasRealKey) {
    try {
      const url = `${RAILRADAR_BASE}/trains/${trainId}/live`;
      const res = await fetch(url, {
        headers: { 'x-api-key': RAILRADAR_KEY }
      });
      if (!res.ok) throw new Error(`RailRadar live failed: ${res.status}`);
      return (await res.json()) as LiveJourney;
    } catch (err) {
      console.warn('[journeyService] RailRadar unavailable, using mock data.', err);
    }
  }

  // ——— Dynamic Fallback per train ID ———
  return getJourneyForTrain(trainId);
};
