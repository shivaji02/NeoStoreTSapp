import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen'
import styles from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerList from '../DrawerNav/DrawerList';

const Stack = createStackNavigator();

const HomeMainNav: React.FC = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen name="Drawer" component={DrawerList} />
      </Stack.Navigator>
  );
};

export default HomeMainNav;
