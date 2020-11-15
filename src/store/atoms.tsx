import { atom } from 'recoil';

export const usernameState = atom({
  key: 'usernameState',
  default: ''
});

export const tabBarVisibleState = atom({
  key: 'tabBarVisibleState',
  default: false
});
