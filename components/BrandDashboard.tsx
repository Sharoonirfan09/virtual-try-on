"use client";

import { useState } from "react";
import { brandConfig } from "@/data/brandConfig";
import { overviewMetrics, productStats } from "@/data/demoAnalytics";
import { products } from "@/data/products";
import { tryOnLink } from "@/lib/links";
import { AnalyticsPanel } from "./brand/AnalyticsPanel";
import { GarmentGuidance } from "./brand/GarmentGuidance";
import { ProductUploadDemo, type DraftProduct } from "./brand/ProductUploadDemo";
import { QRManagementPanel } from "./brand/QRManagementPanel";
import { GarmentImage } from "./ui/GarmentImage";
import { QrCode } from "./ui/QrCode";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

const NAV = ["Overview", "Products", "Variants", "QR Codes", "Try-On Activity", "Analytics", "Team", "Settings"] as const;
type View = (typeof NAV)[number];
const LIVE_VIEWS: View[] = ["Overview", "Products", "QR Codes", "Analytics"];

export function BrandDashboard() {
  const [view, setView] = useState<View>("Overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [drafts, setDrafts] = useState<DraftProduct[]>([]);

  return (
    <section id="brands" className="bg-dark text-bg">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="dark"
            eyebrow="For fashion brands"
            title={
              <>
                One platform.
                <br />
                <em className="normal-case italic">Your entire collection.</em>
              </>
            }
            intro="Manage garments, virtual try-on experiences, QR codes and engagement from one brand environment."
          />
          <p className="text-[11px] tracking-[0.16em] text-white/45 uppercase lg:pb-3">Interactive preview · demo data</p>
        </div>

        <Reveal className="mt-14">
          <div className="overflow-hidden border border-white/10 bg-bg text-ink shadow-[0_60px_120px_-40px_rgba(0,0,0,0.8)]">
            {/* Window bar */}
            <div className="flex items-center gap-2 border-b border-line bg-surface px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="ml-4 truncate text-[11px] text-muted">{brandConfig.brandName} · Brand environment</span>
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Sidebar */}
              <nav className="scroll-quiet flex shrink-0 overflow-x-auto border-b border-line bg-surface md:w-56 md:flex-col md:overflow-visible md:border-r md:border-b-0 md:py-5" aria-label="Dashboard">
                <p className="hidden px-5 pb-4 text-[9.5px] tracking-[0.2em] text-muted uppercase md:block">Demo Brand</p>
                {NAV.map((item) => {
                  const active = view === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setView(item)}
                      className={`relative shrink-0 px-4 py-3 text-left text-[12.5px] whitespace-nowrap transition-colors md:px-5 md:py-2.5 ${
                        active ? "font-medium text-ink" : "text-muted hover:text-ink"
                      }`}
                    >
                      {active && <span className="absolute inset-x-4 bottom-0 h-px bg-ink md:inset-x-auto md:inset-y-2 md:left-0 md:h-auto md:w-[2px]" />}
                      {item}
                    </button>
                  );
                })}
              </nav>

              {/* Content */}
              <div className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="display text-3xl sm:text-4xl">{view}</h3>
                  {(view === "Overview" || view === "Products") && (
                    <button type="button" onClick={() => setModalOpen(true)} className="btn btn-primary !h-10 !px-5">
                      + Add Product
                    </button>
                  )}
                </div>

                {view === "Overview" && (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
                      {overviewMetrics.map((m, i) => (
                        <div key={m.label} className="bg-surface p-4 sm:p-5">
                          <p className="text-[9.5px] tracking-[0.16em] text-muted uppercase">{m.label}</p>
                          <p className="display mt-3 text-4xl">{i === 0 ? products.length + drafts.length : m.value}</p>
                          <p className="mt-1 text-[10.5px] text-muted">{m.note}</p>
                        </div>
                      ))}
                    </div>
                    <ProductsTable drafts={drafts} title="Recent products" limit={5} />
                  </div>
                )}

                {view === "Products" && (
                  <div className="grid gap-6 xl:grid-cols-4">
                    <div className="xl:col-span-3">
                      <ProductsTable drafts={drafts} title="All products" />
                    </div>
                    <GarmentGuidance className="h-fit !bg-surface" />
                  </div>
                )}

                {view === "QR Codes" && <QRManagementPanel />}
                {view === "Analytics" && <AnalyticsPanel compact />}

                {!LIVE_VIEWS.includes(view) && (
                  <div className="flex min-h-[320px] flex-col items-center justify-center border border-dashed border-line bg-surface p-8 text-center">
                    <p className="eyebrow text-muted">{view}</p>
                    <p className="display mt-3 text-3xl">Part of the full platform</p>
                    <p className="mt-2 max-w-sm text-[13px] text-muted">
                      This area is planned for the brand environment and isn&apos;t part of the demo preview.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {modalOpen && (
        <ProductUploadDemo onClose={() => setModalOpen(false)} onSave={(d) => setDrafts((prev) => [d, ...prev])} />
      )}
    </section>
  );
}

