import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';

interface ProductListViewProps {
  image: ImageSourcePropType;
  bigText: string;
  underlinedText: string;
  onPress: () => void;
}

const ProductListView: React.FC<ProductListViewProps> = ({  image, bigText, underlinedText, onPress }) => {
  return (
    <View style={styles.container} >
      <View style= {styles.imgcontainer}>
       <Image source={image} style={styles.image} resizeMode="contain" />
       </View>
       <View style ={styles.textcontainer}>
      <Text style={styles.bigText}>{bigText}</Text>
     <TouchableOpacity onPress={onPress}> 
        <Text style={styles.underlinedText}><Text>{underlinedText}</Text>
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    // justifyContent: 'flex-start',
    marginVertical: 10,
    padding: 10,
    flexDirection:'row',
    justifyContent:'space-between',
    height: 200,
  },
  image: {
    width: '100%',
    height: '70%',
  },
  imgcontainer:{
    width:'50%',
    height:'100%',
    marginBottom:-20,


  },
  textcontainer:{
    width:'40%',
    height:'100%',
    marginBottom:30,
    justifyContent:'center',
  },
  bigText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 10,
  },
  underlinedText: {
    fontSize: 18,
    color: '#000',
    textDecorationLine: 'underline',
    marginTop: 5,
  },
});

export default ProductListView;
