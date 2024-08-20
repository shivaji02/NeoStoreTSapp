import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { placeOrder } from '../../Redux/slices/orderSlice';
import { selectCartItems } from '../../Redux/slices/cartSlice';
import { useNavigation } from '@react-navigation/native';
import HeadBack from '../../CustomsComponents/BackWithTitle';
import SubmitButton from '../../CustomsComponents/submitButton';

const OrderScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems); // Use the cart items for placing an order
  const [address, setAddress] = useState<string>(''); // Address input
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Modal visibility

  // Calculate the total value of the cart items
  const calculateTotalValue = () => {
    return cartItems.reduce((total, item) => total + item.product.cost * item.quantity, 0).toFixed(2);
  };

  // Dispatch the placeOrder thunk with the entered address
  const handlePlaceOrder = async () => {
    if (!address) {
      Alert.alert('No Address Provided', 'Please enter an address before placing the order.');
      return;
      // setModalVisible(false)
    }

    const orderPayload = {
      address,
    };

    try {
      await dispatch(placeOrder(orderPayload)); // Dispatch the order
      const total = calculateTotalValue();
      navigation.navigate('OrderConfirmationScreen', { address, orderItems: cartItems, total }); // Navigate to confirmation screen
    } catch (error) {
      Alert.alert('Order Failed', 'There was an issue placing your order. Please try again.');
    }
  };

  // Render the cart items
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
      <HeadBack title="Review Your Order" showIcon={false} />
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

      {/* Button to open modal for entering address */}
      <TouchableOpacity style={styles.placeOrderButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      {/* Address input modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Enter Your Address</Text>
            <TextInput
              placeholder="Enter Address"
              style={styles.addressInput}
              value={address}
              onChangeText={setAddress}
            />

            <View style={styles.modalbuttonContainer}>
              <SubmitButton title="Confirm Address" onPress={handlePlaceOrder} style={styles.ConfirmmodalButton} />
              <SubmitButton title="Close" onPress={() => setModalVisible(false)} style={styles.ClosemodalButton} />
            </View>
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
  modalbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ClosemodalButton: {
    backgroundColor: 'tomato',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    width: '40%',
  },
  ConfirmmodalButton: {
    backgroundColor: '#28a745',
    padding: 4,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    justifyContent: 'center'
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  closeModalButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default OrderScreen;
