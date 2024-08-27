import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../Redux/slices/authSlice';
import { useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const CustomDrawer: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  const animation = useRef(new Animated.Value(-width)).current;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Animate the drawer in or out based on isVisible prop
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 0 : -width,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleLogout = () => {
    // Show a confirmation alert before logging out
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => Toast.show({
            type: 'info',
            text1: 'Logout Canceled',
            text2: 'You have canceled the logout operation.',
            position: 'top',
            visibilityTime:1500,  //handle taoast visible time
          }),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: async () => {
            console.log('Logout confirmed, clearing token');
  
            // Clear token from AsyncStorage
            await AsyncStorage.removeItem('access_token');
  
            // Dispatch logout action to clear Redux state
            dispatch(logoutUser());
  
            // Show a toast confirming the logout
            Toast.show({
              type: 'success',
              text1: 'Logged Out',
              text2: 'You have successfully logged out.',
              position: 'top',
              visibilityTime:1500,  //handle taoast visible time
            });
  
            // Navigate to login screen
            navigation.navigate('LoginScreen');

          }
        }
      ],
      { cancelable: true }
    );
  };
  
  return (
    <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: animation }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Image source={require('../../../Assets.xcassets/Images/closeIcon.png')} style={styles.closeIcon} />
      </TouchableOpacity>

      <View style={styles.drawerContent}>
      <TouchableOpacity onPress={() => navigation.navigate('UserDetails')}>
      <Text style={styles.drawerItem}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CartList')}>
          <Text style={styles.drawerItem}>Cart</Text>

        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Text style={styles.drawerItem}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('AddressScreen')}>
          <Text style ={styles.drawerItem} >Manage your Address</Text>
        </TouchableOpacity>
<TouchableOpacity onPress={()=>navigation.navigate('OrderList')}>
          <Text style ={styles.drawerItem} >Order History</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={()=>navigation.navigate('UpdateDetails')}>
          <Text style ={styles.drawerItem} >Update Details</Text>
        </TouchableOpacity> */}
        <TouchableOpacity onPress={()=>navigation.navigate('changePassword')}>
          <Text style ={styles.drawerItem} >Change Password</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: width * 0.8, // 80% width of the screen
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 0 },
    zIndex: 4,
    paddingTop: 40, // Adjust padding for top content
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeIcon: {
    width: 28,
    height: 28,
  },
  drawerContent: {
    padding: 20,
    paddingTop: 60, // Adjust padding to avoid overlap with close button
  },
  drawerItem: {
    marginVertical: 10,
    fontSize: 16,
  },
  logoutContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  logout: {
    fontSize: 16,
    color: 'red',
  },
});

export default CustomDrawer;
