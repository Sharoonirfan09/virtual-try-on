import { getProduct } from "@/data/products";
import { UPLOAD_RULES } from "@/lib/config";
import { isProviderConfigured, ProviderError, runTryOn } from "@/services/server/tryOnProvider";

// Image generation typically takes 10–40 seconds.
export const maxDuration = 120;

/* Best-effort abuse guard (per server instance). Pair it with an AI Gateway budget. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 12;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  if (!isProviderConfigured()) {
    return Response.json(
      { message: "Live try-on isn't connected yet. Switch to demo mode to present the experience." },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return Response.json(
      { message: "You've created a lot of looks in a short time. Please wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const form = await request.formData().catch(() => null);
  const personImage = form?.get("personImage");
  const product = getProduct(form?.get("productId")?.toString());

  if (!(personImage instanceof Blob) || !product) {
    return Response.json({ message: "Please choose a garment and add a photo." }, { status: 400 });
  }
  if (!UPLOAD_RULES.acceptedTypes.includes(personImage.type) || personImage.size > UPLOAD_RULES.maxBytes) {
    return Response.json({ message: "Please upload a JPG, PNG or WEBP photo under 12 MB." }, { status: 400 });
  }

  try {
    // The garment is resolved from the catalogue on the server — the client
    // never supplies an arbitrary garment image.
    const { imageUrl } = await runTryOn({ personImage, product });
    return Response.json({ imageUrl });
  } catch (err) {
    console.error("[try-on] generation failed", err);
    if (err instanceof ProviderError && err.code === "credits") {
      return Response.json(
        { message: "Live try-on is temporarily unavailable. Please try again later." },
        { status: 503 },
      );
    }
    if (err instanceof ProviderError && err.code === "no_image") {
      return Response.json(
        { message: "We couldn't create a look from this photo. Try a clear, front-facing full-body photo." },
        { status: 422 },
      );
    }
    return Response.json(
      { message: "Your look couldn't be generated this time. Please try again." },
      { status: 502 },
    );
  }
}
