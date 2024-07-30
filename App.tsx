import React from 'react';
import { View, Text } from 'react-native';
import MainNavigation from './src/Screens/MainNavigation';
import styles from './styles';
import { AuthProvider } from './src/Screens/LogNav/AuthProvider';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );
};

export default App;


