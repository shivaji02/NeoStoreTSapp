import React, { useRef } from 'react';
import { StyleSheet, View, Animated, Image } from 'react-native';
import { Text } from 'react-native-paper';

const images = [
  'https://www.worldfurnitureonline.com/wp-content/uploads/2021/10/World-Furniture-Online_39.jpg',
  'https://www.worldfurnitureonline.com/wp-content/uploads/2022/09/wfo-report_0009-1024x683.jpg',
  'https://www.worldfurnitureonline.com/wp-content/uploads/2021/10/World-Furniture-Online_39.jpg',
  'https://www.worldfurnitureonline.com/wp-content/uploads/2022/09/wfo-report_0009-1024x683.jpg',
];

const Carousel = () => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item }: { item: string }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      />
      <Text style={styles.title}>Carousel</Text>
    </View>
  );
};

export default Carousel;

// styles.js (for reference, ensure you have these styles defined)
const styles = StyleSheet.create({
  carouselItem: {
    width: 400, // set width to 100% to occupy the full width of the screen
    height: 200, // or any height suitable for your layout
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%', // set width to 100% to occupy the full width of the carousel item
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});


//https://www.worldfurnitureonline.com/report/the-upholstered-furniture-market-in-india/