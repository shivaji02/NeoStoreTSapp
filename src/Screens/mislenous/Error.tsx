import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import styles from '../../../styles';

const ErrorScreen = () => {
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = () => {
        // Handle the submitted error message here
        console.log(errorMessage);
        Alert.alert('Error Submitted', errorMessage);
        
        // You can navigate to another screen or perform any other action based on the error message
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="What went wrong?"
                value={errorMessage}
                onChangeText={setErrorMessage}
            />
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
};

export default ErrorScreen;






