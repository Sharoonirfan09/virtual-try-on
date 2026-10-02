import { products } from "@/data/products";
import { Figure } from "./ui/Figure";
import { GarmentImage } from "./ui/GarmentImage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const STEPS = [
  { n: "01", title: "Choose", copy: "Select the garment you want to experience." },
  { n: "02", title: "Upload", copy: "Add a clear photo of yourself." },
  { n: "03", title: "Generate", copy: "AI creates a personalised visual preview." },
  { n: "04", title: "Discover", copy: "See the look and continue to the product." },
];

function StepVisual({ index }: { index: number }) {
  const base = "relative aspect-[4/5] w-full overflow-hidden";
  switch (index) {
    case 0:
      return (
        <div className={`${base} grid grid-cols-2 gap-1.5 bg-[#E9E4DB] p-1.5`}>
          {products.slice(0, 4).map((p, i) => (
            <GarmentImage key={p.id} product={p} className={`h-full w-full ${i === 0 ? "ring-2 ring-ink ring-inset" : ""}`} imgClassName="p-2" />
          ))}
        </div>
      );
    case 1:
      return (
        <div className={`${base} bg-[#E6E1D8]`}>
          <div className="absolute inset-5 border border-dashed border-ink/30" />
          <Figure id="how-up" className="absolute inset-x-0 bottom-[-4%] mx-auto h-[88%]" />
        </div>
      );
    case 2:
      return (
        <div className={`${base} flex items-center justify-center bg-[#DCD5CA]`}>
          <div className="relative h-1/2 w-1/2">
            <div className="absolute inset-0 rounded-full border border-ink/20" />
            <div className="absolute inset-[18%] rounded-full border border-dashed border-ink/25" />
            <div className="animate-orbit absolute inset-0">
              <span className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
            </div>
            <div className="absolute inset-[34%] animate-breathe rounded-full bg-white/70" />
          </div>
        </div>
      );
    default:
      return (
        <div className={`${base} bg-[#E6E1D8]`}>
          <Figure id="how-look" dressed className="absolute inset-x-0 bottom-[-4%] mx-auto h-[92%]" />
          <span className="absolute right-3 bottom-3 bg-ink px-2.5 py-1.5 text-[9px] tracking-[0.18em] text-bg uppercase">View product ↗</span>
        </div>
      );
  }
}

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="How it works"
          title={
            <>
              From garment to your look
              <br />
              <em className="normal-case italic">in four steps.</em>
            </>
          }
        />
        <ol className="mt-14 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-5 lg:grid-cols-4 lg:gap-6">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 90}>
              <StepVisual index={i} />
              <div className="mt-5 flex items-baseline gap-3 border-t border-ink pt-4">
                <span className="display text-3xl">{s.n}</span>
                <h3 className="eyebrow">{s.title}</h3>
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{s.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
