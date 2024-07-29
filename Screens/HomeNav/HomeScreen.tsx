import { View, Text } from 'react-native'
import React from 'react'
import Carasoul from './Corousel'
import styles from '../../styles'
const HomeScreen = () => {
  return (
    <View style={styles.container}>
<Carasoul/>
      <Text>Home Screen</Text>
    </View>
  )
}

export default HomeScreen;