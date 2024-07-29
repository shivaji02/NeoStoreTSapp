import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from './HomeScreen'
const HomeMainNav = () => {
  return (
    <View style={{flex:1,backgroundColor:'red'}}>
      <Text>HomeMainNav</Text>
      <HomeScreen/>
    </View>
  )
}

export default HomeMainNav;