import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, Switch } from 'react-native';
import { updateOne } from '../api';
import * as Animatable from 'react-native-animatable';

const EditProductFormScreen = ({ navigation, route }) => {
  const { item } = route.params;
  const [product, setProduct] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    setProduct(item);
  }, [item]);

  const handleChange = (name, value) => setProduct({ ...product, [name]: value });

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
    handleChange('status', !isEnabled);
  };

  const handleActualizarFormulario = async () => {
    const { barcode } = product;
    const res = await updateOne(barcode, product);
    console.log(JSON.stringify(res));
    navigation.navigate('HomeScreen');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Editar Producto</Text>
      {product ? (
        <Animatable.View animation="fadeInUp" duration={1000} style={styles.formContainer}>
          <TextInput
            placeholder="Nombre del producto"
            value={product.name}
            onChangeText={(value) => handleChange('name', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Código de barras"
            value={product.barcode}
            onChangeText={(value) => handleChange('barcode', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Marca"
            value={product.brand}
            onChangeText={(value) => handleChange('brand', value)}
            style={styles.input}
          />
          <TextInput
            placeholder="Precio de compra"
            keyboardType="numeric"
            value={product.price ? product.price.toString() : '0'}
            onChangeText={(value) => handleChange('price', parseInt(value))}
            style={styles.input}
          />
          <TextInput
            placeholder="Precio de venta"
            keyboardType="numeric"
            value={product.cost ? product.cost.toString() : '0'}
            onChangeText={(value) => handleChange('cost', parseInt(value))}
            style={styles.input}
          />

         <TextInput
            placeholder="Fecha de Estreno"
            keyboardType="numeric"
            value={product.cost ? product.cost.toString() : '0'}
            onChangeText={(value) => handleChange('cost', parseInt(value))}
            style={styles.input}
          />

          <TextInput
            placeholder="Existencias"
            keyboardType="numeric"
            value={product.stock ? product.stock.toString() : '0'}
            onChangeText={(value) => handleChange('stock', parseInt(value))}
            style={styles.input}
          />
          <View style={styles.switchContainer}>
            <Text style={{ marginRight: 10 }}>Status</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <Animatable.View animation="fadeInUp" delay={500} style={styles.buttonContainer}>
            <Button title="Enviar" onPress={handleActualizarFormulario} style={styles.button} />
          </Animatable.View>
        </Animatable.View>
      ) : (
        <Text style={styles.errorText}>Este producto fue eliminado</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#212121',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5733',
    textTransform: 'uppercase',
  },
  formContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#424242',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 50,
    borderColor: '#FF5733',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
    fontSize: 16,
    color: '#FFF',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorText: {
    color: '#FF5733',
    fontSize: 18,
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
  },
});

export default EditProductFormScreen;
