import { createDrawerNavigator } from '@react-navigation/drawer';
import Feed from './Feed';
import ShoppingHistory from './ShoppingHistory';
import UserDetails from './UserDetails';
import Favourites from './Favourites';
import DMainScreen from './DMainScreen';

const Drawer = createDrawerNavigator();

const DrawerList=()=> {
  return (
    <Drawer.Navigator initialRouteName='DrawerHomeScreen' >
      <Drawer.Screen name="DrawerHomeScreen" component={DMainScreen}  />,
      
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Shopping" component={ShoppingHistory} />
      <Drawer.Screen name="Favourites" component={Favourites} />
      <Drawer.Screen name="MyAccount" component={UserDetails} />
    </Drawer.Navigator>
  );
}

export default DrawerList;