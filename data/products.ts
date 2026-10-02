/**
 * Demo catalogue.
 *
 * Replace these six entries with a real brand's garments before a meeting.
 * `garmentImage` should be a clean, front-view product image in /public
 * (or an absolute URL). The artwork in /public/garments is placeholder
 * illustration and is labelled as such in the UI via `isPlaceholder`.
 */
export type ProductStatus = "active" | "draft" | "archived";

export type Product = {
  id: string;
  name: string;
  category: string;
  colour: string;
  sku: string;
  garmentImage: string;
  productUrl: string;
  brand: string;
  status: ProductStatus;
  /** Optional: a prepared try-on image used instead of the demo composite. */
  demoResultImage?: string;
  /** Background tone behind the garment image on cards. */
  backdrop?: string;
  /** True while the garment image is placeholder artwork. */
  isPlaceholder?: boolean;
};

export const products: Product[] = [
  {
    id: "evening-dress",
    name: "Evening Dress",
    category: "Dresses",
    colour: "Ink Black",
    sku: "VT-DR-001",
    garmentImage: "/garments/evening-dress.svg",
    productUrl: "https://example.com/products/evening-dress",
    brand: "Demo Collection",
    status: "active",
    backdrop: "#ECE8E1",
    isPlaceholder: true,
  },
  {
    id: "contemporary-abaya",
    name: "Contemporary Abaya",
    category: "Modest Wear",
    colour: "Sand",
    sku: "VT-AB-002",
    garmentImage: "/garments/contemporary-abaya.svg",
    productUrl: "https://example.com/products/contemporary-abaya",
    brand: "Demo Collection",
    status: "active",
    backdrop: "#E9E4DB",
    isPlaceholder: true,
  },
  {
    id: "two-piece-set",
    name: "Two-Piece Set",
    category: "Co-ords",
    colour: "Ecru",
    sku: "VT-TP-003",
    garmentImage: "/garments/two-piece-set.svg",
    productUrl: "https://example.com/products/two-piece-set",
    brand: "Demo Collection",
    status: "active",
    backdrop: "#DCD5CA",
    isPlaceholder: true,
  },
  {
    id: "formal-shirt",
    name: "Formal Shirt",
    category: "Shirts",
    colour: "Pale Blue",
    sku: "VT-SH-004",
    garmentImage: "/garments/formal-shirt.svg",
    productUrl: "https://example.com/products/formal-shirt",
    brand: "Demo Collection",
    status: "active",
    backdrop: "#ECEAE5",
    isPlaceholder: true,
  },
  {
    id: "tailored-jacket",
    name: "Tailored Jacket",
    category: "Outerwear",
    colour: "Camel",
    sku: "VT-JK-005",
    garmentImage: "/garments/tailored-jacket.svg",
    productUrl: "https://example.com/products/tailored-jacket",
    brand: "Demo Collection",
    status: "active",
    backdrop: "#E4E0D8",
    isPlaceholder: true,
  },
  {
    id: "traditional-outfit",
    name: "Embroidered Kurta Set",
    category: "Traditional",
    colour: "Forest Green",
    sku: "VT-TR-006",
    garmentImage: "/garments/traditional-outfit.svg",
    productUrl: "https://example.com/products/embroidered-kurta-set",
    brand: "Demo Collection",
    status: "active",
    backdrop: "#E7E3DA",
    isPlaceholder: true,
  },
];

export function getProduct(id: string | null | undefined): Product | undefined {
  if (!id) return undefined;
  return products.find((p) => p.id === id || p.sku === id);
}
