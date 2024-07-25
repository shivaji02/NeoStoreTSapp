import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import RegisterUserScreen from './RegisterUserScreen';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { loginUser } from '../../api';
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam';
// Define the type for the RootStackParamList
import { RootStackParamList } from '../mislenous/RootstackParam';
// Add a default export for the RootStackParamList type
export type { RootStackParamList };

const LogInScreen= ({navigation}:LogInScreenNavigationProp) => {

console.log('LogInScreen');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('jhfdfhgf5etyfuyguyr5rtyfyuf67r6')
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
      Alert.alert('Error', 'There was an error logging in');
    }
  };

  return (
    <View style={styles.container}>
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
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.link} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          Forgot Password?
        </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('RegisterUserScreen')}>
          Don't have an account?
        </Text>
      </View>
    </View>
  );
};

export default LogInScreen;