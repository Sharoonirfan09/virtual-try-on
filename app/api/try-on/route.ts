import { getProduct } from "@/data/products";
import { UPLOAD_RULES } from "@/lib/config";
import { isProviderConfigured, runTryOn } from "@/services/server/tryOnProvider";

export async function POST(request: Request) {
  if (!isProviderConfigured()) {
    return Response.json(
      { message: "Live try-on isn't connected yet. Switch to demo mode to present the experience." },
      { status: 503 },
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

  // The garment is resolved from the catalogue on the server — the client
  // never chooses an arbitrary garment URL.
  const garmentImageUrl = new URL(product.garmentImage, request.url).toString();

  try {
    const { imageUrl } = await runTryOn({ personImage, garmentImageUrl, category: product.category });
    return Response.json({ imageUrl });
  } catch (err) {
    console.error("[try-on] provider error", err);
    return Response.json(
      { message: "Your look couldn't be generated this time. Please try again." },
      { status: 502 },
    );
  }
}
