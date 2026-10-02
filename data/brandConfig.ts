/**
 * Central brand configuration.
 *
 * To personalise the demo for a brand meeting, change the values below
 * (and the catalogue in `data/products.ts`). Nothing else needs to change.
 */
export type BrandConfig = {
  /** Shown in the header, footer and dashboard mockups. */
  brandName: string;
  /** Short wordmark used where space is tight (e.g. phone mockup). */
  shortName: string;
  /** Optional logo path in /public. Leave empty to use the text wordmark. */
  logo: string;
  /** The brand's live store, used as the fallback "View product" target. */
  websiteUrl: string;
  /** Where "Request a demo" buttons send enquiries. */
  contactEmail: string;
  colors: {
    /** Page background */
    background: string;
    /** Cards / surfaces */
    surface: string;
    /** Primary text + primary buttons */
    primary: string;
    /** Secondary text */
    secondary: string;
    /** Hairlines and borders */
    border: string;
    /** Dark "for brands" sections */
    dark: string;
    /** Warm neutral accent */
    accent: string;
  };
};

export const brandConfig: BrandConfig = {
  brandName: "Virtual Try-On",
  shortName: "VTO",
  logo: "",
  websiteUrl: "https://example.com",
  contactEmail: "hello@example.com",
  colors: {
    background: "#F7F6F2",
    surface: "#FFFFFF",
    primary: "#111111",
    secondary: "#6D6D6D",
    border: "#E7E4DE",
    dark: "#111111",
    accent: "#D6CEC2",
  },
};
