import { useState, useEffect } from 'react';

export interface Coordinates {
  lat: number;
  lon: number;
}

export const useGeolocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        console.warn('Geolocation error:', err.message);
        setError(err.message);
        setIsLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  return { coordinates, isLoading, error };
};
