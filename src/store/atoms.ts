import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { atom } from 'recoil';
import { GeolocationDataType, ProductType, StoreType } from 'types';

export const userState = atom<FirebaseAuthTypes.User | null>({
  key: 'userState',
  default: null
});

export const themeState = atom<number>({
  key: 'themeState',
  default: 0
});

export const usernameState = atom<string>({
  key: 'usernameState',
  default: ''
});

export const tabBarVisibleState = atom<boolean>({
  key: 'tabBarVisibleState',
  default: false
});

export const productListState = atom<ProductType[]>({
  key: 'productListState',
  default: []
});

export const productInEditModeState = atom<boolean>({
  key: 'productInEditModeState',
  default: false
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: true
});

export const globalProductListState = atom<boolean>({
  key: 'globalProductListState',
  default: false
});

export const favoriteStoresState = atom<StoreType[]>({
  key: 'favoriteStoresState',
  default: []
});

export const storeInEditModeState = atom<boolean>({
  key: 'storeInEditModeState',
  default: false
});

export const userPositionState = atom<GeolocationDataType>({
  key: 'userPositionState',
  default: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0.01
  }
});

export const nearbyAddressState = atom<string>({
  key: 'nearbyAddressState',
  default: 'Wczytuje...'
});
