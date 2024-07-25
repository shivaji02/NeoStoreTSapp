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
//     confirm_password: '',
//     gender: '',
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
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, GestureResponderEvent } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Picker } from '@react-native-picker/picker';
import { RadioButton } from 'react-native-paper'; // Install @react-native-paper if not already
import CheckBox from '@react-native-community/checkbox'; // Install @react-native-community/checkbox if not already
import { registerUser } from '../../api';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Only characters are allowed")
    .min(3, "Minimum 3 characters required")
    .required("Name is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
    .required("Password is required"),
  gender: Yup.string()
    .required("Gender is required"),
  termsAccepted: Yup.bool()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

interface FormValues {
  name: string;
  password: string;
  gender: string;
  termsAccepted: boolean;
}

import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Login: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const initialValues: FormValues = {
    name: '',
    password: '',
    gender: '',
    termsAccepted: false,
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const userData = {
              name: values.name,
              password: values.password,
              gender: values.gender,
            };
            
            try {
              const data = await registerUser(userData);
              if (data.status) {
                Alert.alert('Success', 'User registered successfully');
                navigation.navigate('Login');
              } else {
                Alert.alert('Error', data.user_msg || 'Registration failed');
              }
            } catch (error) {
              Alert.alert('Error', 'There was an error registering the user');
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
            <View>
              <Text>Name*</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
              
              <Text>Password*</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
              
              <Text>Gender*</Text>
              <View style={styles.radioContainer}>
                <RadioButton
                  value="male"
                  status={values.gender === 'male' ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('gender', 'male')}
                />
                <Text>Male</Text>
                <RadioButton
                  value="female"
                  status={values.gender === 'female' ? 'checked' : 'unchecked'}
                  onPress={() => setFieldValue('gender', 'female')}
                />
                <Text>Female</Text>
              </View>
              {touched.gender && errors.gender && <Text style={styles.error}>{errors.gender}</Text>}
              
              <View style={styles.checkboxContainer}>
                <CheckBox
                  value={values.termsAccepted}
                  onValueChange={(newValue) => setFieldValue('termsAccepted', newValue)}
                />
                <Text>I accept the terms and conditions*</Text>
              </View>
              {touched.termsAccepted && errors.termsAccepted && <Text style={styles.error}>{errors.termsAccepted}</Text>}
              
              <Button onPress={(event: GestureResponderEvent) => handleSubmit()} title="Submit" />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: 'red',
  },
});

export default RegisterScreen;
