import type { Product } from "@/data/products";
import { GarmentImage } from "../ui/GarmentImage";
import { Consent } from "./Consent";
import { PhotoUploader } from "./PhotoUploader";
import type { UploadedPhoto } from "./useTryOnDemo";

type Props = {
  product: Product | undefined;
  photo: UploadedPhoto | null;
  consent: boolean;
  onPhoto: (photo: UploadedPhoto | null) => void;
  onConsent: (v: boolean) => void;
  onChangeGarment: () => void;
  onGenerate: () => void;
};

const TIPS = ["Full body visible", "Face forward", "Good lighting", "Simple pose", "Avoid heavily obstructed clothing"];

export function UploadStep({ product, photo, consent, onPhoto, onConsent, onChangeGarment, onGenerate }: Props) {
  const checks = [
    { label: "Garment selected", done: Boolean(product) },
    { label: "Photo added", done: Boolean(photo) },
    { label: "Consent given", done: consent },
  ];
  const ready = checks.every((c) => c.done);
  const nextHint = !product ? "Select a garment to continue." : !photo ? "Add your photo to continue." : !consent ? "Please confirm consent to continue." : null;

  return (
    <div className="animate-fade-in-up grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Left: copy, garment, guidance */}
      <div className="flex flex-col lg:col-span-5">
        <p className="eyebrow text-muted">Step 02 · Upload your photo</p>
        <h2 className="display mt-4 text-5xl sm:text-6xl lg:text-[76px]">Now, Add You.</h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
          Upload a clear full-body photo for the best virtual try-on experience.
        </p>

        {product ? (
          <div className="mt-8 flex items-center gap-4 border-y border-line py-4">
            <GarmentImage product={product} className="h-20 w-[60px] shrink-0" imgClassName="p-1.5" />
            <div className="min-w-0 flex-1">
              <p className="text-[10px] tracking-[0.18em] text-muted uppercase">Your garment</p>
              <p className="display truncate text-2xl leading-tight">{product.name}</p>
              <p className="text-[12px] text-muted">
                {product.category} · {product.colour}
              </p>
            </div>
            <button type="button" onClick={onChangeGarment} className="link-underline shrink-0 text-[11px] font-semibold tracking-[0.16em] uppercase">
              Change
            </button>
          </div>
        ) : (
          <button type="button" onClick={onChangeGarment} className="mt-8 border border-dashed border-ink/30 py-5 text-[13px] text-muted">
            No garment selected — choose one first
          </button>
        )}

        <div className="mt-8 bg-surface p-6">
          <p className="eyebrow">For best results</p>
          <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
            {TIPS.map((tip, i) => (
              <li key={tip} className="flex items-baseline gap-3 text-[13.5px]">
                <span className="text-[10px] text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {tip}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[11.5px] leading-relaxed text-muted">
            Current previews are front view. Results are an appearance preview, not a fit or size guarantee.
          </p>
        </div>
      </div>

      {/* Right: uploader, consent, generate */}
      <div className="flex flex-col gap-8 lg:col-span-7">
        <PhotoUploader photo={photo} onChange={onPhoto} />
        <Consent checked={consent} onChange={onConsent} />

        <div>
          <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-2" aria-label="Ready to generate">
            {checks.map((c) => (
              <li key={c.label} className={`flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase transition-colors ${c.done ? "text-ink" : "text-ink/35"}`}>
                <span className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${c.done ? "border-ink bg-ink text-bg" : "border-ink/30"}`}>
                  {c.done && (
                    <svg width="7" height="7" viewBox="0 0 10 10" aria-hidden>
                      <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  )}
                </span>
                {c.label}
              </li>
            ))}
          </ul>
          <button type="button" onClick={onGenerate} disabled={!ready} className="btn btn-primary !h-14 w-full !text-[12px]">
            Generate My Look <span aria-hidden>→</span>
          </button>
          {nextHint && <p className="mt-3 text-center text-[12.5px] text-muted">{nextHint}</p>}
        </div>
      </div>
    </div>
  );
}
