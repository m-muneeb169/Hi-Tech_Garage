// /src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "hi-tech-garage.firebaseapp.com",
  projectId: "hi-tech-garage",
  storageBucket: "hi-tech-garage.appspot.com",
  messagingSenderId: "190734431474",
  appId: "1:190734431474:web:31230ad988c58368298c6b",
  measurementId: "G-BH9X2F3W22"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
