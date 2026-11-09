"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { Mail, Send, Sparkle, WhatsApp } from "./Icons";

const AI_API_ENDPOINT = process.env.NEXT_PUBLIC_AI_API_ENDPOINT || "";
const AI_API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || "";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi there! I'm Happy Cleaning's assistant. Ask me about services, pricing, booking, or anything else.",
      sender: "ai",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [messageIdCounter, setMessageIdCounter] = useState(0);

  function makeId() {
    setMessageIdCounter((n) => n + 1);
    return `${Date.now()}-${messageIdCounter}`;
  }

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: makeId(),
      text: input.trim(),
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let aiReply = "";

    if (!AI_API_ENDPOINT || !AI_API_KEY) {
      // Fallback: helpful rule-based responses when no API key is configured
      aiReply = getFallbackReply(input.trim());
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: makeId(), text: aiReply, sender: "ai" },
        ]);
        setLoading(false);
      }, 700);
      return;
    }

    try {
      const response = await fetch(AI_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AI_API_KEY}`,
        },
        body: JSON.stringify({
          message: input.trim(),
          context:
            "You are the assistant for Happy Cleaning Services, a laundry and cleaning business in Sege-Ada, Ghana. Services: laundry, dry cleaning, carpet cleaning, ironing. Pickup and drop-off available. Phone: 055 818 4521. Email: sknumekevor@gmail.com. No online payment — quotes confirmed on WhatsApp. Be helpful, concise, and friendly.",
        }),
      });
      const data = await response.json();
      aiReply = data.reply || data.message || "I'm sorry, I didn't get a response. Please try again or message us on WhatsApp.";
    } catch {
      aiReply = "I'm having trouble connecting right now. You can still reach us directly on WhatsApp or by phone.";
    }

    setMessages((prev) => [
      ...prev,
      { id: makeId(), text: aiReply, sender: "ai" },
    ]);
    setLoading(false);
  }

  function getFallbackReply(message: string) {
    const lower = message.toLowerCase();
    if (lower.includes("price") || lower.includes("cost") || lower.includes("quote")) {
      return "Our prices are quoted per job based on service, quantity, fabric and condition. Build your order on the /book page and we'll confirm your personal quote on WhatsApp before any work begins.";
    }
    if (lower.includes("whatsapp") || lower.includes("contact") || lower.includes("call")) {
      return "You can WhatsApp us at +233 55 818 4521, call 055 818 4521, or email sknumekevor@gmail.com. We're based in Sege-Ada, Greater Accra.";
    }
    if (lower.includes("laundry") || lower.includes("dry clean") || lower.includes("carpet") || lower.includes("iron")) {
      return "We offer laundry, dry cleaning, carpet cleaning and ironing. Visit /services to see the full menu, or /book to place an order.";
    }
    if (lower.includes("pickup") || lower.includes("delivery") || lower.includes("drop")) {
      return "Yes! We offer pickup & delivery around Sege-Ada, or you can drop off your items with us. Choose your preference when you build your order.";
    }
    if (lower.includes("where") || lower.includes("location") || lower.includes("sege")) {
      return "We're based in Sege-Ada, Greater Accra, Ghana. We serve the surrounding area with pickup and drop-off.";
    }
    if (lower.includes("payment") || lower.includes("pay")) {
      return "No online payment is taken on this website. We confirm your order and final quote on WhatsApp, and you pay the team directly.";
    }
    return "I'm happy to help! You can ask about our services, prices, pickup/delivery, or anything else. For a quick reply, message us on WhatsApp at +233 55 818 4521.";
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className={`fixed left-6 bottom-6 z-50 ${open ? "hidden" : ""} inline-flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-[0_14px_40px_rgba(229,108,78,0.35)] transition hover:scale-105 hover:bg-coral-deep`}
      >
        <Sparkle className="h-6 w-6 animate-bounce" />
        <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-white border-2 border-coral" />
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed left-6 bottom-22 z-50 w-full md:w-[380px] h-[520px] flex flex-col rounded-[2rem] border border-line bg-paper soft-shadow overflow-hidden transform transition-all duration-300">
          <div className="bg-forest p-5 text-cream flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-forest-deep">
                <Sparkle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-extrabold leading-none">Happy Assistant</p>
                <p className="text-[0.7rem] leading-4 text-cream/70">AI support · Sege-Ada</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-cream/60 hover:text-cream transition"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[85%] rounded-xl p-3 text-sm leading-6 ${
                  message.sender === "user"
                    ? "ml-auto bg-forest text-cream"
                    : "mr-auto bg-cream/60 text-forest/90 border border-line"
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-cream/60 text-forest/90 border border-line rounded-xl p-3 text-sm leading-6 animate-pulse">
                Assistant is typing…
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-line bg-cream/40">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type a message…"
                disabled={loading}
                className="flex-1 field text-sm"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="rounded-full p-2.5 bg-forest text-cream hover:bg-forest-deep transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>

          <div className="p-3 bg-forest-deep text-cream">
            <p className="text-[0.68rem] leading-5 text-cream/70 mb-3">
              Prefer to talk to a person?
            </p>
            <div className="grid gap-2">
              <a
                href={`https://wa.me/233558184521`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold text-white bg-[#1faa59] hover:bg-[#168c49] transition"
              >
                <WhatsApp className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold text-forest bg-white/70 hover:bg-white transition"
              >
                <Mail className="h-4 w-4" />
                Contact form
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
