// src/entities/location/api/useDistricts.ts
import { useQuery } from '@tanstack/react-query';
import { fetchDistricts } from './fetchDistricts';
import type { District } from '../model/types';

export const LOCATION_QUERY_KEYS = {
  districts: ['districts'] as const,
};

export const useDistricts = () => {
  return useQuery<District[], Error>({
    queryKey: LOCATION_QUERY_KEYS.districts,
    queryFn: fetchDistricts,
    staleTime: Infinity, 
    gcTime: Infinity,
  });
};
