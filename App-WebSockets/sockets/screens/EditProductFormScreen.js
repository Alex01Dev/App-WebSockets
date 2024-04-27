import { View, Text,StyleSheet,TextInput,Button, ScrollView, Switch} from 'react-native'
import React,{useState, useEffect} from 'react'
import { updateOne } from '../api';

const EditProductFormScreen = ({navigation,route}) => {
  const {item}=route.params;
  const [productInfo, setProductInfo] = useState(null);
  console.log(item)
  const[product,setProduct]=useState({
    nombre:'',
    barcode:'',
    brand:'',
    price:0,
    cost:0,
    stock:0,
    expiredDate:'',
    status:0,
    statuss: false
})

useEffect(() => {
  setProductInfo(item);
  setProduct(item); 
}, [item]);

const handleChange =(name,value)=> setProduct({...product,[name]:value});
const [isEnabled, setIsEnabled] = useState(false);
const toggleSwitch = () => setIsEnabled(previousState => !previousState);
const changeB = (value) => handleChange('statuss', value)
const handleSwitchChange = (value) => {
  toggleSwitch(); 
  changeB(value);
};

const handleActualizarFormulario = async () => {
  const { barcode } = product; 
  console.log("Barcode a enviar:", barcode);
  const res = await updateOne(barcode, product);
  console.log(JSON.stringify(res));
  navigation.navigate('HomeScreen');
};
  return (
    <View style={styles.container}>
    <Text style={styles.titulo}>Editar Producto</Text>
    { productInfo ? (
        <ScrollView>
    <TextInput
      placeholder="Nombre del producto"
      value={product.nombre}
      onChangeText={(value) => handleChange('nombre',value)}
      style={styles.input}
    />
    <TextInput
      placeholder="Código de barras"
      value={product.barcode}
      onChangeText={(value) => handleChange('barcode',value)}
      style={styles.input}
    />
     <TextInput
      placeholder="Marca"
      value={product.brand}
      onChangeText={(value) => handleChange('brand',value)}
      style={styles.input}
    />
    <TextInput
      placeholder="Precio de compra"
      keyboardType='numeric'
      value={product.price ? product.price.toString() : 0}
      onChangeText={(value) => handleChange('price',parseInt(value))}
      style={styles.input}
    />
    <TextInput
      placeholder="Precio de venta"
      keyboardType='numeric'
      value={product.cost ? product.cost.toString() : 0}
      onChangeText={(value) => handleChange('cost',parseInt(value))}
      style={styles.input}
    />
    <TextInput
      placeholder="Existencias"
      keyboardType='numeric'
      value={product.stock ? product.stock.toString() : 0}
      onChangeText={(value) => handleChange('stock',parseInt(value))}
      style={styles.input}
    />
    <TextInput
      placeholder="Fecha de caducidad"
      value={product.expiredDate}
      onChangeText={(value) => handleChange('expiredDate',value)}
      style={styles.input}
    />
    <TextInput
      placeholder="Estatus"
      keyboardType='numeric'
      value={product.status ? product.status.toString() : 0}
      onChangeText={(value) => handleChange('status',parseInt(value))}
      style={styles.input}
    />
    <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={product.statuss ? "#f5dd4b" : "#f4f3f4"}
              onValueChange={handleSwitchChange}
              ios_backgroundColor="#3e3e3e"
              value={product.statuss}
            />
    <Button
      title="Enviar"
      onPress={handleActualizarFormulario}
      style={styles.button}
    />
  
  </ScrollView>
    ) :(<Text>Este estudiante fue eliminado</Text>)
  }
  </View>
);
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:"#ffddd2",
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  textInputContainer: {
    marginBottom: 20,
    
  },
  input: {
    height: 40,
    borderColor: '#e29578',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    width:'40%'
  },
  buttonText: {
   
  },
});
export default EditProductFormScreen