"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { services, type ServiceId } from "@/lib/services";
import { whatsappUrl } from "@/lib/whatsapp";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle,
  Copy,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkle,
  Truck,
  WhatsApp,
} from "./Icons";
import { ServiceIcon } from "./ServiceIcon";

type Fulfilment = "pickup" | "dropoff";

type Details = {
  name: string;
  phone: string;
  area: string;
  date: string;
  time: string;
  notes: string;
};

type Quantities = Record<ServiceId, number>;

const emptyQuantities: Quantities = {
  laundry: 1,
  "dry-cleaning": 1,
  "carpet-cleaning": 1,
  ironing: 1,
};

const timeOptions = ["Flexible", "Morning", "Afternoon", "Evening"];

function makeOrderRef() {
  const date = new Date();
  const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(
    date.getDate(),
  ).padStart(2, "0")}`;
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `HC-${stamp}-${random}`;
}

function formatDate(value: string) {
  if (!value) return "";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-GH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function buildOrderMessage({
  selected,
  quantities,
  fulfilment,
  details,
  orderRef,
}: {
  selected: ServiceId[];
  quantities: Quantities;
  fulfilment: Fulfilment;
  details: Details;
  orderRef: string;
}) {
  const serviceLines = services
    .filter((service) => selected.includes(service.id))
    .map((service) => {
      const quantity = quantities[service.id];
      return `• ${service.name} — ${quantity} ${
        quantity === 1 ? service.unit : service.unitPlural
      }`;
    })
    .join("\n");

  const lines = [
    "Hello Happy Cleaning Services Sege!",
    "I'd like to place an order.",
    "",
    `Order reference: ${orderRef || "To be confirmed"}`,
    `Name: ${details.name.trim()}`,
    `Phone: ${details.phone.trim()}`,
    "",
    "Services:",
    serviceLines,
    "",
    `Collection: ${
      fulfilment === "pickup" ? "Pickup & delivery" : "Drop-off at Sege-Ada"
    }`,
    `Area / address: ${details.area.trim()}`,
    `Preferred date: ${formatDate(details.date)}`,
    `Preferred time: ${details.time}`,
  ];

  if (details.notes.trim()) {
    lines.push(`Notes: ${details.notes.trim()}`);
  }

  lines.push("", "Please confirm availability and the final quote. Thank you!");
  return lines.join("\n");
}

export function OrderForm({ initialService }: { initialService?: ServiceId }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selected, setSelected] = useState<ServiceId[]>(
    initialService ? [initialService] : [],
  );
  const [quantities, setQuantities] = useState<Quantities>(emptyQuantities);
  const [fulfilment, setFulfilment] = useState<Fulfilment>("pickup");
  const [details, setDetails] = useState<Details>({
    name: "",
    phone: "",
    area: "",
    date: "",
    time: "Flexible",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [stepError, setStepError] = useState("");
  const [orderRef, setOrderRef] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const formAnchor = useRef<HTMLDivElement>(null);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    formAnchor.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, sent]);

  useEffect(() => {
    if (step !== 3 || orderRef) return;
    const timer = setTimeout(() => setOrderRef(makeOrderRef()), 0);
    return () => clearTimeout(timer);
  }, [step, orderRef]);

  const selectedServices = services.filter((service) =>
    selected.includes(service.id),
  );

  const orderMessage = useMemo(
    () =>
      buildOrderMessage({
        selected,
        quantities,
        fulfilment,
        details,
        orderRef,
      }),
    [selected, quantities, fulfilment, details, orderRef],
  );
  const orderHref = whatsappUrl(orderMessage);

  function toggleService(id: ServiceId) {
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
    setStepError("");
  }

  function changeQuantity(id: ServiceId, value: number) {
    const safeValue = Number.isFinite(value) ? Math.round(value) : 1;
    setQuantities((current) => ({
      ...current,
      [id]: Math.min(99, Math.max(1, safeValue)),
    }));
  }

  function updateDetail<K extends keyof Details>(key: K, value: Details[K]) {
    setDetails((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key]) return current;
      const next = { ...current };
      delete next[key];
      return next;
    });
    setStepError("");
  }

  function validateDetails() {
    const next: Record<string, string> = {};
    if (details.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (details.phone.replace(/\D/g, "").length < 9) {
      next.phone = "Enter a phone number we can reach you on.";
    }
    if (details.area.trim().length < 2) {
      next.area =
        fulfilment === "pickup"
          ? "Tell us where we should collect from."
          : "Tell us your area or a nearby landmark.";
    }
    if (!details.date) {
      next.date = "Choose a preferred date.";
    } else {
      const chosen = new Date(`${details.date}T12:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(chosen.getTime()) || chosen < today) {
        next.date = "Please choose today or a future date.";
      }
    }
    return next;
  }

  function continueToNextStep() {
    if (step === 1) {
      if (selected.length === 0) {
        setStepError("Choose at least one service to continue.");
        return;
      }
      setStepError("");
      setStep(2);
      return;
    }

    if (step === 2) {
      const nextErrors = validateDetails();
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        setStepError("Please check the highlighted details before continuing.");
        return;
      }
      setErrors({});
      setStepError("");
      if (!orderRef) setOrderRef(makeOrderRef());
      setStep(3);
    }
  }

  function goBack() {
    setStepError("");
    if (step > 1) setStep((current) => (current - 1) as 1 | 2);
  }

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  function resetSent() {
    setSent(false);
    setCopied(false);
  }

  if (sent) {
    return (
      <div ref={formAnchor} className="overflow-hidden rounded-[2rem] border border-line bg-paper soft-shadow">
        <div className="relative overflow-hidden bg-forest p-7 text-cream sm:p-10">
          <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-coral/20 blur-3xl" />
          <div className="relative">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-cream text-forest">
              <CheckCircle className="h-7 w-7" />
            </span>
            <p className="mt-6 text-[0.62rem] font-extrabold uppercase tracking-[0.24em] text-gold">
              Order prepared
            </p>
            <h2 className="mt-2 font-display text-4xl leading-none font-semibold tracking-[-0.03em] sm:text-5xl">
              One last step.
            </h2>
            <p className="mt-4 max-w-lg text-[0.9rem] leading-6 text-cream/65">
              WhatsApp should have opened with your order ready to send. Press{" "}
              <strong className="text-cream">send</strong> in the chat so it
              reaches our team.
            </p>
            <p className="mt-4 inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-[0.16em] text-cream/60">
              Ref: {orderRef}
            </p>
          </div>
        </div>

        <div className="grid gap-3 p-6 sm:p-8">
          <a
            href={orderHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setSent(true)}
            className="btn btn-coral w-full"
          >
            <WhatsApp className="h-5 w-5" />
            Open WhatsApp again
            <ArrowRight className="h-4 w-4" />
          </a>
          <button type="button" onClick={copyOrder} className="btn btn-outline w-full">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Order copied" : "Copy order message"}
          </button>
          <button
            type="button"
            onClick={resetSent}
            className="mt-1 text-center text-sm font-extrabold text-muted transition hover:text-forest"
          >
            Back to review or edit
          </button>
        </div>

        <div className="border-t border-line bg-mint px-6 py-4 sm:px-8">
          <p className="flex items-start gap-2.5 text-[0.75rem] leading-5 text-forest/75">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
            No payment is taken on this website. We&apos;ll confirm your order
            and final quote in the WhatsApp chat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={formAnchor} className="overflow-hidden rounded-[2rem] border border-line bg-paper soft-shadow">
      <div className="border-b border-line bg-mint/60 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-forest/60">
            Order builder
          </p>
          <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.16em] text-coral">
            No payment online
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { number: 1, label: "Services" },
            { number: 2, label: "Details" },
            { number: 3, label: "Review" },
          ].map((item) => (
            <div key={item.number} className="min-w-0">
              <div
                className={`h-1.5 rounded-full transition-colors ${
                  step >= item.number ? "bg-coral" : "bg-forest/10"
                }`}
              />
              <p
                className={`mt-2 truncate text-[0.6rem] font-extrabold uppercase tracking-[0.12em] ${
                  step >= item.number ? "text-forest" : "text-muted/60"
                }`}
              >
                {item.number}. {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 sm:p-8">
        {stepError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-2.5 rounded-xl border border-coral/25 bg-coral/10 px-4 py-3 text-[0.8rem] font-semibold text-coral-deep"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {stepError}
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="eyebrow">Step one</p>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-3xl leading-none font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
                What can we clean?
              </h2>
              <p className="text-[0.72rem] font-extrabold text-muted">
                {selected.length > 0
                  ? `${selected.length} selected`
                  : "Choose one or more"}
              </p>
            </div>
            <p className="mt-3 max-w-lg text-[0.84rem] leading-6 text-muted">
              Pick every service you need. You can add more than one — we&apos;ll
              sort the details together.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {services.map((service) => {
                const active = selected.includes(service.id);
                return (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => toggleService(service.id)}
                    aria-pressed={active}
                    className={`group relative overflow-hidden rounded-[1.35rem] border p-5 text-left transition duration-300 ${
                      active
                        ? "border-forest bg-forest text-cream shadow-[0_14px_35px_rgba(12,43,36,0.18)]"
                        : "border-line bg-cream/40 text-forest hover:-translate-y-0.5 hover:border-forest/35 hover:bg-cream"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span
                        className={`grid h-11 w-11 place-items-center rounded-full ${
                          active ? "bg-cream/10 text-gold" : "bg-sage text-forest"
                        }`}
                      >
                        <ServiceIcon icon={service.icon} className="h-5 w-5" />
                      </span>
                      <span
                        className={`grid h-6 w-6 place-items-center rounded-full border ${
                          active
                            ? "border-gold bg-gold text-forest"
                            : "border-forest/20 bg-transparent text-transparent"
                        }`}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                    </div>
                    <h3 className="mt-5 font-display text-[1.7rem] leading-none font-semibold tracking-[-0.02em]">
                      {service.name}
                    </h3>
                    <p
                      className={`mt-2 text-[0.74rem] font-semibold ${
                        active ? "text-cream/60" : "text-muted"
                      }`}
                    >
                      {service.tagline}
                    </p>
                    <p
                      className={`mt-4 text-[0.62rem] font-extrabold uppercase tracking-[0.16em] ${
                        active ? "text-gold/80" : "text-forest/45"
                      }`}
                    >
                      {service.unit}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="eyebrow">Step two</p>
            <h2 className="mt-3 font-display text-3xl leading-none font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
              A little more detail.
            </h2>
            <p className="mt-3 max-w-lg text-[0.84rem] leading-6 text-muted">
              Tell us how much you have and where you are. We&apos;ll confirm the
              exact pickup or drop-off arrangement with you.
            </p>

            <div className="mt-7 grid gap-3">
              <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest/50">
                Your services & quantities
              </p>
              {selectedServices.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col gap-4 rounded-[1.25rem] border border-line bg-cream/40 p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage text-forest">
                      <ServiceIcon icon={service.icon} className="h-4.5 w-4.5" />
                    </span>
                    <div>
                      <p className="text-sm font-extrabold text-forest">
                        {service.name}
                      </p>
                      <p className="mt-0.5 text-[0.7rem] leading-5 text-muted">
                        {service.quantityLabel}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-2 self-start sm:self-auto"
                    role="group"
                    aria-label={`${service.name} quantity`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(service.id, quantities[service.id] - 1)
                      }
                      disabled={quantities[service.id] <= 1}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-lg font-bold text-forest transition hover:border-forest disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label={`Decrease ${service.name} quantity`}
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={quantities[service.id]}
                      onChange={(event) =>
                        changeQuantity(service.id, Number(event.target.value))
                      }
                      className="field h-9 w-14 rounded-full px-1 py-0 text-center text-sm font-extrabold"
                      aria-label={`${service.name} quantity in ${
                        quantities[service.id] === 1
                          ? service.unit
                          : service.unitPlural
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        changeQuantity(service.id, quantities[service.id] + 1)
                      }
                      disabled={quantities[service.id] >= 99}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-paper text-lg font-bold text-forest transition hover:border-forest disabled:cursor-not-allowed disabled:opacity-35"
                      aria-label={`Increase ${service.name} quantity`}
                    >
                      +
                    </button>
                    <span className="ml-1 w-16 text-[0.68rem] font-bold text-muted">
                      {quantities[service.id] === 1
                        ? service.unit
                        : service.unitPlural}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <fieldset className="mt-7">
              <legend className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest/50">
                Collection preference
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    id: "pickup" as const,
                    title: "Pickup & delivery",
                    body: "We collect and return your items.",
                    icon: <Truck className="h-5 w-5" />,
                  },
                  {
                    id: "dropoff" as const,
                    title: "Drop-off",
                    body: "You bring items to us in Sege-Ada.",
                    icon: <MapPin className="h-5 w-5" />,
                  },
                ].map((option) => {
                  const active = fulfilment === option.id;
                  return (
                    <label
                      key={option.id}
                      className={`relative flex cursor-pointer gap-3 rounded-[1.2rem] border p-4 transition ${
                        active
                          ? "border-forest bg-forest text-cream"
                          : "border-line bg-cream/40 text-forest hover:border-forest/30"
                      }`}
                    >
                      <input
                        type="radio"
                        name="fulfilment"
                        value={option.id}
                        checked={active}
                        onChange={() => setFulfilment(option.id)}
                        className="sr-only"
                      />
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                          active ? "bg-cream/10 text-gold" : "bg-sage text-forest"
                        }`}
                      >
                        {option.icon}
                      </span>
                      <span>
                        <span className="block text-[0.82rem] font-extrabold">
                          {option.title}
                        </span>
                        <span
                          className={`mt-1 block text-[0.7rem] leading-5 ${
                            active ? "text-cream/60" : "text-muted"
                          }`}
                        >
                          {option.body}
                        </span>
                      </span>
                      <span
                        className={`absolute top-3 right-3 grid h-5 w-5 place-items-center rounded-full border ${
                          active
                            ? "border-gold bg-gold text-forest"
                            : "border-forest/20 text-transparent"
                        }`}
                      >
                        <Check className="h-3 w-3" />
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="order-name" className="label">
                  Full name
                </label>
                <input
                  id="order-name"
                  type="text"
                  autoComplete="name"
                  value={details.name}
                  onChange={(event) => updateDetail("name", event.target.value)}
                  className={`field ${errors.name ? "field-error" : ""}`}
                  placeholder="Your full name"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "order-name-error" : undefined}
                />
                {errors.name && (
                  <p id="order-name-error" className="mt-1.5 text-xs font-semibold text-coral-deep">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="order-phone" className="label">
                  Phone / WhatsApp number
                </label>
                <input
                  id="order-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={details.phone}
                  onChange={(event) => updateDetail("phone", event.target.value)}
                  className={`field ${errors.phone ? "field-error" : ""}`}
                  placeholder="e.g. 055 818 4521"
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "order-phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="order-phone-error" className="mt-1.5 text-xs font-semibold text-coral-deep">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="order-area" className="label">
                  {fulfilment === "pickup"
                    ? "Pickup area / address"
                    : "Your area / landmark"}
                </label>
                <input
                  id="order-area"
                  type="text"
                  autoComplete="street-address"
                  value={details.area}
                  onChange={(event) => updateDetail("area", event.target.value)}
                  className={`field ${errors.area ? "field-error" : ""}`}
                  placeholder="e.g. Sege-Ada, near the market"
                  aria-invalid={Boolean(errors.area)}
                  aria-describedby={errors.area ? "order-area-error" : undefined}
                />
                {errors.area && (
                  <p id="order-area-error" className="mt-1.5 text-xs font-semibold text-coral-deep">
                    {errors.area}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="order-date" className="label">
                  Preferred date
                </label>
                <input
                  id="order-date"
                  type="date"
                  value={details.date}
                  onChange={(event) => updateDetail("date", event.target.value)}
                  className={`field ${errors.date ? "field-error" : ""}`}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "order-date-error" : undefined}
                />
                {errors.date && (
                  <p id="order-date-error" className="mt-1.5 text-xs font-semibold text-coral-deep">
                    {errors.date}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="order-time" className="label">
                  Preferred time
                </label>
                <select
                  id="order-time"
                  value={details.time}
                  onChange={(event) => updateDetail("time", event.target.value)}
                  className="field"
                >
                  {timeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="order-notes" className="label">
                  Anything we should know?{" "}
                  <span className="font-medium text-muted">(optional)</span>
                </label>
                <textarea
                  id="order-notes"
                  rows={3}
                  value={details.notes}
                  onChange={(event) => updateDetail("notes", event.target.value)}
                  className="field resize-none"
                  placeholder="Stains, delicate fabrics, carpet sizes, a landmark, anything helpful..."
                />
              </div>
            </div>

            <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-mint px-4 py-3 text-[0.72rem] leading-5 text-forest/70">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
              Your details are only used to prepare this order. We&apos;ll
              confirm the exact time and quote with you on WhatsApp.
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="eyebrow">Step three</p>
                <h2 className="mt-3 font-display text-3xl leading-none font-semibold tracking-[-0.025em] text-forest sm:text-4xl">
                  Review & send.
                </h2>
              </div>
              <span className="rounded-full border border-line bg-cream/60 px-3 py-1.5 text-[0.62rem] font-extrabold uppercase tracking-[0.14em] text-forest/60">
                Ref: {orderRef || "generating"}
              </span>
            </div>
            <p className="mt-3 max-w-lg text-[0.84rem] leading-6 text-muted">
              This is exactly what will be placed in your WhatsApp chat. You can
              still edit anything before you send.
            </p>

            <div className="mt-6 grid gap-3">
              <div className="rounded-[1.35rem] border border-line bg-cream/40 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest/50">
                    Services
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-[0.7rem] font-extrabold text-coral underline decoration-coral/30 underline-offset-4"
                  >
                    Edit
                  </button>
                </div>
                <ul className="mt-4 grid gap-2.5">
                  {selectedServices.map((service) => (
                    <li key={service.id} className="flex items-center gap-3">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-sage text-forest">
                        <ServiceIcon icon={service.icon} className="h-4 w-4" />
                      </span>
                      <span className="flex-1 text-[0.84rem] font-extrabold text-forest">
                        {service.name}
                      </span>
                      <span className="text-[0.75rem] font-bold text-muted">
                        {quantities[service.id]}{" "}
                        {quantities[service.id] === 1
                          ? service.unit
                          : service.unitPlural}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[1.35rem] border border-line bg-cream/40 p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[0.62rem] font-extrabold uppercase tracking-[0.18em] text-forest/50">
                    Collection & contact
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-[0.7rem] font-extrabold text-coral underline decoration-coral/30 underline-offset-4"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex items-start gap-2.5">
                    <Truck className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <div>
                      <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Method
                      </p>
                      <p className="mt-0.5 text-[0.82rem] font-extrabold text-forest">
                        {fulfilment === "pickup"
                          ? "Pickup & delivery"
                          : "Drop-off at Sege-Ada"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <div>
                      <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        {fulfilment === "pickup" ? "Pickup area" : "Your area"}
                      </p>
                      <p className="mt-0.5 text-[0.82rem] font-extrabold text-forest">
                        {details.area}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <div>
                      <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Phone
                      </p>
                      <p className="mt-0.5 text-[0.82rem] font-extrabold text-forest">
                        {details.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
                    <div>
                      <p className="text-[0.63rem] font-extrabold uppercase tracking-[0.12em] text-muted">
                        Preferred
                      </p>
                      <p className="mt-0.5 text-[0.82rem] font-extrabold text-forest">
                        {formatDate(details.date)} · {details.time}
                      </p>
                    </div>
                  </div>
                </div>
                {details.notes.trim() && (
                  <div className="mt-4 rounded-xl border border-line bg-paper px-3.5 py-3">
                    <p className="text-[0.6rem] font-extrabold uppercase tracking-[0.16em] text-muted">
                      Notes
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-5 text-forest/80">
                      {details.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="flex items-start gap-2.5 text-[0.72rem] leading-5 text-forest/70">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-forest" />
                No payment is taken here. Once we receive your order, we&apos;ll
                confirm availability and send your quote on WhatsApp.
              </p>
              <button type="button" onClick={copyOrder} className="btn btn-outline min-h-11 sm:justify-self-end">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy summary"}
              </button>
            </div>

            <a
              href={orderHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSent(true)}
              className="btn btn-coral mt-3 w-full min-h-14 text-[0.95rem]"
            >
              <WhatsApp className="h-5 w-5" />
              Send order on WhatsApp
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-2 text-center text-[0.68rem] font-semibold text-muted">
              This opens WhatsApp with your order written out. Press send there
              to reach us.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-line bg-cream/50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <button
          type="button"
          onClick={step === 1 ? undefined : goBack}
          disabled={step === 1}
          className={`btn min-h-11 px-4 text-[0.78rem] ${
            step === 1
              ? "hidden sm:invisible sm:flex"
              : "btn-outline"
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {step < 3 ? (
          <button
            type="button"
            onClick={continueToNextStep}
            className="btn btn-primary w-full sm:w-auto"
          >
            {step === 1 ? "Add details" : "Review order"}
            <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <Link
            href="/contact"
            className="text-center text-[0.72rem] font-extrabold text-muted transition hover:text-forest sm:text-left"
          >
            Need help instead? Contact us
          </Link>
        )}
      </div>
    </div>
  );
}
