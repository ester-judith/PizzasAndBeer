import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; // Asegúrate de usar 'compat' si usas Firestore y Firebase Auth

// Configuración de Firebase para tu aplicación
const firebaseConfig = {
  apiKey: "AIzaSyAxbBveVTyZRSXWbnZRo5XPI78JO96nYTo",
  authDomain: "pizzasandbeer-95f50.firebaseapp.com",
  databaseURL: "https://pizzasandbeer-95f50-default-rtdb.firebaseio.com",
  projectId: "pizzasandbeer-95f50",
  storageBucket: "pizzasandbeer-95f50.appspot.com",
  messagingSenderId: "170328254277",
  appId: "1:170328254277:web:7d8d7d5ea43bc7f2e3c02c"
};

// Inicializar Firebase solo si no está ya inicializado
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Crear instancia de Firestore
const db = firebase.firestore();

export default {
  firebase,
  db
};
