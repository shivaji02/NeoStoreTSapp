import React, { Dispatch, useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchProductDetails, selectProductDetails, selectProductLoading, selectProductError, productRating } from "../../Redux/slices/productSlice";
import HeadBack from "../../CustomsComponents/BackWithTitle";
import { addToCart } from "../../Redux/slices/cartSlice";
import SubmitButton from "../../CustomsComponents/submitButton";
import { ScrollView } from "react-native-gesture-handler";
import { UnknownAction } from "redux";
const ProductDetail: React.FC = () => {
    const dispatch = useDispatch<Dispatch<UnknownAction>>();
    const route = useRoute();
    const { product_id } = route.params as { product_id: string };
    const navigation = useNavigation();

    const productDetails = useSelector(selectProductDetails);
    const loading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    useEffect(() => {
        if (product_id) {
            dispatch(fetchProductDetails({ product_id }));
        }
    }, [dispatch, product_id]);

    const handleRatingPress = (rating: number) => {
        setSelectedRating(rating);
        dispatch(productRating({ product_id, rating }));
    };

    const handlecart = () => {
        dispatch(addToCart({ productId: product_id, quantity: 1 }));
        console.log('Product added to cart', product_id);
    };
    const handlePlacingOrder = () => {
        console.log("Order Place Button Clicked");
        navigation.navigate('AddressConfirmation');
    }

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
                <HeadBack title="Product Details"  showIcon={false}/>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Product details not available</Text>
                </View>
            </>
        );
    }

    const { name, cost, description, product_images, rating, producer, view_count } = productDetails;

    return (
        <View style={styles.container}>
            <HeadBack title="Product Details"   />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {product_images && product_images.length > 0 && (
                    <Image source={{ uri: product_images[0].image }} style={styles.image} />
                )}
                <Text style={styles.productName}>{name}</Text>
                <Text style={styles.productPrice}>Rs. {cost}</Text>
                <Text style={styles.productDescription}>{description}</Text>
                <Text style={styles.productRating}>Tap on the Star You would like to rate </Text>
                {/* <Text style={styles.productRating}>Current Rating: {rating}</Text> */}
                <View style={styles.ratingContainer}>

                    {Array(5).fill(0).map((_, index) => (
                        <TouchableOpacity key={index} onPress={() => handleRatingPress(index + 1)}>
                            <Text style={[styles.productRatingStar, { color: (selectedRating !== null ? selectedRating : rating) > index ? '#FFD700' : '#888' }]}>
                                ⭐️
                            </Text>

                        </TouchableOpacity>
                    ))
                    }

                </View>
                <TextInput style={styles.ratingInput} placeholder="Enter your rating" keyboardType="numeric" />

                <Text style={styles.productProducer}>Produced by: {producer}</Text>
                <Text style={styles.productViewCount}>Views: {view_count}</Text>
                {/* <TouchableOpacity style={styles.button} onPress={handlecart}>
                    <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity> */}
                <View style={styles.buttonContainer}>

                <SubmitButton title="Add to Cart" onPress={handlecart} style={styles.button}/>
                <SubmitButton title="Buy now" onPress={handlePlacingOrder} style={styles.button} />
                
            </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,    
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
        fontFamily: 'sans-serif',
    },
    ratingInput: {
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    productRating: {
        marginRight: 5,
        fontSize: 10,
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
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ProductDetail;
