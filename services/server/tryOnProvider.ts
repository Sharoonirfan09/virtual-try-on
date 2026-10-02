import "server-only";

/**
 * Server-side adapter for the virtual try-on provider.
 *
 * This is the single place to connect a real provider. Credentials are read
 * from server environment variables and never reach the browser.
 *
 *   TRYON_PROVIDER_URL      provider endpoint
 *   TRYON_PROVIDER_API_KEY  provider secret
 */
export type ProviderInput = {
  personImage: Blob;
  garmentImageUrl: string;
  category: string;
};

export function isProviderConfigured() {
  return Boolean(process.env.TRYON_PROVIDER_URL && process.env.TRYON_PROVIDER_API_KEY);
}

export async function runTryOn(input: ProviderInput): Promise<{ imageUrl: string }> {
  const url = process.env.TRYON_PROVIDER_URL!;
  const key = process.env.TRYON_PROVIDER_API_KEY!;

  // Adapt this request to the chosen provider's API contract.
  const body = new FormData();
  body.append("person_image", input.personImage);
  body.append("garment_image_url", input.garmentImageUrl);
  body.append("category", input.category);

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}` },
    body,
  });
  if (!res.ok) throw new Error(`Provider responded ${res.status}`);

  const data = (await res.json()) as { image_url?: string; imageUrl?: string };
  const imageUrl = data.image_url ?? data.imageUrl;
  if (!imageUrl) throw new Error("Provider returned no image");
  return { imageUrl };
}
