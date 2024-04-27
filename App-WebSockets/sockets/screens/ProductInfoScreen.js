import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  View,
  Pressable,
  Image,
  RefreshControl,
  Button,
  Alert
} from "react-native";
import { getAll, deleteOne } from "../api";
import { useNavigation } from "@react-navigation/native";

const ProductInfoScreen = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    const data = await getAll();
    setProducts(data);
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadProducts();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, []);

  console.log(products);

  const createButtonAlertB = (id) =>
  Alert.alert(
    "Eliminar",
    "El registro será eliminado", // Agrega la coma aquí
    [{ text: "OK", onPress: () => deleteProd(id) },
    { text: "Cancelar", onPress: () => console.log("Cancelar presionado") },]
  );

  const deleteProd = async (id) => { // Asegúrate de recibir el parámetro id
    console.log("ID a enviar para eliminar:", id); 
    const res = await deleteOne(id); 
    console.log(JSON.stringify(res));
   
  };
  


  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 10 : 0,
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={["#ffddd2"]}
            onRefresh={onRefresh}
          />
        }
      >
        <Text
          style={{
            color: "#FF6B6B",
            padding: 10,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Registros
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
          
        >
           
          {products.map((item, index) => (
            <View style={{ margin: 10, marginBottom:20 }}>
              <Image
                style={{ width: 160, height: 160, resizeMode: "contain", borderRadius:12}}
                source={{
                  uri:
                    item.nameSensor === "Fotorresistencia"
                      ? "https://images.pexels.com/photos/379954/pexels-photo-379954.jpeg?auto=compress&cs=tinysrgb&w=600"
                      : item.nameSensor === "Proximidad"
                        ? "https://images.pexels.com/photos/47040/meter-tape-measure-measure-gage-47040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        : item.nameSensor === "Potenciometro"
                          ? "https://m.media-amazon.com/images/I/61oz2+X0mSL._AC_UF894,1000_QL80_.jpg"
                          : "URL_IMAGEN_POR_DEFECTO"
                }}

              />
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style = {{ fontWeight: "bold", fontSize: 18 }}>Sensor</Text>
                <Text style = {{ fontWeight: "bold", fontSize: 18 }}>Valor</Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  marginBottom: 8,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontSize:16}}>{item?.nameSensor}</Text>
                <Text style={{ fontSize:16}}>{item?.value}</Text>
              </View>
              
              <Button 
              title="Eliminar"
              onPress={() => createButtonAlertB(item._id)}></Button>
            </View>

          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;
