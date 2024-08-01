import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/Products'
import CartScreen from './screens/cart'
const Stack = createNativeStackNavigator();


export type RootStackParamList = {

    Home: undefined;
    Product: { product: any };
    Cart: undefined;  
  };

const MainNavigation = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Product" component={ProductScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
            </Stack.Navigator>
    )
};

export default MainNavigation;