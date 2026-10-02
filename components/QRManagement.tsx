import { QRManagementPanel } from "./brand/QRManagementPanel";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const POINTS = [
  { k: "01", t: "One stable link per product or variant", d: "Each selected product or variant receives its own unique link and QR code." },
  { k: "02", t: "Print once", d: "If product information or the destination changes later, the printed QR does not necessarily need to change." },
  { k: "03", t: "Every scan counted", d: "Scans feed straight into try-on activity and analytics." },
];

export function QRManagement() {
  return (
    <section className="border-t border-line bg-surface">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="QR management"
          title={
            <>
              A code for every garment.
              <br />
              <em className="normal-case italic">A link that lasts.</em>
            </>
          }
        />
        <div className="mt-12 grid gap-px bg-line sm:grid-cols-3">
          {POINTS.map((p, i) => (
            <Reveal key={p.k} delay={i * 90} className="bg-surface py-6 pr-6 sm:px-6 sm:first:pl-0">
              <p className="display text-3xl text-ink/30">{p.k}</p>
              <p className="mt-3 text-[15px] font-medium">{p.t}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted">{p.d}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 border border-line">
          <QRManagementPanel />
        </Reveal>
        <p className="mt-4 text-[11px] text-muted">
          Try it: generate, download or copy any link. Downloaded QR codes open the matching garment in this demo.
        </p>
      </div>
    </section>
  );
}
