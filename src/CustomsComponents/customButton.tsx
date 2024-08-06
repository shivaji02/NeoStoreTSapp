import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
  height?: number;
  width?: number;
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
}


const CustomButton: React.FC<CustomButtonProps> = ({
  height = 50,
  width = 200,
  text,
  onPress,
  backgroundColor = 'black',
  textColor = 'white',
}) => {
  return (
    <TouchableOpacity 
      style={[styles.button, { height, width, backgroundColor }]}
      onPress={onPress}
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
