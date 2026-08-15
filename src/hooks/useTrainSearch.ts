/**
 * useTrainSearch.ts
 * TanStack Query hook for searching trains with 350ms debounce.
 * Uses trainService (real API → mock fallback).
 */
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchTrains } from '../services/trainService';

const DEBOUNCE_MS = Number(import.meta.env.VITE_SEARCH_DEBOUNCE_MS ?? 350);

export const useTrainSearch = (rawQuery: string) => {
  const [debouncedQuery, setDebouncedQuery] = useState(rawQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(rawQuery.trim());
    }, DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [rawQuery]);

  const query = useQuery({
    queryKey: ['trainSearch', debouncedQuery],
    queryFn: () => searchTrains(debouncedQuery),
    enabled: debouncedQuery.length >= 1,
    staleTime: 1000 * 60 * 2, // 2 min — search results don't change often
    placeholderData: (prev) => prev // Keep previous results while new ones load
  });

  return {
    results: query.data ?? [],
    isLoading: query.isFetching,
    isError: query.isError,
    debouncedQuery
  };
};
