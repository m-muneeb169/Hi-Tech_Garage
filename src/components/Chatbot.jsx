import { useState, useRef, useEffect } from "react";
import { askGemini } from "./Gemini";
import { Mic, MessageSquare, X } from "lucide-react";
import "../index.css";

function Chatbot() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const reply = await askGemini(input);
    setMessages((prev) => [...prev, { type: "bot", text: reply }]);
    setLoading(false);
  };

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <div className="min-h-screen bg-white text-black relative">
      {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="fixed bottom-6 right-6 z-50 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {showChat && (
  <div className="fixed bottom-6 right-6 w-80 max-h-[500px] bg-black text-white rounded-2xl shadow-lg flex flex-col p-4 z-50">
    <button
      onClick={() => {
        setShowChat(false);
        setMessages([]);
        setInput("");
        setLoading(false);
      }}
      className="absolute top-2 right-2 text-white hover:text-red-400"
    >
      <X className="w-5 h-5" />
    </button>

          <div className="flex-1 overflow-y-auto mt-6 mb-2 space-y-2 pr-1" style={{ maxHeight: "300px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-full break-words whitespace-pre-wrap ${
                  msg.type === "user"
                    ? "bg-red-600 self-end text-white"
                    : "bg-white text-black self-start"
                } ${/[؀-ۿ]/.test(msg.text) ? "urdu-text" : ""}`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-gray-400 self-start">Typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2 items-center mt-2">
  <div className="flex-1 flex items-center gap-2">
    <input
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      className="flex-1 rounded px-2 py-1 text-black w-full"
      placeholder="Ask something..."
    />
    <button
      onClick={sendMessage}
      className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-white whitespace-nowrap"
    >
      Send
    </button>
  </div>
  <button
    onClick={startListening}
    title={listening ? "Listening..." : "Click to speak"}
    className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 text-white flex items-center justify-center"
  >
    <Mic
      className={`w-5 h-5 ${listening ? "animate-pulse text-red-400" : ""}`}
    />
  </button>
</div>

        </div>
      )}
    </div>
  );
}

export default Chatbot;
