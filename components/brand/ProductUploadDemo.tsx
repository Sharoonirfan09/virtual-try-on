"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { tryOnLink } from "@/lib/links";
import { QrCode } from "../ui/QrCode";
import { GarmentGuidance } from "./GarmentGuidance";

export type DraftProduct = {
  id: string;
  name: string;
  sku: string;
  category: string;
  colour: string;
  variant: string;
  imageUrl: string | null;
};

type Props = {
  onClose: () => void;
  onSave: (product: DraftProduct) => void;
};

const CATEGORIES = ["Dresses", "Modest Wear", "Co-ords", "Shirts", "Outerwear", "Traditional"];

const input =
  "h-11 w-full border border-line bg-surface px-3 text-[13.5px] outline-none transition-colors placeholder:text-ink/30 focus:border-ink";

function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium tracking-[0.16em] text-muted uppercase">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-muted">{hint}</span>}
    </label>
  );
}

export function ProductUploadDemo({ onClose, onSave }: Props) {
  const [saved, setSaved] = useState<DraftProduct | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [extraCount, setExtraCount] = useState(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "").trim();
    const draft: DraftProduct = {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `product-${Date.now()}`,
      name,
      sku: String(f.get("sku") || "").trim(),
      category: String(f.get("category") || ""),
      colour: String(f.get("colour") || "").trim(),
      variant: String(f.get("variant") || "").trim(),
      imageUrl: image,
    };
    setSaved(draft);
    onSave(draft);
  }

  return (
    <div className="animate-fade-in fixed inset-0 z-[70] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal aria-label="Add product">
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden bg-bg text-ink">
        <div className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-8">
          <div>
            <p className="text-[10px] tracking-[0.18em] text-muted uppercase">Products · Demo</p>
            <p className="display text-2xl">{saved ? "Product added" : "Add product"}</p>
          </div>
          <button type="button" onClick={onClose} className="text-[11px] font-semibold tracking-[0.16em] uppercase">
            Close
          </button>
        </div>

        {saved ? (
          <div className="flex flex-col items-center gap-6 overflow-y-auto px-5 py-10 text-center sm:px-8">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-bg">
              <svg width="18" height="18" viewBox="0 0 10 10" aria-hidden>
                <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
              </svg>
            </span>
            <div>
              <p className="display text-4xl">{saved.name}</p>
              <p className="mt-2 text-[13px] text-muted">
                {[saved.sku, saved.category, saved.colour, saved.variant].filter(Boolean).join(" · ")}
              </p>
            </div>
            {showQr ? (
              <div className="animate-fade-in-up flex flex-col items-center gap-3">
                <div className="w-40 bg-white p-3">
                  <QrCode value={tryOnLink(saved.id)} label={`QR for ${saved.name}`} />
                </div>
                <p className="max-w-xs text-[11.5px] text-muted">
                  Stable link for this product. In the full platform it opens once the product is published.
                </p>
              </div>
            ) : (
              <button type="button" onClick={() => setShowQr(true)} className="btn btn-primary">
                Generate QR
              </button>
            )}
            <p className="text-[11px] tracking-[0.12em] text-muted uppercase">Demo only · nothing is stored</p>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-8 overflow-y-auto px-5 py-6 sm:px-8 md:grid-cols-5">
            <div className="grid gap-4 sm:grid-cols-2 md:col-span-3">
              <div className="sm:col-span-2">
                <Field label="Product name">
                  <input name="name" required className={input} placeholder="e.g. Pleated Midi Dress" />
                </Field>
              </div>
              <Field label="SKU">
                <input name="sku" required className={input} placeholder="e.g. PMD-014" />
              </Field>
              <Field label="Category">
                <select name="category" className={input} defaultValue={CATEGORIES[0]}>
                  {CATEGORIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </Field>
              <Field label="Colour">
                <input name="colour" className={input} placeholder="e.g. Olive" />
              </Field>
              <Field label="Variant">
                <input name="variant" className={input} placeholder="e.g. Olive / Regular" />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Size information">
                  <input name="sizes" className={input} placeholder="e.g. XS–XL, model wears S" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Product URL">
                  <input name="url" type="url" className={input} placeholder="https://yourstore.com/products/…" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Additional product images" hint={extraCount ? `${extraCount} image${extraCount > 1 ? "s" : ""} selected` : undefined}>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => setExtraCount(e.target.files?.length ?? 0)}
                    className="text-[12px] file:mr-3 file:h-9 file:border file:border-line file:bg-surface file:px-3 file:text-[10px] file:font-semibold file:tracking-[0.14em] file:uppercase"
                  />
                </Field>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:col-span-2">
              <Field label="Garment image">
                <span className="relative flex aspect-[4/5] cursor-pointer items-center justify-center overflow-hidden border border-dashed border-ink/30 bg-surface">
                  {image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image} alt="Garment preview" className="h-full w-full object-contain p-3" />
                  ) : (
                    <span className="text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">Upload garment image</span>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      setImage((prev) => {
                        if (prev) URL.revokeObjectURL(prev);
                        return URL.createObjectURL(file);
                      });
                    }}
                  />
                </span>
              </Field>
              <GarmentGuidance />
            </div>

            <div className="flex justify-end gap-3 border-t border-line pt-5 md:col-span-5">
              <button type="button" onClick={onClose} className="btn btn-ghost !border-line">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Product
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
