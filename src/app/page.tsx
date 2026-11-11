import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Leaf,
  Quote,
  ShieldCheck,
  Sparkle,
  Star,
  Truck,
  WhatsApp,
} from "@/components/Icons";
import { BeautifulBackground } from "@/components/BeautifulBackground";
import { Reveal } from "@/components/Reveal";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services } from "@/lib/services";
import { generalWhatsAppUrl, orderWhatsAppUrl } from "@/lib/whatsapp";

const marqueeItems = [
  "Laundry",
  "Dry cleaning",
  "Carpet cleaning",
  "Ironing",
  "Pickup & drop-off",
  "Careful hands",
];

const faqs = [
  {
    question: "Do I pay on the website?",
    answer:
      "No. This website is for building and sending your order only. We confirm the details and final quote with you on WhatsApp before any work begins.",
  },
  {
    question: "Why are there no fixed prices?",
    answer:
      "Every order is a little different. The final quote depends on the service, quantity, fabric, condition and whether you choose pickup or drop-off. Send your order and we'll give you a clear quote first.",
  },
  {
    question: "How do I place an order?",
    answer:
      "Choose your services, tell us how many items or loads you have, add your contact details and preferred date, then tap the WhatsApp button. Your order summary is placed in the chat, ready for you to send.",
  },
  {
    question: "Where do you work?",
    answer:
      "We're based in Sege-Ada, Greater Accra. Pickup and drop-off can be arranged around the area — message us with your location and we'll confirm what's possible.",
  },
];

