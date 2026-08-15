/**
 * useLiveJourney.ts
 * TanStack Query hook for live journey data with automatic 60s refresh.
 * Returns journey data, staleness status, and manual refresh capability.
 */
import { useQuery } from '@tanstack/react-query';
import { fetchLiveJourney } from '../services/journeyService';

const REFRESH_MS = Number(import.meta.env.VITE_JOURNEY_REFRESH_INTERVAL_MS ?? 60000);
// Consider data stale if older than 2 minutes
const STALE_THRESHOLD_MS = 2 * 60 * 1000;

export const useLiveJourney = (trainId: string) => {
  const query = useQuery({
    queryKey: ['liveJourney', trainId],
    queryFn: () => fetchLiveJourney(trainId),
    enabled: !!trainId,
    refetchInterval: REFRESH_MS,
    refetchIntervalInBackground: false,
    staleTime: REFRESH_MS,
    retry: 2
  });

  const isStale = query.dataUpdatedAt > 0
    ? Date.now() - query.dataUpdatedAt > STALE_THRESHOLD_MS
    : false;

  return {
    journey: query.data ?? null,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    isStale,
    lastUpdatedAt: query.dataUpdatedAt,
    refetch: query.refetch
  };
};
