import React from 'react';
import react from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Product{
    id: number;
    name: string;
    cost: number;
    product_images: string;
    rating: number;
}

const ProductCard: React.FC<{item: Product}> = ({item}) => {
    return(
        <View style = {styles.card}>
            <Image source = {{uri: item.product_images}} style = {styles.productImage}/>
            {/* <Text style = {styles.newBadge}>NEW</Text> */}
            
                <Image source={require('../Assets.xcassets/Images/graphIcon.png')} style={styles.graphIcon} />

                        <View style={styles.productDetails}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.ratingStars}>{'★'.repeat(item.rating)}</Text>
                    </View>
                <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.productPrice}>${item.cost.toFixed(2)}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        width:170,
        margin:8,
        backgroundColor:'white',
        borderRadius:3,
        shadowColor:'#grey',
        shadowOpacity:0.1,
        shadowOffset:{width:0,height:0},
        shadowRadius:10,
        elevation:5,
    },
    productImage:{
        width:170,
        height:160,
        borderTopLeftRadius:8,
        borderTopRightRadius:8,
        // resizeMode:'cover',
        objectFit:'contain',
    },
    graphIcon:{
        position:'absolute',
        top:8,
        right:8,
        height:20,
        width:20,
        color:'red',
        paddingVertical:2,
        paddingHorizontal:6,
        fontWeight:'bold',
    },
    productDetails:{
        padding:8,
    },
    ratingContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginBottom:4,
    },
    ratingStars:{
        fontSize:14,
    },
    productName:{
        fontWeight:'bold',
        marginBottom:4,
        fontSize:14,
    },
    productPrice:{
        color:'#555',
        // color:'#333',
        fontSize:14,
    },

});

export default ProductCard;