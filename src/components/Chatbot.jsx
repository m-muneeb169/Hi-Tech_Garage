import { useState, useRef, useEffect } from "react";
import { askGemini } from "./Gemini";
import { Mic, MessageSquare, X } from "lucide-react";
import "../index.css";

function Chatbot({ showChat, setShowChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [, setTyping] = useState(false);

  const faqData = [
    {
      question: "How do I book a workshop service?",
      answer:
        "Go to the service section and select your preferred workshop, date, and time slot.",
    },
    {
      question: "What services does Hi-Tech Garage offer?",
      answer:
        "We offer On-Site Maintenance, At Workshop Maintenance, and Emergency Repair Requests.",
    },
    {
      question: "How do I track my booking?",
      answer:
        "After booking, you can track status in the 'My Bookings' section of your user dashboard.",
    },
    {
      question: "Can I reschedule a booking?",
      answer:
        "Yes, before confirmation, you can select a different time slot and date.",
    },
    {
      question: "How can I contact workshop for urgent help?",
      answer:
        "Use the emergency request option in your dashboard to alert workshops in real-time.",
    },
  ];

  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);
  const chatboxRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (chatboxRef.current && !chatboxRef.current.contains(event.target)) {
        setShowChat(false);
        setMessages([]);
        setInput("");
        setLoading(false);
      }
    }
    if (showChat) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowChat, showChat]);

  //   "booking", "service", "maintenance", "repair", "garage", "hi-tech",
  //   "onsite", "workshop", "emergency", "slot", "schedule", "dashboard",
  //   "user", "request", "status", "track", "reschedule", "car", "mechanic",
  //   "automobile", "vehicle", "engine", "tyre", "oil", "brake", "battery",
  //   "ac", "clutch", "gear", "steering", "radiator", "suspension", "transmission",
  //   "filter", "headlight", "windscreen", "exhaust", "fuel", "diagnostics",
  //   "pickup", "drop", "location", "map", "issues", "problem", "noise", "leak",
  //   "not starting", "broken", "stalling", "flat tyre", "overheating", "smoke",
  //   "technician", "inspection", "checkup", "parts", "cost", "estimate", "quote",
  //   "availability", "billing", "invoice", "payment", "confirm", "confirmation", "rescue",
  //   "mobile service", "customer care", "support",
  //   "hi", "hello", "hey", "help", "can you help", "please", "thank you",
  //   "thanks", "who are you", "what can you do", "how does this work",
  //   "repeat", "say again", "explain", "clear", "start over",
  //   "سلام", "ہیلو", "کیا آپ میری مدد کر سکتے ہیں", "براہ کرم", "شکریہ",
  //   "salam", "hello", "help karo", "shukriya", "please", "kaise ho",
  //   "madad karo", "tum kon ho", "kya kar sakte ho", "phir se batao",
  //   "samjhao", "dobara", "start se", "clear karo"
  // ];

  const formatAsBullets = (text) => {
    const lines = text
      .split(/\n|[۔.\u06d4]/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    return lines.map((line) => `• ${line}`).join("\n");
  };

const sendMessage = async (customInput) => {
  const finalInput = (customInput || input).toLowerCase();
  if (!finalInput.trim()) return;

  const userMessage = { type: "user", text: finalInput };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setLoading(true);
  setTyping(true);

  // ✅ Try Firestore-based FAQ search via Gemini wrapper
let reply = await askGemini(finalInput, messages.slice(-4));


  const formattedReply = formatAsBullets(reply);

  setTimeout(() => {
    setMessages((prev) => [
      ...prev,
      { type: "bot", text: formattedReply, isCard: true }
    ]);
    setLoading(false);
    setTyping(false);
  }, 800);
};




  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = true;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="relative h-0 z-50">
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-red-600 via-blue-600 to-black text-white p-3 rounded-full shadow-lg transition duration-300 hover:scale-110 hover:shadow-xl"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {showChat && (
        <div
          ref={chatboxRef}
          className="fixed bottom-6 right-6 w-[90%] sm:w-[400px] max-h-[85vh] bg-gradient-to-br from-black via-blue-900 to-black text-white rounded-2xl shadow-2xl border border-blue-600 flex flex-col p-4 animate-fade-in"
        >
          <button
            onClick={() => {
              setShowChat(false);
              setMessages([]);
              setInput("");
              setLoading(false);
            }}
            className="absolute top-2 right-2 text-white hover:text-red-400 transition transform hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>
  {/* ✅ Project name heading with animation */}
   <h2 className="text-center text-xl font-bold mb-4 text-white tracking-wide drop-shadow-lg animate-in fade-in slide-in-from-top-6 duration-700">
  🚗 Hi-Tech Garage
</h2>
          <div
            className="flex-1 overflow-y-auto mt-6 mb-2 space-y-2 pr-1"
            style={{ maxHeight: "350px" }}
          >
            <div className="bg-blue-900 rounded-lg p-3 text-sm text-blue-200 space-y-2 mb-3 animate-fade-in">
              <h3 className="font-semibold text-white text-center mb-1">FAQs</h3>
              {faqData.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(faq.question)}
                  className="text-left hover:underline block w-full text-blue-300 transition duration-200 ease-in-out hover:scale-105"
                >
                  • {faq.question}
                </button>
              ))}
            </div>

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-full break-words whitespace-pre-wrap text-sm shadow-md transition-transform duration-300 ${
                  msg.type === "user"
                    ? "bg-red-600 self-end text-white"
                    : "bg-white text-black self-start border border-gray-300"
                } ${/[؀-ۿ]/.test(msg.text) ? "urdu-text" : ""}`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-sm text-gray-400 self-start italic animate-pulse">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 items-center mt-2">
            <div className="flex-1 flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 rounded px-2 py-1 text-black w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 text-sm"
                placeholder="Ask something..."
              />
              <button
                onClick={() => sendMessage()}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white whitespace-nowrap text-sm transition duration-200 ease-in-out hover:scale-105"
              >
                Send
              </button>
            </div>
            <button
              onClick={startListening}
              title={listening ? "Listening..." : "Click to speak"}
              className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 text-white flex items-center justify-center transition duration-200 ease-in-out hover:scale-110"
            >
              <Mic
                className={`w-5 h-5 ${
                  listening ? "animate-pulse text-red-200" : ""
                }`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
