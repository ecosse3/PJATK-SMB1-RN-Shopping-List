import { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { Region } from 'react-native-maps';
import { useRecoilState } from 'recoil';
import { userPositionState } from '../store/atoms';

export const useGeolocation = (): Region => {
  const [position, setPosition] = useRecoilState(userPositionState);

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
