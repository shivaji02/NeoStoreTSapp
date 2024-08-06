import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import SubmitButton from '../../CustomsComponents/submitButton';
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../Redux/slices/authSlice';
import HomeMainNav from '../HomeNav/HomeMainNav';
import { ActivityIndicator } from 'react-native-paper';
import styles from '../../../styles';
import CustomButton from '../../CustomsComponents/customButton';
import { HttpStatusCode } from 'axios';
// types.ts
export interface LoginUser {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RootState {
  auth: {
    user: LoginResponse | null;
    loading: boolean;
    error: string | null;
  };
}

const LogInScreen = ({ navigation }: LogInScreenNavigationProp) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const handleLogin = async () => {

    try {
      console.log('Form Data: ', formData); // Log form data before sending
      dispatch(loginUser({formData,navigation}));

      
      // setTimeout(() => {
      //   <ActivityIndicator animating={true} color="red" />
      //   Alert.alert('Success', 'Login Successful');
      // }, 1000);
      
    } catch (error: any) {
      console.error('Error Response: ', error.response ? error.response.data : error.message);
      Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    }

  };
  return (
    <View style={styles.container}>
      {/* <LinearGradient
        colors={['purple', 'teal']}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      > */}
      <Text style={styles.title}>NeoSTORE</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        value={formData.email}
        onChangeText={text => setFormData({ ...formData, email: text })}
        autoCapitalize='none'
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        value={formData.password}
        onChangeText={text => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      {/* <SubmitButton
          title="Login"
          onPress={handleLogin}
          
        /> */}
      <CustomButton
        text="Login"
        onPress={handleLogin} />

      <View>
        <Text style={styles.link} onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          Forgot Password?
        </Text>
        <Text style={styles.link} onPress={() => navigation.navigate('RegisterUserScreen')}>
          Don't have an account?
        </Text>
      </View>
      {/* </LinearGradient> */}
    </View>
  );
};

export default LogInScreen;
