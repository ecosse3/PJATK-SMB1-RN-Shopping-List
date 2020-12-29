import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { useRecoilState, useRecoilValue } from 'recoil';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';

import Navigator from 'navigators/Navigator';
import { themeState, userState, loadingState } from 'store';
import { themes } from './theme';

const SCThemeProvider: React.FC = () => {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState);
  const user = useRecoilValue(userState);

  useEffect(() => {
    setLoading(true);
    const getTheme = async () => {
      try {
        const result = await AsyncStorage.getItem('@theme');

        const userData = await firestore().collection('users').doc(user?.uid).get();

        if (userData.data()) {
          setCurrentTheme(userData.data()?.theme);
          setLoading(false);
        } else {
          setCurrentTheme(0);
          setLoading(false);
        }

        if (result !== null && !userData.data()) {
          setCurrentTheme(parseInt(result, 10));
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTheme();
  }, [user]);

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      {loading ? (
        <Spinner
          visible={loading}
          textContent="Wczytuje dane..."
          overlayColor="rgba(255, 255, 255, 0.25)"
          color="black"
        />
      ) : (
        <Navigator theme={themes[currentTheme]} />
      )}
    </ThemeProvider>
  );
};

export default SCThemeProvider;
