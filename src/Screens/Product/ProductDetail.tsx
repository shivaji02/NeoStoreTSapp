import React, { Dispatch, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput, Modal, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchProductDetails, selectProductDetails, selectProductLoading, selectProductError, productRating } from "../../Redux/slices/productSlice";
import { placeOrder } from "../../Redux/slices/orderSlice"; // Import the placeOrder thunk
import HeadBack from "../../CustomsComponents/BackWithTitle";
import SubmitButton from "../../CustomsComponents/submitButton";
import { ScrollView } from "react-native-gesture-handler";
import { UnknownAction } from "redux";
import { addToCart } from "../../Redux/slices/cartSlice";

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch<Dispatch<UnknownAction>>();
    const route = useRoute();
    const { product_id } = route.params as { product_id: string };
    const navigation = useNavigation();

    const productDetails = useSelector(selectProductDetails);
    const loading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [address, setAddress] = useState<string>(''); // State to capture the address

    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductDetails({ product_id }));
        }
    }, [dispatch, product_id]);

    const handleRatingPress = (rating: number) => {
        setSelectedRating(rating);
        dispatch(productRating({ product_id, rating }));
    };

    const handlecart = async() => {
    
       await dispatch(addToCart({ productId: product_id, quantity: 1 }));
    
        navigation.navigate('CartList');
        console.log('Product added to cart', product_id);
    };

    const handlePlacingOrder = async () => {
        // Ensure the address is entered before proceeding
        if (!address) {
            Alert.alert('No Address Provided', 'Please enter an address before placing the order.');
            return;
        }

        const orderPayload = {
            address,
        };

        try {
            await dispatch(placeOrder(orderPayload)); // Dispatch the order
            navigation.navigate('OrderConfirmationScreen', { address, product: productDetails, total: productDetails.cost });
        } catch (error) {
            Alert.alert('Order Failed', 'There was an issue placing your order. Please try again.');
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Error fetching product details: {error}</Text>
            </View>
        );
    }

    if (!productDetails) {
        return (
            <>
                <HeadBack title="Product Details" showIcon={false} />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>action updated productdetails.tsx</Text>
                </View>
            </>
        );
    }

    const { name, cost, description, product_images, rating, producer, view_count } = productDetails;

    return (
        <View style={styles.container}>
            <HeadBack title="Product Details" />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {product_images && product_images.length > 0 && (
                    <Image source={{ uri: product_images[0].image }} style={styles.image} />
                )}
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productPrice}>₹ {cost}</Text>
                <Text style={styles.productDescription}>{description}</Text>
                <Text style={styles.productRating}>Tap on the Star You would like to rate</Text>

                <View style={styles.ratingContainer}>
                    {Array(5).fill(0).map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1)}>
                            <Text style={[styles.productRatingStar, { color: (selectedRating !== null ? selectedRating : rating) > index ? '#FFD700' : '#888' }]}>
                                ⭐️
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.productProducer}>Produced by: {producer}</Text>
                <Text style={styles.productViewCount}>Views: {view_count}</Text>

                <View style={styles.buttonContainer}>
                    <SubmitButton title="Add to Cart" onPress={handlecart} style={styles.button} />
                    <SubmitButton title="Buy now" onPress={() => setModalVisible(true)} style={styles.button} />
                </View>
            </ScrollView>

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
                        <SubmitButton title="Confirm Address" onPress={handlePlacingOrder} style={styles.ConfirmmodalButton} />
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
        padding: 10,
        backgroundColor: '#F8F8F8',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 10,
        marginBottom: 10,
    },
    modalbuttonContainer:{
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
      justifyContent:'center'
  },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 20,
        color: '#FE4040',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 16,
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productRatingStar: {
        fontSize: 30,
    },
    productProducer: {
        fontSize: 16,
        color: '#888',
        marginBottom: 5,
    },
    productViewCount: {
        fontSize: 16,
        color: '#888',
        marginBottom: 10,
    },
    buttonContainer: {
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    button: {
        backgroundColor: '#FE4040',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%',
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
        borderColor: 'black',
        padding: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    closeModalButton: {
        alignItems: 'center',
        color: 'green',
        
    },
    closeModalButtonText: {
        fontSize: 16,
        color: 'red',
    },
});

export default ProductDetail;
