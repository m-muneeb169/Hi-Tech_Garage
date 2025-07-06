// /src/lib/vectorSearch.js
import db from "../firebaseFAQs";
import { collection, getDocs } from "firebase/firestore";

// /src/lib/vectorSearch.js
export async function embedQuery(query) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/embedding-001:embedContent?key=${process.env.REACT_APP_GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: { parts: [{ text: query }] } }),
    }
  );

  const data = await res.json();

  // Optional console for debugging
  console.log("📥 Gemini response:\n", data);

  return data.embedding?.values || [];
}

function cosineSimilarity(a, b) {
  if (!a || !b || a.length !== b.length) return -1;

  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));

  return magA && magB ? dot / (magA * magB) : -1;
}

// Get Best Matching FAQ
export async function getBestMatchingFAQ(userInput) {
  const userVector = await embedQuery(userInput);
  console.log("📌 User vector length:", userVector.length);

  if (!userVector.length) {
    console.error("❌ Failed to generate embedding for input.");
    return "⚠️ Failed to generate embedding for your query.";
  }

  const snapshot = await getDocs(collection(db, "faqs"));
  console.log("✅ Firebase projectId:", db.app.options.projectId);

  console.log("📁 Retrieved docs:", snapshot.size);

  let bestMatch = null;
  let highestScore = -1;

  snapshot.forEach((doc) => {
    const data = doc.data();
    const storedVector = data.embedding;

    if (!Array.isArray(storedVector)) {
      console.warn("⚠️ Skipping invalid doc:", data.question);
      return;
    }

    const score = cosineSimilarity(userVector, storedVector);
    console.log(`🧠 Compared with: "${data.question}" → Score: ${score}`);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = data;
    }
  });

  console.log("🏁 Best Score:", highestScore);

  return highestScore > 0.75
    ? bestMatch.answer
    : "❗ I couldn't find a relevant answer in our FAQ. Please rephrase your question.";
}


