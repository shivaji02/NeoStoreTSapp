import React, { useEffect } from 'react';
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

  let initialScreen = 'HomeNavsScreen'; 

  useEffect( () => {

    async function checkUser(){
      const accessToken = await AsyncStorage.getItem('access_token');
      if(accessToken){
        initialScreen;
        console.log('Heading Home')
      }
      else{
        initialScreen = 'LogNavsScreen';
        console.log('Heading Log')
      }
    }
    checkUser();
//dispatch(initializeAuth()); // Initialize auth state on app start
  }, []);
//  console.log(isAuthenticated);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialScreen}>
        {/* {isAuthenticated ? ( */}
          <Stack.Screen
            name="HomeNavsScreen"
            component={HomeNavs}
            options={{ headerShown: false }}
          />
        {/* ) : ( */}
          <Stack.Screen
            name="LogNavsScreen"
            component={LogNavs}
            options={{ headerShown: false }}
          />
        {/* )} */}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
};

export default MainNavigation;
