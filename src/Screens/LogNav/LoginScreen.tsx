import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Image, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, initializeAuth } from '../../Redux/slices/authSlice';
import CustomButton from '../../CustomsComponents/customButton';
import Toast from 'react-native-toast-message';
import RegisterScreen from './RegisterUserScreen';

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

import { NavigationProp } from '@react-navigation/native';

const LogInScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state: RootState) => state.auth);

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
    try {
      const resultAction = await dispatch(loginUser(formData)).unwrap();
      const initializeAuthResult = await dispatch(initializeAuth()).unwrap();

      if (initializeAuthResult?.accessToken) {
        navigation.navigate('HomeNavsScreen');
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
          position: 'bottom',
          visibilityTime: 500,
        });
      } else {
        throw new Error('Failed to validate login. Please try again.');
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to login';
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: errorMessage,
      });
      // Alert.alert('Error', errorMessage);
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
          style={[
            styles.input,
            { backgroundColor: isEmailFocused ? 'white' : 'gray' },
          ]}
          value={formData.email}
          onChangeText={text => setFormData({ ...formData, email: text })}
          autoCapitalize="none"
          onFocus={() => setIsEmailFocused(true)}
          onBlur={() => setIsEmailFocused(false)}
        />

        <View style={styles.input}>
          <TextInput
            placeholder="Password"
            style={[
              styles.Pinput,
              { backgroundColor: isPasswordFocused ? 'white' : 'gray' },
            ]}
            value={formData.password}
            onChangeText={text => setFormData({ ...formData, password: text })}
            secureTextEntry={!isPasswordVisible}
            autoCapitalize="none"
            onFocus={() => setIsPasswordFocused(true)}
            onBlur={() => setIsPasswordFocused(false)}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Image
              source={isPasswordVisible ? require('../../Assets.xcassets/Images/visibleoff.png') : require('../../Assets.xcassets/Images/visible.png')}
              style={{ width: 20, height: 20, marginTop: 0 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rememberForgotContainer}>
          <Text
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            Forgot password?
          </Text>
        </View>

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
  toast: {
    backgroundColor: 'red',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Pinput: {
    height: 40,
    borderColor: 'transparent',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 0,
    marginLeft: -12,
    marginRight: -33,
    fontSize: 14,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rememberForgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#00ADEF',
    textDecorationLine: 'underline',
  },
});

export default LogInScreen;
