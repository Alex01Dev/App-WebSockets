import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import ProductFormScreen from './screens/ProductFormScreen';
import HomeScreen from './screens/HomeScreen';
import EditProductFormScreen from './screens/EditProductFormScreen'
import { TouchableOpacity,Text } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#264653', // Color de fondo del encabezado
          },
          headerTintColor: '#fff', // Color del texto del encabezado
          headerTitleStyle: {
            fontWeight: 'bold', // Estilo del título del encabezado
          },
        }}
      >
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={({ navigation }) => ({
            title: 'GamesApp',
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("ProductFormScreen")}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#FFFF' }}>Nuevo</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="ProductFormScreen" 
          component={ProductFormScreen} 
          options={{ title: 'Agregar Juego' }}
        />
        <Stack.Screen 
          name="EditProductFormScreen" 
          component={EditProductFormScreen} 
          options={{ title: 'Editar Juego' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
