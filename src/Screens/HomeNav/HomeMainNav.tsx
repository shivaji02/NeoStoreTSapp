import React from 'react'
import HomeScreen from './HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../LogNav/LoginScreen';
import UserDetails from './UserRelatedScreens/UserDetails';
import UpdateDetails from './UserRelatedScreens/UpdateDetails';
import changePassword from './UserRelatedScreens/ChangePassword';
const Stack = createStackNavigator();

const HomeMainNav: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="LoginScreen" component={LogInScreen } />
        <Stack.Screen options={{headerShown:false}} name ="UserDetails" component ={UserDetails}/>
        <Stack.Screen options={{headerShown:false}} name ="UpdateDetails" component ={UpdateDetails}/>
        <Stack.Screen options={{headerShown:false}} name ="changePassword" component ={changePassword}/>

        
        </Stack.Navigator>
  );
};

export default HomeMainNav;