import { brandConfig } from "@/data/brandConfig";
import { products } from "@/data/products";
import { GarmentImage } from "./ui/GarmentImage";
import { Reveal } from "./ui/Reveal";

export function FinalCTA() {
  const mail = `mailto:${brandConfig.contactEmail}?subject=${encodeURIComponent(`${brandConfig.brandName} — brand demo request`)}`;
  const strip = [...products, ...products];

  return (
    <section id="contact" className="overflow-hidden bg-dark text-bg">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 pb-16 sm:px-8 sm:pt-32 lg:px-12">
        <Reveal>
          <p className="eyebrow text-white/50">Let&apos;s talk</p>
          <h2 className="display mt-6 text-[52px] uppercase sm:text-[92px] lg:text-[124px]">
            Turn every garment
            <br />
            <em className="normal-case italic">into an experience.</em>
          </h2>
        </Reveal>
        <Reveal delay={120} className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-md text-[15.5px] leading-relaxed text-white/60">
            Give shoppers a new way to discover your collection through AI-powered virtual try-on.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={mail} className="btn btn-light">
              Request a Brand Demo
            </a>
            <a href="#try" className="btn btn-outline-light">
              Try It Yourself
            </a>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-6 pb-16" aria-hidden>
        <div className="flex w-max animate-[marquee_60s_linear_infinite] gap-3">
          {strip.map((p, i) => (
            <GarmentImage key={`${p.id}-${i}`} product={p} className="h-56 w-44 shrink-0 opacity-90 sm:h-72 sm:w-56" imgClassName="p-6" />
          ))}
        </div>
      </div>
    </section>
  );
}
