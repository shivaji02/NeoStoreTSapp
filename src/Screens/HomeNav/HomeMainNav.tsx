import React from 'react'
import HomeScreen from './HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../LogNav/LoginScreen';
import UserDetails from './UserAccount/UserDetails';
import UpdateDetails from './UserAccount/UpdateDetails';
import changePassword from './UserAccount/ChangePassword';
import ProductList from '../Product/ProductList';
import ProductDetail from '../Product/ProductDetail';
const Stack = createStackNavigator();

const HomeMainNav: React.FC = () => {
  return (
      <Stack.Navigator initialRouteName='Main' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="LoginScreen" component={LogInScreen } />
        <Stack.Screen options={{headerShown:false}} name ="UserDetails" component ={UserDetails}/>
        <Stack.Screen options={{headerShown:false}} name ="UpdateDetails" component ={UpdateDetails}/>
        <Stack.Screen options={{headerShown:false}} name ="changePassword" component ={changePassword}/>
        <Stack.Screen options={{headerShown:false}} name ="ProductList" component ={ProductList}/>
        <Stack.Screen options={{headerShown:false}} name ="ProductDetail" component ={ProductDetail}/>
        
        </Stack.Navigator>
  );
};

export default HomeMainNav;