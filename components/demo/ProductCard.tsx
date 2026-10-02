import type { Product } from "@/data/products";
import { GarmentImage } from "../ui/GarmentImage";

type Props = {
  product: Product;
  index: number;
  selected: boolean;
  onSelect: () => void;
};

export function ProductCard({ product, index, selected, onSelect }: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className="group relative flex flex-col text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
    >
      <div className="relative w-full overflow-hidden">
        <GarmentImage
          product={product}
          showPlaceholderTag
          className="aspect-[3/4] w-full"
          imgClassName="p-5 transition-transform duration-[1.2s] ease-[var(--ease-editorial)] group-hover:-translate-y-1 group-hover:scale-[1.045] sm:p-8"
        />
        <span
          className={`pointer-events-none absolute inset-0 border transition-all duration-500 ${
            selected ? "border-2 border-ink" : "border-transparent group-hover:border-ink/15"
          }`}
        />
        <span
          className={`absolute top-3 right-3 flex h-7 items-center gap-1.5 px-2.5 text-[9.5px] font-medium tracking-[0.18em] uppercase transition-all duration-500 ${
            selected ? "bg-ink text-bg opacity-100" : "translate-y-1 bg-white/80 text-ink opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          {selected ? (
            <>
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
                <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.4" fill="none" />
              </svg>
              Selected
            </>
          ) : (
            "Select"
          )}
        </span>
        <span className="display absolute top-3 left-4 text-lg text-ink/50">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3 sm:mt-4">
        <div className="min-w-0">
          <h3 className="display text-[22px] leading-tight sm:text-[26px]">{product.name}</h3>
          <p className="mt-1 text-[12px] text-muted">
            {product.category} <span className="mx-1 text-line">/</span> {product.colour}
          </p>
        </div>
        <span className="mt-1.5 hidden shrink-0 text-[10px] tracking-[0.14em] text-muted uppercase sm:block">{product.sku}</span>
      </div>
    </button>
  );
}
