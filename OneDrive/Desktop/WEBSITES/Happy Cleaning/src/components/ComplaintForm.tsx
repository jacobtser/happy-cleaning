"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Mail,
  Send,
  ShieldCheck,
  WhatsApp,
} from "./Icons";

const topics = [
  "Complaint",
  "Issue with an order",
  "Feedback or suggestion",
  "Something else",
];

type Fields = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  orderRef: string;
  message: string;
};

const emptyFields: Fields = {
  name: "",
  email: "",
  phone: "",
  topic: "",
  orderRef: "",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "mailto" | "error";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function ComplaintForm() {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [website, setWebsite] = useState("");

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    if (status === "error") setStatus("idle");
  }

  function validate() {
    const next: Partial<Record<keyof Fields, string>> = {};
    if (fields.name.trim().length < 2) {
      next.name = "Please tell us your name.";
    }
    if (!isEmail(fields.email)) {
      next.email = "Enter an email address we can reply to.";
    }
    if (fields.phone.trim() && fields.phone.replace(/\D/g, "").length < 9) {
      next.phone = "That phone number looks a little short.";
    }
    if (!fields.topic) {
      next.topic = "Choose what your message is about.";
    }
    if (fields.message.trim().length < 10) {
      next.message = "Please add a little more detail (at least 10 characters).";
    }
    return next;
  }

  function buildEmailBody() {
    return [
      `Name: ${fields.name.trim()}`,
      `Email: ${fields.email.trim()}`,
      fields.phone.trim() ? `Phone: ${fields.phone.trim()}` : "",
      fields.orderRef.trim() ? `Order reference: ${fields.orderRef.trim()}` : "",
      `Topic: ${fields.topic}`,
      "",
      fields.message.trim(),
      "",
      "— Sent from the Happy Cleaning Services website",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("idle");
      return;
    }

    setErrors({});

    // Honeypot: real visitors never see or fill this field. Bots get a
    // harmless success state without anything being sent.
    if (website.trim()) {
      setStatus("success");
      return;
    }

    if (!site.formspreeEndpoint) {
      const subject = encodeURIComponent(
        `[${fields.topic}] ${fields.name.trim()} — Happy Cleaning Services`,
      );
      const body = encodeURIComponent(buildEmailBody());
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch(site.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          phone: fields.phone.trim(),
          topic: fields.topic,
          orderReference: fields.orderRef.trim(),
          message: fields.message.trim(),
          _subject: `[${fields.topic}] ${fields.name.trim()} — Happy Cleaning Services`,
          _gotcha: website,
        }),
      });

      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setFields(emptyFields);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success" || status === "mailto") {
    const sentByEmail = status === "mailto";

    return (
      <div className="overflow-hidden rounded-[2rem] border border-line bg-paper soft-shadow">
        <div className="relative overflow-hidden bg-forest p-7 text-cream sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-cream text-forest">
              <CheckCircle className="h-7 w-7" />
            </span>
            <p className="mt-6 text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">
              {sentByEmail ? "One last step" : "Message received"}
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none font-semibold tracking-[-0.03em] sm:text-5xl">
              {sentByEmail ? "Check your email app." : "Thank you for telling us."}
            </h2>
            <p className="mt-4 max-w-lg text-[0.9rem] leading-6 text-cream/65">
              {sentByEmail
                ? "We've prepared your message in your email app. Press send there so it reaches our team."
                : "We've received your message and will read it carefully. You can expect a reply by email or phone."}
            </p>
          </div>
        </div>

        <div className="grid gap-3 p-6 sm:p-8">
          {sentByEmail && (
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent(
                `[${fields.topic}] ${fields.name.trim()} — Happy Cleaning Services`,
              )}&body=${encodeURIComponent(buildEmailBody())}`}
              className="btn btn-coral w-full"
            >
              <Mail className="h-4 w-4" />
              Open email again
            </a>
          )}
          <a
            href={`https://wa.me/${site.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn w-full ${sentByEmail ? "btn-outline" : "btn-coral"}`}
          >
            <WhatsApp className="h-4 w-4 text-[#1faa59]" />
            Message us on WhatsApp
          </a>
          <button type="button" onClick={reset} className="btn btn-outline w-full">
            {sentByEmail ? "Edit my message" : "Send another message"}
          </button>
          <p className="mt-1 text-center text-[0.72rem] leading-5 text-muted">
            {sentByEmail ? (
              <>
                Nothing opened? Email us directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="font-extrabold break-all text-forest underline decoration-forest/20 underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </>
            ) : (
              <>
                In a hurry?{" "}
                <a
                  href={site.phoneHref}
                  className="font-extrabold text-forest underline decoration-forest/20 underline-offset-4"
                >
                  Call {site.phoneDisplay}
                </a>{" "}
                during the day.
              </>
            )}
          </p>
        </div>

        <div className="border-t border-line bg-mint px-6 py-4 sm:px-8">
          <p className="flex items-start gap-2.5 text-[0.75rem] leading-5 text-forest/75">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
            Your message is used only to look into your complaint or feedback and
            reply to you. Read our{" "}
            <Link href="/privacy" className="font-extrabold underline decoration-forest/25 underline-offset-4">
              privacy notice
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2rem] border border-line bg-paper soft-shadow">
      <div className="border-b border-line bg-mint/60 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest/60">
            Complaints & feedback
          </p>
          <p className="inline-flex items-center gap-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-coral">
            <Mail className="h-3.5 w-3.5" />
            Goes straight to our inbox
          </p>
        </div>
        <h2 className="mt-3 font-display text-3xl leading-none font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
          Tell us what happened.
        </h2>
        <p className="mt-3 max-w-xl text-[0.84rem] leading-6 text-muted">
          If something wasn&apos;t right, we want to hear about it. Share the
          details below and we&apos;ll look into it personally. This form is for
          complaints, order issues and feedback — not new orders.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
        {status === "error" && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-2.5 rounded-xl border border-coral/25 bg-coral/8 px-4 py-3 text-[0.8rem] font-semibold text-[#9b3d28]"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              We couldn&apos;t send your message just now. Please try again, or
              email us at{" "}
              <a href={`mailto:${site.email}`} className="underline underline-offset-2">
                {site.email}
              </a>
              .
            </span>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="complaint-name" className="label">
              Your name
            </label>
            <input
              id="complaint-name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(event) => update("name", event.target.value)}
              className={`field ${errors.name ? "field-error" : ""}`}
              placeholder="Full name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "complaint-name-error" : undefined}
            />
            {errors.name && (
              <p id="complaint-name-error" className="mt-1.5 text-xs font-semibold text-[#b34b33]">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="complaint-email" className="label">
              Email address
            </label>
            <input
              id="complaint-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={fields.email}
              onChange={(event) => update("email", event.target.value)}
              className={`field ${errors.email ? "field-error" : ""}`}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "complaint-email-error" : undefined}
            />
            {errors.email && (
              <p id="complaint-email-error" className="mt-1.5 text-xs font-semibold text-[#b34b33]">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="complaint-phone" className="label">
              Phone / WhatsApp{" "}
              <span className="font-medium text-muted">(optional)</span>
            </label>
            <input
              id="complaint-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={fields.phone}
              onChange={(event) => update("phone", event.target.value)}
              className={`field ${errors.phone ? "field-error" : ""}`}
              placeholder="e.g. 055 818 4521"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "complaint-phone-error" : undefined}
            />
            {errors.phone && (
              <p id="complaint-phone-error" className="mt-1.5 text-xs font-semibold text-[#b34b33]">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="complaint-topic" className="label">
              What is this about?
            </label>
            <select
              id="complaint-topic"
              value={fields.topic}
              onChange={(event) => update("topic", event.target.value)}
              className={`field ${errors.topic ? "field-error" : ""}`}
              aria-invalid={Boolean(errors.topic)}
              aria-describedby={errors.topic ? "complaint-topic-error" : undefined}
            >
              <option value="">Choose a topic</option>
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
            {errors.topic && (
              <p id="complaint-topic-error" className="mt-1.5 text-xs font-semibold text-[#b34b33]">
                {errors.topic}
              </p>
            )}
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="complaint-reference" className="label">
              Order reference{" "}
              <span className="font-medium text-muted">(optional)</span>
            </label>
            <input
              id="complaint-reference"
              type="text"
              value={fields.orderRef}
              onChange={(event) => update("orderRef", event.target.value)}
              className="field"
              placeholder="e.g. HC-20261109-AB12 — it's in your WhatsApp order"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="complaint-message" className="label">
              Tell us what happened
            </label>
            <textarea
              id="complaint-message"
              rows={6}
              value={fields.message}
              onChange={(event) => update("message", event.target.value)}
              className={`field resize-none ${errors.message ? "field-error" : ""}`}
              placeholder="What went wrong, when it happened, and how you'd like us to put it right..."
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "complaint-message-error" : "complaint-message-help"}
            />
            {errors.message ? (
              <p id="complaint-message-error" className="mt-1.5 text-xs font-semibold text-[#b34b33]">
                {errors.message}
              </p>
            ) : (
              <p id="complaint-message-help" className="help">
                The more detail you share, the quicker we can help.
              </p>
            )}
          </div>
        </div>

        {/* Honeypot — hidden from people, catches bots. */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="complaint-website">Leave this field empty</label>
          <input
            id="complaint-website"
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <p className="flex items-start gap-2.5 text-[0.72rem] leading-5 text-forest/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
            We only use your details to respond to this message. Sending it
            doesn&apos;t create an order or any payment.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-coral w-full sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Sending…
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send message
              </>
            )}
          </button>
        </div>

        <p className="mt-4 text-[0.72rem] leading-5 text-muted">
          By sending this form you agree to our{" "}
          <Link
            href="/privacy"
            className="font-extrabold text-forest underline decoration-forest/20 underline-offset-4"
          >
            privacy notice
          </Link>
          . Prefer to place an order instead?{" "}
          <Link
            href="/book"
            className="inline-flex items-center gap-1 font-extrabold text-forest underline decoration-forest/20 underline-offset-4"
          >
            Use the order builder
            <ArrowRight className="h-3 w-3" />
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
