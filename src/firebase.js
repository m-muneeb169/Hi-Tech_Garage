// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCzr2WSyHdY-BzTh7HEBQQ9B9NvA3b7Q08",
  authDomain: "login-auth-fcc07.firebaseapp.com",
  projectId: "login-auth-fcc07",
  storageBucket: "login-auth-fcc07.appspot.com",
  messagingSenderId: "779877693803",
  appId: "1:779877693803:web:60858dccb4a46b9589342e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };