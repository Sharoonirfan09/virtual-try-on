"use client";

import { useEffect, useRef } from "react";
import { getProduct } from "@/data/products";
import { DEMO_MODE } from "@/lib/config";
import { GenerationScreen } from "./demo/GenerationScreen";
import { ProductSelector } from "./demo/ProductSelector";
import { StepIndicator } from "./demo/StepIndicator";
import { TryOnResult } from "./demo/TryOnResult";
import { UploadStep } from "./demo/UploadStep";
import { useTryOnDemo } from "./demo/useTryOnDemo";

export function DemoExperience() {
  const { state, dispatch, product } = useTryOnDemo();
  const sectionRef = useRef<HTMLElement>(null);
  const prevStep = useRef(state.step);

  // Deep link: /?look=<productId>#try opens that garment directly (the QR flow).
  useEffect(() => {
    const look = new URLSearchParams(window.location.search).get("look");
    const match = getProduct(look);
    if (match) {
      dispatch({ type: "OPEN_PRODUCT", productId: match.id });
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth" }), 150);
    }
  }, [dispatch]);

  // Keep the active step in view when it changes.
  useEffect(() => {
    if (prevStep.current === state.step) return;
    prevStep.current = state.step;
    const el = sectionRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth" });
  }, [state.step]);

  const dirty = Boolean(state.productId || state.photo || state.consent || state.step !== "select");

  return (
    <section id="try" ref={sectionRef} className="relative border-t border-line bg-bg">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-ink" />
            <p className="eyebrow">Live Try-On Demo</p>
            {DEMO_MODE && (
              <span className="hidden border border-line px-2 py-1 text-[9.5px] tracking-[0.18em] text-muted uppercase sm:inline">
                Demo mode
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => dispatch({ type: "RESET" })}
            disabled={!dirty}
            className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.16em] uppercase transition-opacity disabled:opacity-0"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6a4 4 0 1 0 1.2-2.85M2 1.5v2.5h2.5" stroke="currentColor" strokeWidth="1.2" />
            </svg>
            Start Over
          </button>
        </div>

        <div className="mt-8">
          <StepIndicator current={state.step} />
        </div>

        <div className="mt-12 sm:mt-16">
          {state.step === "select" && (
            <ProductSelector
              selected={product}
              onSelect={(id) => dispatch({ type: "SELECT_PRODUCT", productId: id })}
              onConfirm={() => dispatch({ type: "CONFIRM_PRODUCT" })}
            />
          )}

          {state.step === "upload" && (
            <UploadStep
              product={product}
              photo={state.photo}
              consent={state.consent}
              onPhoto={(photo) => dispatch({ type: "SET_PHOTO", photo })}
              onConsent={(consent) => dispatch({ type: "SET_CONSENT", consent })}
              onChangeGarment={() => dispatch({ type: "GO_TO", step: "select" })}
              onGenerate={() => dispatch({ type: "GENERATE" })}
            />
          )}

          {state.step === "generate" && product && state.photo && (
            <GenerationScreen
              product={product}
              photo={state.photo}
              status={state.status}
              error={state.error}
              attempt={state.attempt}
              onCancel={() => dispatch({ type: "CANCEL" })}
              onRetry={() => dispatch({ type: "GENERATE" })}
              onChangePhoto={() => dispatch({ type: "CHANGE_PHOTO" })}
              onReset={() => dispatch({ type: "RESET" })}
            />
          )}

          {state.step === "result" && product && state.photo && state.result && (
            <TryOnResult
              result={state.result}
              product={product}
              photo={state.photo}
              onTryAnother={() => dispatch({ type: "TRY_ANOTHER" })}
              onChangePhoto={() => dispatch({ type: "CHANGE_PHOTO" })}
            />
          )}
        </div>
      </div>
    </section>
  );
}
