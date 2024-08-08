import React from 'react'
import HomeScreen from './HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../LogNav/LoginScreen';

const Stack = createStackNavigator();

const HomeMainNav: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="LoginScreen" component={LogInScreen } />
        </Stack.Navigator>
  );
};

export default HomeMainNav;