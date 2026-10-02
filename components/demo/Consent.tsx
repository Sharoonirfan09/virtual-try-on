type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Consent({ checked, onChange }: Props) {
  return (
    <div className="border-t border-line pt-6">
      <label className="group flex cursor-pointer items-start gap-4">
        <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span
          aria-hidden
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-colors duration-300 peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink ${
            checked ? "border-ink bg-ink text-bg" : "border-ink/40 bg-surface group-hover:border-ink"
          }`}
        >
          {checked && (
            <svg width="11" height="11" viewBox="0 0 10 10">
              <path d="M1.5 5.2 4 7.5 8.5 2.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </span>
        <span className="text-[14px] leading-snug text-ink">
          I agree to my image being processed to generate this virtual try-on preview.
        </span>
      </label>
      <p className="mt-3 pl-9 text-[12px] leading-relaxed text-muted">
        Your image is used to create your virtual try-on preview and should be handled according to the platform&apos;s
        approved privacy and retention policy.
      </p>
    </div>
  );
}
