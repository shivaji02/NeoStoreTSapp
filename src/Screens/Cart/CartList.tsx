import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems, listCartItems, changeCartQuantity } from '../../Redux/slices/cartSlice';
import { RootState } from '../../Redux/store';
import HeadBack from '../../CustomsComponents/BackWithTitle';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';

const CartList: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const loading = useSelector((state: RootState) => state.cart.loading);
  const [selectedQuantities, setSelectedQuantities] = useState<{ [key: number]: number }>({});

  useEffect(() => {
    dispatch(listCartItems());
  }, [dispatch]);

  useEffect(() => {
    const quantities = cartItems.reduce((acc, item) => {
      if (item.product) {
        acc[item.product.id] = item.quantity;
      }
      return acc;
    }, {} as { [key: number]: number });
    setSelectedQuantities(quantities);
  }, [cartItems]);

  const handleQuantityChange = async (productId: number, quantity: number) => {
    setSelectedQuantities(prev => ({ ...prev, [productId]: quantity }));
    await dispatch(changeCartQuantity({ productId, quantity }));
    dispatch(listCartItems()); // Ensure the cart items are reloaded after quantity change
  };

  const calculateTotalValue = () => {
    return cartItems.reduce((total, item) => {
      if (item.product && selectedQuantities[item.product.id] !== undefined) {
        return total + item.product.cost * selectedQuantities[item.product.id];
      }
      return total;
    }, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    console.log('Order Placed:', cartItems);
    // Alert.alert('Order Placed', 'Your order has been placed successfully!');
    navigation.navigate('OrderScreen'); // Replace 'OrderScreen' with the correct screen name
  };

  const renderCartItem = ({ item }: { item: any }) => {
    if (!item || !item.product) {
      return (
        <View style={styles.cartItemContainer}>
          <Text style={styles.emptyCartText}>Product details not available.</Text>
        </View>
      );
    }

    const productId = item.product.id;

    return (
      <View style={styles.cartItemContainer}>
        <Image source={{ uri: item.product.product_images }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{item.product.name}</Text>
          <Text style={styles.productPrice}>
            ${(item.product.cost * (selectedQuantities[productId] || item.quantity)).toFixed(2)}
          </Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={(value) => handleQuantityChange(productId, value)}
              value={selectedQuantities[productId] || item.quantity}
              items={Array.from({ length: 10 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }))}
              style={{
                inputIOS: styles.quantityPickerIOS,
                inputAndroid: styles.quantityPickerAndroid,
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <HeadBack title="Your Cart" showIcon={false} />
      {loading ? (
        <Text style={styles.emptyCartText}>Loading cart...</Text>
      ) : cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.product?.id?.toString() || Math.random().toString()}
          />
          <Text style={styles.totalValueText}>Total: ${calculateTotalValue()}</Text>
          <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
            <Text style={styles.placeOrderButtonText}>Order Now</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  cartItemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  quantityPickerIOS: {
    width: 40, // Constrain to product width
    paddingVertical: 10,
    borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30,
  },
  quantityPickerAndroid: {
    width: 100,
    height: 50,
    color: 'black',
  },
  totalValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 10,
  },
  placeOrderButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  placeOrderButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
  },
});

export default CartList;
