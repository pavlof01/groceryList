import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import RootNavigation from './AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <RootNavigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