function ProductsTable({ drafts, title, limit }: { drafts: DraftProduct[]; title: string; limit?: number }) {
  const rows = [
    ...drafts.map((d) => ({ kind: "draft" as const, d })),
    ...products.map((p) => ({ kind: "product" as const, p })),
  ].slice(0, limit);

  return (
    <div className="bg-surface">
      <p className="border-b border-line px-4 py-3 text-[11px] font-medium tracking-[0.12em] uppercase">{title}</p>
      <div className="scroll-quiet overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-line text-[9.5px] tracking-[0.16em] text-muted uppercase">
              {["Image", "Product", "SKU", "Category", "Colour", "Status", "Try-Ons", "QR"].map((h) => (
                <th key={h} className={`px-4 py-3 font-medium ${h === "Try-Ons" ? "text-right" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) =>
              row.kind === "draft" ? (
                <tr key={`d-${row.d.id}`} className="animate-fade-in border-b border-line bg-accent/20 last:border-0">
                  <td className="px-4 py-2.5">
                    <span className="block h-11 w-9 overflow-hidden bg-bg">
                      {row.d.imageUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={row.d.imageUrl} alt="" className="h-full w-full object-contain" />
                      )}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-medium">{row.d.name}</td>
                  <td className="px-4 py-2.5 text-muted">{row.d.sku}</td>
                  <td className="px-4 py-2.5 text-muted">{row.d.category}</td>
                  <td className="px-4 py-2.5 text-muted">{row.d.colour || "—"}</td>
                  <td className="px-4 py-2.5">
                    <StatusPill label="New" />
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums text-muted">—</td>
                  <td className="px-4 py-2.5 text-[10.5px] text-muted uppercase">Pending</td>
                </tr>
              ) : (
                <tr key={row.p.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-2.5">
                    <GarmentImage product={row.p} className="h-11 w-9" imgClassName="p-0.5" />
                  </td>
                  <td className="px-4 py-2.5 font-medium">{row.p.name}</td>
                  <td className="px-4 py-2.5 text-muted">{row.p.sku}</td>
                  <td className="px-4 py-2.5 text-muted">{row.p.category}</td>
                  <td className="px-4 py-2.5 text-muted">{row.p.colour}</td>
                  <td className="px-4 py-2.5">
                    <StatusPill label={row.p.status === "active" ? "Active" : row.p.status} dark={row.p.status === "active"} />
                  </td>
                  <td className="px-4 py-2.5 text-right tabular-nums">{productStats[row.p.id]?.tryOns ?? 0}</td>
                  <td className="px-4 py-2.5">
                    {productStats[row.p.id]?.qr === "active" ? (
                      <span className="block h-7 w-7">
                        <QrCode value={tryOnLink(row.p.id)} label={`QR for ${row.p.name}`} />
                      </span>
                    ) : (
                      <span className="text-[10.5px] text-muted uppercase">Pending</span>
                    )}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusPill({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <span
      className={`inline-flex h-6 items-center px-2 text-[9.5px] font-medium tracking-[0.14em] uppercase ${
        dark ? "bg-ink text-bg" : "border border-ink/30 text-ink"
      }`}
    >
      {label}
    </span>
  );
}
