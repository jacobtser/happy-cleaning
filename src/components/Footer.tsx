import Link from "next/link";
import { services } from "@/lib/services";
import { navLinks, site } from "@/lib/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Sparkle,
  WhatsApp,
} from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="container-page footer-pad pt-16 md:pt-20">
        <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_0.9fr_1.1fr]">
          <div>
            <Link href="/" aria-label="Happy Cleaning Services home">
              <Logo light />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-cream/60">
              Laundry, dry cleaning, carpet cleaning and ironing for homes and
              businesses around Sege-Ada. Order in a few clicks, confirm on
              WhatsApp, and leave the wash day to us.
            </p>
            <a
              href={generalWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light mt-6 min-h-12 text-forest"
            >
              <WhatsApp className="h-5 w-5 text-[#1faa59]" />
              Chat with us
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.26em] text-gold">
              Explore
            </p>
            <ul className="mt-5 grid gap-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream/65 transition hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/book"
                  className="text-cream/65 transition hover:text-cream"
                >
                  Place an order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.26em] text-gold">
              Services
            </p>
            <ul className="mt-5 grid gap-3 text-sm">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/book?service=${service.id}`}
                    className="text-cream/65 transition hover:text-cream"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.26em] text-gold">
              Get in touch
            </p>
            <ul className="mt-5 grid gap-4 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-start gap-3 text-cream/70 transition hover:text-cream"
                >
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-start gap-3 break-all text-cream/70 transition hover:text-cream"
                >
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-cream/70 transition hover:text-cream"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                  {site.addressLine}
                </a>
              </li>
              <li className="flex items-start gap-3 text-cream/50">
                <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                Pickup & drop-off available
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 text-[0.68rem] leading-5 text-cream/40 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-cream/75">
              Privacy
            </Link>
            <a
              href="https://www.pexels.com/license/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-cream/75"
            >
              Photography via Pexels
            </a>
            <span className="hidden items-center gap-1.5 md:flex">
              Made with care in Sege-Ada
              <Sparkle className="h-3 w-3 text-gold" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
