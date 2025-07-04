console.log("Gemini API KEY:", process.env.REACT_APP_GEMINI_API_KEY);
export async function askGemini(message) {
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  // Detect Urdu script or Roman Urdu keywords
  const isUrdu =
    /[اآءبپتثجچحخدذرزسشصضطظعغفقکگلمنوهی]/.test(message) ||
    /\b(kya|kaise|kon|tum|mera|acha|nahi|haan|kyun|kahan|kitna|mujhe|apka|apki|tera|meri|theek|batao|q)\b/i.test(message);

  // If Urdu or Roman Urdu is detected, prepend instruction for Pakistani Urdu
  const finalPrompt = isUrdu
    ? `Answer only in clear Pakistani Urdu (avoid Hindi vocabulary). Question: ${message}`
    : message;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: finalPrompt }] }]
    })
  });

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
}

