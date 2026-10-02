import { products, type Product } from "@/data/products";
import { GarmentImage } from "../ui/GarmentImage";
import { ProductCard } from "./ProductCard";

type Props = {
  selected: Product | undefined;
  onSelect: (id: string) => void;
  onConfirm: () => void;
};

export function ProductSelector({ selected, onSelect, onConfirm }: Props) {
  const catalogue = products.filter((p) => p.status === "active");

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="display text-5xl sm:text-6xl lg:text-7xl">Choose Your Look</h2>
          <p className="mt-3 text-[15px] text-muted">Select a garment to experience it virtually.</p>
        </div>
        <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{catalogue.length} pieces · Demo catalogue</p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:gap-x-6 lg:gap-y-14">
        {catalogue.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            index={i}
            selected={selected?.id === product.id}
            onSelect={() => onSelect(product.id)}
          />
        ))}
      </div>

      {/* Selection bar */}
      <div className="sticky bottom-3 z-20 mt-10 sm:bottom-6">
        <div
          className={`flex items-center gap-3 border border-line bg-surface/95 p-2.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)] backdrop-blur transition-all duration-500 sm:gap-4 sm:p-3 ${
            selected ? "translate-y-0" : ""
          }`}
        >
          {selected ? (
            <GarmentImage product={selected} className="h-14 w-11 shrink-0 sm:h-16 sm:w-12" imgClassName="p-1" />
          ) : (
            <span className="flex h-14 w-11 shrink-0 items-center justify-center border border-dashed border-line text-muted sm:h-16 sm:w-12">
              +
            </span>
          )}
          <div className="min-w-0 flex-1">
            <p className="text-[10px] tracking-[0.18em] text-muted uppercase">{selected ? "Selected" : "No garment selected"}</p>
            <p className="truncate text-[14px] font-medium sm:text-[15px]">
              {selected ? `${selected.name} · ${selected.colour}` : "Tap a garment to begin"}
            </p>
          </div>
          <button type="button" className="btn btn-primary !h-12 !px-4 sm:!px-7" disabled={!selected} onClick={onConfirm}>
            Try This Look <span aria-hidden className="hidden sm:inline">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
