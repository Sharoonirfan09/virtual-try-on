import type { ReactNode } from "react";

/** Minimal phone frame for product-flow illustrations. */
export function PhoneMockup({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-[42px] bg-[#111] p-[10px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[33px] bg-bg">
        <div className="absolute top-2 left-1/2 z-10 h-[22px] w-[34%] -translate-x-1/2 rounded-full bg-[#111]" />
        <div className="flex h-full flex-col pt-10">{children}</div>
      </div>
    </div>
  );
}
