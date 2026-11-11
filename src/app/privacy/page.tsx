import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkle,
} from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Happy Cleaning Services Sege Ada collects, uses and protects the details you share when you order, contact us or send feedback through this website.",
};

const sections = [
  { id: "who-we-are", label: "Who we are" },
  { id: "what-we-collect", label: "What we collect" },
  { id: "how-we-use-it", label: "How we use it" },
  { id: "whatsapp", label: "WhatsApp orders" },
  { id: "formspree", label: "Complaints form" },
  { id: "sharing", label: "Sharing" },
  { id: "retention", label: "How long we keep it" },
  { id: "your-choices", label: "Your choices" },
  { id: "changes", label: "Changes" },
  { id: "contact", label: "Contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line/70">
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sage/70 blur-3xl" />
        <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />
        <div className="container-page relative py-12 lg:py-16">
          <p className="eyebrow animate-fade-up">Privacy notice</p>
          <h1 className="hero-display animate-fade-up-delay-1 mt-5 max-w-3xl text-forest">
            Your details,
            <br />
            <span className="italic text-coral">treated with care.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-6 max-w-2xl text-[0.96rem] leading-7 text-muted">
            This notice explains what information we collect when you use this
            website, why we need it and the choices you have. We&apos;ve kept it
            as plain as possible.
          </p>
          <p className="animate-fade-up-delay-3 mt-5 inline-flex rounded-full border border-line bg-paper px-4 py-2 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-forest/60">
            Last updated: 9 November 2026
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-forest/50">
                On this page
              </p>
              <ul className="mt-4 grid gap-2.5 border-l border-line pl-4">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[0.76rem] font-bold text-muted transition hover:text-forest"
                    >
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-7 rounded-2xl bg-mint p-4">
                <p className="flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-forest/60">
                  <ShieldCheck className="h-3.5 w-3.5 text-forest" />
                  No payment online
                </p>
                <p className="mt-2 text-[0.72rem] leading-5 text-forest/70">
                  This website never asks for card or mobile money details.
                  Payment is arranged directly with our team.
                </p>
              </div>
            </nav>
          </aside>

          <div className="max-w-3xl">
            <article className="grid gap-10">
              <section id="who-we-are" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  Who we are
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  {site.name} is a laundry and cleaning service based in{" "}
                  {site.location}, {site.region}. For the purposes of this
                  notice, we are the people responsible for the personal details
                  described below.
                </p>
                <div className="mt-5 grid gap-2 rounded-2xl border border-line bg-paper p-4 text-[0.8rem] sm:grid-cols-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="flex items-center gap-2.5 font-bold break-all text-forest"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-coral" />
                    {site.email}
                  </a>
                  <a
                    href={site.phoneHref}
                    className="flex items-center gap-2.5 font-bold text-forest"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-coral" />
                    {site.phoneDisplay}
                  </a>
                </div>
              </section>

              <section id="what-we-collect" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  What we collect
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  We only ask for what we need to prepare your order or reply to
                  you:
                </p>
                <ul className="mt-4 grid gap-3">
                  {[
                    "Order details you enter — your name, phone or WhatsApp number, pickup area or address, preferred date and time, services, quantities and any notes you add.",
                    "Complaint or feedback details — your name, email address, optional phone number, the topic, an order reference if you have one, and your message.",
                    "Messages you send us — anything you share over WhatsApp, phone or email while arranging or discussing a service.",
                    "Basic technical information — like many websites, our hosting provider may keep standard server logs (such as an IP address) for security and reliability.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.88rem] leading-6 text-muted"
                    >
                      <span className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-sage text-forest">
                        <Sparkle className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.82rem] leading-6 text-muted">
                  We do not currently use advertising or analytics cookies on
                  this website, and we do not ask for any payment information.
                </p>
              </section>

              <section id="how-we-use-it" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  How we use it
                </h2>
                <ul className="mt-4 grid gap-3">
                  {[
                    "To prepare and confirm your order, including quantities, timing and your personal quote.",
                    "To arrange pickup, delivery or drop-off and to contact you about your items.",
                    "To look into a complaint or issue and reply to you.",
                    "To keep simple records of orders and messages so we can provide a consistent service.",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.88rem] leading-6 text-muted"
                    >
                      <span className="mt-1 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-full bg-sage text-forest">
                        <Sparkle className="h-3 w-3" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.82rem] leading-6 text-muted">
                  We use your details because you have asked us to provide a
                  service or reply to you, and because we have a legitimate
                  interest in running our business responsibly. We don&apos;t
                  use your details for automated decision-making or profiling.
                </p>
              </section>

              <section id="whatsapp" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  WhatsApp orders
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  Our order builder prepares a summary and opens WhatsApp with
                  the message written out for you. Nothing is sent until you
                  press send in WhatsApp. Messages you choose to send are
                  delivered through WhatsApp, which is operated by Meta and has
                  its own privacy terms. We receive the message and use it only
                  to handle your order or question.
                </p>
              </section>

              <section id="formspree" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  The complaints form
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  Our complaints and feedback form is delivered to our inbox
                  through Formspree, a form-handling service. Formspree processes
                  the form contents on our behalf so that your message can reach
                  us by email. You can read more in{" "}
                  <a
                    href="https://formspree.io/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold text-forest underline decoration-forest/20 underline-offset-4"
                  >
                    Formspree&apos;s privacy policy
                  </a>
                  . If the form service is unavailable, the form may open your
                  own email app instead.
                </p>
              </section>

              <section id="sharing" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  Sharing your details
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  We don&apos;t sell your personal details or share them for
                  advertising. We only share what is necessary with the services
                  that help us run this website and communicate with you — such
                  as our hosting provider, Formspree and WhatsApp — or where the
                  law requires it.
                </p>
              </section>

              <section id="retention" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  How long we keep it
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  We keep order and message details only for as long as we need
                  them to provide the service, deal with any follow-up and keep
                  reasonable business records. When we no longer need them, we
                  delete or securely dispose of them.
                </p>
              </section>

              <section id="your-choices" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  Your choices
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  You can ask to see the personal details we hold about you, ask
                  us to correct anything that is wrong, or ask us to delete
                  details we no longer need. You can also withdraw your consent
                  to being contacted at any time. Just email or call us using the
                  details below — we may need to confirm who you are before we
                  act on a request.
                </p>
              </section>

              <section id="changes" className="scroll-mt-28">
                <h2 className="font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                  Changes to this notice
                </h2>
                <p className="mt-4 text-[0.92rem] leading-7 text-muted">
                  If we change how we handle personal details, we&apos;ll update
                  this page and the date at the top. Please check back if
                  you&apos;re unsure.
                </p>
              </section>

              <section id="contact" className="scroll-mt-28">
                <div className="rounded-[1.75rem] border border-line bg-paper p-6 sm:p-8">
                  <p className="flex items-center gap-2 text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest/55">
                    <ShieldCheck className="h-4 w-4 text-forest" />
                    Questions about privacy?
                  </p>
                  <h2 className="mt-3 font-display text-3xl leading-tight font-semibold tracking-[-0.025em] text-forest">
                    Talk to us.
                  </h2>
                  <p className="mt-3 max-w-lg text-[0.88rem] leading-6 text-muted">
                    If anything here is unclear, or you&apos;d like to make a
                    request about your details, get in touch and we&apos;ll help.
                  </p>
                  <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
                    <a
                      href={`mailto:${site.email}`}
                      className="btn btn-primary min-h-11 px-4 text-[0.78rem]"
                    >
                      <Mail className="h-4 w-4" />
                      Email us
                    </a>
                    <Link
                      href="/contact"
                      className="btn btn-outline min-h-11 px-4 text-[0.78rem]"
                    >
                      Contact page
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] font-bold text-muted">
                    <a href={site.phoneHref} className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-coral" />
                      {site.phoneDisplay}
                    </a>
                    <a
                      href={site.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5"
                    >
                      <MapPin className="h-3.5 w-3.5 text-coral" />
                      {site.addressLine}
                      <ArrowUpRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
