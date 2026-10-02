/**
 * Try-on generation — the only module UI components talk to.
 *
 * DEMO_MODE  → simulated locally. The result is a clearly-labelled demo
 *              composite (or the product's prepared `demoResultImage`).
 *              No AI call is made and the result is marked `mode: "demo"`.
 * API mode   → the photo and the product id are posted to /api/try-on.
 *              Provider credentials live on the server only.
 */
import { DEMO_MODE, DEMO_SETTINGS } from "@/lib/config";
import type { Product } from "@/data/products";

export type TryOnResult = {
  imageUrl: string;
  mode: "demo" | "live";
  productId: string;
  createdAt: number;
};

export class TryOnError extends Error {
  constructor(
    public code: "network" | "unavailable" | "rejected" | "image" | "aborted",
    message: string,
  ) {
    super(message);
  }
}

export async function generateTryOn(
  personImage: File,
  garment: Product,
  options: { signal?: AbortSignal } = {},
): Promise<TryOnResult> {
  if (DEMO_MODE) return simulateTryOn(personImage, garment, options.signal);
  return requestLiveTryOn(personImage, garment, options.signal);
}

/* ------------------------------------------------------------------ */
/* Demo mode                                                           */
/* ------------------------------------------------------------------ */

async function simulateTryOn(
  personImage: File,
  garment: Product,
  signal?: AbortSignal,
): Promise<TryOnResult> {
  const { minDurationMs, maxDurationMs } = DEMO_SETTINGS;
  const duration = minDurationMs + Math.random() * (maxDurationMs - minDurationMs);

  const [imageUrl] = await Promise.all([
    garment.demoResultImage
      ? Promise.resolve(garment.demoResultImage)
      : composeDemoPreview(personImage, garment.garmentImage),
    wait(duration, signal),
  ]);

  return { imageUrl, mode: "demo", productId: garment.id, createdAt: Date.now() };
}

/**
 * Builds a simple local preview: the shopper's photo with the garment
 * reference placed over the torso. This is a presentation stand-in for
 * the AI result, not an AI output.
 */
async function composeDemoPreview(personImage: File, garmentSrc: string): Promise<string> {
  const personUrl = URL.createObjectURL(personImage);
  try {
    const [person, garment] = await Promise.all([loadImage(personUrl), loadImage(garmentSrc)]);

    const W = 900;
    const H = 1200;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new TryOnError("image", "Canvas unavailable");

    // Person photo, cover-fit into a 3:4 frame.
    const scale = Math.max(W / person.naturalWidth, H / person.naturalHeight);
    const pw = person.naturalWidth * scale;
    const ph = person.naturalHeight * scale;
    ctx.drawImage(person, (W - pw) / 2, (H - ph) / 2, pw, ph);

    // Soft editorial grade.
    ctx.fillStyle = "rgba(214, 206, 194, 0.12)";
    ctx.fillRect(0, 0, W, H);

    // Garment reference over the torso.
    const gw = W * 0.52;
    const gh = gw * (garment.naturalHeight / garment.naturalWidth || 1.4);
    ctx.save();
    ctx.shadowColor = "rgba(0,0,0,0.22)";
    ctx.shadowBlur = 28;
    ctx.shadowOffsetY = 10;
    ctx.globalAlpha = 0.96;
    ctx.drawImage(garment, (W - gw) / 2, H * 0.17, gw, gh);
    ctx.restore();

    return canvas.toDataURL("image/jpeg", 0.92);
  } catch (err) {
    if (err instanceof TryOnError) throw err;
    throw new TryOnError("image", "We couldn't read this photo. Please try a different image.");
  } finally {
    URL.revokeObjectURL(personUrl);
  }
}

/* ------------------------------------------------------------------ */
/* Live mode                                                           */
/* ------------------------------------------------------------------ */

async function requestLiveTryOn(
  personImage: File,
  garment: Product,
  signal?: AbortSignal,
): Promise<TryOnResult> {
  const body = new FormData();
  body.append("personImage", personImage);
  body.append("productId", garment.id);

  let res: Response;
  try {
    res = await fetch("/api/try-on", { method: "POST", body, signal });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw new TryOnError("aborted", "Cancelled");
    throw new TryOnError("network", "We couldn't reach the try-on service. Please check your connection and try again.");
  }

  const data = (await res.json().catch(() => ({}))) as { imageUrl?: string; message?: string };
  if (!res.ok || !data.imageUrl) {
    throw new TryOnError(
      res.status === 503 ? "unavailable" : "rejected",
      data.message ?? "Your look couldn't be generated this time. Please try again.",
    );
  }

  return { imageUrl: data.imageUrl, mode: "live", productId: garment.id, createdAt: Date.now() };
}

/* ------------------------------------------------------------------ */

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load ${src}`));
    img.src = src;
  });
}

function wait(ms: number, signal?: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const t = setTimeout(resolve, ms);
    signal?.addEventListener("abort", () => {
      clearTimeout(t);
      reject(new TryOnError("aborted", "Cancelled"));
    });
  });
}
