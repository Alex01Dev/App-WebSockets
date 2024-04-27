import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
  View,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Button,
  TextInput,
  StatusBar,
  Alert
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { insertOne } from "../api";

const HomeScreen = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [ProximityData, setProximityData] = useState(0);
  const [PotentiometerData, setPotentiometerData] = useState(0);
  const [PhotoresistorData, setPhotoresistorData] = useState(0);
  const [BuzzerData, setBuzzerData] = useState(false);

  useEffect(() => {
    const socket = new WebSocket('ws://192.168.1.135:81');

    socket.onopen = () => {
      console.log("Conectado al servidor WebSocket");
      setIsConnected(true);
    };

    socket.onmessage = function (e) {
      const data = JSON.parse(e.data);

      setProximityData(data.Proximity);
      setPotentiometerData(Math.floor(data.Potentiometer));
      setPhotoresistorData(data.Photoresistor);
      setBuzzerData(data.Buzzer);
    };

    return () => {
      socket.close();
    };
  }, []);

  const labels = {
    proximidad: "Proximidad",
    potenciometro: "Potenciometro",
    fotoresistencia: "Fotorresistencia",
  };

  const createButtonAlertB = (id) =>
    Alert.alert("Registro", "Se registraron los datos exitosamente", [
      { text: "OK", onPress: () => console.log("Datos registrados") },
    ]);

  const enviarDatos = async () => {
    const newData = [
      {
        nameSensor: labels.proximidad,
        value: ProximityData,
      },
      {
        nameSensor: labels.potenciometro,
        value: PotentiometerData,
      },
      {
        nameSensor: labels.fotoresistencia,
        value: PhotoresistorData,
      },
    ];

   
    const datos = await insertOne(newData);
    console.log(datos)
    //rrconsole.log("Datos enviados:", newData);
    createButtonAlertB();
  };
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
  }, []);

  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 10 : 0,
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}> Proyecto Final</Text>
        <Text style={styles.status}>
          {isConnected ? "CONECTADO" : "NO CONECTADO"}
        </Text>

        <View style={styles.card}>
          <Text style={styles.bigNumber}>{PhotoresistorData}</Text>
          <Text>{`${labels.fotoresistencia}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.bigNumber}>{ProximityData}</Text>
          <Text>{`${labels.proximidad}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.bigNumber}>{PotentiometerData}</Text>
          <Text>{`${labels.potenciometro}`}</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={enviarDatos}>
          <Text style={styles.buttonText}>Enviar datos</Text>
        </TouchableOpacity>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  card: {
    backgroundColor: "#EFEFEF",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: "center", 
  },
  bigNumber: {
    color: "#BB342F", 
    marginBottom: 5, 
    fontSize:54
  },
  button: {
    backgroundColor: "#102542",
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    color: "#102542",
    fontSize: 30,
    textAlign: "center",
  },
  status: {
    color: "#A91515",
    fontSize: 24,
    textAlign:'center'
  },
});

export default HomeScreen;
