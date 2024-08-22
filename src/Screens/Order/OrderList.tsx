import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeadBack from "../../CustomsComponents/BackWithTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderList, selectOrders, selectOrderLoading } from "../../Redux/slices/orderSlice";

const OrderList: React.FC<{}> = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const orders = useSelector(selectOrders);  // Use selector to get orders from Redux
    const loading = useSelector(selectOrderLoading); // Use selector to get loading state

    // Fetch order list on component mount
    useEffect(() => {
        dispatch(fetchOrderList()).unwrap();
    }, [dispatch]);

    // Handle sorting when "Cost" is clicked
    const handleSortByCost = () => {
        const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
        setSortOrder(newSortOrder);
    };


        const getSortedOrders = () => {
            if (!orders) return [];

            return [...orders].sort((a, b) => {
                if (sortOrder === 'asc') {
                    return a.cost - b.cost;
                } else {
                    return b.cost - a.cost;
                }
            });
        };

    const handleItemPress = (orderId: number) => {
        navigation.navigate("OrderDetail", { orderId });
        console.log("Order ID:", orderId);
    };

    const renderOrderItems = () => {
        if (loading) {
            return <Text>Loading...</Text>;  // Show loading indicator while fetching data
        }

        const sortedOrders = getSortedOrders();

        if (!sortedOrders || sortedOrders.length === 0) {
            return <Text>No orders found</Text>;  // Show message if no orders are available
        }

        return (
            <FlatList
                data={sortedOrders}
                renderItem={({ item }) => (
                    
                    <TouchableOpacity onPress={() => handleItemPress(item.id)}>
                        <View style={styles.orderItem}>
                            <Text style={styles.itemText}>{item.id}</Text>
                            <Text style={styles.itemText}>₹ {item.cost}</Text>
                            <Text>{item.created}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id?.toString() ?? ''}
            />
        );
    };

    return (
        <View style={styles.container}>    
            <HeadBack title="Orders History" onPress={() => navigation.goBack()} />
                <View style={styles.HeadBar}>
                    <Text>Order Id</Text>
                    <TouchableOpacity onPress={handleSortByCost}>
                        <Text style={styles.sortText}>Cost {sortOrder === 'asc' ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    <Text>Placed on</Text>
                </View>

            {renderOrderItems()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        marginBottom: 20,
    },
    HeadBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
        backgroundColor: "#f9f9f9",
        padding: 10,
    },
    orderItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 7,
        backgroundColor: "#f9f9f9",
        padding: 10,
    },
    itemText: {
        fontSize: 16,
    },
    sortText: {
        fontSize: 16,
        color: '#007bff',
        textDecorationLine: 'underline',
    },
});

export default OrderList;
