import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkle,
  Truck,
  WhatsApp,
} from "@/components/Icons";
import { OrderForm } from "@/components/OrderForm";
import { isServiceId } from "@/lib/services";
import { site } from "@/lib/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Place an Order",
  description:
    "Build your laundry, dry cleaning, carpet cleaning or ironing order in three simple steps. Send it straight to Happy Cleaning Services on WhatsApp — no payment online.",
};

const promises = [
  "No account or payment online",
  "Final quote confirmed on WhatsApp",
  "Pickup & delivery or drop-off",
];

const nextSteps = [
  {
    title: "Build your order",
    body: "Pick your services and quantities, then tell us how we can collect or receive your items.",
  },
  {
    title: "Send it on WhatsApp",
    body: "Your summary opens in the chat, ready to send. We reply to confirm timing and your quote.",
  },
  {
    title: "We handle the rest",
    body: "We clean with care and arrange collection or drop-off around what works for you.",
  },
];

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string | string[] }>;
}) {
  const params = await searchParams;
  const requested = Array.isArray(params.service)
    ? params.service[0]
    : params.service;
  const initialService = isServiceId(requested) ? requested : undefined;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full bg-sage/80 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />

        <div className="container-page relative py-12 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="eyebrow animate-fade-up">Place an order</p>
              <h1 className="animate-fade-up-delay-1 mt-5 max-w-2xl font-display text-[3rem] leading-[0.94] font-semibold tracking-[-0.045em] text-forest sm:text-6xl lg:text-7xl">
                Let&apos;s lighten
                <br />
                your <span className="italic text-coral">wash day.</span>
              </h1>
              <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-[0.98rem] leading-7 text-muted sm:text-base">
                Three short steps, no account and no payment here. Tell us what
                you need and we&apos;ll take it from there — with a personal
                quote confirmed before any work begins.
              </p>
            </div>

            <div className="animate-fade-up-delay-3 grid gap-2.5">
              {promises.map((promise) => (
                <div
                  key={promise}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-paper/80 px-4 py-3 backdrop-blur"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sage text-forest">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[0.8rem] font-extrabold text-forest">
                    {promise}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative">
        <div className="container-page section-pad">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start xl:grid-cols-[minmax(0,1fr)_21.5rem]">
            <OrderForm initialService={initialService} />

            <aside className="grid gap-4 lg:sticky lg:top-28">
              <div className="rounded-[1.6rem] border border-line bg-paper p-6">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-forest text-cream">
                    <Sparkle className="h-4.5 w-4.5" />
                  </span>
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest/55">
                    What happens next
                  </p>
                </div>
                <ol className="mt-5 grid gap-5">
                  {nextSteps.map((step, index) => (
                    <li key={step.title} className="flex gap-3.5">
                      <span className="font-display text-xl leading-none text-coral">
                        0{index + 1}
                      </span>
                      <div>
                        <p className="text-[0.84rem] font-extrabold text-forest">
                          {step.title}
                        </p>
                        <p className="mt-1 text-[0.76rem] leading-5.5 text-muted">
                          {step.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-[1.6rem] border border-line bg-paper p-6">
                <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest/55">
                  Need a hand?
                </p>
                <p className="mt-3 font-display text-2xl leading-tight font-semibold tracking-[-0.02em] text-forest">
                  We&apos;re happy to help.
                </p>
                <p className="mt-2 text-[0.78rem] leading-5.5 text-muted">
                  Not sure which service fits, or what counts as a load? Send a
                  quick message and we&apos;ll point you in the right direction.
                </p>
                <div className="mt-4 grid gap-2">
                  <a
                    href={generalWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary min-h-11 w-full px-4 text-[0.78rem]"
                  >
                    <WhatsApp className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[0.78rem] font-extrabold text-forest transition hover:bg-mint"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-coral" />
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2.5 rounded-xl px-2 py-2 text-[0.76rem] font-extrabold break-all text-forest transition hover:bg-mint"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-coral" />
                    {site.email}
                  </a>
                </div>
              </div>

              <div className="rounded-[1.6rem] bg-forest p-6 text-cream">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-4.5 w-4.5 text-gold" />
                  <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-gold">
                    Around Sege-Ada
                  </p>
                </div>
                <p className="mt-3 text-[0.8rem] leading-5.5 text-cream/65">
                  Pickup and drop-off can be arranged around the area. Not sure
                  if we reach you? Ask us before you order.
                </p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[0.74rem] font-extrabold text-cream transition hover:text-gold"
                >
                  <MapPin className="h-3.5 w-3.5 text-coral" />
                  {site.addressLine}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </aside>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 rounded-2xl border border-line bg-paper px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="flex items-start gap-2.5 text-[0.78rem] leading-5 text-forest/70">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Prices depend on quantity, fabric and condition. We always confirm
              your quote before cleaning begins.
            </p>
            <Link
              href="/contact"
              className="link-underline shrink-0 self-start text-[0.78rem] sm:self-auto"
            >
              Talk to us instead
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
