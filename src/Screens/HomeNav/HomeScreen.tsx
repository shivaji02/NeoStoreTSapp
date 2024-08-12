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
import ProductList from '../Product/ProductList';


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

  const handleCategorySelect = (categoryId: string) => {
    console.log('Category Selected: ', categoryId);
    navigation.navigate('ProductList', { categoryId });
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
        <Text style={styles.title}>Shop Category</Text>
      
      <ProductListView 
        image={require('../../Assets.xcassets/Images/category/table.png')}
        bigText="Tables"
        underlinedText="Shop Now"
        onPress={() => handleCategorySelect('1')}
      />
        <ProductListView 
        image={require('../../Assets.xcassets/Images/category/chair.png')}
        bigText=" chairs"
        underlinedText="Shop Now"
        onPress={() => handleCategorySelect('2')}
      />
        <ProductListView 
        image={require('../../Assets.xcassets/Images/category/sofas.png')}
        bigText="Sofas"
        underlinedText="Shop Now"
        onPress={() => handleCategorySelect('3')}
      />
      
      <ProductListView 
        image={require('../../Assets.xcassets/Images/category/cupboard.jpg')}
        bigText="cupboards"
        underlinedText="Shop Now"
        onPress={() => handleCategorySelect('4')}
      />


        <ProductVList/>
      </ScrollView>
    </View>
  );
};


export default HomeScreen;
