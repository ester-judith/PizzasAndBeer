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

  const handleCategoryPress = (categoryName) => {
    if (categoryName === 'Cocina') {
      navigation.navigate('Cocina', { category: categoryName, userId });
    } else if (categoryName === 'Frio') {
      navigation.navigate('Frio', { category: categoryName, userId });
    } else if (categoryName === 'Barra') {
      navigation.navigate('Barra', { category: categoryName, userId });
    } else if (categoryName === 'Limpieza') {
      navigation.navigate('Limpieza', { category: categoryName, userId });
    } else if (categoryName === 'Licores') {
      navigation.navigate('Licores', { category: categoryName, userId });
    } else if (categoryName === 'Desechables') {
      navigation.navigate('Desechables', { category: categoryName, userId });
    }
  };

  return (
    <ImageBackground
      source={require('./assets/images/backgroundtres.png')}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Image
              source={require('./assets/images/user-icon.png')}
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Bienvenido</Text>
            <Text style={styles.sucursalText}>Sucursal Monterrey</Text>
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
        <View style={styles.categoriesContainer}>
          <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategoryPress('Cocina')}>
            <Image
              source={require('./assets/images/cocina.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Cocina</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategoryPress('Frio')}>
            <Image
              source={require('./assets/images/cuartofrio.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Cuarto Frio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox}  onPress={() => handleCategoryPress('Barra')}>
            <Image
              source={require('./assets/images/barra.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Barra</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategoryPress('Limpieza')}>
            <Image
              source={require('./assets/images/limpieza.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Limpieza</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategoryPress('Licores')}>
            <Image
              source={require('./assets/images/licores.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Licores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryBox} onPress={() => handleCategoryPress('Desechables')}>
            <Image
              source={require('./assets/images/desechables.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>Desechables</Text>
          </TouchableOpacity>
        </View>

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
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
    color: 'white',
  },
  imageFrame: {
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderRadius: 20,
    overflow: 'hidden',
  },
  image: {
    width: 370,
    height: 200,
  },
  categoriesContainer: {
    marginBottom: 20,
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
    borderRadius: 30, // Makes the image circular
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