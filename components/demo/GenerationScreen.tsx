"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/data/products";
import { DEMO_MODE } from "@/lib/config";
import { GarmentImage } from "../ui/GarmentImage";
import type { GenerationStatus, UploadedPhoto } from "./useTryOnDemo";

const MESSAGES = [
  "Preparing your photo...",
  "Understanding the garment...",
  "Creating your virtual look...",
  "Refining the result...",
  "Almost ready...",
];

type Props = {
  product: Product;
  photo: UploadedPhoto;
  status: GenerationStatus;
  error: string | null;
  attempt: number;
  onCancel: () => void;
  onRetry: () => void;
  onChangePhoto: () => void;
  onReset: () => void;
};

export function GenerationScreen({ product, photo, status, error, attempt, onCancel, onRetry, onChangePhoto, onReset }: Props) {
  const failed = status === "error";

  return (
    <div className="animate-fade-in-up">
      <div className="text-center">
        <p className="eyebrow text-muted">{failed ? "Generation paused" : "Generating"}</p>
        <h2 className="display mt-3 text-5xl sm:text-6xl lg:text-7xl">{failed ? "Let's try that again." : "Creating your look"}</h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 items-center gap-3 sm:gap-6 md:grid-cols-[1fr_minmax(200px,0.9fr)_1fr]">
        <figure className="order-1 w-full md:max-w-[240px] md:justify-self-center">
          <GarmentImage product={product} className="aspect-[3/4] w-full" imgClassName="p-4 sm:p-8" />
          <figcaption className="mt-2 text-[10px] tracking-[0.18em] text-muted uppercase">Garment · {product.name}</figcaption>
        </figure>

        <div className="order-3 col-span-2 md:order-2 md:col-span-1">
          {failed ? <FailurePanel message={error} onRetry={onRetry} onChangePhoto={onChangePhoto} onReset={onReset} /> : <Processing key={attempt} />}
        </div>

        <figure className="order-2 w-full md:order-3 md:max-w-[240px] md:justify-self-center">
          <div className="relative overflow-hidden bg-[#E6E1D8]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo.url} alt="Your photo" className="aspect-[3/4] w-full object-cover" />
            {!failed && <div className="animate-scan absolute inset-x-0 top-0 h-[10%] bg-gradient-to-b from-transparent via-white/40 to-transparent" />}
          </div>
          <figcaption className="mt-2 text-[10px] tracking-[0.18em] text-muted uppercase">Your photo</figcaption>
        </figure>
      </div>

      {!failed && (
        <div className="mt-10 flex flex-col items-center gap-3">
          {DEMO_MODE && (
            <p className="text-[11px] tracking-[0.16em] text-muted uppercase">Demo mode · simulated generation, no AI request is made</p>
          )}
          <button type="button" onClick={onCancel} className="link-underline text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

function Processing() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(4);

  useEffect(() => {
    const m = setInterval(() => setIndex((i) => Math.min(i + 1, MESSAGES.length - 1)), 1100);
    // Eases toward 96% — the real completion swaps the screen.
    const p = setInterval(() => setProgress((v) => v + (96 - v) * 0.09), 120);
    return () => {
      clearInterval(m);
      clearInterval(p);
    };
  }, []);

  return (
    <div className="flex flex-col items-center py-6 text-center md:py-0" role="status" aria-live="polite">
      <div className="relative h-36 w-36 sm:h-44 sm:w-44">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeOpacity="0.12" />
          <circle cx="100" cy="100" r="72" fill="none" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 6" />
          <circle
            cx="100"
            cy="100"
            r="96"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray={`${(progress / 100) * 603} 603`}
            transform="rotate(-90 100 100)"
            style={{ transition: "stroke-dasharray 0.2s linear" }}
          />
        </svg>
        <div className="animate-orbit absolute inset-0">
          <span className="absolute top-[3%] left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ink" />
        </div>
        <div className="absolute inset-[30%] animate-breathe rounded-full bg-accent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="display text-3xl">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="relative mt-6 h-6 w-full overflow-hidden">
        <p key={index} className="animate-fade-in-up absolute inset-0 text-[14px] text-ink">
          {MESSAGES[index]}
        </p>
      </div>
      <div className="mt-3 flex gap-1.5" aria-hidden>
        {MESSAGES.map((_, i) => (
          <span key={i} className={`h-px w-5 transition-colors duration-500 ${i <= index ? "bg-ink" : "bg-line"}`} />
        ))}
      </div>
    </div>
  );
}

function FailurePanel({
  message,
  onRetry,
  onChangePhoto,
  onReset,
}: {
  message: string | null;
  onRetry: () => void;
  onChangePhoto: () => void;
  onReset: () => void;
}) {
  return (
    <div role="alert" className="animate-fade-in flex flex-col items-center border border-line bg-surface px-6 py-8 text-center">
      <p className="eyebrow text-muted">We couldn&apos;t create your look</p>
      <p className="mt-3 text-[14px] leading-relaxed text-ink">{message ?? "Please try again in a moment."}</p>
      <div className="mt-6 flex w-full flex-col gap-2">
        <button type="button" onClick={onRetry} className="btn btn-primary w-full">
          Retry
        </button>
        <button type="button" onClick={onChangePhoto} className="btn btn-ghost w-full">
          Change Photo
        </button>
        <button type="button" onClick={onReset} className="mt-2 text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
          Start Over
        </button>
      </div>
    </div>
  );
}
