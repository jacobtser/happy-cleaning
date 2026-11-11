import { NextResponse } from "next/server";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE_LENGTH = 1000;
const REQUEST_TIMEOUT_MS = 20_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimits = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimits.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });

    if (rateLimits.size > 1000) {
      for (const [key, value] of rateLimits) {
        if (value.resetAt <= now) rateLimits.delete(key);
      }
    }

    return false;
  }

  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

function systemPrompt() {
  const serviceLines = services
    .map((service) => `- ${service.name}: ${service.tagline}. ${service.description}`)
    .join("\n");

  return `You are the customer service assistant for ${site.name}, a laundry and cleaning business in ${site.location}, ${site.region}.

Business details:
- Phone / WhatsApp: ${site.phoneDisplay} (${site.phoneInternational})
- Email: ${site.email}
- Website: ${site.url}
- Service area: ${site.addressLine}

Services:
${serviceLines}

Pricing and payment:
- There are no fixed prices. Quotes depend on the service, quantity, fabric and condition.
- No payment is taken on the website. The team confirms the quote and payment on WhatsApp.
- Pickup and drop-off are available in Sege-Ada and nearby areas.

Ordering:
- Customers build an order on the /book page and send it to WhatsApp.
- The team confirms availability, timing and the quote before any work begins.

Rules:
- Be warm, friendly, concise and professional.
- Answer greetings, casual messages and general questions naturally.
- Never invent prices or promise a specific delivery time.
- If you are unsure, offer to connect the customer with the team on WhatsApp or by phone.
- Keep replies under about 120 words unless the customer asks for detail.`;
}

function extractReply(data: unknown): string {
  const content = (
    data as {
      choices?: Array<{ message?: { content?: unknown } }>;
    }
  )?.choices?.[0]?.message?.content;

  if (typeof content === "string" && content.trim()) {
    return content.trim();
  }

  if (Array.isArray(content)) {
    const joined = content
      .map((part) => {
        if (
          part &&
          typeof part === "object" &&
          typeof (part as { text?: unknown }).text === "string"
        ) {
          return (part as { text: string }).text;
        }
        return "";
      })
      .join("")
      .trim();

    if (joined) return joined;
  }

  throw new Error("The provider returned an empty reply.");
}

async function chatCompletion(
  url: string,
  key: string,
  model: string,
  messages: ChatMessage[],
  extraHeaders: Record<string, string> = {}
) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      ...extraHeaders,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.6,
      max_tokens: 400,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${text.slice(0, 300)}`);
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error("The provider returned invalid JSON.");
  }

  return extractReply(data);
}

let groqModels: string[] | null = null;

async function getGroqModels(key: string) {
  if (groqModels?.length) return groqModels;

  const response = await fetch("https://api.groq.com/openai/v1/models", {
    headers: { Authorization: `Bearer ${key}` },
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Groq model list failed (HTTP ${response.status}).`);
  }

  const data = (await response.json()) as {
    data?: Array<{ id?: unknown; active?: unknown }>;
  };

  const ids = (data.data ?? [])
    .filter(
      (model): model is { id: string; active?: unknown } =>
        typeof model.id === "string" &&
        model.active !== false &&
        !/whisper|tts|guard|embed/i.test(model.id)
    )
    .map((model) => model.id);

  const priorities = [
    /^llama-3\.3-70b-versatile$/i,
    /^llama-3\.1-8b-instant$/i,
    /^openai\/gpt-oss-20b$/i,
    /^openai\/gpt-oss-120b$/i,
    /^qwen\/qwen3-32b$/i,
    /^meta-llama\/llama-4-scout/i,
    /^meta-llama\/llama-4-maverick/i,
    /^moonshotai\/kimi-k2/i,
    /^llama/i,
  ];

  const ordered = [
    ...priorities.flatMap((pattern) => ids.filter((id) => pattern.test(id))),
    ...ids,
  ];
  const unique = [...new Set(ordered)];

  if (!unique.length) {
    throw new Error("Groq returned no chat models.");
  }

  groqModels = unique.slice(0, 3);
  return groqModels;
}

