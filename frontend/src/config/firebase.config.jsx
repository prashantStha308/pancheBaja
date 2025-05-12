// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// these are okay to be displayed publicly

const firebaseConfig = {
  apiKey: "AIzaSyBhNA8CWVvMgeia8CUJACUfNh3itnVegiE",
  authDomain: "firstrproject-a3ab5.firebaseapp.com",
  databaseURL: "https://firstrproject-a3ab5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firstrproject-a3ab5",
  storageBucket: "firstrproject-a3ab5.firebasestorage.app",
  messagingSenderId: "897958133612",
  appId: ":897958133612:web:01aaaf6e3b88f79a29fd49",
  measurementId: "G-8FH66PFB92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();