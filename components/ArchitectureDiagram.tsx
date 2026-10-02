import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const NODES = [
  { t: "Customer", d: "Selects a garment", tone: "dark" },
  { t: "Product catalogue", d: "The exact garment reference" },
  { t: "Customer photo", d: "Uploaded with consent" },
  { t: "Secure server", d: "Keeps credentials private" },
  { t: "Virtual try-on provider", d: "Creates the preview" },
  { t: "Generated result", d: "Returned securely" },
  { t: "Customer", d: "Sees their look", tone: "dark" },
];

export function ArchitectureDiagram() {
  return (
    <section id="technology" className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Technology"
            title={
              <>
                Simple for shoppers.
                <br />
                <em className="normal-case italic">Secure behind the scenes.</em>
              </>
            }
            intro="The shopper's photo and the selected garment travel through a secure server to the virtual try-on provider. Provider credentials stay on the server and are never exposed in the browser."
          />
          <Reveal className="mt-8 max-w-md border-l-2 border-ink pl-4 text-[13px] leading-relaxed text-muted">
            Today the experience is a front-view appearance preview. The platform is designed so additional views can be
            introduced after testing.
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={120}>
          <ol className="relative mx-auto flex max-w-md flex-col items-stretch">
            {NODES.map((n, i) => (
              <li key={i} className="flex flex-col items-center">
                <div
                  className={`flex w-full items-center justify-between px-5 py-4 ${
                    n.tone === "dark" ? "bg-ink text-bg" : i === 3 ? "border border-ink bg-surface" : "border border-line bg-surface"
                  }`}
                >
                  <span className="text-[13.5px] font-medium tracking-wide">{n.t}</span>
                  <span className={`text-[11.5px] ${n.tone === "dark" ? "text-white/60" : "text-muted"}`}>{n.d}</span>
                </div>
                {i < NODES.length - 1 && (
                  <svg width="12" height="34" viewBox="0 0 12 34" aria-hidden className="text-ink/50">
                    <line x1="6" y1="0" x2="6" y2="28" stroke="currentColor" strokeDasharray="3 3" className="animate-flow" />
                    <path d="M2 26l4 6 4-6" stroke="currentColor" fill="none" />
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
