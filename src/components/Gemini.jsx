import { getBestMatchingFAQ } from "../lib/vectorSearch";

const allowedKeywords = [
  "car", "garage", "service", "workshop", "maintenance", "repair",
  "booking", "dashboard", "mechanic", "vehicle", "engine", "tyre",
  "emergency", "slot", "schedule", "request", "status", "reschedule",
  "battery", "AC", "oil", "filter", "pickup", "drop", "customer care",
  "support", "parts", "quote", "availability", "diagnostics", "help",
    "booking", "service", "maintenance", "repair", "garage", "hi-tech",
    "onsite", "workshop", "emergency", "slot", "schedule", "dashboard",
    "user", "request", "status", "track", "reschedule", "car", "mechanic",
    "automobile", "vehicle", "engine", "tyre", "oil", "brake", "battery",
    "ac", "clutch", "gear", "steering", "radiator", "suspension", "transmission",
    "filter", "headlight", "windscreen", "exhaust", "fuel", "diagnostics",
    "pickup", "drop", "location", "map", "issues", "problem", "noise", "leak",
    "not starting", "broken", "stalling", "flat tyre", "overheating", "smoke",
    "technician", "inspection", "checkup", "parts", "cost", "estimate", "quote",
    "availability", "billing", "invoice", "payment", "confirm", "confirmation", "rescue",
    "mobile service", "customer care", "support",
    "hi", "hello", "hey", "help", "can you help", "please", "thank you",
    "thanks", "who are you", "what can you do", "how does this work",
    "repeat", "say again", "explain", "clear", "start over",
    "سلام", "ہیلو", "کیا آپ میری مدد کر سکتے ہیں", "براہ کرم", "شکریہ",
    "salam", "hello", "help karo", "shukriya", "please", "kaise ho",
    "madad karo", "tum kon ho", "kya kar sakte ho", "phir se batao",
    "samjhao", "dobara", "start se", "clear karo","and","what","next"
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

export async function askGemini(message, previousMessages = [])
{
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
 // Check if original message is in Urdu script or Roman Urdu
const isUrdu =
  /[اآءبپتثجچحخدذرزسشصضطظعغفقکگلمنوهی]/.test(message) ||  // Urdu letters
  /\b(kya|kaise|kon|tum|mera|acha|nahi|haan|kyun|kahan|kitna|mujhe|apka|apki|tera|meri|theek|batao|q)\b/i.test(message); // Roman Urdu

  let contextPrompt = "";
if (previousMessages.length > 0) {
  contextPrompt = previousMessages.map((msg, i) =>
    msg.type === "user"
      ? `User: ${msg.text}`
      : `Bot: ${msg.text}`
  ).join("\n");
}

const finalPrompt = isUrdu
  ? `${contextPrompt}\nUser: ${message}\nبراہ کرم جواب اردو میں دیں۔`
  : `${contextPrompt}\nUser: ${message}\nPlease answer in English related to the current conversation.`;

// const finalPrompt = isUrdu
//   ? `Hi-Tech Garage کے بارے میں صرف اردو میں جواب دیں۔ سوال: ${message}`
//   : `Only answer questions related to Hi-Tech Garage and its services. Question: ${message}`;


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
