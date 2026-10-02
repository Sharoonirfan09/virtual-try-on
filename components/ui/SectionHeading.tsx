import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, intro, tone = "light", align = "left", className = "" }: Props) {
  const muted = tone === "dark" ? "text-white/55" : "text-muted";
  const center = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <Reveal className={`flex max-w-3xl flex-col gap-5 ${center} ${className}`}>
      {eyebrow && <p className={`eyebrow ${muted}`}>{eyebrow}</p>}
      <h2 className="display text-[44px] uppercase sm:text-6xl lg:text-[76px]">{title}</h2>
      {intro && <p className={`max-w-xl text-[15px] leading-relaxed sm:text-base ${muted}`}>{intro}</p>}
    </Reveal>
  );
}
