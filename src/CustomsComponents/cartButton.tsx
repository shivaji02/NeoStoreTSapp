import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';

const CartButton: React.FC<{ initialCount: number, onChange: (count: number) => void }> = ({ initialCount, onChange }) => {
    const [count, setCount] = useState(initialCount);

    const handleInputChange = (value: string) => {
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue)) {
            setCount(parsedValue);
            onChange(parsedValue); // Notify parent of change
        }
    };

    const handlePlusPress = () => {
        const newCount = count + 1;
        setCount(newCount);
        onChange(newCount); // Notify parent of change
    };

    const handleMinusPress = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            onChange(newCount); // Notify parent of change
        }
    };

    return (
        <View style={styles.container}>
            <Button title="-" onPress={handleMinusPress} />
            <TextInput
                style={styles.input}
                value={count.toString()}
                onChangeText={handleInputChange}
                keyboardType="numeric"
            />
            <Button title="+" onPress={handlePlusPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        width: 40,
        height: 40,
        textAlign: 'center',
        marginHorizontal: 8,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 4,
    },
});

export default CartButton;
