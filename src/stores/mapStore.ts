import { create } from 'zustand';

interface MapState {
  followMode: boolean;
  zoom: number;
  center: [number, number];
  activeStationId: string | null;
  setFollowMode: (follow: boolean) => void;
  setZoom: (zoom: number) => void;
  setCenter: (center: [number, number]) => void;
  setActiveStationId: (id: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  followMode: true,
  zoom: 11,
  center: [79.591, 17.965],
  activeStationId: null,
  setFollowMode: (followMode) => set({ followMode }),
  setZoom: (zoom) => set({ zoom }),
  setCenter: (center) => set({ center }),
  setActiveStationId: (activeStationId) => set({ activeStationId })
}));
