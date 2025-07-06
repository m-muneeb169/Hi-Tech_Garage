import { getBestMatchingFAQ } from "../lib/vectorSearch";

const allowedKeywords = [
  "car", "garage", "service", "workshop", "maintenance", "repair",
  "booking", "dashboard", "mechanic", "vehicle", "engine", "tyre",
  "emergency", "slot", "schedule", "request", "status", "reschedule",
  "battery", "AC", "oil", "filter", "pickup", "drop", "customer care",
  "support", "parts", "quote", "availability", "diagnostics", "help"
];

// Simple translation function using Gemini
async function translateToEnglish(text) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
  const prompt = `Translate this into English (if it is Roman Urdu or Urdu): ${text}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || text;
}

export async function askGemini(message) {
  // Translate Urdu/Roman Urdu to English
  const translated = await translateToEnglish(message);

  // Use the translated text to get FAQ answer
  const faqAnswer = await getBestMatchingFAQ(translated);

  // If match found, return original answer (which should be in Urdu)
  if (faqAnswer && !faqAnswer.includes("❗")) return faqAnswer;

  // Check if question is relevant
  const isRelevant = allowedKeywords.some((word) =>
    translated.toLowerCase().includes(word)
  );

  if (!isRelevant) {
    return "⚠️Sorry, I can only help with questions related to Hi-Tech Garage and car services.";
  }

  // Final fallback to Gemini Urdu answer
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const finalPrompt = `Hi-Tech Garage کے بارے میں صرف اردو میں جواب دیں۔ سوال: ${message}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: finalPrompt }] }]
    })
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "کوئی جواب نہیں ملا۔";
}
