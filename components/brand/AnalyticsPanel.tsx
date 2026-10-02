import { dailyGenerations, dailyScans, funnelMetrics, productStats } from "@/data/demoAnalytics";
import { products } from "@/data/products";

function linePath(values: number[], w: number, h: number, max: number) {
  const step = w / (values.length - 1);
  return values.map((v, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)} ${(h - (v / max) * h).toFixed(1)}`).join(" ");
}

export function AnalyticsPanel({ compact = false }: { compact?: boolean }) {
  const W = 600;
  const H = 180;
  const max = Math.max(...dailyScans) * 1.1;
  const top = [...products].sort((a, b) => (productStats[b.id]?.tryOns ?? 0) - (productStats[a.id]?.tryOns ?? 0)).slice(0, 4);
  const topMax = productStats[top[0].id]?.tryOns ?? 1;

  return (
    <div className="flex flex-col gap-4">
      <div className={`grid grid-cols-2 gap-px bg-line ${compact ? "sm:grid-cols-5" : "sm:grid-cols-3 lg:grid-cols-5"}`}>
        {funnelMetrics.map((m) => (
          <div key={m.label} className="bg-surface p-4">
            <p className="text-[9.5px] tracking-[0.16em] text-muted uppercase">{m.label}</p>
            <p className="display mt-2 text-3xl">{m.value.toLocaleString("en-US")}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="bg-surface p-5 lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-medium tracking-[0.12em] uppercase">Last 14 days</p>
            <div className="flex gap-4 text-[10px] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="h-px w-4 bg-ink" /> Generations
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-px w-4 border-t border-dashed border-ink/50" /> QR scans
              </span>
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 4}`} className="mt-5 h-auto w-full overflow-visible" role="img" aria-label="Illustrative line chart of generations and QR scans over 14 days">
            {[0.25, 0.5, 0.75, 1].map((g) => (
              <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="var(--color-line)" />
            ))}
            <path d={`${linePath(dailyGenerations, W, H, max)} L${W} ${H} L0 ${H} Z`} fill="var(--color-accent)" opacity="0.35" />
            <path d={linePath(dailyScans, W, H, max)} fill="none" stroke="var(--color-ink)" strokeOpacity="0.45" strokeDasharray="4 4" strokeWidth="1.2" />
            <path d={linePath(dailyGenerations, W, H, max)} fill="none" stroke="var(--color-ink)" strokeWidth="1.6" />
          </svg>
        </div>

        <div className="bg-surface p-5 lg:col-span-2">
          <p className="text-[11px] font-medium tracking-[0.12em] uppercase">Top tried products</p>
          <ol className="mt-5 flex flex-col gap-4">
            {top.map((p, i) => {
              const v = productStats[p.id]?.tryOns ?? 0;
              return (
                <li key={p.id}>
                  <div className="flex items-baseline justify-between text-[12.5px]">
                    <span>
                      <span className="mr-2 text-[10px] text-muted tabular-nums">{i + 1}</span>
                      {p.name}
                    </span>
                    <span className="tabular-nums text-muted">{v}</span>
                  </div>
                  <div className="mt-1.5 h-[3px] bg-line">
                    <div className="h-full bg-ink" style={{ width: `${(v / topMax) * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <p className="text-[10.5px] tracking-[0.12em] text-muted uppercase">Illustrative demo data · not real performance figures</p>
    </div>
  );
}
