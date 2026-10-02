import QRCode from "qrcode";
import { tryOnLink } from "./links";

export function absoluteTryOnLink(productId: string) {
  return new URL(tryOnLink(productId), window.location.origin).toString();
}

/** Downloads a print-ready SVG QR code for a product's stable try-on link. */
export async function downloadProductQr(productId: string, filename = `qr-${productId}.svg`) {
  const svg = await QRCode.toString(absoluteTryOnLink(productId), { type: "svg", margin: 2, errorCorrectionLevel: "M" });
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function copyProductLink(productId: string) {
  await navigator.clipboard.writeText(absoluteTryOnLink(productId));
}
