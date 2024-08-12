import { View, StyleSheet, Text, TextInput, Alert, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { LogInScreenNavigationProp } from '../mislenous/RootstackParam';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, initializeAuth } from '../../Redux/slices/authSlice';
import { ActivityIndicator } from 'react-native-paper';
import CustomButton from '../../CustomsComponents/customButton';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    isAuthenticated: boolean;
  };
}

const LogInScreen = ({ navigation }: LogInScreenNavigationProp) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const { loading, isAuthenticated,error } = useSelector((state: RootState) => state.auth);


  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('HomeNavsScreen');
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    const isFormValid = formData.email && formData.password;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
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
      <Image
        source={require('../../Assets.xcassets/Images/loginimage.png')}
        style={styles.loginImage}
      />

      <View style={styles.formContainer}>
        <Text style={styles.title}>NeoStore SignIn</Text>

        <Text style={styles.subTitle}>
          Don't have an account yet?{' '} 
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('RegisterUserScreen')}>
            Sign Up
          </Text>
        </Text>

        <TextInput
          placeholder="Your username or email address"
          style={styles.input}
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={formData.password}
          onChangeText={text => setFormData({ ...formData, password: text })}
          secureTextEntry
        />

        <View style={styles.rememberForgotContainer}>
          {/* <Text style={styles.rememberMe}>Remember me</Text> */}
          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            Forgot password?
          </Text>
        </View>
        {!loading && <ActivityIndicator animating={true} color="red" />}

        <CustomButton text="Sign In" onPress={handleLogin} disabled={isButtonDisabled || loading} />

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 171, 0, 0.64)', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  loginImage: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  signUpText: {
    color: '#00ADEF',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rememberMe: {
    fontSize: 14,
    color: '#333',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#00ADEF',
    textDecorationLine: 'underline',
  },
});

export default LogInScreen;
