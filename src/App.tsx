import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// @ts-ignore
import FlipperAsyncStorage from 'rn-flipper-async-storage-advanced';

import {store} from './store';

import RootNavigation from './AppNavigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <FlipperAsyncStorage />
      <Provider store={store}>
        <NativeBaseProvider>
          <RootNavigation />
        </NativeBaseProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
