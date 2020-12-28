import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Region } from 'react-native-maps';

interface GeolocationData {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export const useGeolocation = (): Region => {
  const [position, setPosition] = useState<GeolocationData>({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0.01
  });

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      (pos) => {
        setPosition({
          ...position,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
      },
      (e) => console.log(e.message)
    );
    return () => Geolocation.clearWatch(watchId);
  }, []);

  return position;
};
