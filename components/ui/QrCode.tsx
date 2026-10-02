"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  /** Path or absolute URL. Paths resolve against the current origin. */
  value: string;
  className?: string;
  dark?: string;
  light?: string;
  label?: string;
};

/** Renders a real, scannable QR code as inline SVG. */
export function QrCode({ value, className = "", dark = "#111111", light = "#00000000", label }: Props) {
  const [svg, setSvg] = useState<string | null>(null);

  useEffect(() => {
    const url = value.startsWith("http") ? value : new URL(value, window.location.origin).toString();
    let active = true;
    QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark, light } })
      .then((s) => active && setSvg(s))
      .catch(() => active && setSvg(null));
    return () => {
      active = false;
    };
  }, [value, dark, light]);

  return (
    <div
      role="img"
      aria-label={label ?? "QR code"}
      className={`aspect-square [&>svg]:h-full [&>svg]:w-full ${className}`}
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}

