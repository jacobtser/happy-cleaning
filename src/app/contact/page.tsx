import type { Metadata } from "next";
import Link from "next/link";
import { ComplaintForm } from "@/components/ComplaintForm";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Sparkle,
  WhatsApp,
} from "@/components/Icons";
import { site } from "@/lib/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Complaints",
  description:
    "Contact Happy Cleaning Services in Sege-Ada, Ghana. Call or WhatsApp 055 818 4521, email sknumekevor@gmail.com, or send a complaint or feedback through our contact form.",
};

const contactCards = [
  {
    label: "Call us",
    value: site.phoneDisplay,
    note: "A quick call is best for anything urgent.",
    href: site.phoneHref,
    external: false,
    icon: <Phone className="h-5 w-5" />,
    accent: "bg-sage text-forest",
  },
  {
    label: "WhatsApp",
    value: site.phoneInternational,
    note: "The fastest way to reach the team.",
    href: generalWhatsAppUrl(),
    external: true,
    icon: <WhatsApp className="h-5 w-5" />,
    accent: "bg-forest text-gold",
  },
  {
    label: "Email",
    value: site.email,
    note: "For complaints, feedback and detailed messages.",
    href: `mailto:${site.email}`,
    external: false,
    icon: <Mail className="h-5 w-5" />,
    accent: "bg-sage text-forest",
  },
  {
    label: "Visit",
    value: site.addressLine,
    note: "Drop-off and pickup arranged in Sege-Ada.",
    href: site.mapsUrl,
    external: true,
    icon: <MapPin className="h-5 w-5" />,
    accent: "bg-sage text-forest",
  },
];

const beforeYouWrite = [
  "Your order reference, if the message is about an order.",
  "What happened, and when you noticed it.",
  "How you'd like us to put things right.",
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full bg-sage/80 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />

        <div className="container-page relative py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="eyebrow animate-fade-up">Contact & complaints</p>
            <h1 className="hero-display animate-fade-up-delay-1 mt-5 text-forest">
              A real person,
              <br />
              <span className="italic text-coral">ready to help.</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-[0.98rem] leading-7 text-muted sm:text-base">
              Questions, feedback or something that didn&apos;t go to plan — we
              want to hear it. Reach us directly, or use the form below and
              we&apos;ll look into it personally.
            </p>
            <div className="animate-fade-up-delay-3 mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-coral"
              >
                <WhatsApp className="h-4 w-4" />
                Chat on WhatsApp
                <ArrowRight className="h-4 w-4" />
              </a>
              <a href={site.phoneHref} className="btn btn-outline">
                <Phone className="h-4 w-4" />
                Call {site.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {contactCards.map((card, index) => (
              <a
                key={card.label}
                href={card.href}
                {...(card.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`animate-fade-up-delay-${Math.min(index + 1, 3)} group flex h-full flex-col rounded-[1.4rem] border border-line bg-paper p-5 transition duration-300 hover:-translate-y-1 hover:border-forest/25 hover:shadow-[0_18px_45px_rgba(22,61,51,0.08)]`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`grid h-10 w-10 place-items-center rounded-full ${card.accent}`}
                  >
                    {card.icon}
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-forest/30 transition group-hover:text-forest" />
                </div>
                <p className="mt-5 text-[0.58rem] font-extrabold uppercase tracking-[0.2em] text-muted">
                  {card.label}
                </p>
                <p className="mt-1.5 text-[0.86rem] font-extrabold break-all text-forest">
                  {card.value}
                </p>
                <p className="mt-2 text-[0.74rem] leading-5 text-muted">
                  {card.note}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-cream">
        <div className="container-page section-pad">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_21.5rem]">
            <ComplaintForm />

            <aside className="grid gap-4 lg:sticky lg:top-28">
              <div className="rounded-[1.6rem] border border-line bg-paper p-6">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest/55">
                  Before you write
                </p>
                <p className="mt-3 font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-forest">
                  A few details help.
                </p>
                <ul className="mt-4 grid gap-3">
                  {beforeYouWrite.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.78rem] leading-5.5 text-muted"
                    >
                      <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-sage text-forest">
                        <Check className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 rounded-xl bg-mint px-3.5 py-3 text-[0.72rem] leading-5 text-forest/70">
                  Have photos of the issue? Send them to us on WhatsApp after
                  you&apos;ve submitted the form — it helps us see what you see.
                </p>
              </div>

              <div className="rounded-[1.6rem] bg-forest p-6 text-cream">
                <div className="flex items-center gap-2.5">
                  <Sparkle className="h-4.5 w-4.5 text-gold" />
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-gold">
                    New order?
                  </p>
                </div>
                <p className="mt-3 text-[0.8rem] leading-5.5 text-cream/65">
                  The form above is for complaints and feedback. To book a
                  service, use the order builder — it sends everything to
                  WhatsApp in one go.
                </p>
                <Link
                  href="/book"
                  className="btn btn-coral mt-4 min-h-11 w-full px-4 text-[0.78rem]"
                >
                  Place an order
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="mt-3 inline-flex items-center gap-1.5 text-[0.74rem] font-extrabold text-cream transition hover:text-gold"
                >
                  Browse the services
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              <div className="rounded-[1.6rem] border border-line bg-paper p-6">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest/55">
                  Find us
                </p>
                <p className="mt-3 text-[0.84rem] font-extrabold text-forest">
                  {site.location}
                </p>
                <p className="mt-1 text-[0.76rem] leading-5.5 text-muted">
                  {site.region}
                </p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-4 text-[0.76rem]"
                >
                  Open in Google Maps
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
