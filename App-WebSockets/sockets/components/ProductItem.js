import { View, Text,StyleSheet,TouchableOpacity, Switch} from 'react-native'
import React from 'react'
import { isEnabled } from 'react-native/Libraries/Performance/Systrace'

const ProductItem = ({item,deleteProd,navigation}) => {
 
  return (
    <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.nombre}>{item.nombre}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.textItem}>Código de barras: {item.barcode}</Text>
            <Text style={styles.textItem}>Marca: {item.brand}</Text>
            <Text style={styles.textItem}>Precio de compra: {item.cost}</Text>
            <Text style={styles.textItem}>Precio de venta: {item.price}</Text>
            <Text style={styles.textItem}>Fecha de caducidad: {item.expiredDate}</Text>
            <Text style={styles.textItem}>Existencias: {item.stock}</Text>
            <Text style={styles.textItem}>Activo: {item.status}</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={item.statuss ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={item.statuss}
            />
          </View>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
                style={styles.buttonEdit}
                onPress={() => {
                  navigation.navigate('EditProductFormScreen',{item:item})}
                  }>
                <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity
                style={styles.buttonDelete}
                onPress={()=> deleteProd(item.barcode)}>
                <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity>
          </View>
           
       </View>
  )
}
const styles = StyleSheet.create({
  
    card: {
      backgroundColor:'#e29578',
      borderRadius: 10,
      marginBottom: 10,
      padding: 10,
    },
    cardHeader: {
      borderBottomWidth: 2,
      borderBottomColor: '#ddd',
      paddingBottom: 5,
      marginBottom: 5,
    },
    description: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    cardBody: {
      marginBottom: 5,
    },
    textItem: {
      fontSize: 14,
    }, 
    buttonContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    buttonEdit: {
      backgroundColor: '#A2A4A0', 
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      width:'30%'
    },
    buttonDelete:{
        backgroundColor: '#F1480F', 
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        width:'30%'
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
export default ProductItem