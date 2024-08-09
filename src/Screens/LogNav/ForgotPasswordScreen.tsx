import { View, Text, TextInput, Alert, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../Redux/slices/authSlice';
import CustomButton from '../../CustomsComponents/customButton';

const ForgotPasswordScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showActivityIndicator, setShowActivityIndicator] = useState(false);

  useEffect(() => {
    const isFormValid = email;
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsButtonDisabled(!isFormValid || !isEmailValid);
  }, [email]);

  const handleEmailSubmit = async () => {
    try {
      setLoading(true);
      dispatch(forgotPassword(email));
      Alert.alert('Success', 'A Password has been sent to your email.');
      setLoading(false);
      
      setShowActivityIndicator(true);
      setTimeout(() => {
        setShowActivityIndicator(false);
        navigation.goBack();
      }, 2000);
      
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to send OTP.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <Image source={require('../../Assets.xcassets/Images/backIcon.png')} style={styles.backIcon} />
      </TouchableOpacity>

      <Image
        source={require('../../Assets.xcassets/Images/loginimage.png')}
        style={styles.loginImage}
      />

      <View style={styles.formContainer}>
        <View>
          <Text style={styles.title}>Forgot Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <CustomButton text="Submit" onPress={handleEmailSubmit} disabled={isButtonDisabled || loading} />
          {showActivityIndicator && (
            <ActivityIndicator size="large" color="green" style={{ marginTop: 20 }} />
          )}
        </View>
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
  backButton: {
    position: 'absolute',
    top: 40, 
    left: 20,
    elevation: 5,
    shadowColor: '#000',
    
  },
  backIcon: {
    width: 20,
    height: 20,
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
  input: {
    height: 40,
    borderColor: '#DDD',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;













// import { View, Text, TextInput, Alert, StyleSheet, Image } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';
// import { useDispatch } from 'react-redux';
// import { forgotPassword } from '../../Redux/slices/authSlice';
// import CustomButton from '../../CustomsComponents/customButton';
// import LoginScreen from './LoginScreen';

// const ForgotPasswordScreen = () => {
//   const dispatch = useDispatch();
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   // const [otp, setOtp] = useState('');
//   // const [newPassword, setNewPassword] = useState('');
//   // const [confirmPassword, setConfirmPassword] = useState('');
//   // const [showOtp, setShowOtp] = useState(false);
//   // const [showNewPassword, setShowNewPassword] = useState(false);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const isFormValid = email;
//     const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//     setIsButtonDisabled(!isFormValid || !isEmailValid);
//   }, [email]);

//   const handleEmailSubmit = async () => {
//     try {
//       setLoading(true);
//       dispatch(forgotPassword(email));
//       Alert.alert('Success', 'An OTP has been sent to your email.');
//       // setShowOtp(true);
//       setLoading(false);
//       setTimeout(() => {
//         navigation.goBack();
//         setTimeout(() => {
//           setLoading(false);
//         }, 2000);
//       }, 1000);

//     } catch (error) {
//       setLoading(false);
//       console.error('Error:', error);
//       Alert.alert('Error', 'Failed to send OTP.');
//     }
//   };

//   // const handleOtpSubmit = () => {
//   //   if (otp.length === 6) {
//   //     setShowNewPassword(true);
//   //     Alert.alert('Success', 'OTP Verified.');
//   //   } else {
//   //     Alert.alert('Error', 'Invalid OTP.');
//   //   }
//   // };

//   // const handlePasswordSubmit = () => {
//   //   if (newPassword === confirmPassword) {
//   //     Alert.alert('Success', 'Password has been reset.');
//   //   } else {
//   //     Alert.alert('Error', 'Passwords do not match.');
//   //   }
//   // };

//   return (
//     <View style={styles.container}>
//       <Image
//         source={require('../../Assets.xcassets/Images/loginimage.png')}
//         style={styles.loginImage}
//       />

//       <View style={styles.formContainer}>
//           <View>
//             <Text style={styles.title}>Forgot Password</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={setEmail}
//               placeholder="Enter your email"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               autoCorrect={false}
//             />
//             <CustomButton text="Submit" onPress={handleEmailSubmit} disabled={isButtonDisabled || loading} />
//           </View>
        

//         {/* {showOtp && !showNewPassword && (
//           <View>
//             <Text style={styles.title}>OTP</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={(text) => setOtp(text)}
//               placeholder="Enter OTP"
//               keyboardType="numeric"
//               maxLength={6}
//             />
//             <CustomButton text="Verify OTP" onPress={handleOtpSubmit} />
//           </View>
//         )}

//         {showNewPassword && (
//           <View>
//             <Text style={styles.title}>Set New Password</Text>
//             <TextInput
//               style={styles.input}
//               onChangeText={setNewPassword}
//               placeholder="Enter new password"
//               secureTextEntry
//             />
//             <TextInput
//               style={styles.input}
//               onChangeText={setConfirmPassword}
//               placeholder="Confirm new password"
//               secureTextEntry
//             />
//             <CustomButton text="Reset Password" onPress={handlePasswordSubmit} />
//           </View>
//         )} */}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'rgba(255, 171, 0, 0.64)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   loginImage: {
//     width: '100%',
//     height: 180,
//     resizeMode: 'contain',
//     marginBottom: 20,
//   },
//   formContainer: {
//     width: '100%',
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: '#DDD',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 15,
//     fontSize: 14,
//   },
// });

// export default ForgotPasswordScreen;
