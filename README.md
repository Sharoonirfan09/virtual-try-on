# Virtual Try-On — Interactive Demo

A presentation-ready prototype: choose a garment → upload a photo → consent → AI try-on → result,
followed by the brand story (QR in store, e-commerce, dashboard, analytics, privacy, business model).

```bash
npm install
npm run dev   # http://localhost:3000
```

Architecture, user journey and demo-state logic: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

## Personalise for a brand meeting

| What                          | Where                                   |
|-------------------------------|-----------------------------------------|
| Brand name, logo, colours, contact email, website | `data/brandConfig.ts` |
| Garments (name, SKU, image, product URL, status)  | `data/products.ts`    |
| Garment images                | `public/garments/` (current files are placeholder artwork) |
| Dashboard / analytics numbers | `data/demoAnalytics.ts` (illustrative only) |

Tip: set `demoResultImage` on a product to show a prepared try-on image in demo mode
instead of the simple local composite.

## Demo mode vs live AI

- `NEXT_PUBLIC_DEMO_MODE=true` (default): generation is simulated in the browser (4–6 s). Results are a
  simple labelled overlay, marked `mode: "demo"`. No AI call is made.
- `NEXT_PUBLIC_DEMO_MODE=false`: real try-on. The photo (resized in the browser) and the product id go to
  `POST /api/try-on`, which calls `google/gemini-3.1-flash-image` through Vercel AI Gateway
  (`services/server/tryOnProvider.ts`). On Vercel, authentication is automatic (OIDC); no API key is
  stored in the code. Requires a card on file for AI Gateway in the Vercel dashboard.

UI components only call `generateTryOn()` in `services/tryOnService.ts`.

Cost control: the route has a light per-IP limit, but the site is public — set an AI Gateway budget
(`vercel ai-gateway budgets set --help`).

## QR deep links

`/?look=<productId>#try` opens a garment directly at the upload step. The QR codes on the page are real
and encode this link for the current host — scan the tag in the "In store" section to try it.
