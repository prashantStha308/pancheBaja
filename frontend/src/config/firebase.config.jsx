// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJi3yrlseuYlQRklWD0U_9P9XrSWGFnro",
  authDomain: "panche-baja.firebaseapp.com",
  projectId: "panche-baja",
  storageBucket: "panche-baja.firebasestorage.app",
  messagingSenderId: "349950249356",
  appId: "1:349950249356:web:157355f402c6759b81aea9",
  measurementId: "G-PBYBENFHPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);