import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Switch,
  ScrollView,
} from "react-native";
import { insertOne } from "../api";
import DropDownPicker from "react-native-dropdown-picker";
const ProductFormScreen = ({ navigation }) => {
  const [product, setProduct] = useState({
    barcode: "",
    name: "",
    image: "",
    color: "",
    category: "",
    brand: "",
    size: "",
    price: 0,
    stock: 0,
  });
  const handleChange = (name, value) =>
    setProduct({ ...product, [name]: value });
  const handleEnviarFormulario = async () => {
    const res = await insertOne(product);
    console.log(JSON.stringify(product));
    setProduct({
      barcode: "",
      name: "",
      image: "",
      color: "",
      category: "",
      brand: "",
      size: "",
      price: 0,
      stock: 0,
    });
    navigation.replace("Main");
  };
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("Damas");
  const [items, setItems] = useState([
    { label: "Damas", value: "Damas" },
    { label: "Caballeros", value: "Caballeros" },
    { label: "Niñas", value: "Niñas" },
    { label: "Niños", value: "Niños" },
  ]);
  const [size, setSize] = useState("ECH");
  const [itemsSize, setItemsSize] = useState([
    { label: "ECH", value: "ECH" },
    { label: "CH", value: "CH" },
    { label: "M", value: "M" },
    { label: "G", value: "G" },
    { label: "EG", value: "EG" },
  ]);

  const onGenderOpen = useCallback(() => {
    setCompanyOpen(false);
  }, []);
  return (
    <ScrollView>
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom:24 }}>
          Agregar nuevo producto
        </Text>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {" "}
            Código de barras
          </Text>
          <TextInput
            onChangeText={(text) => handleChange("barcode", text)}
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}> Nombre</Text>
          <TextInput
            onChangeText={(text) => handleChange("name", text)}
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            URL de la imagen
          </Text>
          <TextInput
            onChangeText={(text) => handleChange("image", text)}
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Color de la prenda
          </Text>
          <TextInput
            onChangeText={(text) => handleChange("color", text)}
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>Categoría</Text>
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 15,
              marginTop: 20,
            }}
            open={open}
            value={category}
            items={items}
            setOpen={setOpen}
            setValue={setCategory}
            setItems={setItems}
            placeholder="Elige la categoría"
            onOpen={onGenderOpen}
            onChangeValue={(text) => handleChange("category", text)}
            zIndex={3000}
            zIndexInverse={1000}
          ></DropDownPicker>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
           Marca
          </Text>
          <TextInput
            onChangeText={(text) => handleChange("brand", text)}
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Talla
          </Text>
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              height: 30,
              marginBottom: open ? 120 : 15,
              marginTop: 20,
            }}
            open={open}
            value={size}
            items={itemsSize}
            setOpen={setOpen}
            setValue={setSize}
            setItems={setItemsSize}
            placeholder="Elige la talla"
            onOpen={onGenderOpen}
            onChangeValue={(text) => handleChange("size", text)}
            zIndex={3000}
            zIndexInverse={1000}
          ></DropDownPicker>
        </View>

        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Precio de la prenda
          </Text>
          <TextInput
          keyboardType='numeric'
             onChangeText={(text) => handleChange('price',parseInt(text))}
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Stock
          </Text>
          <TextInput
             onChangeText={(text) => handleChange('stock',parseInt(text))}
             keyboardType='numeric'
            style={{
              padding: 10,
              borderColor: "#0F8B8D",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />
        </View>
        <Button title="Enviar" onPress={handleEnviarFormulario} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffddd2",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  textInputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#e29578",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    width: "40%",
  },
  buttonText: {},
});

export default ProductFormScreen;
