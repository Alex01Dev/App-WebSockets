import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Switch, Animated, TouchableOpacity } from 'react-native';
import { insertOne } from '../api';
import DateTimePicker from '@react-native-community/datetimepicker'; // Importa el componente DatePicker

const ProductFormScreen = ({ navigation }) => {
  const [product, setProduct] = useState({
    barcode: '',
    name: '',
    brand: '',
    price: 0,
    cost: 0,
    stock: 0,
    premierDate: new Date(), // Establece la fecha actual como valor inicial
    status: false
  });

  const [showDatePicker, setShowDatePicker] = useState(false); // Estado para controlar la visibilidad del DatePicker

  const handleChange = (name, value) => setProduct({ ...product, [name]: value });

  const handleEnviarFormulario = async () => {
    const res = await insertOne(product);
    console.log(product);
    console.log(JSON.stringify(product));
    navigation.navigate('HomeScreen');
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // Animaciones
  const animacionEntrada = new Animated.Value(0);

  Animated.timing(animacionEntrada, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true
  }).start();

  const entradaAnimada = {
    opacity: animacionEntrada
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || product.premierDate;
    setShowDatePicker(false);
    setProduct({ ...product, premierDate: currentDate });
  };

  return (
    <Animated.View style={[styles.container, entradaAnimada]}>
      <Text style={styles.titulo}>Nuevo Juego</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nombre del Juego"
          onChangeText={(text) => handleChange('name', text)}
          style={styles.input}
        />
        {/* Muestra el DatePicker cuando se presiona el TextInput */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            placeholder="Fecha de lanzamiento"
            value={product.premierDate.toLocaleDateString()}
            editable={false}
            style={styles.input}
          />
        </TouchableOpacity>
        {/* Renderiza el DatePicker cuando showDatePicker es true */}
        {showDatePicker && (
          <DateTimePicker
            value={product.premierDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        <TextInput
          placeholder="Código de barras"
          onChangeText={(text) => handleChange('barcode', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Marca"
          onChangeText={(text) => handleChange('brand', text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Precio de compra"
          keyboardType='numeric'
          onChangeText={(text) => handleChange('price', parseInt(text))}
          style={styles.input}
        />
        <TextInput
          placeholder="Precio de venta"
          keyboardType='numeric'
          onChangeText={(text) => handleChange('cost', parseInt(text))}
          style={styles.input}
        />
        <TextInput
          placeholder="Existencias"
          keyboardType='numeric'
          onChangeText={(text) => handleChange('stock', parseInt(text))}
          style={styles.input}
        />
        <View style={styles.switchContainer}>
          <Text>Status</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            style={{ marginLeft: 12 }} // Alinea el switch a la izquierda
          />
        </View>
      </View>
      <TouchableOpacity onPress={handleEnviarFormulario}>
        <Animated.View style={[styles.buttonContainer, entradaAnimada]}>
          <Text style={styles.buttonText}>Enviar</Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fb8500",
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    color: '#FFF'
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFF',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#e9edc9',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '100%',
    fontSize: 16,
    color: '#FFFF',
    textAlign: 'center'
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#FF5733',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProductFormScreen;
