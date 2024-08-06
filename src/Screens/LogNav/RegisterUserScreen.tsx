
import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { RadioButton } from 'react-native-paper'; // Install @react-native-paper if not already
import CheckBox from '@react-native-community/checkbox'; // Install @react-native-community/checkbox if not already
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../../../styles';
import SubmitButton from '../../CustomsComponents/submitButton';
import { StackNavigationProp } from '@react-navigation/stack';
import LogInScreen from './LoginScreen';
import { registerUser,selectAuth } from '../../Redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../Redux/store';


const validationSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only characters are allowed")
    .min(3, "Minimum 3 characters required")
   .required("First name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only characters are allowed")
    .min(3, "Minimum 3 characters required")
   .required("Last name is required"),
  email: Yup.string()
     .email("Invalid email")
     .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
   .required("Password is required"),
  confirm_password: Yup.string()
   .oneOf([Yup.ref('password')], 'Passwords do not match')
   .required("Confirm Password is required "),
  gender: Yup.string()
   .required("Gender is required"),
  phone_no: Yup.string() 
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .min(10, "Phone number must be at least 10 digits")
    .max(10, "Phone number must be at most 10 digits")
    .required("Phone number is required"),
  termsAccepted: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
   .required("You must accept the terms and conditions"),
});

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  phone_no: string;
  termsAccepted: boolean;
}

type RootStackParamList = {
  Login: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  
  
  const dispatch = useDispatch<AppDispatch>();
  // const { loading } = useSelector(selectAuth);
  const initialValues: FormValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phone_no: '',
    termsAccepted: false,
  };


  
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['purple', 'teal']} //add colors more in array and see effect
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
           
            try {
              const formData = new FormData();
              formData.append('first_name', values.first_name);
              formData.append('last_name', values.last_name);
              formData.append('email', values.email);
              formData.append('password', values.password);
              formData.append('confirm_password', values.confirm_password);
              formData.append('gender', values.gender);
              formData.append('phone_no', values.phone_no);

              await dispatch(registerUser(formData)).unwrap();
              Alert.alert('Success', 'Registration successful');
              navigation.navigate('Login'); // Navigate to login screen on successful registration
            } catch (error: any) {
              if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                Alert.alert('Error', error.response.data.message || 'An error occurred');
              } else if (error.request) {
                console.error('Error request:', error.request);
                Alert.alert('Error', 'No response received from server');
              } else {
                console.error('Error message:', error.message);
                Alert.alert('Error', error.message);
              }
              throw error;
            }
          }}

           >

          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <View>

            <Text style={styles.title}>NeoUser</Text>
           
              <TextInput
                style={styles.input}
                placeholder='First Name'
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
              />
              {touched.first_name && errors.first_name && <Text style={styles.error}>{errors.first_name}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Last Name'
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
              />
              {touched.last_name && errors.last_name && <Text style={styles.error}>{errors.last_name}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Email'
                keyboardType='email-address'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

              <TextInput
                placeholder='Password'
                style={styles.input}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

              <TextInput
                placeholder='Confirm Password'
                style={styles.input}
                secureTextEntry
                onChangeText={handleChange('confirm_password')}
                onBlur={handleBlur('confirm_password')}
                value={values.confirm_password}
              />
              {touched.confirm_password && errors.confirm_password && (
                <Text style={styles.error}>{errors.confirm_password}</Text>
              )}

              <View style={styles.radioContainer}>
                <RadioButton
                  value="M"
                  status={values.gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('gender', 'male')}
                />
                <Text>Male</Text>
                <RadioButton
                  value="F"
                  status={values.gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('gender', 'female')}
                />
                <Text>Female</Text>
              </View>
              {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}

              <TextInput
                style={styles.input}
                placeholder='Phone Number'
                onChangeText={handleChange('phone_no')}
                onBlur={handleBlur('phone_no')}
                value={values.phone_no}
              />
              {touched.phone_no && errors.phone_no && <Text style={styles.error}>{errors.phone_no}</Text>}

              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={values.termsAccepted}
                  onValueChange={(newValue) => setFieldValue('termsAccepted', newValue)}
                />
                <Text>I accept the terms and conditions*</Text>
              </View>
              {touched.termsAccepted && errors.termsAccepted && <Text style={styles.error}>{errors.termsAccepted}</Text>}

              <SubmitButton
                onPress={handleSubmit}
                title='Submit'
                gradient
              />
            </View>
          )}
        </Formik>
      </LinearGradient>
    </View>
  );
};


export default RegisterScreen;
