import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { placeOrder } from '../../Redux/slices/orderSlice';
import { selectCartItems } from '../../Redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

const OrderScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [newAddress, setNewAddress] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Dummy addresses for demonstration, you should fetch these from your backend or user profile.
  const addresses = useSelector((state: RootState) => state.user.addresses);

  const calculateTotalValue = () => {
    return cartItems.reduce((total, item) => total + item.product.cost * item.quantity, 0).toFixed(2);
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress && !newAddress) {
      Alert.alert('Error', 'Please select or add an address before placing the order.');
      return;
    }

    const addressToUse = selectedAddress || newAddress;
    const orderDetails = {
      address: addressToUse,
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      total: calculateTotalValue(),
    };

    dispatch(placeOrder(orderDetails))
      .then(() => {
        Alert.alert('Success', 'Your order has been placed successfully!');
        navigation.navigate('OrderConfirmationScreen'); // Replace with your order confirmation screen
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to place the order. Please try again.');
      });
  };

  const handleAddAddress = () => {
    if (newAddress) {
      setSelectedAddress(newAddress);
      setModalVisible(false);
    }
  };

  const renderCartItem = ({ item }: { item: any }) => (
    <View style={styles.cartItemContainer}>
      <Text style={styles.productName}>{item.product.name}</Text>
      <Text style={styles.productPrice}>
        ${item.product.cost.toFixed(2)} x {item.quantity} = ${(item.product.cost * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Review Your Order</Text>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.product.id.toString()}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.totalValueText}>Total: ${calculateTotalValue()}</Text>
          </View>
        )}
      />

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Select Address:</Text>
        <TouchableOpacity
          style={styles.selectAddressButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.selectAddressButtonText}>
            {selectedAddress || 'Select or Add New Address'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Select or Add Address</Text>
            <FlatList
              data={addresses}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.addressOption}
                  onPress={() => {
                    setSelectedAddress(item);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
            <TextInput
              placeholder="Add New Address"
              style={styles.addressInput}
              value={newAddress}
              onChangeText={setNewAddress}
            />
            <TouchableOpacity style={styles.addAddressButton} onPress={handleAddAddress}>
              <Text style={styles.addAddressButtonText}>Add Address</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cartItemContainer: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#555',
  },
  totalValueText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 16,
  },
  addressContainer: {
    marginVertical: 16,
  },
  addressLabel: {
    fontSize: 16,
    marginBottom: 8,
  },
  selectAddressButton: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectAddressButtonText: {
    fontSize: 16,
  },
  placeOrderButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addressOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addAddressButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addAddressButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  closeModalButton: {
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default OrderScreen;