async function askGroq(key: string, messages: ChatMessage[]) {
  let models: string[];

  try {
    models = await getGroqModels(key);
  } catch {
    models = ["llama-3.3-70b-versatile"];
  }

  let lastError: unknown;

  for (const model of models) {
    try {
      return await chatCompletion(
        "https://api.groq.com/openai/v1/chat/completions",
        key,
        model,
        messages
      );
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError ?? new Error("Groq failed.");
}

let openRouterModel: string | null = null;

async function getOpenRouterModel() {
  if (openRouterModel) return openRouterModel;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      signal: AbortSignal.timeout(10_000),
    });

    if (response.ok) {
      const data = (await response.json()) as {
        data?: Array<{
          id?: unknown;
          pricing?: { prompt?: unknown; completion?: unknown };
        }>;
      };

      const freeModels = (data.data ?? []).filter(
        (model): model is { id: string; pricing?: { prompt?: unknown; completion?: unknown } } =>
          typeof model.id === "string" &&
          model.id.endsWith(":free") &&
          model.pricing?.prompt === "0" &&
          model.pricing?.completion === "0"
      );

      const preferred = ["deepseek", "llama-3.3", "qwen", "mistral", "gemma"];
      const chosen =
        preferred.flatMap((needle) =>
          freeModels.filter((model) =>
            model.id.toLowerCase().includes(needle)
          )
        )[0] ?? freeModels[0];

      if (chosen?.id) {
        openRouterModel = chosen.id;
        return chosen.id;
      }
    }
  } catch {
    // Fall through to the auto router below.
  }

  openRouterModel = "openrouter/auto";
  return openRouterModel;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a moment and try again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const message =
    body &&
    typeof body === "object" &&
    typeof (body as { message?: unknown }).message === "string"
      ? (body as { message: string }).message.trim()
      : "";

  if (!message) {
    return NextResponse.json(
      { error: "Please type a message." },
      { status: 400 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { error: "Please keep your message shorter." },
      { status: 400 }
    );
  }

  // Keep a short, validated slice of the conversation so follow-up questions
  // such as "how much?" still have context.
  const history: ChatMessage[] = [];
  const rawHistory =
    body && typeof body === "object"
      ? (body as { history?: unknown }).history
      : undefined;

  if (Array.isArray(rawHistory)) {
    for (const entry of rawHistory.slice(-8)) {
      if (!entry || typeof entry !== "object") continue;

      const role = (entry as { role?: unknown }).role;
      const content = (entry as { content?: unknown }).content;

      if (role !== "user" && role !== "assistant") continue;
      if (typeof content !== "string") continue;

      const trimmed = content.trim();
      if (!trimmed || trimmed.length > MAX_MESSAGE_LENGTH) continue;

      history.push({ role, content: trimmed });
    }
  }

  const messages: ChatMessage[] = [
    { role: "system", content: systemPrompt() },
    ...history,
    { role: "user", content: message },
  ];

  const attempts: Array<{ provider: string; run: () => Promise<string> }> = [];

  const groqKey = process.env.GROQ_API_KEY?.trim();
  if (groqKey) {
    attempts.push({
      provider: "groq",
      run: () => askGroq(groqKey, messages),
    });
  }

  const deepseekKey = process.env.DEEPSEEK_API_KEY?.trim();
  if (deepseekKey) {
    attempts.push({
      provider: "deepseek",
      run: () =>
        chatCompletion(
          "https://api.deepseek.com/chat/completions",
          deepseekKey,
          "deepseek-chat",
          messages
        ),
    });
  }

  const openrouterKey = process.env.OPENROUTER_API_KEY?.trim();
  if (openrouterKey) {
    attempts.push({
      provider: "openrouter",
      run: async () =>
        chatCompletion(
          "https://openrouter.ai/api/v1/chat/completions",
          openrouterKey,
          await getOpenRouterModel(),
          messages,
          {
            "HTTP-Referer": site.url,
            "X-Title": site.name,
          }
        ),
    });
  }

  if (!attempts.length) {
    return NextResponse.json(
      {
        error:
          "The assistant is not configured yet. Please contact us on WhatsApp.",
      },
      { status: 503 }
    );
  }

  for (const attempt of attempts) {
    try {
      const reply = await attempt.run();
      return NextResponse.json({ reply, provider: attempt.provider });
    } catch (error) {
      console.error(
        `[ai-assistant] ${attempt.provider} failed:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  return NextResponse.json(
    {
      error:
        "The assistant is temporarily unavailable. Please try again or message us on WhatsApp.",
    },
    { status: 502 }
  );
}
