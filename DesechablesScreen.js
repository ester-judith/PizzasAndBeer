import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import firebaseConfig from './firebase';

const DesechablesScreen = ({ navigation, route }) => {
  const { userId, category } = route.params;
  const [products, setProducts] = useState([]);
  const [editedStocks, setEditedStocks] = useState({});
  const [searchText, setSearchText] = useState('');
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
        const querySnapshot = await firebaseConfig.db
          .collection('user')
          .doc(userId)
          .collection('productos')
          .get();

        const productsData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        const filteredProducts = productsData.filter(product => product.categoria && product.categoria.toLowerCase() === 'desechables');
        setProducts(filteredProducts);

        if (filteredProducts.length === 0) {
          Alert.alert("No se encontraron productos en la categoría cocina.");
        }
      } catch (error) {
        Alert.alert("Error", "No se pudieron cargar los productos. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [userId, category]);

  const handleStockChange = (productId, value) => {
    // Permitir temporalmente valores vacíos o solo con un punto decimal
    if (value === '' || value === '.') {
      setEditedStocks({
        ...editedStocks,
        [productId]: value, // Guardar el valor de texto temporalmente
      });
      return;
    }
  
    // Convertir a decimal si es un número válido y >= 0
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue) && numericValue >= 0) {
      const valueWithLimit = value.length <= 3 ? value : value.slice(0, 3);
      setEditedStocks({
        ...editedStocks,
        [productId]: valueWithLimit, // Mantenerlo como texto en el estado
      });
    }
  };

  const handleUpdateStock = async () => {
    try {
      const updates = products.map(async product => {
        const stockValue = editedStocks[product.id];
        if (stockValue !== undefined && stockValue !== '') {
          // Convertir a número antes de guardar en la base de datos
          const numericStock = parseFloat(stockValue);
          
          await firebaseConfig.db
            .collection('user')
            .doc(userId)
            .collection('productos')
            .doc(product.id)
            .update({
              stock: numericStock, // Guardar como número
              LastUp: new Date(), // Actualizar la fecha
            });
        }
      });
  
      await Promise.all(updates);
      Alert.alert("Actualización exitosa", "El stock ha sido actualizado.");
      setEditedStocks({}); // Limpiar el estado editado
    } catch (error) {
      Alert.alert("Error", "No se pudo actualizar el stock. Intenta de nuevo.");
    }
  };

  const formatDate = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));
      return date.toLocaleDateString();
    }
    return 'Fecha no disponible';
  };

  // Filtrar productos basado en el texto de búsqueda
  const filteredProducts = products.filter(product => {
    return product.nombreProducto && 
           product.nombreProducto.toLowerCase().includes(searchText.toLowerCase());
  });

  const renderItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.nombreProducto}</Text>
      <Text style={styles.label}>Stock:</Text>
      <TextInput
        style={styles.stockInput}
        keyboardType="numeric"
        value={editedStocks[item.id] ?? ' '}
        onChangeText={(value) => handleStockChange(item.id, value)}
      />
      <Text style={styles.productDate}>Última actualización: {formatDate(item.LastUp)}</Text>
    </View>
  );

  return (
    <View style={styles.background}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Menu', {userId})}>
          <Image source={require('./assets/images/back-icon.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Desechables</Text>

        <TouchableOpacity onPress={handleUpdateStock}>
          <Image source={require('./assets/images/check-icon.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TextInput 
        style={styles.searchBar} 
        placeholder="Buscar producto" 
        placeholderTextColor="#888" 
        value={searchText}
        onChangeText={text => setSearchText(text)}
      />

      {loading ? (
        <Text style={styles.loadingText}>Cargando productos...</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2} // Establece el número de columnas
          contentContainerStyle={styles.gridContainer}
        />
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
  gridContainer: {
    paddingBottom: 20,
  },
  productItem: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '45%', // Controla el ancho de cada celda para que quepan en la grid
    marginRight: '5%', // Espacio entre las columnas
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 14,
    color: 'blue',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  stockInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    fontSize: 16,
  },
  productDate: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
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

export default DesechablesScreen;
