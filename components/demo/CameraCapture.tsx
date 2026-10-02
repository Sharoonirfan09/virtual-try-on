"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  onCapture: (file: File) => void;
  onClose: () => void;
};

/** Desktop/laptop webcam capture. Mobile devices use the native camera input instead. */
export function CameraCapture({ onCapture, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1600 } }, audio: false })
      .then((stream) => {
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
      })
      .catch(() => setError("Camera access isn't available. You can upload a photo instead."));

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      cancelled = true;
      window.removeEventListener("keydown", onKey);
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [onClose]);

  function capture() {
    const video = videoRef.current;
    if (!video || !video.videoWidth) return;
    // Crop to a 3:4 portrait frame, mirrored to match the preview.
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    const targetRatio = 3 / 4;
    const cw = Math.min(vw, vh * targetRatio);
    const ch = cw / targetRatio;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(cw);
    canvas.height = Math.round(ch);
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, (vw - cw) / 2, (vh - ch) / 2, cw, ch, 0, 0, cw, ch);
    canvas.toBlob(
      (blob) => blob && onCapture(new File([blob], `camera-${Date.now()}.jpg`, { type: "image/jpeg" })),
      "image/jpeg",
      0.92,
    );
  }

  return (
    <div className="animate-fade-in fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" role="dialog" aria-modal aria-label="Take a photo">
      <div className="w-full max-w-md bg-bg p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="eyebrow">Take a photo</p>
          <button type="button" onClick={onClose} className="text-[11px] font-semibold tracking-[0.16em] uppercase">
            Close
          </button>
        </div>
        <div className="relative mt-4 aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a]">
          {error ? (
            <p className="absolute inset-0 flex items-center justify-center p-8 text-center text-[14px] text-white/80">{error}</p>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                onLoadedData={() => setReady(true)}
                className="h-full w-full -scale-x-100 object-cover"
              />
              <div className="pointer-events-none absolute inset-6 border border-white/30" />
              <p className="absolute right-0 bottom-3 left-0 text-center text-[11px] tracking-[0.14em] text-white/70 uppercase">
                Step back · face forward
              </p>
            </>
          )}
        </div>
        <button type="button" onClick={capture} disabled={!ready || !!error} className="btn btn-primary mt-4 w-full">
          Capture
        </button>
      </div>
    </div>
  );
}
