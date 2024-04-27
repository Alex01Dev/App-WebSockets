import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductFormScreen from './screens/ProductFormScreen';
import HomeScreen from './screens/HomeScreen';
import ActivateActuator from './screens/ActivateActuator';
import HomeAliScreen from './screens/HomeAliScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ProductInfoScreen from './screens/ProductInfoScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const App = () => {

  function BottomsTabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomeAliScreen"
          component={HomeAliScreen}
          options={{
            tabBarLabel: 'Inicio',
            tabBarLabelStyle: { color: '#FF6B6B' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="home" size={24} color="black" />
              ) : (
                <Entypo name="home" size={24} color="#6B6054" />
              ),
          }}
        />
        <Tab.Screen
          name="Ver registros"
          component={ProductInfoScreen}
          options={{
            tabBarLabel: 'Ver registros',
            tabBarLabelStyle: { color: '#FF6B6B' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Feather name="list" size={24} color="black" />
              ) : (
                <Feather name="list" size={24} color="#6B6054" />
              ),
          }}
        />
        <Tab.Screen
          name="ActivateActuator"
          component={ActivateActuator}
          options={{
            tabBarLabel: 'Activar/Desactivar',
            tabBarLabelStyle: { color: '#FF6B6B' },
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="poweroff" size={24} color="black" />
              ) : (
                <FontAwesome name="power-off" size={24} color="#6B6054" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={BottomsTabs} />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: 'Tienda de ropa',
            headerTitleStyle: { fontWeight: 'bold' },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('ProductFormScreen')}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Nuevo</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductFormScreen"
          component={ProductFormScreen}
          options={{
            title: 'Agregar producto',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="ActivateActuator"
          component={ActivateActuator}
          options={{
            title: 'Comunicación con la ESP',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
        <Stack.Screen
          name="ProductInfoScreen"
          component={ProductInfoScreen}
          options={{
            title: 'Registros guardados',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
