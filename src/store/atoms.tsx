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
      id: 1,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    },
    {
      id: 2,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    },
    {
      id: 3,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    },
    {
      id: 4,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    },
    {
      id: 5,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    },
    {
      id: 6,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    },
    {
      id: 7,
      name: 'Jogurt naturalny',
      price: 1.79,
      amount: 2,
      isBuy: false
    }
  ]
});
