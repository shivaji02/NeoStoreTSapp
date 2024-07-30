import { View, Text } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Carasoul from './Corousel'
import styles from '../../../styles'
const HomeScreen = () => {
  return (
    <View style={styles.container}>
       <LinearGradient
      colors={['purple', 'teal']}
      start={{ x: 2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
        <Carasoul/>
      {/* <Text>Home Screen</Text> */}
      </LinearGradient>
    </View>
  )
}

export default HomeScreen;
