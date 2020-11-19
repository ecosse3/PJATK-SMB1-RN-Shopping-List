import { atom } from 'recoil';
import { ProductType } from '../utils/types';

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
