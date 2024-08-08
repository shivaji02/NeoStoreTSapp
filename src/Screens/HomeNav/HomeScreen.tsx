import styles from '../../../styles';
import React, { useState } from 'react';
import { View, Text, ScrollView, Image, Animated, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../../CustomsComponents/customButton';
import Header from '../../CustomsComponents/Header';
import CustomDrawer from '../HomeNav/ScreenComponents/CustomDrawer';
import { selectCartItemCount } from '../../Redux/slices/cartSlice';
import ProductListView from './ScreenComponents/ProductCard';
import ProductHList from './ScreenComponents/HorizontalList';
import ProductVList from './ScreenComponents/VerticalList';

const HomeScreen: React.FC<{ ComponentId: string }> = () => {
  const navigation = useNavigation();
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const av = new Animated.Value(0);
  av.addListener(() => { return });

  const cartItemCount = useSelector(selectCartItemCount);

  const handleButtonPress = () => {
    console.log('Button Pressed');
  };
  
  const handleDrawerPress = () => {
    console.log('Drawer opened');
    setDrawerVisible(!isDrawerVisible);
  };

  const handleCartPress = () => {
    console.log('Cart opened');
  };

  return (
    <View style={styles.container}>
      <Header 
        onDrawerPress={handleDrawerPress}
        onCartPress={handleCartPress}
        cartItemCount={cartItemCount}
      />
      <CustomDrawer isVisible={isDrawerVisible} onClose={() => setDrawerVisible(false)} />

      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Feel All</Text>
          <Text style={styles.subheading}>New 
            <Text style={styles.colourheading}> Amazing</Text>
          </Text>
          <Text style={styles.heading}>Furniture</Text>
          <Text style={styles.description}>Redefining simplicity and comfort</Text>

          <Image
            source={require('../../Assets.xcassets/Images/couch1.png')}
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
        <ProductHList />
        <Text style={styles.title}>Shop Collection</Text>
        <ProductListView 
          height={500}
          image={require('../../Assets.xcassets/Images/gaintchair.png')}
          bigText="king chair"
          underlinedText="Shop Now"
          onPress={() => console.log('Android king Pressed')}
        />
        <ProductListView 
          height={300}
          image={require('../../Assets.xcassets/Images/studiochair.png')}
          bigText="studio chair"
          underlinedText="Shop Now"
          onPress={() => console.log('Couch Pressed')}
        />
        <ProductListView 
          height={300}
          image={require('../../Assets.xcassets/Images/beanchair.png')}
          bigText="Bean Chair"
          underlinedText="Shop Now"
          onPress={() => console.log('Couch Pressed')}
        />
        <ProductVList/>
      </ScrollView>
    </View>
  );
};


export default HomeScreen;
