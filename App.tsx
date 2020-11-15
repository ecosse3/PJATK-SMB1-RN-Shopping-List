import React from 'react';
import { RecoilRoot } from 'recoil';
import Navigator from './src/navigators/Navigator';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Navigator />
    </RecoilRoot>
  );
};

App.displayName = 'App';

export default App;
