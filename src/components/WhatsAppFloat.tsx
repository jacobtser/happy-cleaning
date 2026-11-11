import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsApp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={generalWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Happy Cleaning Services Sege Ada on WhatsApp"
      className="group fixed right-3 bottom-[calc(env(safe-area-inset-bottom)_+_0.9rem)] z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#1faa59] text-sm font-extrabold text-white shadow-[0_14px_40px_rgba(11,71,43,0.3)] transition hover:-translate-y-1 hover:bg-[#168c49] sm:right-6 sm:bottom-6 sm:h-14 sm:w-auto sm:gap-2.5 sm:px-5"
    >
      <span className="relative grid h-8 w-8 place-items-center sm:h-9 sm:w-9">
        <span className="absolute inset-1 rounded-full bg-white/15" />
        <WhatsApp className="relative h-5 w-5 sm:h-6 sm:w-6" />
      </span>
      <span className="hidden sm:inline">Chat with us</span>
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-coral" />
    </a>
  );
}
