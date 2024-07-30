// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import LogMain from './LogNav/LogMainNav';
// import HomeMainNav from './HomeNav/HomeMainNav';
// import LogMainNav from './LogNav/LogMainNav';

// const Stack = createStackNavigator();

// const MainNavigation =()=> {
//     const isLoggedIn: boolean = false;
//     console.log('Is Logged In:', isLoggedIn);

//     return (
//         <NavigationContainer>
//         <Stack.Navigator >
//             {isLoggedIn ? (
//                 <Stack.Screen name="Home"  options ={{headerShown:false}}component={HomeMainNav} />
//             ) : (
//                 <Stack.Screen name="Login" options ={{headerShown:false}} component={LogMainNav} />
//             )}
//         </Stack.Navigator>
//         </NavigationContainer>
//     );
// }

// export default MainNavigation;

import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './LogNav/AuthProvider';
import LogNavs from './LogNav/LogMainNav';
import HomeNavs from './HomeNav/HomeMainNav';
import { AuthProvider } from './LogNav/AuthProvider';
const Stack = createStackNavigator();

const MainNavigation = () => {
    const { isLogged } = useContext(AuthContext) as { isLogged: boolean };

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLogged ? (
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
        </NavigationContainer>
    );
};

export default MainNavigation;
