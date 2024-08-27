import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
// import Icon from 'react-native-vector-icons/MaterialIcons';
const YourComponent = () => {
  // Mock values for demonstration; replace with actual form handling logic
  const values = {
    firstName: '',
  };

  // Mock handlers for demonstration; replace with actual form handling logic
  const handleChange = (field: string) => (text: string) => {
    console.log(`${field}: ${text}`);
  };

  const handleBlur = (field: string) => () => {
    console.log(`${field} blurred`);
  };

return (
    <View style={styles.container}>
        <LinearGradient 
                colors={['#613338', '#613338', '#3D2749']} 
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 1 }} 
                style={styles.gradient}
            >



            <Text style={styles.title}>NeoUser</Text>
            <View style={styles.inputContainer}>
                <Icon name="person" size={20} color="#000" style={styles.icon} />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                />
            </View>
        </LinearGradient>
    </View>
);
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  gradient: {
    // Add your gradient styles here
    borderRadius: 5,
  },
});

export default YourComponent;
