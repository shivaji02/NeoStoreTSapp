import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemCount } from '../Redux/slices/cartSlice';  // Import cart selector
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartIcon from './cartIcon';
interface HeaderProps {
  title?: string;
  cartItemCount?: number;
  onDrawerPress: () => void;
  onCartPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = 'NeoStore', onDrawerPress, onCartPress }) => {

  const dispatch = useDispatch();
  const accessToken = AsyncStorage.getItem('access_token');
  const cartItemCount = useSelector(selectCartItemCount);  // Get cart item count from Redux

// console.log('access token--',accessToken);
  return (
     <View style={styles.headerContainer}>
      <View style={styles.Drawicon}>
        <TouchableOpacity onPress={onDrawerPress}>
          <Image source={require('../Assets.xcassets/Images/menuIcon.png')} style={styles.Menuicon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
      </View>
      <CartIcon />
      {/* <TouchableOpacity style={styles.cartIcon} onPress={onCartPress}>
        <Image source={require('../Assets.xcassets/Images/cartIcon.png')} style={styles.Carticon} />
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'transparent',
    position: 'static',
    top: 0,
    left: 0,
    right: 0, 
    justifyContent: 'space-evenly',
    gap: 150,
    marginTop:5,
  },
  CartIcon:{
    width: 50,
    height: 28,
  },
  
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 4,
    fontFamily:'Popins-Bold',
  },
  cartIcon: {
    marginLeft: 'auto',
    
  },
  // badge: {
  //   position: 'absolute',
  //   top: -4,
  //   right: -6,
  //   backgroundColor: 'red',
  //   borderRadius: 8,
  //   width: 16,
  //   height: 16,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // badgeText: {
  //   color: 'white',
  //   fontSize: 10,
  //   fontWeight: 'bold',
  // },
  icon: {
    width: 50,
    height: 28,
  },
  Menuicon: {
    width: 50,
    height: 28,
  },
  Drawicon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    
  },
  Carticon: {
    width: 45,
    height: 35,
    marginTop:-5,
    
  },
});

export default Header;
