import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Modal, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/store';
import { placeOrder } from '../../Redux/slices/orderSlice';
import { selectCartItems } from '../../Redux/slices/cartSlice';
import { selectAddress, addAddress, deleteAddress } from '../../Redux/slices/addressSlice';
import { useNavigation } from '@react-navigation/native';
import HeadBack from '../../CustomsComponents/BackWithTitle';
import SubmitButton from '../../CustomsComponents/submitButton';

const AddressConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const addresses = useSelector((state: RootState) => state.address.addressList);
  const selectedAddressId = useSelector((state: RootState) => state.address.selectedAddressId);
  const [newAddress, setNewAddress] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if ((addresses ?? []).length > 0 && !selectedAddressId) {
      dispatch(selectAddress(addresses[0]?.id));
    }
  }, [addresses, selectedAddressId, dispatch]);

  const handleAddressSelect = (addressId: number) => {
    dispatch(selectAddress(addressId));
  };

  const handlePlaceOrder = async () => {
    const selectedAddress = addresses.find((address) => address.id === selectedAddressId);

    if (!selectedAddress) {
      Alert.alert('No Address Selected', 'Please select an address before placing the order.');
      return;
    }

    const orderPayload = {
      addressId: selectedAddress.id,
      items: cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      await dispatch(placeOrder(orderPayload));
      const total = calculateTotalValue();
      navigation.navigate('OrderConfirmation', { address: selectedAddress, orderItems: cartItems, total });
    } catch (error) {
      Alert.alert('Order Failed', 'There was an issue placing your order. Please try again.');
    }
  };

  const handleAddAddress = () => {
    if (newAddress) {
      const addressId = Date.now();
      dispatch(addAddress({ id: addressId, name: newAddress, street: '', city: '', state: '', zip: '', isDefault: false }));
      setSelectedAddress(addressId);
      setModalVisible(false);
    }
  };

  const calculateTotalValue = () => {
    return cartItems.reduce((total, item) => total + item.product.cost * item.quantity, 0).toFixed(2);
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
      <HeadBack title="Review Your Order" showIcon={false} />

      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={(item: CartItem) => item.product.id.toString()}
        ListFooterComponent={() => (
          <View>
            <Text style={styles.totalValueText}>Total: ${calculateTotalValue()}</Text>
          </View>
        )}
      />

      <View style={styles.addressContainer}>
        <Text style={styles.addressLabel}>Select Address:</Text>
        <FlatList
          data={addresses}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.addressItem, item.id === selectedAddressId && styles.selectedAddress]}
              onPress={() => handleAddressSelect(item.id)}
            >
              <Text>{item.name}</Text>
              <Text>{item.street}, {item.city}, {item.state} - {item.zip}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
        <TouchableOpacity
          style={styles.addAddressButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addAddressButtonText}>Add New Address</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Add New Address</Text>
            <TextInput
              placeholder="New Address"
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
  addressItem: {
    padding: 12,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedAddress: {
    borderColor: 'green',
    backgroundColor: '#e6ffe6',
    borderWidth: 2,
  },
  addAddressButton: {
    padding: 12,
    backgroundColor: '#007bff',
    borderRadius: 8,
    alignItems: 'center',
  },
  addAddressButtonText: {
    fontSize: 16,
    color: '#fff',
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
  addressInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  closeModalButton: {
    alignItems: 'center',
  },
  closeModalButtonText: {
    fontSize: 16,
    color: '#007bff',
  },
});

export default AddressConfirmation;
