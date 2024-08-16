import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Address = {
  id: number;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
};

interface AddressState {
  addresses: [];
  selectedAddressId: number | null;
}

const initialState: AddressState = {
  addresses: [],
  selectedAddressId: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    // Add a list of addresses (e.g., fetched from a server)
    setAddresses(state, action: PayloadAction<Address[]>) {
      state.addresses = action.payload;
    },
    // Select an address by its ID
    selectAddress(state, action: PayloadAction<number>) {
      state.selectedAddressId = action.payload;
    },
    // Add a new address to the list and select it as the current address
    addAddress(state, action: PayloadAction<Address>) {
      state.addresses.push(action.payload);
      state.selectedAddressId = action.payload.id;
    },
    // Mark an address as default and deselect others
    setDefaultAddress(state, action: PayloadAction<number>) {
      state.addresses.forEach((addr) => {
        if (addr.id === action.payload) {
          addr.isDefault = true;
          state.selectedAddressId = addr.id;
        } else {
          addr.isDefault = false;
        }
      });
    },
    // Delete an address by its ID
    deleteAddress(state, action: PayloadAction<number>) {
      state.addresses = state.addresses.filter((addr) => addr.id !== action.payload);
      // Optionally update the selected address after deletion if the deleted one was selected
      if (state.selectedAddressId === action.payload) {
        state.selectedAddressId = state.addresses.length > 0 ? state.addresses[0].id : null;
      }
    },
  },
});

export const { setAddresses, selectAddress, addAddress, setDefaultAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
