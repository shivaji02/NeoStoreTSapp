import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LogNavs from './LogNav/LogMainNav';
import HomeNavs from './HomeNav/HomeMainNav';
import { useDispatch, useSelector } from 'react-redux';
import { initializeAuth, selectAuth } from '../Redux/slices/authSlice';
import Toast from 'react-native-toast-message';
import { ActivityIndicator, ActivityIndicatorBase, View } from 'react-native';

const Stack = createStackNavigator();

const MainNavigation = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (loading) {
    // You can return a loading screen while checking auth status
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'grey' }}>
        <ActivityIndicator size="large" color='tomato' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'HomeNavsScreen' : 'LogNavsScreen'}>
      {/* <Stack.Navigator initialRouteName={ 'LogNavsScreen'}> */}
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
