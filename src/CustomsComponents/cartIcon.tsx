import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemCount, listCartItems } from '../Redux/slices/cartSlice';  // Import cart selector and listCartItems thunk
import AsyncStorage from '@react-native-async-storage/async-storage';
import CartList from '../Screens/Cart/CartList';

const CartIcon: React.FC = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const cartItemCount = useSelector(selectCartItemCount);  // Get cart item count from Redux
    const [accessToken, setAccessToken] = useState<string | null>(null);

    useEffect(() => {
        const loadAccessToken = async () => {
            const token = await AsyncStorage.getItem('access_token');
            setAccessToken(token);
        };
        loadAccessToken();
    }, []);

    const handleCartPress = () => {
        console.log('Cart opened and access_token is', accessToken);
    
        if (accessToken) {
            dispatch(listCartItems());  // Dispatch the listCartItems thunk
        } else {
            console.error('Access token is not available');
        }
    
        navigation.navigate('CartList');
    };
    
    return (
        <TouchableOpacity onPress={handleCartPress}>
            <Image source={require('../Assets.xcassets/Images/cartIcon.png')} style={styles.CIstyle} />
            {cartItemCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{cartItemCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    badge: {
        top: -30,
        right: -15,
        backgroundColor: 'red',
        borderRadius: 50,
        width: 18,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: 'white',
        fontSize: 15,
    },
    CIstyle:{
        marginTop:-5,
        width: 40,
        height: 35,
    }

});

export default CartIcon;
