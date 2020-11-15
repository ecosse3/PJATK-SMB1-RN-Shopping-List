import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useRecoilValue } from 'recoil';
import { lightGreen, purple } from './theme';
import Navigator from '../navigators/Navigator';
import { themeState } from '../store';

type ThemeType = typeof lightGreen;

const SCThemeProvider: React.FC = () => {
  const currentTheme = useRecoilValue(themeState);
  return (
    <ThemeProvider theme={currentTheme === 0 ? lightGreen : purple}>
      <Navigator theme={currentTheme === 0 ? lightGreen : purple} />
    </ThemeProvider>
  );
};

export { ThemeType };
export default SCThemeProvider;
