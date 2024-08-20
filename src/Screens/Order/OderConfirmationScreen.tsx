import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import SubmitButton from '../../CustomsComponents/submitButton';
import HeadBack from '../../CustomsComponents/BackWithTitle';
const OrderConfirmationScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // Destructure navigation params
  const { orderItems, total, fromCart, address, product } = route.params as {
    orderItems?: any[]; // From CartScreen
    total?: number; // From CartScreen or calculated for individual product
    fromCart: boolean; // Flag to distinguish between cart or product detail
    address: string;
    product?: any; // From ProductDetailScreen
  };

  // If the order is from the cart, render the cart items, otherwise render the individual product
  const renderOrderItems = () => {
    if (fromCart && orderItems) {
      return (
        <FlatList
          data={orderItems}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text style={styles.itemText}>{item.product.name}</Text>
              <Text style={styles.itemText}>
                ${item.product.cost.toFixed(2)} x {item.quantity} = $
                {(item.product.cost * item.quantity).toFixed(2)}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.product.id.toString()}
        />
      );
    }

    // Handle the case when the order is from the product detail screen
    if (product) {
      return (
        <View style={styles.orderItem}>
          <Text style={styles.itemText}>{product.name}</Text>
          <Text style={styles.itemText}>Price: ₹ {product.cost.toFixed(2)}</Text>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {/* <HeadBack title="Order Confirmation" showIcon={false} /> */}
      <Text style={styles.confirmationTitle}>Order Confirmation</Text>

      {renderOrderItems()}

      {/* <Text style={styles.totalText}>Total: ₹ {total !== undefined ? total.toFixed(2) : ''}</Text> */}
      <Text style={styles.addressText}>Shipping to: {address}</Text>
      <Text style={styles.successMessage}>Your order has been placed successfully!</Text>

      <SubmitButton
        title="Go to Home"
        onPress={() => navigation.navigate('Main')}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 16,
  },
  itemText: {
    fontSize: 18,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addressText: {
    fontSize: 18,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    width: '40%',
    justifyContent: 'center',
  },
});

export default OrderConfirmationScreen;
