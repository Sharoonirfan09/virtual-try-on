import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const CARDS = [
  { t: "Consent", d: "Customer permission is requested before image processing." },
  { t: "Private image handling", d: "Customer uploads and results are intended to be stored privately." },
  { t: "Controlled retention", d: "Customer images and generated results can expire according to the approved retention policy." },
];

export function PrivacySection() {
  return (
    <section id="privacy" className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Privacy"
          title={
            <>
              Built with
              <br />
              <em className="normal-case italic">customer privacy in mind.</em>
            </>
          }
        />
        <div className="mt-14 grid gap-px bg-line md:grid-cols-3">
          {CARDS.map((c, i) => (
            <Reveal key={c.t} delay={i * 90} className="flex min-h-[220px] flex-col justify-between bg-surface p-6 sm:p-8">
              <span className="display text-5xl text-ink/20">0{i + 1}</span>
              <div>
                <p className="eyebrow">{c.t}</p>
                <p className="mt-3 max-w-xs text-[14px] leading-relaxed text-muted">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
