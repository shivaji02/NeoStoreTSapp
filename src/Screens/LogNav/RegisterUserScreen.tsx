// // // import { View, Text } from 'react-native'
// // // import React from 'react'
// // // import styles from '../../styles'

// // // const RegisterUserScreen = () => {
// // //   return (
// // //     <View style={styles.container}>
// // //       <Text>RegisterUserScreen</Text>
// // //     </View>
// // //   )
// // // }

// // // export default RegisterUserScreen

// // import React, { isValidElement } from 'react'
// // import { View, Text, TextInput, TouchableOpacity, Alert,ScrollView,Keyboard ,KeyboardAvoidingView} from 'react-native'
// // import styles from '../../../styles'
// // import  { useMemo, useState } from 'react';
// // import RadioGroup from 'react-native-radio-buttons-group';
// // import CheckBox from '@react-native-community/checkbox';
// // import { Platform } from 'react-native';
// // import {regUser} from '../../../api';

// // const RegisterUserScreen = ({ navigation }) => {
// //     const [userData, setUserData] = useState({
// //         first_name: '',
// //         last_name: '',
// //         email: '',
// //         password: '',
// //         confirm_password: '',
// //     });

// //     const handleInputChange = (name: string, value: any) => {
// //         setUserData(prevState => ({
// //             ...prevState,
// //             [name]: value
// //         }));
// //     };

// //     const { first_name, last_name, email, password, confirm_password, gender } = userData;

// //     const [isSelected, setSelection] = useState(false);
// //     const radioButtonsData = useMemo(() => ([
// //         {
// //             id: '1',
// //             label :'male',
// //             value :'Male',
// //         },
// //         {
// //             id: '2',
// //             label:'female',
// //             value:'Female',
// //         }
// //     ]),[]);
// //     const [selectedId, setSelectedId] = useState();
// //     const [errorMessage, setErrorMessage] = useState(''); // Add errorMessage state variable

// //     const handleRegister = async () => {
// //         const userData ={
// //             first_name,
// //             last_name,
// //             email,
// //             password,
// //             confirm_password,
// //             gender,
// //             phone_no,
// //         };

// //         try{
// //             const response = await regUser(userData);
// //             Alert.alert('Success', response.message);
// //         }
// //         catch(error){
// //             Alert.alert('Error', error.message);
// //         }
// //     };

// //     return (
// //         <KeyboardAvoidingView style={{enabled:'true',keyboardVerticalOffset:2}}>
// //             <ScrollView> 
// //             <View style={styles.container}>
// //             <Text style={styles.title}>NeoSTORE</Text>
                    
// //             <TextInput style={styles.input} placeholder='First Name' onChangeText={text => {
// //                 if (/^[a-zA-Z]+$/.test(text)) {
// //                     // Valid input
// //                 } else {
// //                     setErrorMessage('Invalid input! Please enter only letters.');
// //                 }
// //             }} />
        
// //             <TextInput style={styles.input} placeholder='Last Name' onChangeText={text => {
// //                 if (/^[a-zA-Z]+$/.test(text)) {
// //                     // Valid input
// //                 } else {
// //                     setErrorMessage('Invalid input! Please enter only letters.');
// //                 }
// //             }} />
        
// //             <TextInput style={styles.input} placeholder='Email' onChangeText={text => {
// //                 if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(text)) {
// //                     // Valid input
// //                 } else {
// //                     setErrorMessage('Invalid input! Please enter a valid email address.');
// //                 }
// //             }} />
        
// //             <TextInput style={styles.input} placeholder='Password' secureTextEntry onChangeText={text => {
// //                 if (/^[a-zA-Z0-9]+$/.test(text)) {
// //                     // Valid input
// //                 } else {
// //                     setErrorMessage('Invalid input! Please enter only letters and numbers.');
// //                 }
// //             }} />
        
// //             <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry onChangeText={text => {
// //                 if (/^[a-zA-Z0-9]+$/.test(text)) {
// //                     // Valid input
                    
// //                 } else {
// //                     setErrorMessage('Invalid input! Please enter only letters and numbers.');
// //                 }
// //             }} />

// //             {/* <Text> Gender</Text> */}
// //             <RadioGroup radioButtons={radioButtonsData} onPress={(radioButtonsData: React.SetStateAction<undefined>) => setSelectedId(radioButtonsData)} style={styles.radioB} />

// //             <TextInput style={styles.input} placeholder='Phone Number' onChangeText={text => {
// //                 if (/^[0-9]+$/.test(text)) {
// //                     // Valid input
// //                 } else {
// //                     setErrorMessage('Invalid input! Please enter only numbers.');
// //                 }
// //             }} />
// //             {/* <CheckBox 
// //                     disabled={false}
// //                     value={isSelected}
// //                     onValueChange={setSelection}
// //                     style={styles.checkbox}/> */}
// //             <View style={styles.checkboxView}>
// //                 {Platform.OS === 'android' && (
// //                     <CheckBox
// //                         value={isSelected}
// //                         onValueChange={setSelection}
// //                         style={styles.checkbox}
// //                     />
// //                 )}
// //             </View>
// //             <Text>Agree to terms and conditions</Text>
// //             <TouchableOpacity style={styles.button}>
// //                 <Text style={styles.buttonText} onPress={handleRegister}>Register</Text>
// //             </TouchableOpacity>

