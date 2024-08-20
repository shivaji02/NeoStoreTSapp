import React, { useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SubmitButton from "../../CustomsComponents/submitButton";
import HeadBack from "../../CustomsComponents/BackWithTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList, selectOrders, selectOrderLoading } from "../../Redux/slices/orderSlice";

interface Order {
    id: number;
    product: {
        name: string;
        cost: number;
    };
    quantity: number;
}

const OrderList: React.FC<{}> = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const orders = useSelector(selectOrders);  // Use selector to get orders from Redux
    const loading = useSelector(selectOrderLoading); // Use selector to get loading state

    // Fetch order list on component mount
    useEffect(() => {
         dispatch(fetchOrderList()).unwrap()
    }, [dispatch]);

    // Debug the orders list to ensure data is available
    useEffect(() => {
        console.log("Orders state in useEffect:", orders);
    }, [orders]);

    const handleItemPress = (orderId: number) => {
        navigation.navigate("OrderDetail", {  orderId });
        console.log("Order ID:", orderId);
    };

    const renderOrderItems = () => {
        if (loading) {
            return <Text>Loading...</Text>;  // Show loading indicator while fetching data
        }

        if (!orders || orders.length === 0) {
            return <Text>No orders found</Text>;  // Show message if no orders are available
        }

        return (
            <FlatList
                data={orders}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                        <View style={styles.orderItem}>
                            <Text style={styles.itemText}>{item.id}</Text>
                            <Text style={styles.itemText}>₹  {item.cost} </Text>
                            <Text >{item.created}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id?.toString() ?? ''}
            />
        );
    };

    return (
        <View style={styles.container}>    
            <HeadBack title="Order Summary" onPress={() => navigation.goBack()} />
            <Text style={styles.confirmationTitle}>Order Summary</Text>
            {renderOrderItems()}
            <SubmitButton title="Place Order" onPress={() => { /* Handle order placement */ }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 20,
        // flexDirection: "row",
        // padding: 10,
        // marginBottom: 15,
        // backgroundColor: "#f9f9f9",
        // borderRadius: 10,
        // alignItems: "center",
    },
    confirmationTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
    },
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        backgroundColor: "#f9f9f9",
        padding: 10,
    },
    itemText: {
        fontSize: 16,
    },
});

export default OrderList;
