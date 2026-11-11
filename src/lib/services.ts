export type ServiceId = "laundry" | "dry-cleaning" | "carpet-cleaning" | "ironing";

export type Service = {
  id: ServiceId;
  number: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: "washer" | "hanger" | "rug" | "iron";
  unit: string;
  unitPlural: string;
  quantityLabel: string;
  quantityHint: string;
  includes: string[];
  detail: string;
};

export const services: Service[] = [
  {
    id: "laundry",
    number: "01",
    name: "Laundry",
    shortName: "Laundry",
    tagline: "Everyday wash, dry & fold",
    description:
      "A careful wash for everyday wear, linens and everything in between — returned clean, soft and neatly folded.",
    image: "/images/photos/folded-towels.jpg",
    imageAlt: "Freshly folded towels in a woven basket",
    icon: "washer",
    unit: "bag / load",
    unitPlural: "bags / loads",
    quantityLabel: "How many bags or loads?",
    quantityHint: "An estimate is fine — we'll confirm the details on WhatsApp.",
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
    number: "02",
    name: "Dry Cleaning",
    shortName: "Dry cleaning",
    tagline: "A little care for the good stuff",
    description:
      "Suits, dresses, jackets and delicate pieces handled with the attention they deserve — clean, fresh and ready to wear.",
    image: "/images/photos/dry-cleaning.jpg",
    imageAlt: "Neutral-toned clothes hanging neatly on a clothing rack",
    icon: "hanger",
    unit: "item",
    unitPlural: "items",
    quantityLabel: "How many items?",
    quantityHint: "Suits, dresses, jackets, delicate fabrics and more.",
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
    number: "03",
    name: "Carpet Cleaning",
    shortName: "Carpet cleaning",
    tagline: "Deep clean, fresh feel",
    description:
      "Rugs and carpets refreshed from the fibres up — for a cleaner, calmer home and a little more breathing room.",
    image: "/images/photos/carpet-cleaning.jpg",
    imageAlt: "A woman vacuuming a rug in a bright modern living room",
    icon: "rug",
    unit: "carpet / rug",
    unitPlural: "carpets / rugs",
    quantityLabel: "How many carpets or rugs?",
    quantityHint: "Share the approximate sizes in the notes below.",
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
    number: "04",
    name: "Ironing",
    shortName: "Ironing",
    tagline: "Crisp, without the effort",
    description:
      "Shirts, trousers, dresses and linens pressed neatly and returned ready to wear — no board, no rush, no wrinkles.",
    image: "/images/photos/ironing.jpg",
    imageAlt: "Hands carefully pressing a dark garment with a steam iron",
    icon: "iron",
    unit: "item",
    unitPlural: "items",
    quantityLabel: "How many items?",
    quantityHint: "Shirts, trousers, dresses, linens and everyday pieces.",
    includes: [
      "Shirts, blouses and trousers",
      "Dresses, skirts and linens",
      "Careful pressing for a crisp finish",
      "Ready to hang or fold",
    ],
    detail:
      "Whether it's a week of work shirts or the finishing touch for a special occasion, we press each piece with care. Let us know if you prefer items on hangers or neatly folded.",
  },
];

export const serviceMap = Object.fromEntries(
  services.map((service) => [service.id, service]),
) as Record<ServiceId, Service>;

export function isServiceId(value: string | undefined): value is ServiceId {
  return Boolean(value && services.some((service) => service.id === value));
}
