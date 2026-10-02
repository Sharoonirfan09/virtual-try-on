"use client";

import { useEffect, useReducer } from "react";
import { getProduct, type Product } from "@/data/products";
import { generateTryOn, TryOnError, type TryOnResult } from "@/services/tryOnService";

export type DemoStep = "select" | "upload" | "generate" | "result";
export type GenerationStatus = "idle" | "processing" | "success" | "error";

export type UploadedPhoto = {
  file: File;
  url: string;
  width: number;
  height: number;
};

export type DemoState = {
  step: DemoStep;
  productId: string | null;
  photo: UploadedPhoto | null;
  consent: boolean;
  status: GenerationStatus;
  result: TryOnResult | null;
  error: string | null;
  /** Bumped on every generate/retry so the effect re-runs. */
  attempt: number;
};

type Action =
  | { type: "SELECT_PRODUCT"; productId: string }
  | { type: "CONFIRM_PRODUCT" }
  | { type: "OPEN_PRODUCT"; productId: string }
  | { type: "SET_PHOTO"; photo: UploadedPhoto | null }
  | { type: "SET_CONSENT"; consent: boolean }
  | { type: "GENERATE" }
  | { type: "CANCEL" }
  | { type: "SUCCESS"; result: TryOnResult }
  | { type: "FAIL"; error: string }
  | { type: "CHANGE_PHOTO" }
  | { type: "TRY_ANOTHER" }
  | { type: "GO_TO"; step: "select" | "upload" }
  | { type: "RESET" };

export const initialDemoState: DemoState = {
  step: "select",
  productId: null,
  photo: null,
  consent: false,
  status: "idle",
  result: null,
  error: null,
  attempt: 0,
};

export function canGenerate(s: DemoState) {
  return Boolean(s.productId && s.photo && s.consent);
}

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "SELECT_PRODUCT":
      return { ...state, productId: action.productId };
    case "CONFIRM_PRODUCT":
      return state.productId ? { ...state, step: "upload" } : state;
    case "OPEN_PRODUCT":
      return { ...state, productId: action.productId, step: "upload" };
    case "SET_PHOTO":
      return { ...state, photo: action.photo, result: null };
    case "SET_CONSENT":
      return { ...state, consent: action.consent };
    case "GENERATE":
      if (!canGenerate(state)) return state;
      return { ...state, step: "generate", status: "processing", error: null, attempt: state.attempt + 1 };
    case "CANCEL":
      return { ...state, step: "upload", status: "idle", error: null };
    case "SUCCESS":
      return { ...state, step: "result", status: "success", result: action.result };
    case "FAIL":
      return { ...state, status: "error", error: action.error };
    case "CHANGE_PHOTO":
      return { ...state, step: "upload", photo: null, consent: false, status: "idle", result: null, error: null };
    case "TRY_ANOTHER":
      return { ...state, step: "select", productId: null, status: "idle", result: null, error: null };
    case "GO_TO":
      return { ...state, step: action.step };
    case "RESET":
      return initialDemoState;
  }
}

export function useTryOnDemo() {
  const [state, dispatch] = useReducer(reducer, initialDemoState);
  const product: Product | undefined = getProduct(state.productId);

  // Release object URLs when a photo is replaced or removed.
  const photoUrl = state.photo?.url;
  useEffect(() => {
    return () => {
      if (photoUrl) URL.revokeObjectURL(photoUrl);
    };
  }, [photoUrl]);

  // Run generation whenever a new attempt starts.
  const { status, attempt, photo } = state;
  useEffect(() => {
    if (status !== "processing" || !photo || !product) return;
    const controller = new AbortController();
    generateTryOn(photo.file, product, { signal: controller.signal })
      .then((result) => dispatch({ type: "SUCCESS", result }))
      .catch((err: unknown) => {
        if (err instanceof TryOnError && err.code === "aborted") return;
        dispatch({
          type: "FAIL",
          error:
            err instanceof TryOnError
              ? err.message
              : "Something interrupted the preview. Please try again.",
        });
      });
    return () => controller.abort();
    // Only a new attempt should restart generation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt, status === "processing"]);

  return { state, dispatch, product };
}
