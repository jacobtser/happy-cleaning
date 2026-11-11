import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Leaf,
  MapPin,
  ShieldCheck,
  Sparkle,
  Star,
  WhatsApp,
} from "@/components/Icons";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Happy Cleaning Services is a local laundry and cleaning team in Sege-Ada, Ghana. Thoughtful laundry, dry cleaning, carpet cleaning and ironing, with pickup and drop-off.",
};

const values = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Care in the details",
    body: "Care labels checked, stains treated thoughtfully and every item handled as if it were our own.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Honest quotes",
    body: "We look at what you have, ask the right questions and confirm a clear quote before we begin.",
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Local & personal",
    body: "Based in Sege-Ada, we're a neighbourhood service with a real person at the other end of the chat.",
  },
  {
    icon: <Leaf className="h-5 w-5" />,
    title: "A fresher finish",
    body: "Clean clothes, fresh carpets and a lighter week — the small things that make home feel better.",
  },
];

const whoWeHelp = [
  {
    title: "Homes & families",
    body: "The weekly wash, school uniforms, bedding and the basket that never quite empties.",
  },
  {
    title: "Busy professionals",
    body: "Work shirts, suits and everyday pieces returned crisp, fresh and ready to wear.",
  },
  {
    title: "Small businesses",
    body: "Uniforms, linens and regular laundry for teams that need to look their best.",
  },
  {
    title: "Guests & hosts",
    body: "Fresh towels and linens for short stays, guest rooms and the odd last-minute turnover.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="pointer-events-none absolute -top-28 -right-32 h-96 w-96 rounded-full bg-sage/80 blur-3xl" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />

        <div className="container-page relative grid gap-12 py-12 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:py-20">
          <div>
            <p className="eyebrow animate-fade-up">Our story</p>
            <h1 className="hero-display animate-fade-up-delay-1 mt-5 max-w-2xl text-forest">
              Care in every
              <br />
              <span className="italic text-coral">fold.</span>
            </h1>
            <p className="animate-fade-up-delay-2 mt-6 max-w-xl text-[0.98rem] leading-7 text-muted sm:text-base">
              Happy Cleaning Services is a local laundry and cleaning team based
              in Sege-Ada. We look after the clothes, linens and carpets that
              make everyday life feel a little lighter — with careful hands and
              clear, friendly service.
            </p>
            <div className="animate-fade-up-delay-3 mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-coral">
                Place an order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={generalWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <WhatsApp className="h-4 w-4 text-[#1faa59]" />
                Say hello
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[480px]">
            <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full border border-forest/10" />
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/60 shadow-[0_28px_70px_rgba(22,61,51,0.16)]">
              <div className="relative aspect-[4/4.6]">
                <Image
                  src="/images/photos/laundry-line.jpg"
                  alt="Fresh laundry hanging outdoors in the sunshine"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 42vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/55 via-transparent to-transparent" />
              <div className="absolute right-4 bottom-4 left-4 rounded-2xl border border-white/20 bg-forest-deep/70 p-4 text-cream backdrop-blur-md">
                <p className="text-[0.56rem] font-extrabold uppercase tracking-[0.22em] text-gold">
                  Proudly local
                </p>
                <p className="mt-1 font-display text-xl leading-tight">
                  Sege-Ada, Greater Accra
                </p>
              </div>
            </div>

            <div className="absolute -top-5 -right-3 rounded-2xl border border-line bg-paper px-4 py-3 shadow-[0_16px_40px_rgba(12,43,36,0.12)] sm:-right-6">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-sage text-forest">
                  <Sparkle className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-[0.55rem] font-extrabold uppercase tracking-[0.18em] text-muted">
                    Four services
                  </p>
                  <p className="text-sm font-extrabold text-forest">One team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Why we exist</p>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
              Wash day shouldn&apos;t feel like a{" "}
              <span className="italic text-coral">second job.</span>
            </h2>
          </Reveal>

          <Reveal delay={80} className="max-w-2xl">
            <p className="text-[0.98rem] leading-7 text-muted">
              We started Happy Cleaning with a simple idea: that looking after
              your clothes and home shouldn&apos;t mean squeezing one more
              errand into the week. Between work, family and everything else,
              the laundry basket has a habit of quietly piling up.
            </p>
            <p className="mt-4 text-[0.98rem] leading-7 text-muted">
              So we do the folding, pressing and cleaning — carefully, and on a
              schedule that works for you. You can bring your items to us in
              Sege-Ada, or ask about pickup and delivery around the area.
              Either way, you get a clear quote first and a real person to talk
              to if anything needs sorting.
            </p>
            <div className="mt-7 grid gap-4 border-t border-line pt-7 sm:grid-cols-3">
              {[
                { value: "04", label: "Services under one roof" },
                { value: "100%", label: "Quote confirmed before we start" },
                { value: "01", label: "Local team, based in Sege-Ada" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-display text-4xl leading-none font-semibold tracking-[-0.03em] text-forest">
                    {item.value}
                  </p>
                  <p className="mt-2 text-[0.7rem] leading-5 font-bold text-muted">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-paper">
        <div className="container-page section-pad">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow justify-center">What we stand for</p>
            <h2 className="mt-5 font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
              The little things, done properly.
            </h2>
            <p className="mt-4 text-[0.93rem] leading-7 text-muted">
              No shortcuts, no vague promises. Just the kind of service we&apos;d
              want for our own homes.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 80}>
                <div className="h-full rounded-[1.6rem] border border-line bg-cream/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-forest/25 hover:bg-cream">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-sage text-forest">
                    {value.icon}
                  </span>
                  <h3 className="mt-5 text-[0.94rem] font-extrabold text-forest">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-5.5 text-muted">
                    {value.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <Reveal className="relative">
            <div className="grid grid-cols-[1.15fr_0.85fr] gap-3">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/60 shadow-[0_22px_55px_rgba(22,61,51,0.13)]">
                <Image
                  src="/images/photos/white-blazers.jpg"
                  alt="Crisp white blazers hanging after cleaning"
                  fill
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
                    <Star className="mx-auto h-5 w-5 text-gold" />
                    <p className="mt-2 text-[0.58rem] leading-4 font-extrabold uppercase tracking-[0.16em] text-cream/60">
                      Care you can feel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <p className="eyebrow">Who we look after</p>
            <h2 className="mt-5 max-w-lg font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
              From the family basket to the{" "}
              <span className="italic text-coral">boardroom.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[0.95rem] leading-7 text-muted">
              Every customer has a different pile. Tell us what you have and
              we&apos;ll help you find the right service — no minimum order, no
              complicated packages.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {whoWeHelp.map((item) => (
                <div key={item.title} className="border-t border-line pt-4">
                  <h3 className="text-[0.88rem] font-extrabold text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[0.78rem] leading-5.5 text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <Link href="/services" className="link-underline mt-7">
              See how we can help
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="bg-sage/70">
        <div className="container-page py-14 md:py-20">
          <Reveal className="grid gap-8 rounded-[2rem] border border-forest/10 bg-paper/75 p-7 backdrop-blur sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-forest text-cream">
              <Sparkle className="h-6 w-6" />
            </span>
            <div>
              <p className="eyebrow">A personal service</p>
              <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
                You&apos;ll always speak to a person.
              </h2>
              <p className="mt-3 max-w-2xl text-[0.9rem] leading-6 text-muted">
                No bots, no call centres. Your order, questions and feedback come
                straight to our team — and we reply as soon as we can.
              </p>
            </div>
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <WhatsApp className="h-4 w-4" />
              Chat with us
            </a>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-forest-deep text-cream">
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-coral/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="container-page relative py-20 text-center md:py-28">
          <Reveal>
            <div className="mx-auto flex w-fit items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.22em] text-cream/70">
              <Sparkle className="h-3.5 w-3.5 text-gold" />
              Sege-Ada · Greater Accra
            </div>
            <h2 className="mx-auto mt-7 max-w-3xl font-display text-[2.8rem] leading-[0.98] font-semibold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Let&apos;s make your week
              <br />
              <span className="italic text-gold">a little lighter.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-[0.95rem] leading-7 text-cream/60">
              Build your order in a couple of minutes, or send us a message with
              any questions. We&apos;ll confirm the details and your quote
              before any work begins.
            </p>
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book" className="btn btn-coral">
                Place your order
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost-light">
                Contact us
              </Link>
            </div>
            <p className="mt-8 text-[0.68rem] font-bold text-cream/35">
              {site.phoneDisplay} · {site.email}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
