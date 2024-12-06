"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";
import { gsap } from "gsap";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export function PopupChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome! How can I assist you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.set(chatRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      transformOrigin: "bottom right",
    });
    gsap.from(buttonRef.current, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(chatRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    } else {
      gsap.to(chatRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessageToGPT = async (message: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
      console.error("API key is missing!");
      return "I'm unable to connect to the server.";
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: `You are an expert consultant providing clear, concise, and accurate information. Tailor your responses to address the user's query in detail, using structured formats like lists or examples where applicable.`,
              },
              { role: "user", content: message },
            ],
            max_tokens: 300,
            temperature: 0.5,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        }
      );

      const data = await response.json();

      if (response.ok && data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      } else {
        console.error("Error from OpenAI API:", data);
        return "I'm having trouble connecting. Please try again later.";
      }
    } catch (error) {
      console.error("Error:", error);
      return "Something went wrong. Please try again later.";
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      try {
        const botResponseText = await sendMessageToGPT(inputMessage);

        const botResponse: Message = {
          id: messages.length + 2,
          text: botResponseText,
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      } catch (error) {
        console.error("Error sending message to GPT:", error);

        const errorMessage: Message = {
          id: messages.length + 2,
          text: "I'm sorry, but I couldn't process your request. Please try again later.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#FC6502] text-white rounded-full p-3 shadow-lg hover:bg-[#e55a00] transition-colors duration-300"
        aria-label="Open chat"
      >
        <MessageCircle size={24} />
      </button>
      <div
        ref={chatRef}
        style={{
          borderRadius: isFullscreen ? 0 : 16,
        }}
        className={`${
          isFullscreen
            ? "fixed inset-0 w-full h-full"
            : "absolute bottom-16 right-0 w-80"
        } bg-white rounded-lg shadow-xl overflow-hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="bg-[#FC6502] text-white p-4 flex justify-between items-center">
          <h3 className="font-bold">Chat with Consultant</h3>
          <div className="flex items-center space-x-2">
            <button onClick={toggleFullscreen} aria-label="Toggle fullscreen">
              {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={20} />
            </button>
          </div>
        </div>
        <div
          className={`p-4 ${
            isFullscreen ? "h-[calc(100vh-120px)]" : "h-64"
          } overflow-y-auto`}
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 rounded-full ${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                style={{
                  borderRadius: 16,
                }}
                className={`inline-block p-3 text-xs rounded-lg ${
                  message.sender === "user"
                    ? "bg-[#FC6502] text-white rounded-full"
                    : "bg-gray-200 text-gray-700 rounded-full"
                }`}
              >
                {message.text}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4 flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:border-[#FC6502]"
          />
          <button
            onClick={handleSendMessage}
            className="bg-[#FC6502] text-white px-4 py-2 rounded-r-lg border-[1px] border-[#FC6502] hover:bg-[#e55a00] transition-colors duration-300"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
