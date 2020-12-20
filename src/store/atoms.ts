import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { atom } from 'recoil';
import { ProductType } from '../utils/types';

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
