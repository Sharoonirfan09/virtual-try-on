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

- `NEXT_PUBLIC_DEMO_MODE=true` (default): generation is simulated in the browser (4–6 s). Results are
  labelled as demo previews and marked `mode: "demo"`. No AI call is made.
- `NEXT_PUBLIC_DEMO_MODE=false`: the photo and product id go to `POST /api/try-on`. Connect a provider in
  `services/server/tryOnProvider.ts` and set `TRYON_PROVIDER_URL` / `TRYON_PROVIDER_API_KEY` (server only).
  See `.env.example`.

UI components only call `generateTryOn()` in `services/tryOnService.ts`.

## QR deep links

`/?look=<productId>#try` opens a garment directly at the upload step. The QR codes on the page are real
and encode this link for the current host — scan the tag in the "In store" section to try it.
