import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import AdminScreen from './AdminScreen';
import MenuScreen from './MenuScreen';
import MenuAdminScreen from './MenuAdminScreen'
import ProductosScreen from './ProductosScreen'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Admin" 
          component={AdminScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Menu" 
          component={MenuScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="MenuAdmin" 
          component={MenuAdminScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Productos" 
          component={ProductosScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
