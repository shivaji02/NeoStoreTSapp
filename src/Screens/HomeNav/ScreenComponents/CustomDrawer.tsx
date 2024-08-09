import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../Redux/slices/authSlice';
import { useRoute } from '@react-navigation/native';
const { width } = Dimensions.get('window');
const CustomDrawer: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  const animation = useRef(new Animated.Value(-width)).current;
  const navigation = useNavigation();
const dispatch = useDispatch();
  // Animate the drawer in or out based on isVisible prop
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isVisible]);

  const handleLogout = async () => {
    console.log('Logout------cearning token',access_token);
    dispatch(logoutUser());
    const route = useRoute();
    const payload = (route.params as { payload?: any })?.payload;
    // Now you can use the payload in your component
    navigation.navigate('LogInScreen');
  };


  return (
    <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: animation }] }]}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Image source={require('../../../Assets.xcassets/Images/closeIcon.png')} style={styles.closeIcon} />
      </TouchableOpacity>

      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={() => navigation.navigate('MyAccount')}>
          <Text style={styles.drawerItem}>My Account</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.drawerItem}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.drawerItem}>Notifications</Text>
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
