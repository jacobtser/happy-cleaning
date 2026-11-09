import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsApp } from "./Icons";

export function WhatsAppFloat() {
  return (
    <a
      href={generalWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Happy Cleaning Services on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2.5 rounded-full bg-[#1faa59] pr-5 pl-4 text-sm font-extrabold text-white shadow-[0_14px_40px_rgba(11,71,43,0.3)] transition hover:-translate-y-1 hover:bg-[#168c49] sm:right-6 sm:bottom-6"
    >
      <span className="relative grid h-9 w-9 place-items-center">
        <span className="absolute inset-1 rounded-full bg-white/15" />
        <WhatsApp className="relative h-6 w-6" />
      </span>
      <span className="hidden sm:inline">Chat with us</span>
      <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full border-2 border-white bg-coral" />
    </a>
  );
}
