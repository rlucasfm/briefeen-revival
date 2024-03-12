// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaJjZg7GnFJX1yDdEwWkRWmPiXcSGLtyM",
  authDomain: "briefeen-mvp.firebaseapp.com",
  projectId: "briefeen-mvp",
  storageBucket: "briefeen-mvp.appspot.com",
  messagingSenderId: "401868977050",
  appId: "1:401868977050:web:933843d983b0abddd98023",
  measurementId: "G-P0TYP22TS7"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
// export const firebase_analytics = getAnalytics(firebase_app);