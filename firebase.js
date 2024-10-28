import firebase from 'firebase/app';
import 'firebase/firestore'; // Si usas Firestore
// Importa otros servicios de Firebase según sea necesario, por ejemplo, Auth, Storage, etc.

const firebaseConfig = {
  apiKey: "AIzaSyAxbBveVTyZRSXWbnZRo5XPI78JO96nYTo",
  authDomain: "pizzasandbeer-95f50.firebaseapp.com",
  projectId: "pizzasandbeer-95f50",
  storageBucket: "pizzasandbeer-95f50.appspot.com",
  messagingSenderId: "170328254277",
  appId: "1:170328254277:web:d7cbe20cf107e279e3c02c",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore(); // Si usas Firestore
// exporta otros servicios según sea necesario
export { db };
