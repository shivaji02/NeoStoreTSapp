import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

type OrderConfirmationRouteProp = RouteProp<{ params: { address: any; orderItems: any[]; total: number } }, 'params'>;

const OrderConfirmationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<OrderConfirmationRouteProp>();
  const { address, orderItems, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Confirmed!</Text>

      <Text style={styles.subtitle}>Delivery Address</Text>
      <Text style={styles.addressText}>{address.fullAddress}</Text>

      <Text style={styles.subtitle}>Order Details</Text>
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.product.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.product.name}</Text>
            <Text>Quantity: {item.quantity}</Text>
            <Text>Total: ${item.product.cost.toFixed(2) * item.quantity}</Text>
          </View>
        )}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('HomeScreen')}>
        <Text style={styles.continueShoppingButtonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#000',
  },
  productItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  totalContainer: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  continueShoppingButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 32,
  },
  continueShoppingButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default OrderConfirmationScreen;
