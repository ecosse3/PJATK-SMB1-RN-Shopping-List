import React from 'react';
import { RecoilRoot } from 'recoil';
import SCThemeProvider from './src/utils/SCThemeProvider';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <SCThemeProvider />
    </RecoilRoot>
  );
};

App.displayName = 'App';

export default App;
