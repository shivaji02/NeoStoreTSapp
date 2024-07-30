import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen'
import styles from '../../../styles';
import LinearGradient from 'react-native-linear-gradient';
const HomeMainNav = () => {
  return (
    <View style={{flex:1,backgroundColor:'red'}}>
  <LinearGradient
      colors={['purple', 'teal']}
      start={{ x: 2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
   
      <Text>HomeMainNav</Text>
      <HomeScreen/>
      </LinearGradient>
    </View>
  )
}

export default HomeMainNav;