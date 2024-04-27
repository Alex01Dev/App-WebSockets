import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';

const ActivateActuator = () => {
    const [buzzerState, setBuzzerState] = useState(false);
    const [socketConnection, setSocketConnection] = useState(null);

    useEffect(() => {
        console.log('Intentando conectar al servidor WebSocket del buzzer');
        const newSocket = new WebSocket('ws://192.168.1.135:81');

        newSocket.onopen = () => {
            console.log('Conectado al servidor WebSocket del Buzzer');
            setSocketConnection(newSocket);
        };

        newSocket.onclose = () => {
            console.log('Desconectado del servidor WebSocket');
            setSocketConnection(null);
        };

        newSocket.onmessage = (event) => {
            handleWebSocketMessage(event); 
        };

        return () => {
            if (socketConnection) {
                socketConnection.close();
            }
        };
    }, []);

    const toggleSwitchBuzzer = () => {
        if (socketConnection && socketConnection.readyState === WebSocket.OPEN) {
            console.log("Enviando datos al servidor del buzzer");
            const newBuzzerState = !buzzerState; 
            setBuzzerState(newBuzzerState); 
            const message = newBuzzerState ? 'true' : 'false';
            socketConnection.send(message);
            console.log("Mensaje enviado al servidor del buzzer");
        } else {
            console.error("Error: La conexión con el servidor no está disponible.");
        }
    };

    const handleWebSocketMessage = (event) => {
        const receivedMessage = event.data;
        // console.log('Mensaje recibido del servidor WebSocket:', receivedMessage);
        if (receivedMessage === '0') {
            setBuzzerState(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' }}>
                Encender/Apagar Buzzer
            </Text>
            <View style={{ padding: 10 }}>
                <View style={{ alignItems: 'center', marginBottom: 30 }}>
                    <Image
                        style={{ width: 200, height: 200, resizeMode: 'contain' }}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5799/5799959.png' }}
                    />
                </View>
            </View>
            <View style={styles.switchContainer}>
                <Text style={{ fontSize: 28 }}>Alarma</Text>
                <Switch
                    trackColor={{ false: '#BB342F', true: '#737397' }}
                    thumbColor={buzzerState ? '#000000' : '#F4160F'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitchBuzzer}                    
                    value={buzzerState}
                    style={{ marginLeft: 12 }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    }
});

export default ActivateActuator;
