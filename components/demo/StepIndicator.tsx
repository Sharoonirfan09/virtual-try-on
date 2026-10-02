import type { DemoStep } from "./useTryOnDemo";

const STEPS: { id: DemoStep; label: string }[] = [
  { id: "select", label: "Select" },
  { id: "upload", label: "Upload" },
  { id: "generate", label: "Generate" },
  { id: "result", label: "Result" },
];

export function StepIndicator({ current }: { current: DemoStep }) {
  const currentIndex = STEPS.findIndex((s) => s.id === current);
  return (
    <ol className="grid grid-cols-4 gap-2 sm:gap-4" aria-label="Try-on progress">
      {STEPS.map((step, i) => {
        const state = i < currentIndex ? "done" : i === currentIndex ? "current" : "todo";
        return (
          <li key={step.id} aria-current={state === "current" ? "step" : undefined} className="relative pt-4">
            <span className="absolute top-0 left-0 h-px w-full bg-line" />
            <span
              className="absolute top-0 left-0 h-[2px] w-full origin-left bg-ink transition-transform duration-700 ease-[var(--ease-editorial)]"
              style={{ transform: `scaleX(${state === "todo" ? 0 : 1})` }}
            />
            <span
              className={`flex flex-col gap-1 transition-colors duration-500 sm:flex-row sm:items-baseline sm:gap-3 ${
                state === "todo" ? "text-ink/30" : "text-ink"
              }`}
            >
              <span className="display text-xl sm:text-2xl">{String(i + 1).padStart(2, "0")}</span>
              <span className="eyebrow !text-[9.5px] sm:!text-[11px]">{step.label}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
}
