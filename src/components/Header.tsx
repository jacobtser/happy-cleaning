"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/site";
import { orderWhatsAppUrl } from "@/lib/whatsapp";
import {
  ArrowUpRight,
  Close,
  Menu,
  Phone,
  Sparkle,
  WhatsApp,
} from "./Icons";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/70 bg-cream/90 backdrop-blur-xl">
        <div className="container-page flex h-[74px] items-center justify-between gap-5">
          <Link
            href="/"
            className="shrink-0 rounded-full"
            aria-label="Happy Cleaning Services Sege Ada home"
          >
            <Logo />
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-[0.82rem] font-extrabold transition ${
                  isActive(link.href)
                    ? "text-forest"
                    : "text-muted hover:text-forest"
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute right-0 -bottom-0.5 left-0 h-[2px] rounded-full bg-coral" />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 md:flex">
            <ThemeToggle />
            <Link
              href="/contact"
              className="rounded-full px-4 py-2 text-[0.82rem] font-extrabold text-forest transition hover:bg-mint"
            >
              Talk to us
            </Link>
            <Link href="/book" className="btn btn-coral min-h-11 px-5 text-[0.82rem]">
              Place an order
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-forest transition hover:border-forest/30"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-menu"
            className="absolute inset-x-0 top-full max-h-[calc(100dvh-74px)] overflow-y-auto border-b border-line bg-cream px-5 pt-5 pb-8 shadow-[0_30px_60px_rgba(12,43,36,0.12)] lg:hidden"
          >
            <nav className="divide-y divide-line" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-4 font-display text-2xl ${
                    isActive(link.href) ? "text-coral" : "text-forest"
                  }`}
                >
                  {link.label}
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              ))}
            </nav>

            <div className="mt-6 grid gap-3">
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="btn btn-coral w-full"
              >
                Place an order
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={orderWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline w-full"
              >
                <WhatsApp className="h-4 w-4 text-[#1faa59]" />
                Order on WhatsApp
              </a>
            </div>

            <div className="mt-7 grid gap-3 rounded-2xl border border-line bg-paper p-4 text-sm">
              <a
                href={site.phoneHref}
                className="flex items-center gap-3 font-bold text-forest"
              >
                <Phone className="h-4 w-4 text-coral" />
                {site.phoneDisplay}
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-3 break-all font-bold text-forest"
              >
                <span className="grid h-4 w-4 shrink-0 place-items-center text-coral">
                  @
                </span>
                {site.email}
              </a>
              <p className="flex items-center gap-3 text-muted">
                <span className="grid h-4 w-4 shrink-0 place-items-center text-coral">
                  <Sparkle className="h-4 w-4" />
                </span>
                {site.addressLine}
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
