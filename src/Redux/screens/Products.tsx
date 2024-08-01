import React from 'react'
import { Button, Text, View } from 'react-native'
import { useDispatch} from 'react-redux'
import { addToCart } from '../reducers/cartReducer'
import styles from '../styles'


import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../RootStackParamList'; // Import the type definition for RootStackParamList

type ProductScreenProps = {
  route: RouteProp<RootStackParamList, 'Product'>;
};

const ProductScreen: React.FC<ProductScreenProps> = ({ route }) => {
    const {product} = route.params;
    const dispatch = useDispatch();
    return(
        <View style={styles.container}>
        <Text>{product.name}</Text>
        <Text>{product.description}</Text>
        <Text>{product.cost}</Text>
        <Button title = "Add to Cart " onPress={()=>dispatch(addToCart(product))}/>      
        </View>
    );
};

export default ProductScreen;