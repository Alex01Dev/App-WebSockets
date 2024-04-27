import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

const ProductItem = ({ item, deleteProd, navigation }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity onPress={toggleExpanded}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        {expanded && (
          <View style={styles.expandedContent}>
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Código de barras:</Text>
              <Text style={styles.info}>{item.barcode}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Marca:</Text>
              <Text style={styles.info}>{item.brand}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Precio de compra:</Text>
              <Text style={styles.info}>{item.cost}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Precio de venta:</Text>
              <Text style={styles.info}>{item.price}</Text>
            </View>
            <View style={styles.dataContainer}>
              <Text style={styles.label}>Existencias:</Text>
              <Text style={styles.info}>{item.stock}</Text>
            </View>
            <View style={styles.switchContainer}>
              <Text>Status</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={item.status ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                value={item.status}
                style={{ marginLeft: 12 }}
              />
            </View>
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProductFormScreen', { item: item })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonDelete]}
            onPress={() => deleteProd(item.barcode)}
          >
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  expandedContent: {
    marginBottom: 10,
  },
  dataContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  info: {
    flex: 1,
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  buttonDelete: {
    backgroundColor: '#F1480F',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductItem;