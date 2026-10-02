import { products } from "@/data/products";
import { GarmentImage } from "./ui/GarmentImage";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const FIELDS = ["Product", "SKU", "Variant", "Colour", "Category", "Size information", "Garment images", "Product URL", "QR destination"];

export function CatalogueScale() {
  const sample = products[4];
  const rows = [
    ["Product", sample.name],
    ["SKU", sample.sku],
    ["Variant", `${sample.colour} / Regular`],
    ["Colour", sample.colour],
    ["Category", sample.category],
    ["Size information", "XS – XL"],
    ["Garment images", "1 primary · 3 additional"],
    ["Product URL", "/products/tailored-jacket"],
    ["QR destination", "Stable try-on link"],
  ];

  return (
    <section className="border-t border-line">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-12 lg:px-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Catalogue management"
            title={
              <>
                From one product
                <br />
                <em className="normal-case italic">to thousands.</em>
              </>
            }
            intro="Every garment carries the information the try-on experience needs. Add products one at a time, or onboard a full catalogue from a spreadsheet."
          />
          <Reveal className="mt-10 flex flex-wrap gap-2">
            {FIELDS.map((f) => (
              <span key={f} className="border border-line bg-surface px-3 py-1.5 text-[11.5px]">
                {f}
              </span>
            ))}
          </Reveal>
        </div>

        <Reveal className="lg:col-span-7" delay={120}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Single product */}
            <div className="flex min-w-0 flex-col bg-surface p-5">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Add product</p>
                <span className="text-[10px] text-muted">01 item</span>
              </div>
              <div className="mt-5 flex gap-4">
                <GarmentImage product={sample} className="h-28 w-22 shrink-0" imgClassName="p-1.5" />
                <dl className="grid flex-1 grid-cols-1 gap-1.5 text-[11.5px]">
                  {rows.slice(0, 5).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2 border-b border-line pb-1.5">
                      <dt className="text-muted">{k}</dt>
                      <dd className="truncate text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <dl className="mt-3 grid gap-1.5 text-[11.5px]">
                {rows.slice(5).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 border-b border-line pb-1.5">
                    <dt className="text-muted">{k}</dt>
                    <dd className="truncate text-right">{v}</dd>
                  </div>
                ))}
              </dl>
              <span className="btn btn-primary mt-5 !h-10" aria-hidden>
                + Add Product
              </span>
            </div>

            {/* Bulk import */}
            <div className="flex min-w-0 flex-col bg-dark p-5 text-bg">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Bulk import CSV</p>
                <span className="text-[10px] text-white/50">catalogue.csv</span>
              </div>
              <div className="scroll-quiet mt-5 overflow-hidden font-mono text-[10.5px] leading-6 text-white/75">
                <p className="text-white/40">name,sku,variant,colour,category,url</p>
                {products.map((p) => (
                  <p key={p.id} className="truncate">
                    {p.name},{p.sku},{p.colour}/Regular,{p.colour},{p.category},/products/{p.id}
                  </p>
                ))}
                <p className="text-white/40">…</p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-[10.5px] text-white/60">
                  <span>Validating rows</span>
                  <span className="tabular-nums">Illustrative</span>
                </div>
                <div className="mt-2 h-px overflow-hidden bg-white/15">
                  <div className="animate-shimmer h-px w-full bg-white/80" />
                </div>
              </div>
              <span className="btn btn-light mt-6 !h-10" aria-hidden>
                Bulk Import CSV
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
