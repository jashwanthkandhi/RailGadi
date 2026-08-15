export type JourneyStatus =
  | 'ON_TIME'
  | 'DELAYED'
  | 'APPROACHING'
  | 'AT_STATION'
  | 'DEPARTED'
  | 'COMPLETED'
  | 'NOT_RUNNING'
  | 'UNKNOWN';

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface Station {
  id: string;
  code: string;
  name: string;
  latitude: number;
  longitude: number;
  sequence: number;
  scheduledArrival?: string;
  actualArrival?: string;
  scheduledDeparture?: string;
  actualDeparture?: string;
  delayMinutes?: number;
  status?: 'COMPLETED' | 'CURRENT' | 'UPCOMING';
  elevationMeters?: number;
  platformNumber?: string;
  haltMinutes?: number;
  amenities?: string[];
  coachPosition?: string[];
  predictedArrival?: string;
  predictedDeparture?: string;
  predictionConfidenceMinutes?: number;
  delayRisk?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface Train {
  id: string;
  number: string;
  name: string;
  source: string;
  destination: string;
  totalDistanceKm: number;
  trainType?: string;
  runsOn?: string[];
  isCustom?: boolean;
}

export interface JourneyProgress {
  percentage: number;
  distanceCoveredKm: number;
  distanceRemainingKm: number;
  totalDistanceKm: number;
}

export interface LiveJourney {
  id: string;
  trainId: string;
  train: Train;
  status: JourneyStatus;
  delayMinutes: number;
  currentStation?: Station;
  nextStation?: Station;
  destination?: Station;
  location?: GeoPoint;
  speedKmph?: number;
  headingDegrees?: number;
  progress: JourneyProgress;
  updatedAt: string;
  stations: Station[];
}

export interface Weather {
  locationName: string;
  temperature: number;
  condition: string;
  humidity: number;
  windKph: number;
  rainProbability: number;
  icon?: string;
  updatedAt: string;
}

export interface ElevationPoint {
  distanceKm: number;
  elevationMeters: number;
  stationName?: string;
}

export interface DelayHistoryPoint {
  stationCode: string;
  stationName: string;
  scheduledTime: string;
  actualTime: string;
  delayMinutes: number;
}

export interface SpeedProfilePoint {
  distanceKm: number;
  speedKmph: number;
  sectionName: string;
}

export interface CoachInfo {
  code: string;
  type: 'ENGINE' | 'SLEEPER' | 'AC_3_TIER' | 'AC_2_TIER' | 'AC_FIRST' | 'PANTRY' | 'LUGGAGE';
  label: string;
}

export interface GeographicFeature {
  id: string;
  name: string;
  type: 'RIVER' | 'LAKE' | 'MOUNTAIN' | 'GHAT' | 'BRIDGE' | 'TUNNEL' | 'CITY' | 'ATTRACTION';
  latitude: number;
  longitude: number;
  distanceKmFromStart: number;
  description?: string;
  image?: string;
}

export interface RecentSearch {
  trainId: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  searchedAt: string;
}

export interface FavouriteTrain {
  trainId: string;
  trainNumber: string;
  trainName: string;
  source: string;
  destination: string;
  addedAt: string;
}

