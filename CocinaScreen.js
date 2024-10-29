import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import firebaseConfig from './firebase';

const CocinaScreen = ({ navigation, route }) => {
  const { userId, category } = route.params;
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        console.log("Obteniendo productos en la categoria:", category);
        console.log("User ID: ", userId);
        const querySnapshot = await firebaseConfig.db
          .collection('user')
          .doc(userId)
          .collection('productos')
          .get();

        console.log("Cantidad de documentos encontrados:", querySnapshot.size);
        const productsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log("Producto encontrado:", data);
          return {
            id: doc.id,
            ...data,
          };
        });

        // Filtrar productos por la categoría "cocina"
        const filteredProducts = productsData.filter(product => product.categoria && product.categoria.toLowerCase() === 'cocina');
        console.log("Productos filtrados:", filteredProducts);
        setProducts(filteredProducts);

        if (filteredProducts.length === 0) {
          Alert.alert("No se encontraron productos en la categoría cocina.");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [userId, category]);

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));
      return date.toLocaleDateString();
    }
    return 'Fecha no disponible';
  };

  // Filtrar productos basado en el texto de búsqueda
  const filteredProducts = products.filter(product => {
    return product.nombreProducto.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Menu')}>
          <Image source={require('./assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Cocina</Text>

        <TouchableOpacity>
          <Image source={require('./assets/images/check-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.searchBar} 
        placeholder="Buscar producto" 
        placeholderTextColor="#888" 
        value={searchText}
        onChangeText={text => setSearchText(text)} // Actualiza el estado de búsqueda
      />

      {loading ? (
        <Text style={styles.loadingText}>Cargando productos...</Text>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <View key={product.id} style={styles.productItem}>
                <Text style={styles.productName}>{product.nombreProducto}</Text>
                <Text style={styles.productDate}>{formatDate(product.LastUp)}</Text>
                <Text style={styles.productCategory}>{product.categoria}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noProductsText}>No hay productos disponibles en esta categoría.</Text>
          )}
        </ScrollView>
      )}

      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Opciones</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
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
  loadingText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  productItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDate: {
    fontSize: 14,
    color: 'gray',
  },
  productCategory: {
    fontSize: 14,
    color: 'blue',
  },
  noProductsText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
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
  backIcon: {
    width: 50, 
    height: 50, 
  },
});

export default CocinaScreen;
