"use client";

import { useEffect, useState } from "react";
import { brandConfig } from "@/data/brandConfig";

const NAV = [
  { label: "Try It", href: "#try" },
  { label: "How It Works", href: "#how" },
  { label: "For Brands", href: "#brands" },
  { label: "Technology", href: "#technology" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  if (brandConfig.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={brandConfig.logo} alt={brandConfig.brandName} className={`h-6 w-auto ${className}`} />;
  }
  return (
    <span className={`display text-[22px] leading-none tracking-tight ${className}`}>
      {brandConfig.brandName}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,border-color] duration-500 ${
        scrolled || open ? "border-b border-line bg-bg/90 backdrop-blur-md" : "border-b border-transparent bg-bg"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <a href="#top" aria-label={`${brandConfig.brandName} home`} onClick={() => setOpen(false)}>
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-10 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="link-underline text-[12.5px] tracking-wide text-ink/80 hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#contact" className="btn btn-primary hidden !h-10 !px-5 sm:inline-flex">
            Request a Demo
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span
                className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-6 bg-ink transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="animate-fade-in fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col justify-between bg-bg px-5 pt-8 pb-10 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {NAV.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="animate-fade-in-up display border-b border-line py-5 text-[40px]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary w-full">
            Request a Demo
          </a>
        </div>
      )}
    </header>
  );
}
