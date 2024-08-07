import React,{useEffect} from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../../../Redux/slices/productSlice";
import ProductCard from "../../../CustomsComponents/ProductCard";
import styles from "../../../../styles";
import { AppDispatch, RootState } from "../../../Redux/store";

interface Product{
    id: number;
    name: string;
    cost: number;
    product_images: string;
    rating: number;
}
const ProductVList: React.FC = () => {
    const dispatch = useDispatch();
    const {products,loading,error} = useSelector(selectProducts);

    useEffect(() => {
        const categoryId = '1'; // Example category ID
        dispatch(fetchProducts({ categoryId, limit: 10, page: 1 }));
      }, [dispatch]);
const renderProduct = ({item}: {item: Product}) => <ProductCard item ={item}/>;

return (
    <View style={styles.Vcontainer}>
        <Text style={styles.title} >Best Seller</Text>
        {loading ?(
            <ActivityIndicator size = "large" color = "#000"/>
    ) : error ?(
        <Text style = {styles.error}>{error}</Text>
    ):(
        <FlatList scrollEnabled={false}
            data ={products}
            renderItem={renderProduct}
            keyExtractor={((item)=>item.id.toString())}
            numColumns={2}
            contentContainerStyle={styles.productVlist}
            showsVerticalScrollIndicator={false}
            />
    )}
    </View>
);


};
export default ProductVList;