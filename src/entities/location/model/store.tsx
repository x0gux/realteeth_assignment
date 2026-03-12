import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Coordinates } from '../../../shared/hooks/useGeolocation';

export type LocationState = string | Coordinates | null;

interface LocationContextType {
  selectedLocation: LocationState;
  setSelectedLocation: (location: LocationState) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationState>(null);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationStore = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationStore must be used within a LocationProvider');
  }
  return context;
};
