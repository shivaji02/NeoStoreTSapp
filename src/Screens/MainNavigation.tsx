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

import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './LogNav/AuthProvider';
import LogNavs from './LogNav/LogMainNav';
import HomeNavs from './HomeNav/HomeMainNav';
import { AuthProvider } from './LogNav/AuthProvider';
import { useDispatch,useSelector} from 'react-redux';
import {selectAuth} from '../Redux/slices/authSlice';

const Stack = createStackNavigator();


const MainNavigation = () => {
    // const { isLogged } = useContext(AuthContext) as { isLogged: boolean };
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(selectAuth);

    useEffect(() => {
      dispatch({ type: 'auth/loginUser' }); // This line might need adjustment based on your action initialization
    }, [dispatch]);
  
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isAuthenticated ? (
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
