import React,{useState,useEffect} from "react";
import {View,Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook

const UpdateDetails = () => {
    const navigation = useNavigation(); // Initialize the navigation object

    return (
        <View>
              <TouchableOpacity onPress={navigation.goBack} style={styles.backButton}>
        <Image source={require('../../../Assets.xcassets/Images/backIcon.png')} style={styles.backIcon} />
      </TouchableOpacity>

            <Text>User Details</Text>
        </View>
    )
}
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
})  
export default UpdateDetails;

