"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import Link from "next/link";
import { Assistant, Close, Mail, Send, WhatsApp } from "./Icons";

type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

let messageIdCounter = 0;

function makeId() {
  messageIdCounter += 1;
  return `${Date.now()}-${messageIdCounter}`;
}

// ---------------------------------------------------------------------------
// Knowledge base — everything about Happy Cleaning Services Sege Ada
// ---------------------------------------------------------------------------
const KNOWLEDGE = {
  business: {
    name: "Happy Cleaning Services Sege Ada",
    tagline: "Wash day, made lighter.",
    phone: "055 818 4521",
    phoneInternational: "+233 55 818 4521",
    email: "sknumekevor@gmail.com",
    location: "Sege-Ada, Greater Accra, Ghana",
    whatsapp: "https://wa.me/233558184521",
  },
  services: [
    {
      id: "laundry",
      name: "Laundry",
      tagline: "Everyday wash, dry & fold",
      unit: "bag / load",
      unitPlural: "bags / loads",
      includes: [
        "Wash, dry and fold",
        "Everyday clothing and linens",
        "Care labels checked before washing",
        "Neatly packed for collection or delivery",
      ],
      detail:
        "From the week's uniforms to a full basket of family laundry, we treat each load with the same care. Tell us about any stains, delicate pieces or fabric preferences and we'll take it from there.",
    },
    {
      id: "dry-cleaning",
      name: "Dry Cleaning",
      tagline: "A little care for the good stuff",
      unit: "item",
      unitPlural: "items",
      includes: [
        "Suits, blazers and formal wear",
        "Dresses, skirts and delicate pieces",
        "Careful inspection before cleaning",
        "Pressed and protected for collection",
      ],
      detail:
        "Some pieces need a gentler approach. We inspect each item, follow the care label and give special attention to the details that make it yours. Not sure whether an item can be dry cleaned? Send us a photo on WhatsApp.",
    },
    {
      id: "carpet-cleaning",
      name: "Carpet Cleaning",
      tagline: "Deep clean, fresh feel",
      unit: "carpet / rug",
      unitPlural: "carpets / rugs",
      includes: [
        "Rugs, carpets and runners",
        "Deep cleaning for high-traffic areas",
        "Care suited to the carpet type",
        "A fresher finish for your space",
      ],
      detail:
        "Every carpet is different. We consider the fibre, pile and condition before we recommend a cleaning approach. Tell us the size and type of carpet, and whether it needs collection or on-site care.",
    },
    {
      id: "ironing",
      name: "Ironing",
      tagline: "Crisp, without the effort",
      unit: "item",
      unitPlural: "items",
      includes: [
        "Shirts, blouses and trousers",
        "Dresses, skirts and linens",
        "Careful pressing for a crisp finish",
        "Ready to hang or fold",
      ],
      detail:
        "Whether it's a week of work shirts or the finishing touch for a special occasion, we press each piece with care. Let us know if you prefer items on hangers or neatly folded.",
    },
  ],
  pricing: {
    intro:
      "We don't use one-size-fits-all prices. The final quote depends on the service, quantity, fabric, condition and whether you choose pickup or drop-off.",
    process:
      "Build your order online and send it to WhatsApp. We'll confirm availability, timing and your personal quote before any work begins.",
    noPayment:
      "No payment is taken on this website. We confirm the quote in the WhatsApp chat and you pay the team directly.",
  },
  fulfilment: {
    pickup: "We collect your items from your location in Sege-Ada and return them when clean.",
    dropoff: "You bring your items to us in Sege-Ada and collect them when ready.",
  },
  orderFlow: [
    "Choose your services and quantities in the order builder",
    "Add your contact details, pickup/drop-off address and preferred date/time",
    "Send your order to WhatsApp — we confirm timing and your personal quote",
    "We clean your items and arrange collection or drop-off",
  ],
  contact: {
    whatsapp: "https://wa.me/233558184521",
    phone: "055 818 4521",
    email: "sknumekevor@gmail.com",
    address: "Sege-Ada, Greater Accra, Ghana",
  },
  complaints: {
    intro:
      "Our complaints and feedback form goes straight to our inbox. We read every message and reply personally.",
    whatToInclude:
      "Your name, email, what happened, when, your order reference (if you have one), and how you'd like us to put it right.",
    photos: "You can send photos of any issue on WhatsApp after submitting the form.",
  },
  privacy: {
    intro:
      "We only collect what we need to prepare your order or reply to you — name, phone, email, address and order details.",
    noSale: "We don't sell your personal details or share them for advertising.",
    retention: "We keep details only for as long as needed to provide the service and keep business records.",
    yourChoices:
      "You can ask to see, correct or delete your details at any time — just email or call us.",
  },
  faq: {
    payWebsite: {
      q: "Do I pay on the website?",
      a: "No. This website is for building and sending your order only. We confirm the details and final quote with you on WhatsApp before any work begins.",
    },
    noFixedPrices: {
      q: "Why are there no fixed prices?",
      a: "Every order is a little different. The final quote depends on the service, quantity, fabric, condition and whether you choose pickup or drop-off. Send your order and we'll give you a clear quote first.",
    },
    howToOrder: {
      q: "How do I place an order?",
      a: "Choose your services, tell us how many items or loads you have, add your contact details and preferred date, then tap the WhatsApp button. Your order summary is placed in the chat, ready for you to send.",
    },
    where: {
      q: "Where do you work?",
      a: "We're based in Sege-Ada, Greater Accra. Pickup and drop-off can be arranged around the area — message us with your location and we'll confirm what's possible.",
    },
    minimumOrder: {
      q: "Is there a minimum order?",
      a: "No minimum order. Tell us what you have and we'll help you find the right service.",
    },
    photos: {
      q: "Can I send photos of my items?",
      a: "Yes! Send photos on WhatsApp so we can see your items and give you an accurate quote.",
    },
    urgent: {
      q: "Do you do urgent orders?",
      a: "Tell us your preferred date when you place your order and we'll do our best to fit you in. Message us on WhatsApp if you need something urgently.",
    },
  },
};

