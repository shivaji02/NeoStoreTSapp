import { View, Text,Touchable, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styles from '../../styles'
import ForgotPasswordScreen from './ForgotPasswordScreen'
import RegisterUserScreen from './RegisterUserScreen'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../RootStackParamList';

// Add a default export for the RootStackParamList type
export type { RootStackParamList };


type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LogInScreen'>;

const LogInScreen:React.FC = () => {
    const navigation = useNavigation<LogInScreenNavigationProp>();

    console.log('LogInScreen');

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const HandleLogin=()=>{
        login(email,password);
        if(error){
           Alert.alert('LoginError',error);
           const isLoggedIn = false;

        }else{
            const isLoggedIn = true;
            navigation.navigate('Home');
            
        }
    };
    return(
        <View style={styles.container}>
            <Text style ={styles.title}>NeoSTORE</Text>
            <TextInput
             placeholder='email'
             style={styles.input}
                value={email}
                onChangeText={setEmail} />
            <TextInput
                placeholder='password'
                style={styles.input}
                    value={password}
                    onChangeText={setPassword} 
                    secureTextEntry />
            <TouchableOpacity style={styles.button} onPress={HandleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <View>
            <Text style={styles.link} onPress={()=>navigation.navigate('ForgotPasswordScreen')}>Forgot Password?</Text>  
            <Text style={styles.link} onPress={()=>navigation.navigate('RegisterUserScreen')}>Don't have an account?</Text>     
                    </View>     
                    </View>
        )
}

export default LogInScreen;