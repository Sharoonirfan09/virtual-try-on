"use client";

import { useState } from "react";
import { productStats } from "@/data/demoAnalytics";
import { products } from "@/data/products";
import { copyProductLink, downloadProductQr } from "@/lib/qr";
import { GarmentImage } from "../ui/GarmentImage";
import { QrCode } from "../ui/QrCode";
import { tryOnLink } from "@/lib/links";

export function QRManagementPanel() {
  const [status, setStatus] = useState<Record<string, "active" | "pending">>(() =>
    Object.fromEntries(products.map((p) => [p.id, productStats[p.id]?.qr ?? "pending"])),
  );
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(id: string) {
    try {
      await copyProductLink(id);
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 1600);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="overflow-hidden bg-surface">
      <div className="scroll-quiet overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[12.5px]">
          <thead>
            <tr className="border-b border-line text-[9.5px] tracking-[0.16em] text-muted uppercase">
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Variant</th>
              <th className="px-4 py-3 font-medium">QR status</th>
              <th className="px-4 py-3 text-right font-medium">Scans</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const active = status[p.id] === "active";
              return (
                <tr key={p.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <GarmentImage product={p} className="h-10 w-8 shrink-0" imgClassName="p-0.5" />
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-[10.5px] text-muted">{p.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{p.colour} · One size</td>
                  <td className="px-4 py-3">
                    {active ? (
                      <span className="flex items-center gap-2">
                        <span className="h-7 w-7 shrink-0 bg-white p-0.5">
                          <QrCode value={tryOnLink(p.id)} label={`QR for ${p.name}`} />
                        </span>
                        <span className="text-[10.5px] tracking-[0.12em] uppercase">Active</span>
                      </span>
                    ) : (
                      <span className="text-[10.5px] tracking-[0.12em] text-muted uppercase">Not generated</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">{active ? productStats[p.id]?.scans ?? 0 : "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      {active ? (
                        <>
                          <button type="button" onClick={() => downloadProductQr(p.id)} className="h-8 border border-line px-3 text-[9.5px] font-semibold tracking-[0.14em] uppercase hover:border-ink">
                            Download QR
                          </button>
                          <button type="button" onClick={() => copy(p.id)} className="h-8 w-[92px] border border-line px-3 text-[9.5px] font-semibold tracking-[0.14em] uppercase hover:border-ink">
                            {copied === p.id ? "Copied" : "Copy link"}
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setStatus((s) => ({ ...s, [p.id]: "active" }))}
                          className="h-8 bg-ink px-3 text-[9.5px] font-semibold tracking-[0.14em] text-bg uppercase"
                        >
                          Generate QR
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