function keywordScore(text: string, keywords: string[]) {
  const lower = text.toLowerCase();
  return keywords.filter((k) => lower.includes(k.toLowerCase())).length;
}

// ---------------------------------------------------------------------------
// Matcher — find the best knowledge-base answer
// ---------------------------------------------------------------------------
function findBestAnswer(text: string): string | null {
  const lower = text.toLowerCase();

  // Greetings
  if (
    /^(hi|hello|hey|good morning|good afternoon|good evening|greetings)\b/i.test(
      lower
    )
  ) {
    return `Hi there! I'm Happy Cleaning's assistant. I can help you with services, prices, booking, pickup & delivery, complaints, and more. What would you like to know?`;
  }

  // Service-specific
  for (const svc of KNOWLEDGE.services) {
    if (lower.includes(svc.id) || lower.includes(svc.name.toLowerCase())) {
      const includes = svc.includes.join(", ");
      return `**${svc.name}** — ${svc.tagline}\n\n${svc.detail}\n\nIncludes: ${includes}.\n\nHow many ${svc.unitPlural.toLowerCase()} do you need? You can place an order on the /book page or message us on WhatsApp.`;
    }
  }

  // Pricing
  if (
    keywordScore(lower, ["price", "cost", "quote", "how much", "expensive", "cheap", "fee"]) >= 1
  ) {
    return `${KNOWLEDGE.pricing.intro}\n\n${KNOWLEDGE.pricing.process}\n\n${KNOWLEDGE.pricing.noPayment}\n\nBuild your order on /book and we'll confirm your personal quote on WhatsApp before any work begins.`;
  }

  // Pickup / drop-off
  if (
    keywordScore(lower, ["pickup", "collection", "drop", "dropoff", "deliver", "delivery", "collect"]) >= 1
  ) {
    return `**Pickup & delivery:** ${KNOWLEDGE.fulfilment.pickup}\n\n**Drop-off:** ${KNOWLEDGE.fulfilment.dropoff}\n\nChoose your preference when you build your order on /book. Not sure if we reach your area? Message us on WhatsApp and we'll confirm.`;
  }

  // How to order
  if (
    keywordScore(lower, ["order", "book", "place", "start", "begin", "how do i"]) >= 1
  ) {
    return `Here's how to place an order:\n\n${KNOWLEDGE.orderFlow.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\nNo payment online — we confirm everything on WhatsApp first.`;
  }

  // Contact
  if (
    keywordScore(lower, ["contact", "call", "phone", "whatsapp", "message", "reach", "talk"]) >= 1
  ) {
    return `You can reach us any time:\n• WhatsApp: ${KNOWLEDGE.contact.whatsapp}\n• Phone: ${KNOWLEDGE.contact.phone}\n• Email: ${KNOWLEDGE.contact.email}\n• Address: ${KNOWLEDGE.contact.address}\n\nWhatsApp is usually the fastest way to get a reply.`;
  }

  // Complaints / feedback
  if (
    keywordScore(lower, ["complaint", "complain", "problem", "issue", "wrong", "feedback", "unhappy", "bad", "not happy", "refund"]) >= 1
  ) {
    return `${KNOWLEDGE.complaints.intro}\n\nPlease include: ${KNOWLEDGE.complaints.whatToInclude}\n\n${KNOWLEDGE.complaints.photos}\n\nVisit the /contact page to submit the form, or message us directly on WhatsApp.`;
  }

  // Privacy
  if (keywordScore(lower, ["privacy", "data", "personal", "information", "sell", "secure", "safe"]) >= 1) {
    return `${KNOWLEDGE.privacy.intro}\n${KNOWLEDGE.privacy.noSale}\n${KNOWLEDGE.privacy.retention}\n${KNOWLEDGE.privacy.yourChoices}`;
  }

  // Location / where
  if (
    keywordScore(lower, ["where", "location", "area", "sege", "ada", "ghana", "reach"]) >= 1
  ) {
    return `We're based in ${KNOWLEDGE.contact.address}. We serve Sege-Ada and the surrounding area. Not sure if we reach you? Message us with your location on WhatsApp and we'll confirm what's possible.`;
  }

  // Minimum order
  if (keywordScore(lower, ["minimum", "min order", "small order", "few items"]) >= 1) {
    return "No minimum order! Tell us what you have — even one shirt or one bag — and we'll help you find the right service.";
  }

  // Photos
  if (keywordScore(lower, ["photo", "picture", "image", "send photo"]) >= 1) {
    return "Yes, absolutely! Send photos of your items on WhatsApp so we can see them and give you an accurate quote before you order.";
  }

  // Urgent
  if (keywordScore(lower, ["urgent", "rush", "fast", "quick", "emergency", "asap", "today", "tomorrow"]) >= 1) {
    return "Tell us your preferred date when you place your order and we'll do our best to fit you in. For anything urgent, message us on WhatsApp and we'll check availability.";
  }

  // Payment
  if (keywordScore(lower, ["pay", "payment", "mobile money", "card", "cash", "how do i pay"]) >= 1) {
    return `${KNOWLEDGE.pricing.noPayment} We confirm the quote in the WhatsApp chat and you pay the team directly when we collect or you drop off.`;
  }

  // About / who
  if (keywordScore(lower, ["about", "who", "you are", "company", "business", "team"]) >= 1) {
    return `**${KNOWLEDGE.business.name}** — ${KNOWLEDGE.business.tagline}\n\nWe're a neighbourhood laundry and cleaning service based in Sege-Ada, Ghana. We look after your clothes, linens and carpets with careful hands, clear quotes and honest, friendly service. No faceless machines — just a real person at the other end of your WhatsApp message.`;
  }

  // Default fallback
  return null;
}

