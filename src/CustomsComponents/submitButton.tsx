import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface SubmitButtonProps {
  onPress: () => void;
  style?: ViewStyle;
  gradient?: boolean;
  title: string;
}


const SubmitButton: React.FC<SubmitButtonProps> = ({ onPress, style, gradient, title }) => {
  const buttonStyle = [styles.csbutton, style];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      {gradient ? (
        <LinearGradient
          colors={['purple', 'teal']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.csgradientButton}
        >
          <Text style={styles.csbuttonText}>{title}</Text>
        </LinearGradient>
      ) : (
        <Text style={styles.csbuttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  csbutton: {
    
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    width: 100, // Ensure consistent width
    height: 50, // Ensure consistent height
  },
  csbuttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  csgradientButton: {
    width: '100%', 
    height: '100%',
    borderRadius: 5, 
    alignItems: 'center',
  },
});

export default SubmitButton;
