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

let messageIdCounter = 0;

function makeId() {
  messageIdCounter += 1;
  return `${Date.now()}-${messageIdCounter}`;
}

// ---------------------------------------------------------------------------
// Knowledge base — everything about Happy Cleaning Services
// ---------------------------------------------------------------------------
const KNOWLEDGE = {
  business: {
    name: "Happy Cleaning Services",
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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

    // Try knowledge base first (instant, no API needed)
    const kbAnswer = findBestAnswer(input.trim());
    if (kbAnswer) {
      aiReply = kbAnswer;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: makeId(), text: aiReply, sender: "ai" },
        ]);
        setLoading(false);
      }, 600);
      return;
    }

    // Fall back to external AI API if configured
    if (!AI_API_ENDPOINT || !AI_API_KEY) {
      aiReply =
        "I'm not sure about that specific question, but I'd be happy to help! You can ask me about our services, prices, pickup & delivery, booking, complaints, or anything else related to Happy Cleaning. Or message us directly on WhatsApp at +233 55 818 4521.";
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: makeId(), text: aiReply, sender: "ai" },
        ]);
        setLoading(false);
      }, 600);
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
          context: buildSystemPrompt(),
        }),
      });
      const data = await response.json();
      aiReply = data.reply || data.message || "I'm sorry, I didn't get a response. Please try again or message us on WhatsApp.";
    } catch {
      aiReply =
        "I'm having trouble connecting right now. You can still reach us directly on WhatsApp or by phone.";
    }

    setMessages((prev) => [
      ...prev,
      { id: makeId(), text: aiReply, sender: "ai" },
    ]);
    setLoading(false);
  }

  function buildSystemPrompt() {
    return `You are the assistant for Happy Cleaning Services, a laundry and cleaning business in Sege-Ada, Ghana.

Business details:
- Name: ${KNOWLEDGE.business.name}
- Tagline: ${KNOWLEDGE.business.tagline}
- Phone: ${KNOWLEDGE.business.phone}
- Email: ${KNOWLEDGE.business.email}
- Location: ${KNOWLEDGE.business.location}
- WhatsApp: ${KNOWLEDGE.business.whatsapp}

Services:
${KNOWLEDGE.services.map((s) => `- ${s.name}: ${s.tagline}. Unit: ${s.unit}. Includes: ${s.includes.join(", ")}. Detail: ${s.detail}`).join("\n")}

Pricing: ${KNOWLEDGE.pricing.intro} ${KNOWLEDGE.pricing.process} ${KNOWLEDGE.pricing.noPayment}

Fulfilment: Pickup & delivery - ${KNOWLEDGE.fulfilment.pickup} Drop-off - ${KNOWLEDGE.fulfilment.dropoff}

Order flow: ${KNOWLEDGE.orderFlow.join(" ")}

Complaints: ${KNOWLEDGE.complaints.intro} ${KNOWLEDGE.complaints.whatToInclude} ${KNOWLEDGE.complaints.photos}

Privacy: ${KNOWLEDGE.privacy.intro} ${KNOWLEDGE.privacy.noSale} ${KNOWLEDGE.privacy.yourChoices}

Rules:
- Be helpful, concise, friendly and professional
- Never mention prices that aren't confirmed — quotes are always personal
- No online payment is taken; quotes are confirmed on WhatsApp
- If you don't know something, say you'll connect them with the team on WhatsApp
- Always offer to help place an order on /book or message on WhatsApp`;
  }

  return (
    <>
      {/* Floating trigger */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close assistant" : "Open assistant"}
        className="fixed left-6 bottom-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-coral text-white shadow-[0_14px_40px_rgba(229,108,78,0.35)] transition hover:scale-105 hover:bg-coral-deep"
      >
        <span className="relative">
          <Sparkle className="h-6 w-6 animate-bounce" />
        </span>
        <span className="absolute -top-2 -right-2 h-3 w-3 rounded-full bg-white border-2 border-coral animate-pulse" />
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
