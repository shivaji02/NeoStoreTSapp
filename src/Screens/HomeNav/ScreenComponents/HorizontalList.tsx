import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectProducts } from '../../../Redux/slices/productSlice';
import { AppDispatch, RootState } from '../../../Redux/store';
import { addToCart } from '../../../Redux/slices/cartSlice';



const ProductHList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(selectProducts);

  useEffect(() => {
    const categoryId = '1'; // Example category ID
    dispatch(fetchProducts({ categoryId, limit: 10, page: 1 }));
  }, [dispatch]);


  const renderProduct = ({ item }: { item: Products }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.product_images }} style={styles.productImage} />
      <Text style={styles.newBadge}>NEW</Text>
      <TouchableOpacity style={styles.favoriteIcon}>
        <Text>❤️</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(item)}>
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </TouchableOpacity>
      <View style={styles.productDetails}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingStars}>{'★'.repeat(item.rating)}</Text>
        </View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.cost.toFixed(2)}</Text>
      </View>
    </View>
  );

  type Product = {
    id: number;
    quantity: number;}

  const handleAddToCart = (item: Product) => {
    dispatch(addToCart({ productId:item.id, quantity: 1 }));
    console.log('Added to cart:', item.id);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Arrivals</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  productContainer: {
    width: 200,
    height:300,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop:10,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  addToCartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productDetails: {
    marginTop: 10,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    color: '#555',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingStars: {
    // color: '#f8c102',
    color:'black',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default ProductHList;
