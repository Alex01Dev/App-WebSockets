#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WebSocketsServer.h>
#include <ESP8266WebServer.h>

#define TRIGGER_PIN D2
#define ECHO_PIN D3
#define POTENTIOMETER_PIN A0
#define PHOTORESISTOR_PIN D5
#define BUZZER_PIN D4

float humidity = 0.0;
float temperature = 0.0;

String sensorData = "";

int proximityValue = 0;
int potentiometerValue = 0;
int photoresistorValue = 0;
int buzzerValue = 0;

ESP8266WiFiMulti WiFiMulti;
ESP8266WebServer server(80);
WebSocketsServer webSocket = WebSocketsServer(81); // Aquí se declara webSocket globalmente

void webSocketEvent(uint8_t num, WStype_t type, uint8_t * payload, size_t length) {
    switch (type) {
        case WStype_DISCONNECTED:
            Serial.printf("[%u] Disconnected!\n", num);
            break;

        case WStype_CONNECTED: {
            IPAddress ip = webSocket.remoteIP(num);
            Serial.printf("[%u] Connected from %d.%d.%d.%d url: %s\n", num, ip[0], ip[1], ip[2], ip[3], payload);
        }
        break;

        case WStype_TEXT:
            Serial.printf("[%u] get Text: %s\n", num, payload);
            if (strcmp((const char*)payload, "toggleBuzzer") == 0) {
                digitalWrite(BUZZER_PIN, !digitalRead(BUZZER_PIN));
                webSocket.sendTXT(num, "Buzzer toggled");
            } else if (strcmp((const char*)payload, "true") == 0) {
                digitalWrite(BUZZER_PIN, HIGH);
                webSocket.sendTXT(num, "Buzzer encendido");
            } else {
                digitalWrite(BUZZER_PIN, LOW);
                webSocket.sendTXT(num, "Buzzer apagado");
            }
            break;
            
        case WStype_BIN:
            Serial.printf("[%u] get binary length: %u\n", num, length);
            hexdump(payload, length);
            break;
    }
}

void setup() {
    Serial.begin(9600);
    
    pinMode(TRIGGER_PIN, OUTPUT);
    pinMode(ECHO_PIN, INPUT);
    pinMode(POTENTIOMETER_PIN, INPUT);
    pinMode(PHOTORESISTOR_PIN, INPUT);
    pinMode(BUZZER_PIN, OUTPUT);
    digitalWrite(BUZZER_PIN, LOW);

    WiFiMulti.addAP("INFINITUM973B", "pAVvzFd2hb");

    while (WiFiMulti.run() != WL_CONNECTED) {
        Serial.print(".");
        delay(100);
    }

    Serial.println(WiFi.localIP());

    webSocket.begin();
    webSocket.onEvent(webSocketEvent); 

    server.begin();
}

void loop() {
    webSocket.loop();
    server.handleClient();
    Serial.println(WiFi.localIP());

    long duration, distance;
    digitalWrite(TRIGGER_PIN, LOW);
    delayMicroseconds(2);
    digitalWrite(TRIGGER_PIN, HIGH);
    delayMicroseconds(10);
    digitalWrite(TRIGGER_PIN, LOW);
    duration = pulseIn(ECHO_PIN, HIGH);
    distance = (duration / 2) / 29.1;

    proximityValue = distance;
    potentiometerValue = analogRead(POTENTIOMETER_PIN);
    photoresistorValue = analogRead(PHOTORESISTOR_PIN);
    buzzerValue = digitalRead(BUZZER_PIN);

    // Create JSON object
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["Proximity"] = proximityValue;
    jsonDoc["Potentiometer"] = potentiometerValue;
    jsonDoc["Photoresistor"] = photoresistorValue;
    jsonDoc["Buzzer"] = buzzerValue;

    // Convert JSON object to string
    String jsonStr;
    serializeJson(jsonDoc, jsonStr);

    // Send JSON to all clients
    webSocket.broadcastTXT(jsonStr);
    Serial.println(jsonStr);

    serialEvent();
}

void serialEvent() {
    while (Serial.available()) {
        char command = Serial.read();
        switch (command) {
            case '1':
                digitalWrite(BUZZER_PIN, HIGH);
                Serial.println("Buzzer encendido");
                break;
            case '0':
                digitalWrite(BUZZER_PIN, LOW);
                Serial.println("Buzzer apagado");
                break;
            default:
                Serial.println("Comando no reconocido");
                break;
        }
    }
}
