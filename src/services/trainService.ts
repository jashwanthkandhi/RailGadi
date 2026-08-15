/**
 * trainService.ts
 * Real-time Indian Railway train search and metadata service.
 * Connects directly to RailRadar API (https://railradar.in/api/v1).
 */
import { MOCK_TRAINS } from './mockDataService';
import type { Train } from '../types';

const RAILRADAR_BASE = import.meta.env.VITE_RAILRADAR_BASE_URL ?? '/api/v1';

// Enriched Indian Railways popular catalog for instant search autocomplete
export const POPULAR_INDIAN_TRAINS: Train[] = [
  {
    id: '12727',
    number: '12727',
    name: 'Godavari Superfast Express',
    source: 'Visakhapatnam Jn (VSKP)',
    destination: 'Hyderabad Decan (HYB)',
    totalDistanceKm: 712,
    trainType: 'Superfast Express',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  {
    id: '12626',
    number: '12626',
    name: 'Kerala Express',
    source: 'New Delhi (NDLS)',
    destination: 'Trivandrum Central (TVC)',
    totalDistanceKm: 3030,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  },
  {
    id: '12951',
    number: '12951',
    name: 'Mumbai Tejas Rajdhani Express',
    source: 'Mumbai Central (MMCT)',
    destination: 'New Delhi (NDLS)',
    totalDistanceKm: 1384,
    trainType: 'Rajdhani',
    runsOn: ['Daily']
  },
  {
    id: '22436',
    number: '22436',
    name: 'Varanasi Vande Bharat Express',
    source: 'New Delhi (NDLS)',
    destination: 'Varanasi Jn (BSB)',
    totalDistanceKm: 759,
    trainType: 'Vande Bharat',
    runsOn: ['Sun', 'Mon', 'Tue', 'Wed', 'Fri', 'Sat']
  },
  {
    id: '12002',
    number: '12002',
    name: 'Rani Kamalapati Shatabdi Express',
    source: 'New Delhi (NDLS)',
    destination: 'Rani Kamlapati (RKMP)',
    totalDistanceKm: 708,
    trainType: 'Shatabdi',
    runsOn: ['Daily']
  },
  {
    id: '12137',
    number: '12137',
    name: 'Punjab Mail',
    source: 'Mumbai CSMT (CSMT)',
    destination: 'Firozpur Cant (FZR)',
    totalDistanceKm: 1929,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  },
  {
    id: '12260',
    number: '12260',
    name: 'Sealdah AC Duronto Express',
    source: 'Bikaner Jn (BKN)',
    destination: 'Sealdah (SDAH)',
    totalDistanceKm: 1918,
    trainType: 'Duronto',
    runsOn: ['Mon', 'Wed', 'Fri', 'Sat']
  },
  {
    id: '12840',
    number: '12840',
    name: 'Howrah Mail',
    source: 'Chennai Central (MAS)',
    destination: 'Howrah Jn (HWH)',
    totalDistanceKm: 1661,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  },
  {
    id: '12301',
    number: '12301',
    name: 'Howrah New Delhi Rajdhani Express',
    source: 'Howrah Jn (HWH)',
    destination: 'New Delhi (NDLS)',
    totalDistanceKm: 1451,
    trainType: 'Rajdhani',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: '20833',
    number: '20833',
    name: 'Secunderabad Vande Bharat Express',
    source: 'Visakhapatnam (VSKP)',
    destination: 'Secunderabad Jn (SC)',
    totalDistanceKm: 698,
    trainType: 'Vande Bharat',
    runsOn: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  },
  {
    id: '12759',
    number: '12759',
    name: 'Charminar Express',
    source: 'Tambaram (TBM)',
    destination: 'Hyderabad (HYB)',
    totalDistanceKm: 792,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  },
  {
    id: '12621',
    number: '12621',
    name: 'Tamil Nadu Express',
    source: 'Chennai Central (MAS)',
    destination: 'New Delhi (NDLS)',
    totalDistanceKm: 2184,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  },
  {
    id: '12863',
    number: '12863',
    name: 'SMVT Bengaluru Express',
    source: 'Howrah Jn (HWH)',
    destination: 'SMVT Bengaluru (SMVB)',
    totalDistanceKm: 1948,
    trainType: 'Superfast Express',
    runsOn: ['Daily']
  }
];

/** Get a single train by ID / number from RailRadar API */
export const getTrainById = async (id: string): Promise<Train | null> => {
  if (!id) return null;
  const cleanId = id.replace(/[^0-9]/g, '');

  if (cleanId.length === 5) {
    try {
      const url = `${RAILRADAR_BASE}/trains/${cleanId}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data?.train) {
          const raw = data.data.train;
          return {
            id: raw.number || cleanId,
            number: raw.number || cleanId,
            name: raw.name || `Express ${cleanId}`,
            source: raw.source?.name ? `${raw.source.name} (${raw.source.code || ''})`.trim() : 'Source Station',
            destination: raw.destination?.name ? `${raw.destination.name} (${raw.destination.code || ''})`.trim() : 'Destination Station',
            totalDistanceKm: raw.distance || 500,
            trainType: raw.type || raw.category || 'Superfast Express',
            runsOn: Array.isArray(raw.runDays) ? raw.runDays.map((d: string) => d.slice(0, 3).toUpperCase()) : ['Daily']
          };
        }
      }
    } catch (err) {
      console.warn('[trainService] RailRadar API error fetching train:', err);
    }
  }

  // Fallback to Catalog or Mock Trains
  const localMatch = [...POPULAR_INDIAN_TRAINS, ...MOCK_TRAINS].find(
    (t) => t.id === id || t.number === cleanId
  );
  if (localMatch) return localMatch;

  // If 5-digit number not in catalog, construct basic metadata so tracking works
  if (cleanId.length === 5) {
    return {
      id: cleanId,
      number: cleanId,
      name: `Express Train ${cleanId}`,
      source: 'Origin Station',
      destination: 'Destination Station',
      totalDistanceKm: 650,
      trainType: 'Express',
      runsOn: ['Daily']
    };
  }

  return null;
};

/** Search trains by number, name, source or destination */
export const searchTrains = async (query: string): Promise<Train[]> => {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const cleanNum = q.replace(/[^0-9]/g, '');

  // 1. Direct 5-digit train number query via API
  if (cleanNum.length === 5) {
    const liveTrain = await getTrainById(cleanNum);
    if (liveTrain) {
      // Also merge any other matching popular trains
      const others = POPULAR_INDIAN_TRAINS.filter((t) => t.number !== cleanNum && t.name.toLowerCase().includes(q));
      return [liveTrain, ...others];
    }
  }

  // 2. Filter local catalog + mock trains
  const catalog = [...POPULAR_INDIAN_TRAINS, ...MOCK_TRAINS];
  const matches = catalog.filter(
    (t, idx, self) =>
      self.findIndex((item) => item.number === t.number) === idx &&
      (t.number.includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q) ||
        t.destination.toLowerCase().includes(q))
  );

  return matches;
};

