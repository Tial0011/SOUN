// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1F5UM2wp2CxJzNj8Le_Lt3PoWJAjDaLY",
  authDomain: "soun001-d8963.firebaseapp.com",
  projectId: "soun001-d8963",
  storageBucket: "soun001-d8963.firebasestorage.app",
  messagingSenderId: "87474301969",
  appId: "1:87474301969:web:6e992c97ab4bdb09dc55b0",
  measurementId: "G-EPJPNHFP56",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
