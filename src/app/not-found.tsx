import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkle, WhatsApp } from "@/components/Icons";
import { generalWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-sage/80 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-80 w-80 rounded-full bg-coral/10 blur-3xl" />
      <div className="paper-texture pointer-events-none absolute inset-0 opacity-30" />

      <div className="container-page relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center md:py-28">
        <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-paper/80 px-4 py-2 text-[0.6rem] font-extrabold uppercase tracking-[0.2em] text-forest/60 backdrop-blur">
          <Sparkle className="h-3.5 w-3.5 text-coral" />
          Error 404
        </p>

        <p className="animate-fade-up-delay-1 mt-6 font-display text-8xl leading-none font-semibold tracking-[-0.06em] text-forest sm:text-[10rem]">
          4<span className="italic text-coral">0</span>4
        </p>

        <h1 className="animate-fade-up-delay-2 mt-5 max-w-2xl font-display text-4xl leading-[1.02] font-semibold tracking-[-0.03em] text-forest sm:text-5xl">
          This page went out
          <br />
          <span className="italic text-coral">with the laundry.</span>
        </h1>
        <p className="animate-fade-up-delay-2 mt-5 max-w-md text-[0.94rem] leading-7 text-muted">
          We couldn&apos;t find the page you were looking for. It may have moved,
          or the link might be a little out of date. Let&apos;s get you back to
          something fresh.
        </p>

        <div className="animate-fade-up-delay-3 mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <Link href="/" className="btn btn-coral">
            Back to home
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/book" className="btn btn-outline">
            Place an order
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="animate-fade-up-delay-3 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.76rem] font-extrabold text-forest/70">
          <Link href="/services" className="link-underline text-[0.76rem]">
            Our services
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <Link href="/contact" className="link-underline text-[0.76rem]">
            Contact us
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={generalWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-[0.76rem]"
          >
            <WhatsApp className="h-3.5 w-3.5 text-[#1faa59]" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
