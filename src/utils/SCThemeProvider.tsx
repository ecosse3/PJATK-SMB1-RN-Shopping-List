import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useRecoilState } from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';
import { lightGreen, purple } from './theme';
import Navigator from '../navigators/Navigator';
import { themeState } from '../store';

type ThemeType = typeof lightGreen;

const SCThemeProvider: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const result = await AsyncStorage.getItem('@theme');

        if (result === null) {
          setCurrentTheme(0);
        } else {
          setCurrentTheme(parseInt(result, 10));
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTheme();
  }, []);

  return (
    <ThemeProvider theme={currentTheme === 0 ? lightGreen : purple}>
      <Navigator theme={currentTheme === 0 ? lightGreen : purple} />
    </ThemeProvider>
  );
};

export { ThemeType };
export default SCThemeProvider;
