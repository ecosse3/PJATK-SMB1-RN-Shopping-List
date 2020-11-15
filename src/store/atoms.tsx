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
