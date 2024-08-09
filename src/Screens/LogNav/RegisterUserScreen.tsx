import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { registerUser } from '../../Redux/slices/authSlice';
import SubmitButton from '../../CustomsComponents/submitButton';
import { AppDispatch } from '../../Redux/store';
import Toast from 'react-native-toast-message';

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
    .required("Confirm Password is required"),
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
  const handleToast = (type: 'success' | 'error', text: string) => {
    Toast.show({
      type: type,
      text1: text,
      visibilityTime: 4000,
      autoHide: true,
      position: 'top',
    });
  };



  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Image
            source={require('../../Assets.xcassets/Images/backIcon.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        <Image
          source={require('../../Assets.xcassets/Images/loginimage.png')}
          style={styles.registerImage}
        />

        <Text style={styles.title}>NeoStore SignUp</Text>

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
              handleToast('success', 'Registration successful');
              navigation.goBack(); // Navigate back on successful registration
            } catch (error: any) {
              if (error.response) {
                console.error('Error response status:', error.response.status);
                handleToast('error', error); // Show toast with the error message
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
                autoCapitalize="none"  // Prevents auto-capitalization
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
                  value="male"
                  status={values.gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('gender', 'male')}
                />
                <Text style={styles.radioText}>Male</Text>
                <RadioButton
                  value="female"
                  status={values.gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('gender', 'female')}
                />
                <Text style={styles.radioText}>Female</Text>
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
                <Text style={styles.checkboxText}>I accept the terms and conditions*</Text>
              </View>
              {touched.termsAccepted && errors.termsAccepted && <Text style={styles.error}>{errors.termsAccepted}</Text>}

              <SubmitButton
                onPress={handleSubmit}
                title='Sign Up'
                gradient={false}
                style={styles.smButton}
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'rgba(255, 171, 0, 0.64)',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  formContainer: {
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: '#000', // Adjust the color if needed
  },
  registerImage: {
    width: '100%',
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  error: {
    fontSize: 12,
    color: '#D8000C',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    marginRight: 30,
    fontSize: 16,
    color: '#FFF',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#FFF',
    marginLeft: 10,
  },
  smButton: {
    backgroundColor: 'grey', // Example: give it a different background color
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  }
  
});

export default RegisterScreen;
