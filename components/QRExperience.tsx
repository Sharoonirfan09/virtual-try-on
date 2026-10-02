import { brandConfig } from "@/data/brandConfig";
import { products } from "@/data/products";
import { tryOnLink } from "@/lib/links";
import { GarmentImage } from "./ui/GarmentImage";
import { PhoneMockup } from "./ui/PhoneMockup";
import { QrCode } from "./ui/QrCode";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const FLOW = ["Garment tag", "Scan QR", "Exact product opens", "Upload photo", "Generate look", "View / shop"];

export function QRExperience() {
  const product = products[1];

  return (
    <section id="in-store" className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-16 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Future in-store experience"
            title={
              <>
                And in store?
                <br />
                <em className="normal-case italic">It becomes even simpler.</em>
              </>
            }
            intro="When a fashion brand joins the platform, each selected product or variant can receive its own unique QR code."
          />

          <Reveal className="mt-12">
            <ol className="relative border-l border-line">
              {FLOW.map((step, i) => (
                <li key={step} className="relative flex items-baseline gap-4 py-2.5 pl-6">
                  <span className={`absolute top-1/2 -left-[4px] h-[7px] w-[7px] -translate-y-1/2 rounded-full ${i === 2 ? "bg-ink" : "border border-ink/40 bg-surface"}`} />
                  <span className="w-6 text-[10px] text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`text-[15px] ${i === 2 ? "font-medium" : ""}`}>{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 max-w-md text-[14px] leading-relaxed text-muted">
              The shopper does not need to search for the garment. Scanning the product&apos;s QR opens that specific
              garment directly in the virtual try-on experience.
            </p>
            <p className="mt-4 max-w-md text-[12px] leading-relaxed text-muted">
              Try it now: the QR on this tag is live and opens the {product.name} in the demo above.
            </p>
          </Reveal>
        </div>

        <Reveal className="relative flex items-center justify-center gap-6 sm:gap-10 lg:col-span-7" delay={120}>
          {/* Physical tag */}
          <div className="relative w-[44%] max-w-[230px] -rotate-3">
            <div className="absolute -top-8 left-1/2 h-10 w-px bg-ink/40" />
            <div className="relative bg-[#F3EFE7] px-5 pt-8 pb-6 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]">
              <span className="absolute top-3 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border border-ink/30 bg-surface" />
              <p className="display text-center text-lg leading-none">{brandConfig.brandName}</p>
              <div className="my-4 h-px bg-ink/15" />
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase">{product.name}</p>
              <p className="mt-1 text-[10px] tracking-[0.12em] text-muted uppercase">SKU {product.sku}</p>
              <div className="mt-5 bg-surface p-3">
                <QrCode value={tryOnLink(product.id)} label={`QR code opening ${product.name} in the try-on demo`} />
              </div>
              <p className="mt-4 text-center text-[10px] font-semibold tracking-[0.24em] uppercase">Scan to try on</p>
            </div>
          </div>

          {/* Phone */}
          <PhoneMockup className="w-[48%] max-w-[270px] rotate-2">
            <div className="flex items-center justify-between px-4">
              <span className="display text-sm">{brandConfig.shortName}</span>
              <span className="text-[7px] tracking-[0.2em] text-muted uppercase">Opened from QR</span>
            </div>
            <GarmentImage product={product} className="mx-3 mt-3 flex-1" imgClassName="p-4" />
            <div className="px-4 pt-3 pb-5">
              <p className="text-[7px] tracking-[0.2em] text-muted uppercase">{product.sku}</p>
              <p className="display mt-0.5 text-lg leading-tight">{product.name}</p>
              <p className="text-[8.5px] text-muted">
                {product.category} · {product.colour}
              </p>
              <div className="mt-3 flex h-8 items-center justify-center bg-ink text-[7.5px] font-semibold tracking-[0.2em] text-bg uppercase">
                Upload photo
              </div>
            </div>
          </PhoneMockup>
        </Reveal>
      </div>
    </section>
  );
}
