import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchProductDetails, selectProductDetails, selectProductLoading, selectProductError } from "../../Redux/slices/productSlice";
import HeadBack from "../../CustomsComponents/BackWithTitle";

interface ProductDetailProps {
    id: number;
    name: string;
    cost: number;
    description: string;
    product_images: {
        id: number;
        product_id: number;
        image: string;
    }[];
    rating: number;
    producer: string;
    view_count: number;
    created: string;
    modified: string;
}

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { product_id } = route.params as { product_id: string };

    const productDetails = useSelector(selectProductDetails);
    const loading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);
    console.log("ProductId in detailscreen",product_id);
    useEffect(() => {
        if (product_id) {
            console.log("Product_Id in detailscreen before dispatch",product_id);
            dispatch(fetchProductDetails({ product_id }));
        }
    }, [dispatch, product_id]);

    if (loading) {
        return <ActivityIndicator size="large" color="#000" />;
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
                <HeadBack title="Product Details" />
    
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>Product details not available</Text>
                </View>
            </>
        );
    }

    const { name, cost, description, product_images, rating, producer, view_count } = productDetails;

    return (
        <View style={{ flex: 1 }}>
            <HeadBack title="Product Details" />
            {product_images && product_images.length > 0 && (
                <Image source={{ uri: product_images[0].image }} style={styles.image} />
            )}
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productPrice}>Rs. {cost}</Text>
            <Text style={styles.productDescription}>{description}</Text>
            <Text style={styles.productRating}>Rating: {Array(rating).fill('⭐️').join('')}</Text>
            <Text style={styles.productProducer}>Produced by: {producer}</Text>
            <Text style={styles.productViewCount}>Views: {view_count}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
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
    },
    productRating: {
        fontSize: 16,
        color: '#888',
    },
    productProducer: {
        fontSize: 16,
        color: '#888',
    },
    productViewCount: {
        fontSize: 16,
        color: '#888',
    },
});

export default ProductDetail;
