const TIPS = [
  "Clear front view",
  "Garment fully visible",
  "Good lighting",
  "Minimal obstruction",
  "High-resolution product photography",
];

export function GarmentGuidance({ className = "" }: { className?: string }) {
  return (
    <div className={`border border-line bg-bg p-5 ${className}`}>
      <p className="text-[11px] font-semibold tracking-[0.12em] uppercase">For better try-on results</p>
      <p className="mt-1 text-[11.5px] text-muted">Recommended garment reference:</p>
      <ul className="mt-3 flex flex-col gap-1.5">
        {TIPS.map((t) => (
          <li key={t} className="flex items-baseline gap-2 text-[12.5px]">
            <span className="h-1 w-1 shrink-0 translate-y-[-2px] rounded-full bg-ink" />
            {t}
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[10.5px] leading-relaxed text-muted">
        Result quality depends on the reference image and garment type, and can vary between products.
      </p>
    </div>
  );
}
