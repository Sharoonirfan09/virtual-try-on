/**
 * Illustrative numbers for the brand dashboard mockups.
 * These are demo values only — not real performance data.
 */
export const overviewMetrics = [
  { label: "Active Products", value: "6", note: "Demo catalogue" },
  { label: "QR Scans", value: "1,248", note: "Illustrative · 30 days" },
  { label: "Try-On Generations", value: "864", note: "Illustrative · 30 days" },
  { label: "Product Clicks", value: "312", note: "Illustrative · 30 days" },
];

export const productStats: Record<string, { tryOns: number; scans: number; qr: "active" | "pending" }> = {
  "evening-dress": { tryOns: 241, scans: 336, qr: "active" },
  "contemporary-abaya": { tryOns: 198, scans: 287, qr: "active" },
  "two-piece-set": { tryOns: 156, scans: 214, qr: "active" },
  "formal-shirt": { tryOns: 88, scans: 132, qr: "pending" },
  "tailored-jacket": { tryOns: 121, scans: 176, qr: "active" },
  "traditional-outfit": { tryOns: 60, scans: 103, qr: "pending" },
};

export const funnelMetrics = [
  { label: "QR Scans", value: 1248 },
  { label: "Try-On Requests", value: 972 },
  { label: "Successful Generations", value: 864 },
  { label: "Downloads", value: 402 },
  { label: "Product Clicks", value: 312 },
];

/** Daily try-on generations over 14 days (illustrative). */
export const dailyGenerations = [38, 42, 35, 51, 58, 47, 62, 55, 66, 71, 64, 78, 83, 76];
/** Daily QR scans over 14 days (illustrative). */
export const dailyScans = [61, 66, 54, 72, 80, 70, 88, 79, 91, 99, 90, 104, 112, 101];
