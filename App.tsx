import React from 'react';
import { View, Text } from 'react-native';
import MainNavigation from './src/Screens/MainNavigation';
import styles from './styles';
import { AuthProvider } from './src/Screens/LogNav/AuthProvider';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App: React.FC = () => {
  return (

    <AuthProvider>
      <SafeAreaProvider>
        <MainNavigation />
      </SafeAreaProvider>

    </AuthProvider>
  );
};

export default App;


