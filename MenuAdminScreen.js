import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const MenuScreen = ({ navigation, route }) => {
  const { userId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);

  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Babelgam: require('./assets/fonts/Babelgam.ttf'),
    GeosansLight: require('./assets/fonts/Geosans-Light.ttf'),
    Sublima: require('./assets/fonts/Sublima.ttf'),
    Sanuroemi: require('./assets/fonts/Sanuroemi.ttf'),
    Rosmatika: require('./assets/fonts/Rosmatika.ttf'),
  });

  useEffect(() => {
    const hideSplash = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplash();
  }, [fontsLoaded]);

  const handleLogout = () => {
    setModalVisible(false);
    navigation.navigate('Login');
  };

  return (
    <ImageBackground
      source={require('./assets/images/backgroundtres.png')}
      style={styles.background}
    >
      {/* Contenido Fijo */}
      <View style={styles.headerContainer}>
        <TouchableOpacity>
          <Image
            source={require('./assets/images/user-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Bienvenido</Text>
          <Text style={styles.sucursalText}>Administrador</Text>
        </View>

        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Buscar..."
        placeholderTextColor="#888"
      />

      <View style={styles.imageFrame}>
        <Image
          source={require('./assets/images/comida.jpg')} 
          style={styles.image}
        />
      </View>

      {/* ScrollView solo para las categorías */}
      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        <TouchableOpacity style={styles.categoryBox}>
          <Image
            source={require('./assets/images/cocina.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sucursal 7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
          <Image
            source={require('./assets/images/cuartofrio.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sucursal 6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
          <Image
            source={require('./assets/images/barra.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sucursal 20</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
          <Image
            source={require('./assets/images/limpieza.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sucursal 26</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
          <Image
            source={require('./assets/images/licores.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sucursal Monterrey</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBox}>
          <Image
            source={require('./assets/images/desechables.png')}
            style={styles.categoryImage}
          />
          <Text style={styles.categoryText}>Sucursal SL Ar</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Opciones</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 60,
    height: 60,
    marginHorizontal: 8, 
  },
  welcomeContainer: {
    alignItems: 'center', 
    flex: 1, 
  },
  welcomeText: {
    color: 'yellow', 
    fontSize: 30,
    fontFamily: 'Sanuroemi',
  },
  sucursalText: {
    color: '#219521', 
    fontSize: 20,
    fontFamily: 'Rosmatika',
  },
  logoutText: {
    color: 'white', 
    fontSize: 20,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 20,
    color: 'white',
  },
  imageFrame: {
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 370,
    height: 200,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
  },
  categoryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 40,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  categoryText: {
    color: 'white',
    fontSize: 25,
    marginLeft: 20,
    fontFamily: 'Rosmatika'
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  closeButtonText: {
    color: 'blue',
    fontSize: 16,
    marginTop: 10,
  },
});

export default MenuScreen;
