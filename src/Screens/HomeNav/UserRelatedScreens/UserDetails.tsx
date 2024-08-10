import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, selectUserDetails } from '../../../Redux/slices/userDetailsSlice';
import { RootState } from '../../../Redux/store';

const UserDetails = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Select user details, loading, and error states from Redux store
    const { user, loading, error } = useSelector(selectUserDetails);

    // Fetch user details when the component mounts
    useEffect(() => {
        console.log("Before dispatching fetchUserDetails");
        dispatch(fetchUserDetails());
        console.log("After dispatching fetchUserDetails");
    }, [dispatch]);
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
                <Image source={require('../../../Assets.xcassets/Images/backIcon.png')} style={styles.backIcon} />
            </TouchableOpacity>

            <Text style={styles.title}>User Details</Text>

            {loading && <ActivityIndicator size="large" color="#0000ff" />}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {user && (
                <View style={styles.userDetailsContainer}>
                    <Text style={styles.detailText}>Username: {user.username}</Text>
                    <Text style={styles.detailText}>Gender: {user.gender}</Text>
                    <Text style={styles.detailText}>Phone No: {user.phone_no}</Text>
                    <Text style={styles.detailText}>Email: {user.email}</Text>
                    <Text style={styles.detailText}>Active: {user.is_active ? 'Yes' : 'No'}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 171, 0, 0.64)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    backButton: {
        position: 'absolute',
        top: 40, 
        left: 20,
        elevation: 5,
        shadowColor: '#000',
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userDetailsContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        shadowColor: '#000',
        width: '100%',
    },
    detailText: {
        fontSize: 18,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        marginBottom: 10,
    },
});

export default UserDetails;
