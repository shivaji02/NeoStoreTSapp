import React from 'react'
import { View,Text } from 'react-native'
import {createStackNavigator} from '@react-navigation/stack'
import LoginScreen from './LoginScreen'
import RegisterUserScreen from './RegisterUserScreen'
import ForgotPasswordScreen from './ForgotPasswordScreen'

const Stack=createStackNavigator();
const LogMainNav=()=>{
    return(
<Stack.Navigator initialRouteName='RegisterUserScreen'>
    <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen as React.ComponentType} />
    <Stack.Screen options={{headerShown:false}} name='RegisterUserScreen' component={RegisterUserScreen} />
    <Stack.Screen options={{headerShown:false}} name ='ForgotPasswordScreen' component={ForgotPasswordScreen} />
</Stack.Navigator>
    )
}

export default LogMainNav;