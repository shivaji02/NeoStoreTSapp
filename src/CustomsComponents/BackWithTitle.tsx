import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HeadBack = ({ title, showIcon }: { title: string, showIcon: boolean }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Image source={require('../Assets.xcassets/Images/backIcon.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {showIcon && (
        <TouchableOpacity onPress={() => console.log('Touchable Icon Pressed')} style={styles.iconButton}>
          <Image source={require('../Assets.xcassets/Images/cartIcon.png')} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 50,
  },
  backButton: {
    padding: 10,
    alignItems: 'flex-start',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 10,
    alignItems: 'flex-end',
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default HeadBack;