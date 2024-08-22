import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeadBack from "../../../CustomsComponents/BackWithTitle";

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <HeadBack title="Change Password" showIcon={false} />
      <View style={styles.con}>

        <Text style={styles.displayText}>Work in Progress </Text>
        <Text style={styles.displayText}>meanwhile check other awesome part of the App</Text>


        <Text style={styles.infoText}>Thank you for your patience, Please dont Logout from App</Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'rgba(255, 171, 0, 0.64)',
  },
  con : {
    flex : 1,
    justifyContent:"space-around",
    alignItems: 'center',
  },
  mcontainer: {
    backgroundColor: 'rgba(255, 171, 0, 0.64)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  displayText: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'center',
    // color: 'teal',
  },
  icon: {
    color: 'silver',
  },
  infoText: {
    fontSize: 20,
    textAlign: 'center',
    alignSelf: 'flex-end',
    color: 'red',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
})

export default ChangePassword;

