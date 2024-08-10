import React, { Dispatch, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LogNavs from './LogNav/LogMainNav';
import HomeNavs from './HomeNav/HomeMainNav';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, selectAuth } from '../Redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);
  const [initialScreen, setInitialScreen] = useState('HomeNavsScreen'); // Default to LogNavsScreen

  useEffect(() => {
    async function checkUser() {
      const accessToken = await AsyncStorage.getItem('access_token');
      if (accessToken) {
        setInitialScreen('HomeNavsScreen');
        console.log('Heading Home');
      } else {
        setInitialScreen('LogNavsScreen');
        console.log('Heading Log');
      }
    }

    checkUser().then(() => {
      dispatch(initializeAuth()); // Initialize auth state on app start
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        <Stack.Screen
          name="HomeNavsScreen"
          component={HomeNavs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LogNavsScreen"
          component={LogNavs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default MainNavigation;
