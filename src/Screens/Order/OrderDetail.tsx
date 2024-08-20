import React, { useEffect } from "react";
import { Text, View, StyleSheet, FlatList, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderDetail } from "../../Redux/slices/orderSlice";
import { RootState } from "../../Redux/store";
import HeadBack from "../../CustomsComponents/BackWithTitle";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import SubmitButton from "../../CustomsComponents/submitButton";
const OrderDetail: React.FC = () => {
    const route = useRoute();
    const { orderId } = route.params as { orderId: number };
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // Fetch order detail on component mount
    useEffect(() => {
        dispatch(fetchOrderDetail({ order_id: orderId }));
    }, [dispatch, orderId]);

    const orderDetail = useSelector((state: RootState) => state.order.orderDetail);
    const loading = useSelector((state: RootState) => state.order.loading);

    // Display loading indicator while fetching data
    if (loading) {
        return (
            <View style={styles.Loadcontainer}>
                <ActivityIndicator animating={true} color="#000" size="small" />
                <Text>Loading...</Text>
            </View>
        );
    }

    // If no order details are available, render a fallback message
    if (!orderDetail || !orderDetail.order_details) {
        return (
            <View style={styles.container}>
                <HeadBack title="Order Detail" showIcon={false} />
                <Text>No details available</Text>
            </View>
        );
    }

    console.log("Rendering //orderDetail.tsx log:"); // Debugging log

    // Render the order details if available
    return (
        <View style={styles.container}>
            <HeadBack title="Order Detail" showIcon={false} />
            <View style ={styles.detailhead}>
            <Text style={styles.orderInfo}>
            <Image source={require('../../Assets.xcassets/Images/verified.png')} style={styles.HeadIcon} />
                {orderDetail.id}</Text>
            <Text style={styles.orderInfo}>₹ {orderDetail.cost.toFixed(2)}</Text>
            <Text style={styles.orderInfo}>
                <Image source={require('../../Assets.xcassets/Images/location.png')} style={styles.HeadIcon} />
                 {orderDetail.address}</Text>
            </View>
            {/* FlatList to render all products in the order */}
            <FlatList
                data={orderDetail.order_details}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.productContainer}>
                        <Image source={{ uri: item.prod_image }} style={styles.productImage} />
                        <View style={styles.productDetails}>
                            <Text style={styles.productName}>{item.prod_name}</Text>
                            <Text style={styles.productCategory}>{item.prod_cat_name}</Text>
                            <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
                            <Text style={styles.productTotal}>Total: ₹ {item.total.toFixed(0)}</Text>
                        </View>
                    </View>
                )}
            />
            <SubmitButton
                title="Back to Shopping"
                onPress={() => navigation.navigate("Main")} style={styles.homeButton} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    Loadcontainer:{
        flex: 1,
        justifyContent: "center",
        alignItems:'center',
    },
    orderInfo: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        position: 'relative',
    },
    detailhead: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    HeadIcon:{
        width: 20,
        height: 20,
        marginRight: 5,
    },
    productContainer: {
        flexDirection: "row",
        padding: 10,
        marginBottom: 15,
        backgroundColor: "#f9f9f9",
        borderRadius: 10,
        alignItems: "center",
    },
    productImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
        objectFit: "contain",
    },
    productDetails: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    productCategory: {
        fontSize: 14,
        color: "#666",
    },
    productQuantity: {
        fontSize: 14,
        marginTop: 5,
    },
    productTotal: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: "bold",
    },
    homeButton: {
        marginTop: 20,
        backgroundColor: "#28a745",
    },
});

export default OrderDetail;
