import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import RegisterUserScreen from './RegisterUserScreen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { loginUser } from '../../api';
import SubmitButton from '../../CustomsComponents/submitButton'
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam';
// Define the type for the RootStackParamList
import { RootStackParamList } from '../mislenous/RootstackParam';
// Add a default export for the RootStackParamList type
export type { RootStackParamList };
import LinearGradient from 'react-native-linear-gradient';




const LogInScreen= ({navigation}:LogInScreenNavigationProp) => {

console.log('LogInScreen');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Ateempting to login');
    const userData = {
      email: email,
      password: password,
    };

    try {
      const data = await loginUser(userData);
      if (data.status) {
        Alert.alert('Success', 'User logged in successfully');
        await AsyncStorage.setItem('accessToken', data.data.access_token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.user_msg || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'There was an error logging in/Login unsuccessful');
    }
  };
  
  return (
    
    <View style={styles.container}>
    <LinearGradient
      colors={['purple', 'teal']}
      start={{ x: 2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
  
      <Text style={styles.title}>NeoSTORE</Text>
      <TextInput
        placeholder='email'
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder='password'
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
     <SubmitButton 
     title='Login'
      onPress={handleLogin}
      gradient />
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