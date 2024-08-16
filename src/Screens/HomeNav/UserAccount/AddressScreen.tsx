import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAddress, selectAddress, deleteAddress } from '../../../Redux/slices/addressSlice'; // Adjust the import path
import HeadBack from '../../../CustomsComponents/BackWithTitle';
import { Swipeable } from 'react-native-gesture-handler';

const AddressScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  const dispatch = useDispatch();
  const addressList = useSelector((state) => state.address.addressList); // Access addressList from state

  const handleAddAddress = () => {
    if (name && address && zipCode) {
      dispatch(addAddress({ id: Date.now(), name, address, zipCode, isDefault: false }));
      setName('');
      setAddress('');
      setZipCode('');
      navigation.goBack(); // Ensure navigation happens after address is added
    } else {
      Alert.alert('Please fill in all fields');
    }
  };
  
  const handleDeleteAddress = (id) => {
    dispatch(deleteAddress(id));
  };

  const renderRightActions = (id) => (
    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAddress(id)}>
      <Text style={styles.deleteButtonText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeadBack />
      <Text style={styles.header}>Add New Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Zip Code"
        value={zipCode}
        onChangeText={setZipCode}
        keyboardType="number-pad"
      />
      <Button title="Save Address" onPress={handleAddAddress} />

      <Text style={styles.header}>Saved Addresses</Text>
      <FlatList
        data={addressList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <TouchableOpacity onPress={() => dispatch(selectAddress(item))}>
              <View style={styles.addressItem}>
                <Text>{item.name}</Text>
                <Text>{item.address}</Text>
                <Text>{item.zipCode}</Text>
              </View>
            </TouchableOpacity>
          </Swipeable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addressItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddressScreen;
