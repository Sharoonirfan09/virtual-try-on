import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const CHANNELS = [
  {
    label: "E-commerce",
    steps: ["Product page", "“Try It On” button", "Upload photo", "Virtual result"],
  },
  {
    label: "In store",
    steps: ["Garment QR", "Product opens", "Upload photo", "Virtual result"],
  },
];

export function EcommerceExperience() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Two entry points · one experience"
          title="Online or in store."
          intro="The same try-on experience can be launched from a product page or from a garment tag — it is not dependent on QR codes."
        />

        <div className="mt-14 grid gap-px bg-line lg:grid-cols-2">
          {CHANNELS.map((c, ci) => (
            <Reveal key={c.label} delay={ci * 120} className="bg-bg p-6 sm:p-10">
              <div className="flex items-center justify-between">
                <p className="eyebrow">{c.label}</p>
                <span className="display text-2xl text-ink/30">0{ci + 1}</span>
              </div>
              <ol className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {c.steps.map((s, i) => (
                  <li key={s} className="relative">
                    <div
                      className={`flex aspect-square flex-col justify-between p-3 ${
                        i === c.steps.length - 1 ? "bg-ink text-bg" : i === 0 ? "bg-accent/60" : "bg-surface"
                      }`}
                    >
                      <span className="text-[10px] tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[13px] leading-snug">{s}</span>
                    </div>
                    {i < c.steps.length - 1 && (
                      <span aria-hidden className="absolute top-1/2 -right-[7px] z-10 hidden -translate-y-1/2 text-[11px] text-muted sm:block">
                        →
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
