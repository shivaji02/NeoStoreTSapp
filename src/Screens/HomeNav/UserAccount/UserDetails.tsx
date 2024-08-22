import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails, selectUserDetails, updateUser } from '../../../Redux/slices/userDetailsSlice';
import { RootState } from '../../../Redux/store';
import HeadBack from '../../../CustomsComponents/BackWithTitle';
import SubmitButton from '../../../CustomsComponents/submitButton';
import Toast from 'react-native-toast-message';

const UserDetails = () => {
    const dispatch = useDispatch();

    // Select user details, loading, and error states from Redux store
    const { user, loading, error } = useSelector(selectUserDetails) as { user: any, loading: boolean, error: string };

    // Local state to handle edit mode and user input
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [gender, setGender] = useState('');

    // Fetch user details when the component mounts
    useEffect(() => {
        dispatch(fetchUserDetails());
    }, [dispatch]);

    // Populate local state with user data when available
    useEffect(() => {
        if (user) {
            setFirstName(user.first_name);
            setLastName(user.last_name);
            setEmail(user.email);
            setPhoneNo(user.phone_no);
            setGender(user.gender);
        }
    }, [user]);

    const handleUpdate = () => {
        const updatedUser = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_no: phoneNo,
            gender,
            dob: '1/1/1999',  // Default value for dob
        };

        dispatch(updateUser(updatedUser)).then(() => {
            Toast.show({
                type: 'success',
                text1: 'Success',
                text2: 'User details updated successfully!',
                position: 'center',
            });
            // After update, reload the user details and exit edit mode
            dispatch(fetchUserDetails());
            setIsEditing(false);
        });
    };

    return (
        <View style={styles.container}>
            <HeadBack title="User Details" showIcon={false} />

            {loading && <ActivityIndicator size="large" color="#000" />}
            {error && <Text style={styles.errorText}>{error}</Text>}

            {!isEditing && user && (
                <View>
                    <Text style={styles.label}>First Name: {user.first_name}</Text>
                    <Text style={styles.label}>Last Name: {user.last_name}</Text>
                    <Text style={styles.label}>Email: {user.email}</Text>
                    <Text style={styles.label}>Phone No: {user.phone_no}</Text>
                    <Text style={styles.label}>Gender: {user.gender}</Text>

                    <SubmitButton title="Edit" onPress={() => setIsEditing(true)} style={styles.editBTN} />
                </View>
            )}

            {isEditing && (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Phone No"
                        value={phoneNo}
                        onChangeText={setPhoneNo}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Gender"
                        value={gender}
                        onChangeText={setGender}
                    />

                    <SubmitButton title="Save" onPress={handleUpdate} style={styles.saveBTN} />
                </View>
            )}

            {/* Toast Component */}
            <Toast />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'rgba(255, 171, 0, 0.64)',
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
        color: '#333',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
    },
    editBTN: {
        marginTop: 5,
        backgroundColor: 'teal',
        width: 80,
        height: 40,
        textAlign: 'center',
        justifyContent: 'center',
    },
    saveBTN: {
        backgroundColor: 'green',
        width: 80,
        height: 40,
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'Roboto',
    },
    errorText: {
        color: 'red',
        marginBottom: 20,
    },
});

export default UserDetails;
