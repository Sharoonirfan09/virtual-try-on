import type { Product } from "@/data/products";

type Props = {
  product: Product;
  className?: string;
  imgClassName?: string;
  showPlaceholderTag?: boolean;
  sizes?: "sm" | "md" | "lg";
};

/**
 * Product garment image on its backdrop. Uses a plain <img> so brands can
 * drop in any local or remote product image without image-domain config.
 */
export function GarmentImage({ product, className = "", imgClassName = "", showPlaceholderTag = false }: Props) {
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: product.backdrop ?? "#ECE8E1" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={product.garmentImage}
        alt={`${product.name} — ${product.colour}`}
        className={`h-full w-full object-contain ${imgClassName}`}
        draggable={false}
      />
      {showPlaceholderTag && product.isPlaceholder && (
        <span className="absolute bottom-2 left-2 bg-white/70 px-1.5 py-1 text-[8px] whitespace-nowrap sm:bottom-3 sm:left-3 sm:px-2 sm:text-[9px] font-medium tracking-[0.18em] text-muted uppercase backdrop-blur">
          Placeholder artwork
        </span>
      )}
    </div>
  );
}
