import React,{useEffect} from 'react'
 import { View, Text, Button, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsRequest } from '../reducers/productReducer';
import { StackNavigationProp } from '@react-navigation/stack';
import  {RootStackParamList } from '../RootStackParamList';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { RootState } from '../reducers';
import styles from '../styles';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

type products = {
  id: number;
  name: string;
};
const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products) as products[];
  const loading = useSelector((state: RootState) => state.products.loading);
  const error = useSelector((state: RootState) => state.products.error);

  useEffect(() => {
    dispatch(fetchProductsRequest());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Text>{item.name}</Text>
            <Button
              title="View Details"
              onPress={() => navigation.navigate('Product', { product: item })}
            />
          </View>
        )}
      />
    </View>
  );
};


export default HomeScreen;
