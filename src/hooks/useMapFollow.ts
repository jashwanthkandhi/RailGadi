/**
 * useMapFollow.ts
 * Hook to control map camera follow mode for live train position.
 */
import { useMapStore } from '../stores/mapStore';
import { useSimulationStore } from '../stores/simulationStore';

export const useMapFollow = () => {
  const { followMode, setFollowMode } = useMapStore();
  const isPlaying = useSimulationStore((state) => state.isPlaying);

  const toggleFollow = () => setFollowMode(!followMode);
  const enableFollow = () => setFollowMode(true);
  const disableFollow = () => setFollowMode(false);

  return {
    followMode,
    isPlaying,
    toggleFollow,
    enableFollow,
    disableFollow
  };
};
