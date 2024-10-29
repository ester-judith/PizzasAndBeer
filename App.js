import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import AdminScreen from './AdminScreen';
import MenuScreen from './MenuScreen';
import MenuAdminScreen from './MenuAdminScreen'
import CocinaScreen from './CocinaScreen'
import FrioScreen from './FrioScreen';
import BarraScreen from './BarraScreen';
import LimpiezaScreen from './LimpiezaScreen';
import LicoresScreen from './LicoresScreen';
import DesechablesScreen from './DesechablesScreen';

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
          name="Cocina" 
          component={CocinaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Frio" 
          component={FrioScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Barra" 
          component={BarraScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Limpieza" 
          component={LimpiezaScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Licores" 
          component={LicoresScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Desechables" 
          component={DesechablesScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
