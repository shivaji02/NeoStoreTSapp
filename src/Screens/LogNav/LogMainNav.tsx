import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterUserScreen from './RegisterUserScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam'
import HomeNavsScreen from '../HomeNav/HomeMainNav'

const Stack=createStackNavigator();
const LogMainNav=()=>{
    return(
<Stack.Navigator initialRouteName='LoginScreen'>
    <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen } />
    <Stack.Screen options={{headerShown:false}} name='HomeNavsScreen' component={HomeNavsScreen} />
    <Stack.Screen options={{headerShown:false}} name='RegisterUserScreen' component={RegisterUserScreen} />
    <Stack.Screen options={{headerShown:false}} name ='ForgotPasswordScreen' component={ForgotPasswordScreen} />
</Stack.Navigator>
    )
}

export default LogMainNav;