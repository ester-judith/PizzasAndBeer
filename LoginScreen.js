import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const LoginScreen = ({ navigation, onLoginSuccess }) => { 
  const [username, setUsername] = useState('sucmonterrey');
  const [password, setPassword] = useState('');

  SplashScreen.preventAutoHideAsync();

  // Cargar las fuentes
  const [fontsLoaded] = useFonts({
    Babelgam: require('./assets/fonts/Babelgam.ttf'),
    GeosansLight: require('./assets/fonts/Geosans-Light.ttf'),
    Sublima: require('./assets/fonts/Sublima.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync(); 
    }
  }, [fontsLoaded]);

  const handleLogin = () => {
    if (username === 'sucmonterrey' && password === 'password123') {
      Alert.alert('Inicio de sesión exitoso');
      navigation.navigate('Menu'); 
    } else {
      Alert.alert('Credenciales incorrectas');
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="yellow" />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.infoText}>Inicia sesión para continuar</Text>
        </View>

        <View style={styles.loginBox}>
          <Image
            source={require('./assets/images/logo.jpg')}
            style={styles.logo}
          />
          <Text style={styles.loginTitle}>Iniciar sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="#FFD700"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="white"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Iniciar sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Admin')}>
            <Text style={styles.adminLink}>Administrador</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 155,
    alignItems: 'center',
    zIndex: 1,
  },
  welcomeText: {
    fontFamily: 'Babelgam',
    fontSize: 60,
    color: 'yellow',
  },
  infoText: {
    fontFamily: 'GeosansLight',
    color: 'white',
    fontSize: 35,
    marginTop: 0,
  },
  loginBox: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 50,
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 140,
  },
  loginTitle: {
    fontFamily: 'Sublima',
    fontSize: 30,
    color: '#003B9B',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 100,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#6B0301',
    marginBottom: 20,
    color: 'white',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'yellow',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  adminLink: {
    marginTop: 15,
    color: '#000',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
