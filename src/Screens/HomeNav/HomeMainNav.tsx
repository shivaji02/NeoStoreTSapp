import React from 'react'
import HomeScreen from './HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeMainNav: React.FC = () => {
  return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeScreen} />
      </Stack.Navigator>
  );
};

export default HomeMainNav;
