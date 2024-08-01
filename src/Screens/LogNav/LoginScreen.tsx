import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../../styles';
import {loginUser} from '../../../api';
import SubmitButton from '../../CustomsComponents/submitButton';
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam';
import LinearGradient from 'react-native-linear-gradient';


const LogInScreen = ({ navigation }: LogInScreenNavigationProp) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handleLogin = async () => {
    try {
      console.log('Form Data: ', formData); // Log form data before sending
      const response = await loginUser(formData);
      console.log('Response: ', response);
      if (response.status === 200) {
        await AsyncStorage.setItem('access_token', response.data.access_token);
        navigation.navigate('HomeMainNav');
        Alert.alert('Success', response.user_msg);
      } else {
        Alert.alert('Error', response.message || 'Login failed');
      }
    } catch (error:any) {
      console.error('Error Response: ', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['purple', 'teal']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.title}>NeoSTORE</Text>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
        />
        <TextInput
          placeholder="password"
          style={styles.input}
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
        <SubmitButton
          title="Login"
          onPress={handleLogin}
          gradient
        />
        <View>
          <Text style={styles.link} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            Forgot Password?
          </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('RegisterUserScreen')}>
            Don't have an account?
          </Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default LogInScreen;
