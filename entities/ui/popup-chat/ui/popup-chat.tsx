"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { gsap } from "gsap";

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

export function PopupChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Welcome! How can we help you today?", sender: "bot" },
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

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user",
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for your message. Our team will get back to you soon.",
          sender: "bot",
        };
        setMessages((prevMessages) => [...prevMessages, botResponse]);
      }, 1000);
    }
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
        className={`absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl overflow-hidden ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div className="bg-[#FC6502] text-white p-4 flex justify-between items-center">
          <h3 className="font-bold">Chat with us</h3>
          <button onClick={() => setIsOpen(false)} aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 h-64 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2  rounded-full ${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                style={{
                  borderRadius: 100,
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
            className="bg-[#FC6502]  text-white px-4 py-2 rounded-r-lg border-[1px] border-[#FC6502] hover:bg-[#e55a00] transition-colors duration-300"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
