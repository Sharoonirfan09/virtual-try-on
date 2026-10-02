"use client";

import { useRef, useState, useSyncExternalStore, type DragEvent } from "react";
import { UPLOAD_RULES } from "@/lib/config";
import { CameraCapture } from "./CameraCapture";
import type { UploadedPhoto } from "./useTryOnDemo";

type Props = {
  photo: UploadedPhoto | null;
  onChange: (photo: UploadedPhoto | null) => void;
};

type ReadState = { kind: "idle" } | { kind: "reading"; progress: number; name: string } | { kind: "error"; message: string };

export function PhotoUploader({ photo, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const captureRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [read, setRead] = useState<ReadState>({ kind: "idle" });
  const cameraMode = useSyncExternalStore(noopSubscribe, detectCamera, () => "none" as const);
  const [cameraOpen, setCameraOpen] = useState(false);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    if (!UPLOAD_RULES.acceptedTypes.includes(file.type)) {
      setRead({ kind: "error", message: "That file type isn't supported. Please choose a JPG, PNG or WEBP photo." });
      return;
    }
    if (file.size > UPLOAD_RULES.maxBytes) {
      setRead({ kind: "error", message: "This photo is larger than 12 MB. Please choose a smaller image." });
      return;
    }

    setRead({ kind: "reading", progress: 0, name: file.name });
    try {
      await readWithProgress(file, (p) => setRead({ kind: "reading", progress: p, name: file.name }));
      const url = URL.createObjectURL(file);
      const dims = await measure(url).catch((e) => {
        URL.revokeObjectURL(url);
        throw e;
      });
      // Brief settle so the progress state is perceptible on fast devices.
      await new Promise((r) => setTimeout(r, 350));
      setRead({ kind: "idle" });
      onChange({ file, url, ...dims });
    } catch {
      setRead({ kind: "error", message: "We couldn't read this image. Please try another photo." });
    }
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  }

  function openCamera() {
    if (cameraMode === "native") captureRef.current?.click();
    else setCameraOpen(true);
  }

  const inputs = (
    <>
      <input
        ref={inputRef}
        type="file"
        accept={UPLOAD_RULES.acceptAttr}
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <input
        ref={captureRef}
        type="file"
        accept="image/*"
        capture="user"
        className="sr-only"
        tabIndex={-1}
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {cameraOpen && (
        <CameraCapture
          onClose={() => setCameraOpen(false)}
          onCapture={(file) => {
            setCameraOpen(false);
            handleFile(file);
          }}
        />
      )}
    </>
  );

  /* ---------- Preview ---------- */
  if (photo) {
    return (
      <div className="animate-fade-in">
        {inputs}
        <div className="relative overflow-hidden bg-[#E6E1D8]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.url} alt="Your uploaded photo" className="aspect-[3/4] w-full object-cover sm:aspect-[4/3] lg:aspect-auto lg:h-[min(560px,64vh)]" />
          <span className="absolute top-3 left-3 bg-white/80 px-2.5 py-1.5 text-[9.5px] font-medium tracking-[0.18em] uppercase backdrop-blur">
            Your photo
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <p className="truncate text-[12px] text-muted">{photo.file.name}</p>
          <div className="flex shrink-0 gap-5">
            <button type="button" onClick={() => inputRef.current?.click()} className="link-underline text-[11px] font-semibold tracking-[0.16em] uppercase">
              Change Photo
            </button>
            <button type="button" onClick={() => onChange(null)} className="link-underline text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
              Remove
            </button>
          </div>
        </div>
        {read.kind === "reading" && (
          <p role="status" className="mt-3 text-[12.5px] text-muted">
            Preparing new photo… {Math.round(read.progress)}%
          </p>
        )}
        {read.kind === "error" && (
          <p role="alert" className="animate-fade-in mt-3 border-l-2 border-ink pl-3 text-[13px] leading-snug text-ink">
            {read.message}
          </p>
        )}
      </div>
    );
  }

  /* ---------- Drop zone ---------- */
  return (
    <div>
      {inputs}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative flex aspect-[4/5] w-full flex-col items-center justify-center overflow-hidden border px-6 text-center transition-colors duration-500 sm:aspect-[4/3] lg:aspect-auto lg:h-[min(560px,64vh)] ${
          dragging ? "border-ink bg-accent/40" : "border-dashed border-ink/25 bg-surface"
        }`}
      >
        {read.kind === "reading" ? (
          <div className="w-full max-w-xs" role="status" aria-live="polite">
            <p className="eyebrow text-muted">Preparing your photo</p>
            <p className="display mt-3 text-5xl">{Math.round(read.progress)}%</p>
            <div className="mt-6 h-px w-full bg-line">
              <div className="h-px bg-ink transition-[width] duration-300" style={{ width: `${read.progress}%` }} />
            </div>
            <p className="mt-3 truncate text-[12px] text-muted">{read.name}</p>
          </div>
        ) : (
          <>
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden className="text-ink/70">
              <rect x="0.5" y="0.5" width="55" height="55" stroke="currentColor" strokeOpacity="0.25" />
              <circle cx="28" cy="20" r="6" stroke="currentColor" />
              <path d="M16 44c1.5-7.5 6.5-12 12-12s10.5 4.5 12 12" stroke="currentColor" />
            </svg>
            <p className="display mt-6 text-3xl sm:text-4xl">Drop your photo here</p>
            <p className="mt-2 text-[13px] text-muted">JPG, JPEG, PNG or WEBP · up to 12 MB</p>

            <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button type="button" onClick={() => inputRef.current?.click()} className="btn btn-primary">
                Upload Photo
              </button>
              {cameraMode !== "none" && (
                <button type="button" onClick={openCamera} className="btn btn-ghost">
                  Take a Photo
                </button>
              )}
            </div>

            {read.kind === "error" && (
              <p role="alert" className="animate-fade-in mt-6 max-w-sm border-l-2 border-ink pl-3 text-left text-[13px] leading-snug text-ink">
                {read.message}
              </p>
            )}
          </>
        )}
        <span className="pointer-events-none absolute top-0 left-0 h-6 w-6 border-t border-l border-ink" />
        <span className="pointer-events-none absolute top-0 right-0 h-6 w-6 border-t border-r border-ink" />
        <span className="pointer-events-none absolute bottom-0 left-0 h-6 w-6 border-b border-l border-ink" />
        <span className="pointer-events-none absolute right-0 bottom-0 h-6 w-6 border-r border-b border-ink" />
      </div>
    </div>
  );
}

function readWithProgress(file: File, onProgress: (p: number) => void) {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onprogress = (e) => e.lengthComputable && onProgress((e.loaded / e.total) * 100);
    reader.onload = () => {
      onProgress(100);
      resolve();
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

function measure(url: string) {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = url;
  });
}

const noopSubscribe = () => () => {};

/** Phones/tablets use the native camera input; laptops use the webcam where available. */
function detectCamera(): "none" | "native" | "webcam" {
  if (window.matchMedia("(pointer: coarse)").matches) return "native";
  if (navigator.mediaDevices && "getUserMedia" in navigator.mediaDevices) return "webcam";
  return "none";
}
