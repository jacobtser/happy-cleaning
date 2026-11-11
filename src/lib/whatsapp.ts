import { site } from "./site";

export function whatsappUrl(message: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl() {
  return whatsappUrl(
    "Hello Happy Cleaning Services Sege! I'd like to ask about your laundry and cleaning services.",
  );
}

export function orderWhatsAppUrl() {
  return whatsappUrl(
    "Hello Happy Cleaning Services Sege! I'd like to place an order. Could you help me with the details?",
  );
}
