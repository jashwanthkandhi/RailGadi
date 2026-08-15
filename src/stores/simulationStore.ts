import { create } from 'zustand';

interface SimulationState {
  isPlaying: boolean;
  simulationSpeed: number; // 1x, 5x, 10x, 25x
  currentLat: number;
  currentLng: number;
  speedKmph: number;
  progressPercentage: number;
  distanceCoveredKm: number;
  totalDistanceKm: number;

  togglePlay: () => void;
  setPlaying: (playing: boolean) => void;
  setSimulationSpeed: (speed: number) => void;
  updatePosition: (lat: number, lng: number, speed: number, progressPct: number, distCovered: number) => void;
  resetSimulation: (initialLat: number, initialLng: number, totalDist: number) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isPlaying: false,
  simulationSpeed: 1,
  currentLat: 17.965,
  currentLng: 79.591,
  speedKmph: 92,
  progressPercentage: 68,
  distanceCoveredKm: 479,
  totalDistanceKm: 705,

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (playing: boolean) => set({ isPlaying: playing }),
  setSimulationSpeed: (simulationSpeed: number) => set({ simulationSpeed }),
  updatePosition: (lat, lng, speed, progressPct, distCovered) =>
    set({
      currentLat: lat,
      currentLng: lng,
      speedKmph: speed,
      progressPercentage: Math.min(100, Math.max(0, Math.round(progressPct))),
      distanceCoveredKm: Math.round(distCovered)
    }),
  resetSimulation: (initialLat, initialLng, totalDist) =>
    set({
      isPlaying: false,
      currentLat: initialLat,
      currentLng: initialLng,
      speedKmph: 0,
      progressPercentage: 0,
      distanceCoveredKm: 0,
      totalDistanceKm: totalDist
    })
}));
