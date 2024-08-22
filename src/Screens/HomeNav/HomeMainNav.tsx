import React from 'react'
import HomeScreen from './HomeScreen'
import { createStackNavigator } from '@react-navigation/stack';
import LogInScreen from '../LogNav/LoginScreen';
import UserDetails from './UserAccount/UserDetails';
import UpdateDetails from './UserAccount/UpdateDetails';
import changePassword from './UserAccount/ChangePassword';
import ProductList from '../Product/ProductList';
import ProductDetail from '../Product/ProductDetail';
import CartList from '../Cart/CartList';
import OrderScreen from '../Order/OrderScreen';
import OrderConfirmationScreen from '../Order/OderConfirmationScreen';
import AddressScreen from './UserAccount/AddressScreen';
import OrderList from '../Order/OrderList';
 import OrderDetail from '../Order/OrderDetail';
 import Notification from './UserAccount/Notification';
// import AddressConfirmation from '../Order/AddressConfirmation';

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
        <Stack.Screen options={{headerShown:false}} name ="CartList" component ={CartList}/>
        <Stack.Screen options={{headerShown:false}} name ="AddressScreen" component ={AddressScreen}/>
        <Stack.Screen options={{headerShown:false}} name ="OrderScreen" component ={OrderScreen}/>
        <Stack.Screen options={{headerShown:false}} name ="OrderConfirmationScreen" component ={OrderConfirmationScreen}/>
        <Stack.Screen options={{headerShown:false}} name ="OrderList" component ={OrderList}/>
        <Stack.Screen options={{headerShown:false}} name ="OrderDetail" component ={OrderDetail}/>
        <Stack.Screen options={{headerShown:false}} name ="Notification" component ={Notification}/>
        </Stack.Navigator>
  );
};

export default HomeMainNav;
