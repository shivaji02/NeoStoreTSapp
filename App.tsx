import { Provider } from 'react-redux';
import store from './src/Redux/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/Screens/MainNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
const App: React.FC = () => {
  console.log('Rendering App with Provider');

  useEffect(() => {
    // Log all keys and values stored in AsyncStorage
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.forEach((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
        });
      });
    });
    return;
  }, []);
    // Log all keys and values stored in AsyncStorage
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (error, stores) => {
        stores.forEach((result, i, store) => {
          console.log({ [store[i][0]]: store[i][1] });
        });
      });
    });

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
