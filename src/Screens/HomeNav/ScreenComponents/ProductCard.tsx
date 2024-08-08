import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface ProductListView {
  height: number;
  image: ImageSourcePropType;
  bigText: string;
  underlinedText: string;
  onPress: () => void;
}

const ProductListView: React.FC<ProductListView> = ({ height, image, bigText, underlinedText, onPress }) => {
  return (
    <TouchableOpacity style={[styles.container, { height }]} onPress={onPress}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.bigText}>{bigText}</Text>
      <Text style={styles.underlinedText}>{underlinedText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  bigText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  underlinedText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default ProductListView;
