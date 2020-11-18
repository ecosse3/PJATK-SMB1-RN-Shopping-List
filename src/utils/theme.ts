import { ThemeType } from './types';

export const lightGreen: ThemeType = {
  colors: {
    primary: '#89b6a5',
    secondary: '#474350',
    badge: '#FF0000'
  }
};

export const oxford: ThemeType = {
  colors: {
    primary: '#F87060',
    secondary: '#102542',
    badge: '#CDD7D6'
  }
};

export const capri: ThemeType = {
  colors: {
    primary: '#30C5FF',
    secondary: '#2A2D34',
    badge: '#F7D08A',
    basket: '#F7D08A'
  }
};

export const themes: ThemeType[] = [lightGreen, oxford, capri];