export default function HomePage() {
  return (
    <>
      <BeautifulBackground />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-40 h-[30rem] w-[30rem] rounded-full bg-sage/70 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />

        <div className="hero-shell container-page relative grid gap-12 pt-10 pb-14 sm:pt-12 sm:pb-16 lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:gap-10 lg:pt-16 lg:pb-24">
          <div className="hero-copy max-w-2xl">
            <p className="eyebrow animate-fade-up">
              Laundry & cleaning · Sege-Ada
            </p>
            <h1 className="hero-display animate-fade-up-delay-1 mt-5 text-forest">
              Wash day,
              <br />
              <span className="relative inline-block pr-2 italic text-coral">
                made lighter.
              </span>
            </h1>
            <p className="hero-lede animate-fade-up-delay-2 mt-6 max-w-xl text-pretty text-[1.02rem] leading-7 text-muted sm:text-lg sm:leading-8">
              Happy Cleaning Services Sege Ada takes the laundry off your hands —
              fresh washing, careful dry cleaning, deep carpet care and crisp
              ironing, with pickup and drop-off around Sege-Ada.
            </p>

            <div className="hero-actions animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-coral">
                Place an order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/services" className="btn btn-outline">
                Explore services
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.76rem] font-bold text-forest/75">
              {["Pickup & drop-off", "Quote before service", "Order on WhatsApp"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="grid h-4.5 w-4.5 place-items-center rounded-full bg-sage text-forest">
                      <Check className="h-3 w-3" />
                    </span>
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[570px] lg:pr-5">
            <div className="absolute -top-4 -right-2 h-20 w-20 rounded-full border border-forest/10 sm:-right-4 sm:h-28 sm:w-28" />
            <div className="absolute top-16 -right-2 h-4 w-4 rounded-full bg-gold sm:-right-4" />

            <div className="relative">
              <div className="absolute inset-4 -rotate-3 rounded-[3rem] bg-sage" />
              <div className="relative overflow-hidden rounded-[2.6rem] border border-white/60 shadow-[0_30px_80px_rgba(12,43,36,0.18)]">
                <div className="relative aspect-[4/4.8] sm:aspect-[4/4.5]">
                  <Image
                    src="/images/photos/hero-housekeeper.jpg"
                    alt="Hands carefully folding fresh linen on a bed"
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
                </div>

                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-4 rounded-2xl border border-white/20 bg-forest-deep/70 p-3.5 text-cream backdrop-blur-md sm:right-5 sm:bottom-5 sm:left-5 sm:p-4">
                  <div>
                    <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.24em] text-gold">
                      Happy Cleaning Services Sege Ada
                    </p>
                    <p className="mt-1 font-display text-xl leading-tight sm:text-2xl">
                      Care in every fold.
                    </p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cream text-forest">
                    <Sparkle className="h-5 w-5" />
                  </span>
                </div>
              </div>

              <div className="animate-float absolute -top-6 -left-2 rounded-2xl border border-line bg-paper/95 px-4 py-3 shadow-[0_16px_40px_rgba(12,43,36,0.14)] backdrop-blur sm:-left-8 sm:px-5 sm:py-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sage text-forest">
                    <ServiceIcon icon="washer" className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <p className="text-[0.58rem] font-extrabold uppercase tracking-[0.18em] text-muted">
                      We take care of
                    </p>
                    <p className="text-sm font-extrabold text-forest">
                      Wash · Dry · Fold
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="marquee bg-forest py-3.5 text-cream" aria-label="Our services">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div
              key={group}
              className="flex shrink-0 items-center"
              aria-hidden={group === 1}
            >
              {marqueeItems.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="flex items-center gap-6 px-6 text-[0.68rem] font-extrabold uppercase tracking-[0.22em] sm:gap-8 sm:px-8"
                >
                  {item}
                  <Sparkle className="h-3.5 w-3.5 text-gold" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-20">
          <Reveal>
            <p className="eyebrow">A fresher kind of errand</p>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
              Your wardrobe deserves a little more{" "}
              <span className="italic text-coral">care.</span>
            </h2>
            <p className="mt-5 max-w-md text-[0.95rem] leading-7 text-muted">
              From the week&apos;s laundry to the rug in your living room, we
              look after the pieces that make home feel like home. No fuss, no
              long queues — just a simple order and a fresh finish.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              {
                title: "One simple order",
                body: "Choose what you need and send it to us on WhatsApp in a couple of minutes.",
                icon: <Sparkle className="h-5 w-5" />,
              },
              {
                title: "Pickup & drop-off",
                body: "We can arrange collection and return around Sege-Ada, or you can drop off with us.",
                icon: <Truck className="h-5 w-5" />,
              },
              {
                title: "Quote first",
                body: "Every price is tailored to the job. We confirm the quote before any work starts.",
                icon: <ShieldCheck className="h-5 w-5" />,
              },
            ].map((item, index) => (
              <Reveal key={item.title} delay={index * 90}>
                <div className="h-full rounded-[1.6rem] border border-line bg-paper p-5 shadow-[0_12px_40px_rgba(22,61,51,0.04)]">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-sage text-forest">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 text-sm font-extrabold text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.82rem] leading-6 text-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page section-pad">
          <Reveal className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
                Everything clean,
                <br />
                <span className="italic text-coral">nothing rushed.</span>
              </h2>
            </div>
            <Link href="/services" className="link-underline self-start sm:self-auto">
              See all services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {services.map((service, index) => (
              <Reveal key={service.id} delay={(index % 2) * 100}>
                <article className="group card card-lift overflow-hidden transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(22,61,51,0.12)]">
                  <div className="relative h-64 overflow-hidden sm:h-72 image-lift">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/65 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-forest-deep/45 text-[0.65rem] font-extrabold tracking-[0.08em] text-cream backdrop-blur-md">
                      {service.number}
                    </span>
                    <span className="absolute right-4 bottom-4 grid h-11 w-11 place-items-center rounded-full bg-cream/95 text-forest shadow-lg">
                      <ServiceIcon icon={service.icon} className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-coral">
                          {service.tagline}
                        </p>
                        <h3 className="mt-2 font-display text-[1.9rem] leading-none font-semibold tracking-[-0.025em] text-forest">
                          {service.name}
                        </h3>
                      </div>
                      <Link
                        href={`/book?service=${service.id}`}
                        aria-label={`Book ${service.name}`}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-forest transition group-hover:border-forest group-hover:bg-forest group-hover:text-cream"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="mt-4 max-w-md text-[0.88rem] leading-6 text-muted">
                      {service.description}
                    </p>
                    <Link
                      href={`/book?service=${service.id}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-[0.78rem] font-extrabold text-forest transition hover:text-coral"
                    >
                      Book this service
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest text-cream">
        <div className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-forest-soft/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />
        <div className="container-page section-pad relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-20">
            <Reveal>
              <p className="eyebrow eyebrow-light">How it works</p>
              <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] sm:text-5xl">
                Three little steps.
                <br />
                <span className="italic text-gold">One lighter week.</span>
              </h2>
              <p className="mt-5 max-w-sm text-[0.95rem] leading-7 text-cream/60">
                No account, no checkout and no payment here. Build your order,
                send it over, and we&apos;ll take it from there.
              </p>
              <Link href="/book" className="btn btn-coral mt-8">
                Start your order
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>

            <div className="grid gap-4">
              {[
                {
                  number: "01",
                  title: "Tell us what you need",
                  body: "Pick your services, add quantities and choose pickup or drop-off. Add anything we should know about stains, fabrics or sizes.",
                },
                {
                  number: "02",
                  title: "Send it on WhatsApp",
                  body: "Your order summary opens in WhatsApp, ready to send. We'll reply to confirm availability, timing and your quote.",
                },
                {
                  number: "03",
                  title: "We handle the rest",
                  body: "We collect or receive your items, clean them with care and arrange the return. Fresh, folded and ready for you.",
                },
              ].map((step, index) => (
                <Reveal key={step.number} delay={index * 100}>
                  <div className="group flex gap-5 rounded-[1.6rem] border border-white/10 bg-white/[0.045] p-5 transition hover:border-white/20 hover:bg-white/[0.07] sm:p-6">
                    <span className="font-display text-3xl leading-none text-gold/80">
                      {step.number}
                    </span>
                    <div>
                      <h3 className="text-base font-extrabold text-cream">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[0.85rem] leading-6 text-cream/55">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 left-0 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-sage/70 blur-3xl" />
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          <Reveal className="order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/60 shadow-[0_24px_70px_rgba(22,61,51,0.12)] image-lift">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/photos/white-blazers.jpg"
                  alt="Crisp white blazers hanging after professional cleaning"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/40 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-cream/95 text-forest shadow-lg">
                  <Sparkle className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-white/30 bg-forest-deep/45 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-cream backdrop-blur-md">
                  Premium care
                </span>
              </div>
              <div className="absolute -bottom-5 -right-5 hidden w-32 rotate-[-8deg] overflow-hidden rounded-2xl border-[5px] border-cream shadow-xl sm:block animate-float">
                <div className="relative aspect-square">
                  <Image
                    src="/images/photos/folded-towels.jpg"
                    alt="Freshly folded towels"
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="order-1 lg:order-2" delay={80}>
            <p className="eyebrow stagger-1">Why Happy Cleaning</p>
            <h2 className="mt-5 max-w-lg font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl stagger-2">
              Local hands.
              <br />
              <span className="italic text-coral">Genuine care.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-7 text-muted stagger-3">
              We&apos;re a neighbourhood service, not a faceless machine. That
              means thoughtful handling, clear communication and a real person
              at the other end of your WhatsApp message.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                {
                  icon: <Heart className="h-5 w-5" />,
                  title: "Care first",
                  body: "Clothes, fabrics and carpets treated with the attention they deserve.",
                },
                {
                  icon: <ShieldCheck className="h-5 w-5" />,
                  title: "Clear quotes",
                  body: "Know the price before we begin. No surprises, no pressure.",
                },
                {
                  icon: <Truck className="h-5 w-5" />,
                  title: "Convenient",
                  body: "Pickup and drop-off arranged around your day, wherever possible.",
                },
                {
                  icon: <Leaf className="h-5 w-5" />,
                  title: "Fresher finish",
                  body: "A clean that feels good — for your wardrobe and your home.",
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className={`flex gap-3.5 card-lift group ${["stagger-1", "stagger-2", "stagger-3", "stagger-1"][index]}`}
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage text-forest group-hover:bg-forest group-hover:text-cream transition-colors">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="text-sm font-extrabold text-forest group-hover:text-coral transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[0.8rem] leading-5.5 text-muted">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-line bg-paper p-5 card-lift">
              <Quote className="h-6 w-6 text-gold" />
              <p className="mt-3 font-display text-lg leading-6 text-forest italic">
                &ldquo;We treat every load like it&apos;s our own — because
                that&apos;s the kind of care home deserves.&rdquo;
              </p>
              <p className="mt-3 text-[0.65rem] font-extrabold uppercase tracking-[0.18em] text-muted">
                The Happy Cleaning promise
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage/70">
        <div className="container-page py-14 md:py-20">
          <Reveal className="grid gap-8 rounded-[2rem] border border-forest/10 bg-paper/70 p-7 backdrop-blur sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex gap-5">
              <span className="hidden h-14 w-14 shrink-0 place-items-center rounded-full bg-forest text-cream sm:grid">
                <Truck className="h-6 w-6" />
              </span>
              <div>
                <p className="eyebrow">Pickup & drop-off</p>
                <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
                  We&apos;ll come to you.
                </h2>
                <p className="mt-3 max-w-xl text-[0.9rem] leading-6 text-muted">
                  Based in Sege-Ada and happy to arrange collection and return
                  around the area. Not sure if we reach you? Send a quick
                  message — we&apos;ll confirm before you order.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/book" className="btn btn-primary">
                Book a pickup
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsApp className="h-4 w-4 text-[#1faa59]" />
                Ask a question
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
              A few answers
              <br />
              <span className="italic text-coral">before you start.</span>
            </h2>
            <p className="mt-5 max-w-sm text-[0.9rem] leading-6 text-muted">
              Still unsure about something? A quick WhatsApp message is the
              fastest way to reach us.
            </p>
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-5"
            >
              Ask us on WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>

          <div className="divide-y divide-line border-y border-line">
            {faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-left">
                  <span className="text-[0.95rem] font-extrabold text-forest">
                    {faq.question}
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-forest transition group-open:border-forest group-open:bg-forest group-open:text-cream">
                    <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
                  </span>
                </summary>
                <p className="max-w-xl pt-3 pr-12 text-[0.86rem] leading-6 text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-coral/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-page relative py-20 text-center md:py-28">
          <Reveal>
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-cream/70">
              <Sparkle className="h-3.5 w-3.5 text-gold" />
              No online payment · Confirm on WhatsApp
            </div>
            <h2 className="mx-auto mt-7 max-w-4xl font-display text-[2.8rem] leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Ready for a lighter
              <br />
              <span className="italic text-gold">wash day?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-7 text-cream/60">
              Build your order in a couple of minutes. We&apos;ll confirm the
              details, timing and quote on WhatsApp — then you can get back to
              the things that matter.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-coral">
                Place your order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={orderWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost-light"
              >
                <WhatsApp className="h-4 w-4" />
                WhatsApp us directly
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-cream/35">
              <Star className="h-3.5 w-3.5 text-gold" />
              Sege-Ada · Greater Accra
              <Star className="h-3.5 w-3.5 text-gold" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
