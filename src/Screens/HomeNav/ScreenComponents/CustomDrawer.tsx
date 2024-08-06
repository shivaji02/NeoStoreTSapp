import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

const CustomDrawer: React.FC<{ isVisible: boolean; onClose: () => void }> = ({ isVisible, onClose }) => {
  const animation = useRef(new Animated.Value(-width)).current;

  // Animate the drawer in or out based on isVisible prop
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: isVisible ? 0 : -width,
      duration: 300,
      useNativeDriver: true,
    }).start();
    const token = AsyncStorage.getItem('token');
    console.log(token);
  }, [isVisible]);
  

  const handleLogout = () => {
    console.log('Logout------');


  } 

  return (
    <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: animation }] }]}>
     
      <TouchableOpacity onPress={onClose}>
        <Image source={require('../../../Assets.xcassets/Images/closeIcon.png')} style={styles.closeIcon} />
      </TouchableOpacity>

      <View style={styles.drawerContent}>
        <Text style={styles.drawerItem}>My Account</Text>
        <Text style={styles.drawerItem}>Cart</Text>
        <Text style={styles.drawerItem}>Notifications</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onClose}>
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
    },
    
    drawerContent: {
        padding: 20,
    },
    drawerItem: {
        marginVertical: 10,
        fontSize: 16,
    },
    logout:{
        position: 'absolute',
        bottom : -500,
        left: 120,
    },
    closeIcon: {
        width: 50,
        height: 28,
        padding: 16,
        fontSize: 18,
        backgroundColor: '#f2f2f2',
        alignContent:'flex-end',
        position: 'absolute',
        top: 16,
        right: 16,
    },
});

export default CustomDrawer;
