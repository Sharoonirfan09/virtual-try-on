import { brandConfig } from "@/data/brandConfig";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer className="bg-dark text-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 border-t border-white/10 px-5 py-10 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <Wordmark />
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[12px] text-white/60" aria-label="Footer">
          <a href="#try" className="hover:text-bg">Try It</a>
          <a href="#how" className="hover:text-bg">How It Works</a>
          <a href="#brands" className="hover:text-bg">For Brands</a>
          <a href="#technology" className="hover:text-bg">Technology</a>
          <a href="#privacy" className="hover:text-bg">Privacy</a>
        </nav>
        <p className="max-w-sm text-[11px] leading-relaxed text-white/40">
          Interactive demo. Product imagery and figures are placeholders. Virtual try-on provides an AI-generated appearance
          preview; actual colour, fit and sizing may vary. © {new Date().getFullYear()} {brandConfig.brandName}
        </p>
      </div>
    </footer>
  );
}