export function AiAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: makeId(),
      text: "Hi there! I'm Happy Cleaning's assistant. Ask me about services, prices, booking, pickup & delivery, complaints, or anything else.",
      sender: "ai",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!open) return;

    const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
    const previousOverflow = document.body.style.overflow;

    if (isSmallScreen) {
      document.body.style.overflow = "hidden";
    }

    const timer = window.setTimeout(() => inputRef.current?.focus(), 150);

    return () => {
      window.clearTimeout(timer);
      if (isSmallScreen) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [open]);

  async function handleSend(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = input.trim();
    if (!message || loading) return;

    const userMessage: Message = {
      id: makeId(),
      text: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    let aiReply = "";

    // Send a short slice of the conversation so follow-ups keep their context.
    const history = messages
      .slice(1)
      .slice(-8)
      .map((entry) => ({
        role: entry.sender === "user" ? "user" : "assistant",
        content: entry.text,
      }));

    // Every message goes to the AI first, so the assistant can answer freely.
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        reply?: string;
        error?: string;
      };

      if (response.status === 429) {
        aiReply =
          "I'm getting a lot of messages right now. Please try again in a moment, or message us on WhatsApp.";
      } else if (response.ok && data.reply) {
        aiReply = data.reply.replace(/\*\*/g, "").trim();
      } else {
        aiReply = data.error?.trim() ?? "";
      }
    } catch {
      // Network failure: fall through to the built-in answers below.
    }

    // If the AI is unavailable, use the local knowledge base rather than a
    // dead-end message.
    if (!aiReply) {
      const fallback = findBestAnswer(message);
      aiReply =
        fallback?.replace(/\*\*/g, "").trim() ||
        "I'm having trouble connecting right now. You can still reach us directly on WhatsApp or by phone.";
    }

    setMessages((prev) => [
      ...prev,
      { id: makeId(), text: aiReply, sender: "ai" },
    ]);
    setLoading(false);
  }

  return (
    <>
      {/* Floating AI assistant trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        aria-controls="ai-chat-panel"
        className="group fixed left-3 bottom-[calc(env(safe-area-inset-bottom)_+_0.9rem)] z-50 inline-flex h-12 items-center gap-2 rounded-full border border-white/15 bg-[#163d33] px-3.5 text-[#fbf7ef] shadow-[0_14px_40px_rgba(12,43,36,0.28)] transition hover:-translate-y-0.5 hover:bg-[#0c2b24] sm:left-6 sm:bottom-6 sm:h-14 sm:gap-2.5 sm:px-5"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-coral text-white shadow-[0_6px_16px_rgba(229,108,78,0.35)] sm:h-9 sm:w-9">
          <Assistant className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
        </span>
        <span className="flex flex-col items-start leading-none">
          <span className="text-[0.56rem] font-extrabold uppercase tracking-[0.18em] text-gold sm:text-[0.6rem]">
            AI
          </span>
          <span className="text-[0.78rem] font-extrabold sm:text-[0.84rem]">
            Assistant
          </span>
        </span>
        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-[#163d33] bg-gold animate-pulse" />
      </button>

      {/* Chat panel */}
      {open && (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close assistant"
            className="fixed inset-0 z-40 bg-forest-deep/25 backdrop-blur-[1px] sm:hidden"
          />

          <div
            id="ai-chat-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Happy Cleaning assistant"
            className="animate-fade-up fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)_+_4.4rem)] z-50 flex h-[min(34rem,calc(100dvh_-_10rem))] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-paper soft-shadow sm:inset-x-auto sm:right-auto sm:bottom-24 sm:left-6 sm:h-[min(34rem,calc(100dvh_-_10rem))] sm:w-[380px] sm:rounded-[2rem]"
          >
            <div className="flex items-center justify-between gap-3 bg-forest p-4 text-cream sm:p-5">
              <div className="flex min-w-0 items-center gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-coral text-white">
                  <Assistant className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-extrabold leading-none">
                    AI Assistant
                  </p>
                  <p className="mt-1 text-[0.7rem] leading-4 text-cream/70">
                    Happy Cleaning Sege Ada · Sege-Ada
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href="https://wa.me/233558184521"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with a person on WhatsApp"
                  className="grid h-9 w-9 place-items-center rounded-full text-cream/70 transition hover:bg-white/10 hover:text-cream"
                >
                  <WhatsApp className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-cream/70 transition hover:bg-white/10 hover:text-cream"
                  aria-label="Close chat"
                >
                  <Close className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-3 scroll-smooth sm:space-y-4 sm:p-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`max-w-[88%] whitespace-pre-line break-words rounded-2xl px-3.5 py-2.5 text-sm leading-6 ${
                    message.sender === "user"
                      ? "ml-auto rounded-br-md bg-forest text-cream"
                      : "mr-auto rounded-bl-md border border-line bg-cream/60 text-forest/90"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              {loading && (
                <div className="mr-auto animate-pulse rounded-2xl rounded-bl-md border border-line bg-cream/60 px-3.5 py-2.5 text-sm leading-6 text-forest/90">
                  Assistant is typing…
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSend}
              className="border-t border-line bg-cream/40 p-2.5 sm:p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Type a message…"
                  disabled={loading}
                  maxLength={1000}
                  autoComplete="off"
                  className="field min-w-0 flex-1"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-forest text-cream transition hover:bg-forest-deep disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="chat-human-help border-t border-white/10 bg-forest-deep p-3 text-cream sm:p-4">
              <p className="mb-2 text-[0.66rem] font-bold leading-5 text-cream/65">
                Prefer to talk to a person?
              </p>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/233558184521"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-[#1faa59] px-2 py-2.5 text-[0.72rem] font-extrabold text-white transition hover:bg-[#168c49]"
                >
                  <WhatsApp className="h-4 w-4" />
                  WhatsApp
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-2 py-2.5 text-[0.72rem] font-extrabold text-cream transition hover:bg-white/15"
                >
                  <Mail className="h-4 w-4" />
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
