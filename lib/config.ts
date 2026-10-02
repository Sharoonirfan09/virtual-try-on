/**
 * DEMO_MODE
 *
 * true  → generation is simulated in the browser (no AI provider needed).
 * false → generation is sent to the server endpoint /api/try-on, which
 *         calls the configured provider with server-only credentials.
 *
 * Controlled with NEXT_PUBLIC_DEMO_MODE in .env.local. Defaults to true so
 * the demo can always be presented, even with no API connected.
 */
export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE !== "false";

export const DEMO_SETTINGS = {
  /** Simulated generation duration range, in milliseconds. */
  minDurationMs: 4200,
  maxDurationMs: 5600,
};

export const UPLOAD_RULES = {
  acceptedTypes: ["image/jpeg", "image/png", "image/webp"],
  acceptAttr: ".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp",
  maxBytes: 12 * 1024 * 1024,
};
