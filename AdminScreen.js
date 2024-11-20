import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import firebaseConfig from './firebase';

const AdminScreen = ({ navigation }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  SplashScreen.preventAutoHideAsync();

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

  const handleLogin = async () => {
    setLoading(true);

    try {
      const querySnapshot = await firebaseConfig.db.collection('user')
      .where('username','==',username)
      .where('password','==',password)
      .get();

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; 
        const userId = userDoc.id;
        
        const blockedUserIds = ['herradura','mexicali','monterrey','sexta','siete','veinte'];
        if (blockedUserIds.includes(userId)){
          Alert.alert('Acceso denegado', 'Tipo de usuario denegado');
          navigation.navigate('Login'); // Redirigir al Login si está bloqueado
          return;
        }

        Alert.alert('Inicio de sesión exitoso');
        navigation.navigate('MenuAdmin', { userId }); 
      } else {
        Alert.alert('Credenciales incorrectas');
      }
    } catch (error) {
      Alert.alert('Error al inicio de sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="yellow" />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/images/backgrounddos.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Login')}>
          <Image
            source={require('./assets/images/back-icon.png')} // Asegúrate de que la ruta sea correcta
            style={styles.backIcon}

          />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.infoText}>Verifica que eres administrador</Text>
        </View>

        <Image
          source={require('./assets/images/logo.jpg')}
          style={styles.logo}
        />

        <View style={styles.loginBox}>
          <View style={styles.loginTitleContainer}>
            <Text style={styles.loginTitle}>Verifica tu</Text>
            <Text style={styles.loginTitle}>cuenta</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Usuario"
            placeholderTextColor="white"
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
    top: 210,
    alignItems: 'center',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 50, 
    left: 20, 
    zIndex: 2, 
    padding: 10,
  },
  backIcon: {
    width: 50, 
    height: 50, 
  },
  welcomeText: {
    fontFamily: 'Babelgam',
    fontSize: 60,
    color: 'yellow',
  },
  infoText: {
    fontFamily: 'GeosansLight',
    color: 'black',
    fontSize: 32,
    marginTop: 0,
  },
  loginBox: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 50,
    width: '100%',
    alignItems: 'flex-start', 
    position: 'absolute',
    bottom: 50,
  },
  loginTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start', 
    marginBottom: 30, 
  },
  loginTitle: {
    fontFamily: 'Sublima',
    fontSize: 30,
    color: 'yellow',
    fontWeight: 'bold',
  },
  logo: {
    width: 400,
    height: 100,
    marginBottom: 20, 
    position: 'absolute', 
    top: 320, 
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  adminLink: {
    marginTop: 15,
    color: '#000',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});

export default AdminScreen;
