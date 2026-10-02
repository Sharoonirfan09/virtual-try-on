"use client";

import { useState } from "react";

type Props = {
  before: string;
  after: string;
  beforeLabel?: string;
  afterLabel?: string;
};

/** Draggable before/after comparison. A native range input drives it, so it works with touch, mouse and keyboard. */
export function BeforeAfter({ before, after, beforeLabel = "Your photo", afterLabel = "Virtual try-on" }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative aspect-[3/4] w-full touch-pan-y overflow-hidden bg-[#E6E1D8] select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={beforeLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      </div>

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_24px_rgba(0,0,0,0.2)]">
          <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
            <path d="M5 1 1 5l4 4M13 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </span>
      </div>

      <span className="pointer-events-none absolute top-3 left-3 bg-white/80 px-2.5 py-1.5 text-[9.5px] font-medium tracking-[0.18em] uppercase backdrop-blur">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 bg-ink/85 px-2.5 py-1.5 text-[9.5px] font-medium tracking-[0.18em] text-bg uppercase backdrop-blur">
        {afterLabel}
      </span>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare your photo with the virtual try-on"
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
