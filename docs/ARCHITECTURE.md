# Virtual Try-On — Demo Platform Architecture

## 1. Page structure (single landing page, customer → brand story)

| #  | Section                         | Component              | Anchor        |
|----|---------------------------------|------------------------|---------------|
| 1  | Sticky header                   | `Header`               | —             |
| 2  | Hero (Garment → You → AI → Look)| `Hero`                 | `#top`        |
| 3  | **Live try-on demo**            | `DemoExperience`       | `#try`        |
| 4  | How it works (4 steps)          | `HowItWorks`           | `#how`        |
| 5  | In-store QR (future)            | `QRExperience`         | `#in-store`   |
| 6  | Online or in store              | `EcommerceExperience`  | —             |
| 7  | For fashion brands (dark)       | `BrandDashboard`       | `#brands`     |
| 8  | From one product to thousands   | `CatalogueScale`       | —             |
| 9  | QR management                   | `QRManagement`         | —             |
| 10 | Analytics preview               | `AnalyticsPreview`     | —             |
| 11 | Privacy                         | `PrivacySection`       | `#privacy`    |
| 12 | Architecture diagram            | `ArchitectureDiagram`  | `#technology` |
| 13 | Business model                  | `BusinessModel`        | —             |
| 14 | Final CTA                       | `FinalCTA`             | `#contact`    |
| 15 | Footer                          | `Footer`               | —             |

## 2. Component architecture

```
app/page.tsx (server)          composes sections
└─ DemoExperience (client)     owns the try-on state machine (useReducer)
   ├─ StepIndicator            01 SELECT · 02 UPLOAD · 03 GENERATE · 04 RESULT
   ├─ ProductSelector → ProductCard
   ├─ PhotoUploader            drag/drop, camera capture, validation, progress
   ├─ Consent                  checkbox + privacy note
   ├─ GenerationScreen         garment | AI animation | photo, rotating messages
   └─ TryOnResult → BeforeAfter
BrandDashboard (client)        sidebar views: Overview / Products / QR / Analytics
   ├─ ProductUploadDemo        add-product modal → "Product added" → Generate QR
   ├─ QRManagementPanel        (shared with QRManagement section)
   └─ AnalyticsPanel           (shared with AnalyticsPreview section)
```

## 3. User journey

Choose garment → Upload photo → Consent → Generate → Result → Try another / Change photo / View product / Start over.

Deep link: `/?look=<productId>#try` pre-selects a garment and opens step 02.
This is exactly what a product QR code will do in store — the QR on the demo
tag is real and scannable.

## 4. Demo-state logic

```
state = { step, product, photo, consent, status, result, error }

step:    select → upload → generate → result
status:  idle | processing | success | error

SELECT_PRODUCT   → product set
CONFIRM_PRODUCT  → step = upload
SET_PHOTO        → photo set (validated: jpg/jpeg/png/webp, ≤ 12 MB)
SET_CONSENT      → consent
GENERATE         → requires product && photo && consent → step = generate, status = processing
SUCCESS          → step = result, result = { imageUrl, mode: "demo" | "live" }
FAIL             → status = error (Retry / Change photo / Start over)
CHANGE_PHOTO     → step = upload, keeps product, clears photo/consent/result
TRY_ANOTHER      → step = select, keeps photo + consent
RESET            → initial state (Start over)
```

## 5. Generation abstraction

```
services/tryOnService.ts
  generateTryOn(personImage, garment) → TryOnResult
    DEMO_MODE  → simulated 4–6 s, local composite, result.mode = "demo"
    otherwise  → POST /api/try-on (multipart) → server-side provider
app/api/try-on/route.ts   server only; reads TRYON_PROVIDER_API_KEY
services/server/tryOnProvider.ts   single place to wire a real provider
```

The browser never sees provider keys. The client sends the product **id**,
not a garment URL; the server resolves the garment from the catalogue.

## 6. Folder structure

```
app/            layout, page, globals.css, api/try-on/route.ts
components/     all sections + demo components (components/demo/*, components/brand/*)
data/           brandConfig.ts, products.ts, demoAnalytics.ts
lib/            config.ts (DEMO_MODE), qr.ts, useReveal.ts
services/       tryOnService.ts, server/tryOnProvider.ts
public/garments placeholder garment artwork (replace with product photography)
```
