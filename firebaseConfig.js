import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assurez-vous que le chemin est correct


// Configuration Firebase extraite du fichier google-services.json
const firebaseConfig = {
  apiKey: "AIzaSyBgakDWGaQs5ViflcKyztLe3e1SIsYyZYE", // Ta clé API
  authDomain: "to-do-lis-expo-app1.firebaseapp.com", // Domaine d'authentification
  projectId: "to-do-lis-expo-app1", // ID de projet
  storageBucket: "to-do-lis-expo-app1.firebasestorage.app", // Bucket de stockage
  messagingSenderId: "234743986996", // ID de l'expéditeur des notifications
  appId: "1:234743986996:android:9f2a66812599e0f028c361", // ID de l'application Android
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firebase Auth avec persistance
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Permet la persistance
});

// Initialiser Firestore
const db = getFirestore(app);


export { db, auth };
