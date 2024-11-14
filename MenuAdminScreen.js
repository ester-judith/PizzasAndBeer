import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, Modal, Alert, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import firebaseConfig from './firebase';

const MenuAdminScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const branchDetails = [
    { id: 'siete', name: 'Sucursal 7', image: require('./assets/images/sucursal7.jpg') },
    { id: 'sexta', name: 'Sucursal 6', image: require('./assets/images/sucursal6.jpg') },
    { id: 'veinte', name: 'Sucursal 20', image: require('./assets/images/sucursal20.jpg') },
    { id: 'herradura', name: 'Sucursal 26', image: require('./assets/images/sucursal26.jpg') },
    { id: 'monterrey', name: 'Sucursal Monterrey', image: require('./assets/images/sucursalmty.jpg') },
    { id: 'mexicali', name: 'Sucursal Mexicali', image: require('./assets/images/sucursalmxl.jpg') },
  ];

  const fetchProductsForBranch = async (branchId) => {
    setLoading(true);
    try {
      const querySnapshot = await firebaseConfig.db
        .collection('user')
        .doc(branchId)
        .collection('productos')
        .get();

      if (querySnapshot.empty) {
        console.log(`No products found for branch: ${branchId}`);
        return [];
      }

      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log('Products fetched:', productsData);

      // Filtra productos con stock bajo
      const lowStockProducts = productsData.filter(
        product => product.stock < product.stockD
      );

      console.log('Low stock products:', lowStockProducts);

      return lowStockProducts;
    } catch (error) {
      console.log("Error al cargar productos:", error);
      Alert.alert("Error", "No se pudieron cargar los productos de la sucursal.");
      return [];
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = async (branchId) => {
    if (!branchId) {
      console.log("No branch ID provided");
      return;
    }

    Alert.alert(
      'Confirmación',
      `¿Estás seguro que quieres generar el reporte de inventario para la ${branchId}?`,
      [
        { text: 'Cancelar', onPress: () => {}, style: 'cancel' },
        {
          text: 'Generar PDF', onPress: async () => {
            const lowStockProducts = await fetchProductsForBranch(branchId);

            // Verifica si hay productos con stock bajo antes de generar el PDF
            if (lowStockProducts.length === 0) {
              Alert.alert("Inventario en orden", "No hay productos con stock bajo.");
              return;
            }

            // Construye el HTML para el PDF
            const htmlContent = `
              <h1>Reporte de Inventario - Sucursal ${branchId}</h1>
              <p>Productos con stock bajo:</p>
              <ul>
                ${lowStockProducts.map(product => `
                  <li>${product.nombreProducto}: ${product.stock} / ${product.stockD}</li>
                `).join('')}
              </ul>
            `;
            console.log("HTML Content:", htmlContent);

            try {
              // Genera el PDF con el contenido HTML usando expo-print
              const { uri } = await Print.printToFileAsync({ html: htmlContent });

              console.log("PDF generado en:", uri);

              // Usar Expo Sharing para permitir que el usuario descargue el archivo
              await Sharing.shareAsync(uri);
              Alert.alert("PDF Generado", "El PDF ha sido generado y está listo para compartirse.");

            } catch (error) {
              console.log("Error al generar el PDF:", error);
              Alert.alert("Error", "No se pudo generar el PDF.");
            }
          }
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={require('./assets/images/backgroundtres.png')}
      style={styles.background}
    >
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

      <ScrollView contentContainerStyle={styles.categoriesContainer}>
        {branchDetails.map((branch, index) => (
          <TouchableOpacity
            key={index}
            style={styles.categoryBox}
            onPress={() => generatePDF(branch.id)}
          >
            <Image
              source={branch.image}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{branch.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}

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
    fontFamily: 'Rosmatika',
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
    backgroundColor: '#ff6347',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#ff6347',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 1,
  },
});

export default MenuAdminScreen;
