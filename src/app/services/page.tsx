import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Sparkle,
  WhatsApp,
} from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services } from "@/lib/services";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Laundry, Dry Cleaning, Carpet Cleaning & Ironing",
  description:
    "Explore the Happy Cleaning Services menu: laundry, dry cleaning, carpet cleaning and ironing in Sege-Ada, Ghana. Pickup and drop-off available. Request a personal quote on WhatsApp.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sage/80 blur-3xl" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-page relative grid gap-12 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow animate-fade-up">The service menu</p>
            <h1 className="hero-display animate-fade-up-delay-1 mt-5 max-w-3xl text-forest">
              Care for every fabric, corner and{" "}
              <span className="italic text-coral">crease.</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-[1rem] leading-7 text-muted">
              Four services, one thoughtful team. Whether it&apos;s the weekly
              laundry, a favourite jacket, a well-loved rug or a stack of shirts,
              we&apos;ll help you get it fresh again.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-coral">
                Build your order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsApp className="h-4 w-4 text-[#1faa59]" />
                Ask about a service
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[500px]">
            <div className="grid grid-cols-[1.2fr_0.8fr] items-end gap-3">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_24px_60px_rgba(12,43,36,0.16)]">
                <Image
                  src="/images/photos/dry-cleaning.jpg"
                  alt="Neutral-toned garments hanging neatly on a rack"
                  fill
                  priority
                  sizes="(max-width: 1024px) 55vw, 30vw"
                  className="object-cover"
                />
              </div>
              <div className="grid gap-3">
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-white/60 shadow-lg">
                  <Image
                    src="/images/photos/ironing-detail.jpg"
                    alt="A man carefully ironing a dark garment at home"
                    fill
                    sizes="(max-width: 1024px) 35vw, 18vw"
                    className="object-cover"
                  />
                </div>
                <div className="grid aspect-square place-items-center rounded-[1.5rem] bg-forest p-4 text-center text-cream">
                  <div>
                    <p className="font-display text-4xl leading-none text-gold">04</p>
                    <p className="mt-2 text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-cream/60">
                      Services, one team
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="animate-float absolute -bottom-5 -left-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-[0_16px_40px_rgba(12,43,36,0.14)] sm:-left-6">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sage text-forest">
                  <Sparkle className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-muted">
                    Personal quote
                  </p>
                  <p className="text-sm font-extrabold text-forest">
                    Before we begin
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page section-pad">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">What&apos;s included</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
              A closer look at each service.
            </h2>
            <p className="mt-4 text-[0.93rem] leading-7 text-muted">
              No fixed packages — just the right care for what you have. Choose a
              service to start your order, or ask us if you&apos;re not sure.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6">
            {services.map((service, index) => (
              <Reveal key={service.id}>
                <article
                  className={`card grid overflow-hidden lg:grid-cols-2 ${
                    index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
                  }`}
                >
                  <div className="relative min-h-[300px] overflow-hidden sm:min-h-[380px]">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/45 via-transparent to-transparent" />
                    <div className="absolute top-5 left-5 flex items-center gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 text-forest shadow-lg">
                        <ServiceIcon icon={service.icon} className="h-5 w-5" />
                      </span>
                      <span className="rounded-full border border-white/30 bg-forest-deep/45 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                        {service.number} · {service.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-coral">
                      {service.tagline}
                    </p>
                    <h3 className="mt-3 font-display text-4xl leading-none font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
                      {service.name}
                    </h3>
                    <p className="mt-5 text-[0.92rem] leading-7 text-muted">
                      {service.detail}
                    </p>

                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[0.8rem] leading-5 text-forest/80"
                        >
                          <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-sage text-forest">
                            <Check className="h-3 w-3" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8 flex flex-wrap items-center gap-5">
                      <Link
                        href={`/book?service=${service.id}`}
                        className="btn btn-primary"
                      >
                        Book {service.shortName.toLowerCase()}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                      <a
                        href={generalWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline"
                      >
                        Ask a question
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sage/70">
        <div className="container-page py-14 md:py-20">
          <Reveal className="grid gap-8 rounded-[2rem] border border-forest/10 bg-paper/75 p-7 backdrop-blur sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-cream">
              <Sparkle className="h-6 w-6" />
            </span>
            <div>
              <p className="eyebrow">Pricing, made human</p>
              <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
                Your quote is personal.
              </h2>
              <p className="mt-3 max-w-2xl text-[0.9rem] leading-6 text-muted">
                We don&apos;t use one-size-fits-all prices. The final quote
                depends on the service, quantity, fabric and condition. Send your
                order and we&apos;ll confirm the price with you before any work
                begins.
              </p>
            </div>
            <Link href="/book" className="btn btn-primary">
              Request a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-coral/10 blur-3xl" />
        <div className="container-page section-pad relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <Reveal>
            <p className="eyebrow eyebrow-light">One simple order</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              Not sure what you need?
              <br />
              <span className="italic text-gold">Start with a message.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[0.93rem] leading-7 text-cream/60">
              Tell us what you have and what you&apos;d like cleaned. We&apos;ll
              point you in the right direction, confirm availability and give you
              a clear quote.
            </p>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link href="/book" className="btn btn-coral">
              Place an order
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost-light"
            >
              <WhatsApp className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
