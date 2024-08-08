import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  height?: number;
  width?: number;
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
}


const CustomButton: React.FC<CustomButtonProps> = ({
  height = 50,
  width = 200,
  text,
  onPress,
  disabled = false,
  backgroundColor = 'black',
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { height, width, backgroundColor: disabled ? 'rgba(255, 171, 0, 0.64)' : 'black' }]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomButton;
