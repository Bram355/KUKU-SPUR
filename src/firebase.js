// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0IQ7Myouk_jGecb45gbx-euFNvawQT6Y",
  authDomain: "chicken-order-app-e8130.firebaseapp.com",
  projectId: "chicken-order-app-e8130",
  storageBucket: "chicken-order-app-e8130.firebasestorage.app",
  messagingSenderId: "408033029218",
  appId: "1:408033029218:web:287c816657aca95b7b353b",
  measurementId: "G-BG7CC8S58M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore database
export const db = getFirestore(app);

// Orders collection reference
export const ordersCollection = collection(db, "orders");

// Firestore helper functions
export { addDoc, getDocs, doc, updateDoc, deleteDoc };
