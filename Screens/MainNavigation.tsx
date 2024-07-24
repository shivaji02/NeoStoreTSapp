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

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LogMainNav from './LogNav/LogMainNav';
import HomeMainNav from './HomeNav/HomeMainNav';

const Stack = createStackNavigator();

const MainNavigation = () => {
    const isLoggedIn = false;
    console.log('Is Logged In:', isLoggedIn);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <Stack.Screen 
                        name="HomeMainNavScreen" 
                        component={HomeMainNav} 
                        options={{ headerShown: false }} 
                    />
                ) : (
                    <Stack.Screen 
                        name="LogMainNavScreen" 
                        component={LogMainNav} 
                        options={{ headerShown: false }} 
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigation;
