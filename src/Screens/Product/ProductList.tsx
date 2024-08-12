import React, { useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, Image, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts, selectProductLoading, selectProductError } from "../../Redux/slices/productSlice";
import { useNavigation, useRoute } from '@react-navigation/native';
import HeadBack from "../../CustomsComponents/BackWithTitle";

interface Product {
    id: number;
    name: string;
    cost: number;
    product_images: string;
    rating: number;
}

const ProductList: React.FC = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { categoryId } = route.params as { categoryId: number } || {}; // Get categoryId from route params

    const products = useSelector(selectProducts);
    const loading = useSelector(selectProductLoading);
    const error = useSelector(selectProductError);

    useEffect(() => {
        if (categoryId) {
            dispatch(fetchProducts({ categoryId, limit: 10, page: 1 }));
        }
    }, [dispatch, categoryId]);

    if (!categoryId) {
        return (
            <View style={styles.Vcontainer}>
                <Text style={styles.title}>Products</Text>
                <Text style={styles.error}>Error in Fetching UI ID.</Text>
            </View>
        );
    }

    const renderProduct = ({ item }: { item: Product }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product_id: item.id })} style={styles.cardWrapper}>
                <View style={styles.card}>
                    <Image source={{ uri: item.product_images }} style={styles.image} />
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>Rs. {item.cost}</Text>
                    <Text style={styles.productRating}>Rating: {item.rating}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.Vcontainer}>
            <HeadBack title="Products" />
            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <FlatList
                    data={products.products}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2} // Ensure 2 columns for uniform grid layout
                    contentContainerStyle={styles.productVlist}
                    columnWrapperStyle={styles.row} // Add this to adjust spacing between columns
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

// Updated styles for better uniformity
const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2; // Adjust width for two columns with padding

const styles = StyleSheet.create({
    Vcontainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F8F8F8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    productVlist: {
        paddingBottom: 20,
    },
    row: {
        justifyContent: 'space-between',
    },
    error: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    cardWrapper: {
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        width: cardWidth,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 14,
        color: '#FE4040',
        marginBottom: 5,
        textAlign: 'center',
    },
    productRating: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
});

export default ProductList;
