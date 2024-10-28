import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const MenuScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantities, setQuantities] = useState({}); // Estado para manejar la cantidad de cada producto

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

  // Función para incrementar la cantidad del producto
  const increaseQuantity = (productName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: (prevQuantities[productName] || 1) + 1, // Incrementa la cantidad
    }));
  };

  // Función para disminuir la cantidad del producto
  const decreaseQuantity = (productName) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productName]: Math.max((prevQuantities[productName] || 1) - 1, 1), // No permite valores menores a 1
    }));
  };

  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        {/* Back Icon */}
        <TouchableOpacity>
          <Image
            source={require('./assets/images/back-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Cocina</Text>

        {/* Check Icon */}
        <TouchableOpacity>
          <Image
            source={require('./assets/images/check-icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar producto"
        placeholderTextColor="#888"
      />

      {/* Product Grid */}
      <ScrollView contentContainerStyle={styles.productGrid}>
        <View style={styles.productItem}>
          <Image
            source={require('./assets/images/logo.jpg')}
            style={styles.productImage}
          />
          <Text style={styles.productText}>Aceite Oliva</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => decreaseQuantity('Aceite Oliva')}
            >
              <Text style={styles.controlButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>
              {quantities['Aceite Oliva'] || 1}
            </Text>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => increaseQuantity('Aceite Oliva')}
            >
              <Text style={styles.controlButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Puedes repetir el código anterior para otros productos */}
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
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    color: 'yellow',
    fontSize: 30,
    fontFamily: 'Sanuroemi',
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 18,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '50%',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  productText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlButtonText: {
    fontSize: 18,
    color: 'black',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 18,
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
