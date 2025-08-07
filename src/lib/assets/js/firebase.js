// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA25vxyECtYsgvWdV1E-9NiLplHzNYdcmc",
  authDomain: "zapatopia-14e4f.firebaseapp.com",
  projectId: "zapatopia-14e4f",
  storageBucket: "zapatopia-14e4f.firebasestorage.app",
  messagingSenderId: "748094071401",
  appId: "1:748094071401:web:1d5eda2d59d7a3cd9df8f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)