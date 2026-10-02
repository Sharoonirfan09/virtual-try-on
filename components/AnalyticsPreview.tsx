import { AnalyticsPanel } from "./brand/AnalyticsPanel";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function AnalyticsPreview() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <SectionHeading
          eyebrow="Analytics"
          title={
            <>
              See what shoppers
              <br />
              <em className="normal-case italic">want to try.</em>
            </>
          }
          intro="From the first scan to the product click — understand which garments draw attention and how shoppers move through the experience."
        />
        <Reveal className="mt-12 bg-bg">
          <AnalyticsPanel />
        </Reveal>
      </div>
    </section>
  );
}
