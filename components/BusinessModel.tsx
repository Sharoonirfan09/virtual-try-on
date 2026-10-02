import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const PARTS = [
  { t: "One-time brand onboarding", d: "Catalogue set-up, garment preparation and brand configuration." },
  { t: "Monthly platform plan", d: "Your brand environment, product management and QR codes." },
  { t: "Included AI generations", d: "A monthly allowance of try-on generations." },
  { t: "Additional usage", d: "Flexible capacity when demand grows." },
];

const VARIABLES = ["Number of active products", "Monthly generations", "QR usage", "Analytics", "Premium features", "Additional generations"];

export function BusinessModel() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Business model"
          title={
            <>
              Designed to scale
              <br />
              <em className="normal-case italic">with your brand.</em>
            </>
          }
        />

        <div className="mt-14 grid items-stretch gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
          {PARTS.map((p, i) => (
            <div key={p.t} className="contents">
              <Reveal delay={i * 90} className={`flex min-h-[180px] flex-col justify-between p-6 ${i === 0 ? "bg-dark text-bg" : "border border-line bg-bg"}`}>
                <span className={`display text-4xl ${i === 0 ? "text-white/30" : "text-ink/25"}`}>0{i + 1}</span>
                <div>
                  <p className="text-[14px] font-medium">{p.t}</p>
                  <p className={`mt-2 text-[12.5px] leading-relaxed ${i === 0 ? "text-white/60" : "text-muted"}`}>{p.d}</p>
                </div>
              </Reveal>
              {i < PARTS.length - 1 && (
                <span aria-hidden className="display flex items-center justify-center text-3xl text-ink/40">
                  +
                </span>
              )}
            </div>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col gap-8 border-t border-line pt-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="eyebrow text-muted">Plans are shaped by</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {VARIABLES.map((v) => (
                <li key={v} className="border border-line px-3 py-1.5 text-[12px]">
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <a href="#contact" className="btn btn-primary shrink-0">
            Discuss Brand Access
          </a>
        </Reveal>
      </div>
    </section>
  );
}
