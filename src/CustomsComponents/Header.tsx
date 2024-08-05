import React from 'react';
import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title?: string;
  cartItemCount?: number;
  onDrawerPress: () => void;
  onCartPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ title = 'NeoStore', cartItemCount = 0, onDrawerPress, onCartPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.Drawicon}>
      <TouchableOpacity onPress={onDrawerPress}>
        <Image source={require('../Assets.xcassets/Images/menuIcon.png')} style={styles.Menuicon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.cartIcon} onPress={onCartPress}>
        <Image source={require('../Assets.xcassets/Images/cartIcon.png')} style={styles.Carticon} />
        {cartItemCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartItemCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    padding: 16,
    // backgroundColor: 'transparent',
    // backgroundColor: 'rgba(255, 171, 0, 0.64)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
  },
  Drawicon: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: 'red',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  icon: {
    width: 50,
    height: 28,
  },
  Menuicon: {
    width: 50,
    height: 28,
  },
  Carticon: {
    width: 50,
    height: 36,
    marginRight:-5,
  },
});

export default Header;
