export const site = {
  name: "Happy Cleaning Services",
  shortName: "Happy Cleaning",
  tagline: "Wash day, made lighter.",
  description:
    "Laundry, dry cleaning, carpet cleaning and ironing in Sege-Ada, Ghana. Build your order online and send it straight to WhatsApp. Pickup and drop-off available.",
  phoneDisplay: "055 818 4521",
  phoneInternational: "+233 55 818 4521",
  phoneHref: "tel:+233558184521",
  whatsappNumber: "233558184521",
  email: "sknumekevor@gmail.com",
  location: "Sege-Ada",
  region: "Greater Accra, Ghana",
  addressLine: "Sege-Ada, Greater Accra, Ghana",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Sege-Ada%2C%20Greater%20Accra%2C%20Ghana",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://happycleaningservices.com",
  formspreeEndpoint: process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "",
  socialHandle: "@happycleaningservices",
} as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;
