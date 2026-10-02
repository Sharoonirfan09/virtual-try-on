import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { generateText } from "ai";
import sharp from "sharp";
import type { Product } from "@/data/products";

/**
 * Server-side virtual try-on via Vercel AI Gateway.
 *
 * Authentication is handled by AI Gateway: Vercel OIDC on deployments and
 * linked local projects, or AI_GATEWAY_API_KEY elsewhere. No credentials
 * ever reach the browser.
 *
 *   AI_GATEWAY_TRYON_MODEL  optional override (an id from /v1/models)
 */
export const TRYON_MODEL = process.env.AI_GATEWAY_TRYON_MODEL || "google/gemini-3.1-flash-image";

export function isProviderConfigured() {
  return Boolean(process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN || process.env.VERCEL);
}

export class ProviderError extends Error {
  constructor(
    public code: "no_image" | "credits" | "provider",
    message: string,
  ) {
    super(message);
  }
}

export async function runTryOn(input: { personImage: Blob; product: Product }): Promise<{ imageUrl: string }> {
  const [person, garment] = await Promise.all([preparePerson(input.personImage), loadGarment(input.product.garmentImage)]);
  const { product } = input;

  let result;
  try {
    result = await generateText({
      model: TRYON_MODEL,
      providerOptions: { google: { imageConfig: { aspectRatio: "3:4" } } },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "IMAGE 1 — the person:" },
            { type: "file", mediaType: "image/jpeg", data: person },
            { type: "text", text: `IMAGE 2 — the garment (${product.name}, ${product.category}, ${product.colour}):` },
            { type: "file", mediaType: "image/png", data: garment },
            { type: "text", text: tryOnPrompt(product) },
          ],
        },
      ],
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (/credit|insufficient|balance|budget|402/i.test(msg)) throw new ProviderError("credits", msg);
    throw new ProviderError("provider", msg);
  }

  const image = result.files.find((f) => f.mediaType.startsWith("image/"));
  if (!image) throw new ProviderError("no_image", `Model returned no image. Text: ${result.text.slice(0, 200)}`);

  const imageUrl = image.base64.startsWith("data:") ? image.base64 : `data:${image.mediaType};base64,${image.base64}`;
  return { imageUrl };
}

function tryOnPrompt(product: Product) {
  return [
    "You are a professional fashion virtual try-on system.",
    `Create a photorealistic image of the exact person from IMAGE 1 wearing the ${product.name} from IMAGE 2.`,
    "Preserve exactly: the person's face, identity, expression, skin tone, hair, body shape and proportions, pose, the background, the lighting and the camera framing of IMAGE 1.",
    "Replace only the clothing that this garment would naturally cover. Match the garment's colour, cut, length, neckline, sleeves, trims and details from IMAGE 2.",
    "Fit it naturally to the person's body with realistic fabric drape, folds and shadows that match the photo's lighting. IMAGE 2 may be a flat product illustration — render it as real fabric.",
    "Keep it tasteful and fully clothed. Do not add text, logos or watermarks. Return only the final edited photo in portrait orientation.",
  ].join("\n");
}

/** Normalises orientation and size so uploads stay small and models see an upright photo. */
async function preparePerson(blob: Blob) {
  const input = Buffer.from(await blob.arrayBuffer());
  return sharp(input).rotate().resize({ width: 1536, height: 1536, fit: "inside", withoutEnlargement: true }).jpeg({ quality: 90 }).toBuffer();
}

/** Loads the catalogue garment image (local /public path or URL) as PNG. SVG artwork is rasterised. */
async function loadGarment(src: string) {
  const buffer = /^https?:\/\//.test(src)
    ? Buffer.from(await (await fetch(src)).arrayBuffer())
    : await readFile(path.join(process.cwd(), "public", src.replace(/^\//, "")));

  return sharp(buffer, { density: 220 })
    .resize({ width: 1024, height: 1024, fit: "inside" })
    .flatten({ background: "#ffffff" })
    .png()
    .toBuffer();
}
