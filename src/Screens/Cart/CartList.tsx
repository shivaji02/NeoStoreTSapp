import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listCartItems, changeCartQuantity, removeFromCart } from '../../Redux/slices/cartSlice';
import { RootState } from '../../Redux/store';
import HeadBack from '../../CustomsComponents/BackWithTitle';

const CartList: React.FC = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const loading = useSelector((state: RootState) => state.cart.loading);

    useEffect(() => {
        dispatch(listCartItems());
        console.log('cartItems in useEffect:', cartItems);
    }, [dispatch]);

    const handleIncreaseQuantity = (productId: number) => {
        dispatch(changeCartQuantity({ productId, quantity: 1 }));
    };

    const handleDecreaseQuantity = (productId: number, currentQuantity: number) => {
        if (currentQuantity > 1) {
            dispatch(changeCartQuantity({ productId, quantity: -1 }));
        } else {
            dispatch(removeFromCart(productId));
        }
    };

    const renderCartItem = ({ item }: { item: CartItem }) => {
        const productId = item.product.id; // Use product.id as the productId
        return (
            <View style={styles.cartItemContainer}>
                <Image source={{ uri: item.product.product_images }} style={styles.productImage} />
                <View style={styles.productDetails}>
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <Text style={styles.productPrice}>${item.product.cost.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity onPress={() => handleDecreaseQuantity(productId, item.quantity)}>
                            <Text style={styles.quantityControl}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => handleIncreaseQuantity(productId)}>
                            <Text style={styles.quantityControl}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <HeadBack title="Your Cart" showIcon={false} />
            {loading ? (
                <Text style={styles.emptyCartText}>Loading cart...</Text>
            ) : cartItems.length > 0 ? (
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.product.id.toString()} // Use product.id as the key
                />
            ) : (
                <Text style={styles.emptyCartText}>Your cart is empty.</Text>
            )}
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
    },
    cartItemContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        padding: 8,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 2,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    productDetails: {
        flex: 1,
        marginLeft: 16,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#555',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityControl: {
        fontSize: 20,
        padding: 8,
        backgroundColor: '#ddd',
        borderRadius: 8,
        marginHorizontal: 8,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#888',
        textAlign: 'center',
        marginTop: 32,
    },
});

export default CartList;
