import { View, Text, TextInput, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/slices/authSlice';
import { ActivityIndicator } from 'react-native-paper';
import styles from '../../../styles';
import CustomButton from '../../CustomsComponents/customButton';
import Toast  from 'react-native-toast-message'; // Adjust this import according to your project structure


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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
      const isFormValid = formData.email && formData.password; // Check if both email and password are filled
      const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email); // Check if email is valid
      setIsButtonDisabled(!isFormValid || !isEmailValid);
    }, [formData]);


    const handleLogin = async () => {
      if (!formData.email || !formData.password) {
        Alert.alert('Validation Error', 'Please fill in both email and password.');
        return;
      }
    
      try {
        const resultAction = await dispatch(loginUser({ formData }) as any);
    
        if (loginUser.fulfilled.match(resultAction)) {
          navigation.navigate('HomeNavsScreen');
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome back!',
            position: 'bottom',
          });
        } else {
          const errorMessage = resultAction.payload || 'Failed to login';
          Toast.show({
            type: 'error',
            text1: 'Login Error',
            text2: errorMessage,
            position: 'top',
          });
        }
    
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Something went wrong';
        Alert.alert('Error', errorMessage);
      }
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>NeoSTORE</Text>
      <TextInput
        placeholder="email"
        style={styles.input}
        value={formData.email}
        onChangeText={text => setFormData({ ...formData, email: text })}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="password"
        style={styles.input}
        value={formData.password}
        onChangeText={text => setFormData({ ...formData, password: text })}
        secureTextEntry
      />
      <CustomButton text="Login" onPress={handleLogin} disabled={isButtonDisabled || loading} />
       
      {loading && <ActivityIndicator animating={true} color="red" />}  
      <View style={styles.linktext}>
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
