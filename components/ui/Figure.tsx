/**
 * Minimal editorial figure used in illustrations (hero, phone mockups).
 * When `dressed`, the hero gown is drawn in the same coordinate system.
 */
type Props = {
  dressed?: boolean;
  className?: string;
  tone?: "warm" | "ink";
  id?: string;
};

const BODY =
  "M140 96 L140 108 C126 110 112 114 104 120 C92 128 88 140 90 150 C88 200 86 230 86 250 C84 290 84 310 84 330 C80 345 76 360 82 366 C90 370 96 362 98 330 C100 300 102 270 102 250 C104 210 108 185 110 168 C116 210 124 250 122 268 C112 300 102 320 102 340 C104 390 108 420 108 450 C112 480 118 495 118 505 C114 530 116 545 116 555 C120 580 126 600 128 610 C122 618 112 626 114 630 L142 630 C142 622 140 616 140 610 C138 590 138 570 138 555 C138 535 140 515 140 505 C142 470 144 440 144 420 C146 400 148 380 150 372 C152 380 154 400 156 420 C156 440 158 470 160 505 C160 515 162 535 162 555 C162 570 162 590 160 610 C160 616 158 622 158 630 L186 630 C188 626 178 618 172 610 C174 600 180 580 184 555 C184 545 186 530 182 505 C182 495 188 480 192 450 C192 420 196 390 198 340 C198 320 188 300 178 268 C176 250 184 210 190 168 C192 185 196 210 198 250 C198 270 200 300 202 330 C204 362 210 370 218 366 C224 360 220 345 216 330 C216 310 216 290 214 250 C214 230 212 200 210 150 C212 140 208 128 196 120 C188 114 174 110 160 108 L160 96 Z";

const GOWN =
  "M122 128 L132 124 L150 164 L168 124 L178 128 C184 170 180 220 176 268 C190 360 204 500 214 622 Q150 634 86 622 C96 500 110 360 124 268 C120 220 116 170 122 128 Z";

export function Figure({ dressed = false, className = "", tone = "warm", id = "fig" }: Props) {
  const skin = tone === "warm" ? ["#d9cbb9", "#bba996"] : ["#3a3a3a", "#1c1c1c"];
  return (
    <svg viewBox="0 0 300 640" className={className} aria-hidden>
      <defs>
        <linearGradient id={`${id}-skin`} x1="0" y1="0" x2="1" y2="0.3">
          <stop offset="0" stopColor={skin[0]} />
          <stop offset="1" stopColor={skin[1]} />
        </linearGradient>
        <linearGradient id={`${id}-gown`} x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0" stopColor="#3a3a3e" />
          <stop offset="0.5" stopColor="#1c1c1f" />
          <stop offset="1" stopColor="#0b0b0c" />
        </linearGradient>
      </defs>
      <ellipse cx="150" cy="60" rx="25" ry="32" fill={`url(#${id}-skin)`} />
      <path d={BODY} fill={`url(#${id}-skin)`} />
      {dressed && (
        <g>
          <path d="M133 124 L140 104 M167 124 L160 104" stroke="#151517" strokeWidth="2.2" strokeLinecap="round" />
          <path d={GOWN} fill={`url(#${id}-gown)`} />
          <path d="M150 300 C147 400 140 500 132 626" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" />
          <path d="M196 624 L184 470" stroke="#000" strokeWidth="1.5" />
        </g>
      )}
    </svg>
  );
}
