import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';
import SQLite from 'react-native-sqlite-storage';
import Geocode from 'react-geocode';
import { MAPS_API_KEY } from '@env';
import SCThemeProvider from './src/utils/SCThemeProvider';
import { createTable } from './src/utils/sqlite';

const App: React.FC = () => {
  // This is ran once when app is opened
  useEffect(() => {
    const db = SQLite.openDatabase(
      {
        name: 'SQLite-s22004-products',
        location: 'default'
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
      (error) => {
        console.log(`ERROR: ${error}`);
      }
    );
    createTable(db);

    Geocode.setApiKey(MAPS_API_KEY);
    Geocode.setLanguage('pl');
    Geocode.setRegion('pl');
  }, []);

  return (
    <RecoilRoot>
      <SCThemeProvider />
    </RecoilRoot>
  );
};

App.displayName = 'App';

export default App;
