import { atom } from 'recoil';

export const themeState = atom({
  key: 'themeState',
  default: 0
});

export const usernameState = atom({
  key: 'usernameState',
  default: ''
});

export const tabBarVisibleState = atom({
  key: 'tabBarVisibleState',
  default: false
});

export const productListState = atom({
  key: 'productListState',
  default: [
    {
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    }
  ]
});