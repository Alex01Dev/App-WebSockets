import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { deleteOne, getAll } from '../api';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductList = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const data = await getAll();
      console.log("Datos de productos cargados:", data);
      setProducts(data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };
  

  const deleteProd = async (barcode) => {
    try {
      const res = await deleteOne(barcode);
      if (res.success) {
        // Eliminar el producto localmente de la lista de productos
        setProducts(products.filter(product => product.barcode !== barcode));
        console.log(JSON.stringify(res));
      } else {
        console.error('Error al eliminar el producto:', res.error);
      }
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  const renderItem = ({ item }) => {
    console.log("Renderizando item:", item);
    return <ProductItem item={item} deleteProd={deleteProd} navigation={navigation} />;
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.barcode}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#ffddd2"]}
            onRefresh={onRefresh}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffddd2',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    marginTop: 1,
  },
});

export default ProductList;
