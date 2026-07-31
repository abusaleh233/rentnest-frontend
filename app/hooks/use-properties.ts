'use client';

import { useEffect, useState, useCallback } from 'react';
import { apiClient } from '../lib/api-client';


export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  ownerId?: string;
}

interface FetchParams {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function useProperties(params?: FetchParams) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/properties', { params });
      const data = response.data;
      setProperties(Array.isArray(data) ? data : data?.data || []);
    } catch (err: any) {
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }, [params?.location, params?.minPrice, params?.maxPrice]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, isLoading, error, refetch: fetchProperties };
}