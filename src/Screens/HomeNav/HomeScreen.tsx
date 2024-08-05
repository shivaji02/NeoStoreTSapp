import React, { Component } from 'react'
import styles from '../../../styles';
import { Text,View, StyleSheet, Image, ScrollView } from 'react-native';
import CustomButton from '../../CustomsComponents/customButton';
import Header from '../../CustomsComponents/Header';
// import DrawerList from '../DrawerNav/DrawerList';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import DrawerList from '../DrawerNav/DrawerList';
// import { Navigation } from 'react-native-navigation'; // Import the Navigation module

const HomeScreen: React.FC<{ComponentId:string}> = () => {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    console.log('Button Pressed');
  };
  const handleDrawerPress = () => {
    console.log('Drawer opened');
    //@ts-ignore
    navigation.openDrawer(DrawerList);
      };

  const handleCartPress = () => {
    console.log('Cart opened');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header 
        onDrawerPress={handleDrawerPress}
        onCartPress={handleCartPress}
        cartItemCount={0}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Feel All</Text>
        <Text style={styles.subheading}>New 
          <Text style={styles.colourheading}> Amazing</Text> </Text>
        <Text style={styles.heading}>Furniture</Text>
        <Text style={styles.description}>Redefining simplicity and comfort </Text>

        <Image
          source={ require('../../Assets.xcassets/Images/couch1.png') }
          style={styles.image}
          resizeMode="cover"
        />
        <CustomButton
          text="Explore Now"
          onPress={handleButtonPress}
          height={60}
          width={240}
          backgroundColor="black"
          textColor="white"
        />
      </View>

    </ScrollView>
  );
};

export default HomeScreen;