// //             {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        
// //             <Text style={styles.link} onPress={() => navigation.navigate('Login')}>Already have an account?</Text>
// //         </View>
// //         </ScrollView>

// //         </KeyboardAvoidingView>
// //     )
// // }

// // export default RegisterUserScreen;

// import React, { useState, useMemo } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
// import styles from '../../styles';
// import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
// import CheckBox from '@react-native-community/checkbox';
// import { registerUser } from '../../../api';

// type UserData = {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password: string;
//   confirm_password: string;
//   gender?: string;
//   phone_no?: string;
// };

// const RegisterUserScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
//   const [userData, setUserData] = useState<UserData>({
//     first_name: '',
//     last_name: '',
//     email: '',
//     password: '',
//   
//       {
//         i//     gender: '',
//     phone_no: '',
//   });

//   const [isSelected, setSelection] = useState(false);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const radioButtonsData: RadioButtonProps[] = useMemo(
//     () => [
//       {
//         id: '1',
//         label: 'Male',
//         value: 'Male',
//       },
//       {
//         id: '2',
//         label: 'Female',
//         value: 'Female',
//       },
//     ],
//     []
//   );
//   const [selectedId, setSelectedId] = useState<string | undefined>();

//   const handleInputChange = (name: keyof UserData, value: string) => {
//     setUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleRegister = async () => {
//     const { first_name, last_name, email, password, confirm_password, gender, phone_no } = userData;

//     // Perform input validation and checks here

//     try {
//       const response = await registerUser(userData);
//       Alert.alert('Success', response.message);
//     } catch (error: any) {
//       Alert.alert('Error', error.message);
//     }
//   };

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       <ScrollView>
//         <View style={styles.container}>
//           <Text style={styles.title}>NeoSTORE</Text>

//           <TextInput
//             style={styles.input}
//             placeholder="First Name"
//             onChangeText={(text) => {
//               if (/^[a-zA-Z]+$/.test(text)) {
//                 handleInputChange('first_name', text);
//               } else {
//                 setErrorMessage('Invalid input! Please enter only letters.');
//               }
//             }}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Last Name"
//             onChangeText={(text) => {
//               if (/^[a-zA-Z]+$/.test(text)) {
//                 handleInputChange('last_name', text);
//               } else {
//                 setErrorMessage('Invalid input! Please enter only letters.');
//               }
//             }}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             onChangeText={(text) => {
//               if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(text)) {
//                 handleInputChange('email', text);
//               } else {
//                 setErrorMessage('Invalid input! Please enter a valid email address.');
//               }
//             }}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Password"
//             secureTextEntry
//             onChangeText={(text) => {
//               handleInputChange('password', text);
//             }}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             secureTextEntry
//             onChangeText={(text) => {
//               handleInputChange('confirm_password', text);
//             }}
//           />

//           <RadioGroup
//             radioButtons={radioButtonsData}
//             onPress={(selectedId: string) => {
//               const selectedButton = radioButtonsData.find((rb) => rb.id === selectedId);
//               if (selectedButton) {
//                 const { value } = selectedButton;
//                 handleInputChange('gender', value || '');
//                 setSelectedId(selectedButton.id);
//               }
//             }}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Phone Number"
//             onChangeText={(text) => {
//               if (/^[0-9]+$/.test(text)) {
//                 handleInputChange('phone_no', text);
//               } else {
//                 setErrorMessage('Invalid input! Please enter only numbers.');
//               }
//             }}
//           />

//           <View style={styles.checkboxView}>
//             {Platform.OS === 'android' && (
//               <CheckBox
//                 value={isSelected}
//                 onValueChange={setSelection}
//                 style={styles.checkbox}
//               />
//             )}
//           </View>
//           <Text>Agree to terms and conditions</Text>
//           <TouchableOpacity style={styles.button} onPress={handleRegister}>
//             <Text style={styles.buttonText}>Register</Text>
//           </TouchableOpacity>

//           {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}

//           <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
//             Already have an account?
//           </Text>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default RegisterUserScreen;

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

  const registerUser = async (userData: Omit<FormValues, 'termsAccepted'>) => {
    console.log('Attempting to register');
    try {
      const formData = new FormData();
      formData.append('first_name', userData.first_name);
      formData.append('last_name', userData.last_name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      formData.append('confirm_password', userData.confirm_password);
      formData.append('gender', userData.gender);
      formData.append('phone_no', userData.phone_no);
// console.log("formData---",formData);

      const response = await axios.post('http://staging.php-dev.in:8844/trainingapp/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      return response.data;
      
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
              const { termsAccepted, ...userData } = values;
              console.log(userData);
              const response = await registerUser(userData);
              Alert.alert('Success', response.message);
                setTimeout(() => {
                navigation.navigate('Login');
                }, 1000);
                return (
                <ActivityIndicator size="large" color="purple" />
                );
            } catch (error) {
              console.log(error);
              Alert.alert('Error', 'Failed to register user');
              let errorMessage = 'An unknown error occurred while submitting the form';
              if (error instanceof Error) {
                errorMessage = error.message;
              }
              Alert.alert('Error', errorMessage);
            }
          }}
        //  onSubmit={values => console.log('😘😘😘😘😘😘😘',values)}
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
