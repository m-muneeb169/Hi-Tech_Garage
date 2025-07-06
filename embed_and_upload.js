import fs from "fs";
import csv from "csv-parser";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

dotenv.config();

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

const firebaseConfig = {
  apiKey: "AIzaSyCp57ZGyVmW0UUAH3UvYb2sKDk1uLRonLM",
  authDomain: "hi-tech-garage.firebaseapp.com",
  projectId: "hi-tech-garage",
  storageBucket: "hi-tech-garage.firebasestorage.app",
  messagingSenderId: "190734431474",
  appId: "1:190734431474:web:31230ad988c58368298c6b",
  measurementId: "G-BH9X2F3W22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Use Gemini v1beta API to generate embedding
async function getEmbedding(text) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: {
        parts: [{ text }]
      }
    }),
  });

  const data = await response.json();

  if (data?.embedding?.values) {
    return data.embedding.values;
  } else {
    console.error("❌ Failed to get embedding for:", text, "\nResponse:", data);
    return null;
  }
}

// Process the CSV and upload to Firebase
fs.createReadStream("faq.csv")
  .pipe(csv())
  .on("data", async (row) => {
    const question = row.question?.trim();
    const answer = row.answer?.trim();

    if (!question) {
      console.warn("⚠️ Skipping empty question row.");
      return;
    }

    try {
      const vector = await getEmbedding(question);
      if (vector) {
        await addDoc(collection(db, "faqs"), {
          question,
          answer,
          embedding: vector,
        });
        console.log("✅ Uploaded:", question);
      }
    } catch (err) {
      console.error("❌ Error uploading row:", err);
    }
  })
  .on("end", () => {
    console.log("📦 CSV processing complete.");
  });
