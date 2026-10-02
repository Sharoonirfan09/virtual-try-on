"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import type { TryOnResult as Result } from "@/services/tryOnService";
import { GarmentImage } from "../ui/GarmentImage";
import { BeforeAfter } from "./BeforeAfter";
import type { UploadedPhoto } from "./useTryOnDemo";

type Props = {
  result: Result;
  product: Product;
  photo: UploadedPhoto;
  onTryAnother: () => void;
  onChangePhoto: () => void;
};

type View = "look" | "compare";

export function TryOnResult({ result, product, photo, onTryAnother, onChangePhoto }: Props) {
  const [view, setView] = useState<View>("look");
  const [downloadError, setDownloadError] = useState(false);
  const isDemo = result.mode === "demo";

  async function download() {
    setDownloadError(false);
    const filename = `virtual-try-on-${product.id}.jpg`;
    try {
      let href = result.imageUrl;
      let revoke = false;
      if (!href.startsWith("data:")) {
        const blob = await fetch(href).then((r) => {
          if (!r.ok) throw new Error();
          return r.blob();
        });
        href = URL.createObjectURL(blob);
        revoke = true;
      }
      const a = document.createElement("a");
      a.href = href;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      if (revoke) setTimeout(() => URL.revokeObjectURL(href), 1000);
    } catch {
      setDownloadError(true);
    }
  }

  return (
    <div className="animate-fade-in-up grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* Image */}
      <div className="mx-auto w-full max-w-[600px] lg:col-span-7 lg:max-w-[min(600px,calc((100vh-140px)*0.75))]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex border border-line" role="tablist" aria-label="Result view">
            {(
              [
                ["look", "Virtual Try-On"],
                ["compare", "Compare"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                type="button"
                onClick={() => setView(id)}
                className={`h-9 px-4 text-[10.5px] font-semibold tracking-[0.16em] uppercase transition-colors ${
                  view === id ? "bg-ink text-bg" : "text-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {isDemo && (
            <span className="text-[10px] tracking-[0.16em] text-muted uppercase">Demo preview</span>
          )}
        </div>

        <div className="relative">
          {view === "look" ? (
            <div className="animate-fade-in relative overflow-hidden bg-[#E6E1D8]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={result.imageUrl} alt={`You wearing the ${product.name}`} className="aspect-[3/4] w-full object-cover" />
            </div>
          ) : (
            <div className="animate-fade-in">
              <BeforeAfter before={photo.url} after={result.imageUrl} />
            </div>
          )}
          {isDemo && (
            <div className="pointer-events-none absolute right-3 bottom-3 left-3 flex justify-center">
              <span className="bg-ink/80 px-3 py-2 text-center text-[9.5px] leading-snug font-medium tracking-[0.16em] text-bg uppercase backdrop-blur">
                Simulated demo preview · Live AI results replace this image
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-col lg:col-span-5 lg:pt-14">
        <p className="eyebrow text-muted">Step 04 · Result</p>
        <h2 className="display mt-4 text-5xl uppercase sm:text-6xl lg:text-[76px]">
          Your look
          <br />
          is ready
        </h2>

        <div className="mt-10 flex items-center gap-4 border-y border-line py-5">
          <GarmentImage product={product} className="h-24 w-[72px] shrink-0" imgClassName="p-2" />
          <div className="min-w-0">
            <p className="display text-2xl leading-tight">{product.name}</p>
            <p className="mt-1 text-[12.5px] text-muted">
              {product.category} · {product.colour}
            </p>
            <p className="mt-1 text-[10.5px] tracking-[0.14em] text-muted uppercase">{product.sku}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button type="button" onClick={download} className="btn btn-primary sm:col-span-2">
            Download Look
          </button>
          <a href={product.productUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost sm:col-span-2">
            View Product <span aria-hidden>↗</span>
          </a>
          <button type="button" onClick={onTryAnother} className="btn btn-ghost !border-line">
            Try Another Look
          </button>
          <button type="button" onClick={onChangePhoto} className="btn btn-ghost !border-line">
            Change Photo
          </button>
        </div>
        {downloadError && (
          <p role="alert" className="mt-3 text-[12.5px] text-ink">
            The download didn&apos;t start. Press and hold the image to save it instead.
          </p>
        )}

        <p className="mt-8 text-[12px] leading-relaxed text-muted">
          Virtual try-on provides an AI-generated appearance preview. Actual colour, fit and sizing may vary.
        </p>
      </div>
    </div>
  );
}
