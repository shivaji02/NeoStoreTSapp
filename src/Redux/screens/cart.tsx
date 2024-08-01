import React from 'react'
import { View,Text,Button,FlatList } from 'react-native'
import {  useDispatch,useSelector } from 'react-redux'
import { removeFromCart } from '../reducers/cartReducer'
import { RootState } from '../reducers'
import styles from '../styles'
import { NavigationProp } from '@react-navigation/native';

type CartScreenProps = {
    navigation: NavigationProp<any>;
};

const CartScreen =()=>{
    const cartItems = useSelector((state:RootState)=>state.cart.items);
    const dispatch = useDispatch();
    return(
    <View style={styles.container}>
        <FlatList
            data={cartItems}
            keyExtractor={(item)=>item.id.toString()}
            renderItem={({item})=>(
                <View style={styles.product}>
                    <Text>{item.name}</Text>
                    <Button 
                        title="Remove"
                        onPress={()=>dispatch(removeFromCart(item.id))}
                    />
                </View>
            )}
        />
    </View>
    );
};

export default CartScreen;