import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const faqConfig = {
  apiKey: "AIzaSyCp57ZGyVmW0UUAH3UvYb2sKDk1uLRonLM",
  authDomain: "hi-tech-garage.firebaseapp.com",
  projectId: "hi-tech-garage",
  storageBucket: "hi-tech-garage.appspot.com",
  messagingSenderId: "190734431474",
  appId: "1:190734431474:web:31230ad988c58368298c6b",
  measurementId: "G-BH9X2F3W22"
};

// ✅ Use a named instance to avoid collision with default app
const app =
  getApps().find((a) => a.name === "faqApp") ||
  initializeApp(faqConfig, "faqApp");

const db = getFirestore(app);

export default db;
