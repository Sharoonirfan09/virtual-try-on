import { products } from "@/data/products";
import { Figure } from "./ui/Figure";
import { GarmentImage } from "./ui/GarmentImage";

const FLOW = ["Garment", "You", "AI", "Your look"];

export function Hero() {
  const heroGarment = products[0];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 pt-10 pb-16 sm:px-8 md:pt-16 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:pt-20 lg:pb-28">
        {/* Copy */}
        <div className="flex flex-col justify-center lg:col-span-6 xl:col-span-6">
          <p className="eyebrow animate-fade-in-up text-muted">AI-Powered Virtual Try-On</p>
          <h1 className="display animate-fade-in-up mt-6 text-[72px] uppercase sm:text-[112px] lg:text-[128px] xl:text-[150px]" style={{ animationDelay: "80ms" }}>
            See it.
            <br />
            Wear it.
            <br />
            <em className="text-ink/90 normal-case italic">Virtually.</em>
          </h1>
          <p
            className="animate-fade-in-up mt-8 max-w-md text-[15.5px] leading-relaxed text-muted sm:text-[17px]"
            style={{ animationDelay: "160ms" }}
          >
            Choose a garment, upload your photo and discover how it looks on you with AI-powered virtual try-on.
          </p>
          <div className="animate-fade-in-up mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
            <a href="#try" className="btn btn-primary">
              Try It Now <span aria-hidden>→</span>
            </a>
            <a href="#how" className="btn btn-ghost">
              See How It Works
            </a>
          </div>
        </div>

        {/* Visual: Garment → You → AI → Your look */}
        <div className="animate-fade-in lg:col-span-6" style={{ animationDelay: "200ms" }}>
          <div className="relative mx-auto grid max-w-[640px] grid-cols-5 gap-3 sm:gap-4">
            <div className="col-span-2 flex flex-col gap-3 sm:gap-4">
              <figure className="relative">
                <GarmentImage product={heroGarment} className="aspect-[4/5] w-full" imgClassName="p-4 transition-transform duration-[1.6s] hover:scale-105" />
                <figcaption className="mt-2 flex items-baseline justify-between text-[10px] tracking-[0.18em] text-muted uppercase">
                  <span>01 Garment</span>
                  <span className="hidden sm:inline">{heroGarment.sku}</span>
                </figcaption>
              </figure>
              <figure className="relative">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#E6E1D8]">
                  <Figure id="hero-you" className="absolute inset-x-0 bottom-[-3%] mx-auto h-[96%]" />
                </div>
                <figcaption className="mt-2 text-[10px] tracking-[0.18em] text-muted uppercase">02 You</figcaption>
              </figure>
            </div>

            <figure className="relative col-span-3">
              <div className="relative h-full min-h-[420px] overflow-hidden bg-[#DCD5CA] sm:min-h-[560px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,255,255,0.55),transparent_65%)]" />
                <Figure id="hero-base" className="absolute inset-x-0 bottom-[-4%] mx-auto h-[100%]" />
                <div className="hero-reveal absolute inset-0">
                  <Figure id="hero-look" dressed className="absolute inset-x-0 bottom-[-4%] mx-auto h-[100%]" />
                </div>
                <div className="hero-scan pointer-events-none absolute inset-x-0 h-px bg-white shadow-[0_0_24px_6px_rgba(255,255,255,0.75)]" />

                <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/75 px-3 py-1.5 backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-ink" />
                  <span className="text-[9.5px] font-medium tracking-[0.2em] uppercase">AI try-on</span>
                </div>
                <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between text-ink">
                  <div>
                    <p className="text-[9.5px] tracking-[0.2em] text-ink/60 uppercase">Your look</p>
                    <p className="display mt-1 text-2xl sm:text-3xl">{heroGarment.name}</p>
                  </div>
                  <p className="text-[9.5px] tracking-[0.2em] text-ink/60 uppercase">Illustration</p>
                </div>
              </div>
            </figure>
          </div>

          <ol className="mx-auto mt-6 grid max-w-[640px] grid-cols-4 gap-3 sm:gap-4" aria-label="How a look is created">
            {FLOW.map((step, i) => (
              <li key={step} className="relative pt-3">
                <span className="absolute top-0 left-0 h-px w-full bg-line" />
                <span
                  className="hero-step-bar absolute top-0 left-0 h-px w-full bg-ink"
                  style={{ animationDelay: `${i === 0 ? 0 : -(7 - i * 1.75)}s` }}
                />
                <span className="hero-step eyebrow block !text-[9.5px] sm:!text-[10.5px]" style={{ animationDelay: `${i === 0 ? 0 : -(7 - i * 1.75)}s` }}>
                  {String(i + 1).padStart(2, "0")} {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
