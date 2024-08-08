import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LogNavs from './LogNav/LogMainNav';
import HomeNavs from './HomeNav/HomeMainNav';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, selectAuth } from '../Redux/slices/authSlice';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(initializeAuth()); // Initialize auth state on app start
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="HomeNavsScreen"
            component={HomeNavs}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="LogNavsScreen"
            component={LogNavs}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default MainNavigation;
