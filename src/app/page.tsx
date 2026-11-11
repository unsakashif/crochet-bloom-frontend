import { Bestsellers } from "@/components/home/bestsellers";
import { BulkCta } from "@/components/home/bulk-cta";
import { Hero } from "@/components/home/hero";
import { OccasionChips } from "@/components/home/occasion-chips";
import { OfferBlock } from "@/components/home/offer-block";
import { Reviews } from "@/components/home/reviews";
import { StoryBlock } from "@/components/home/story-block";
import { TrustStrip } from "@/components/home/trust-strip";
import { QuoteBanner } from "@/components/visuals/quote-banner";
import { YarnDivider } from "@/components/visuals/yarn-divider";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuoteBanner text="little things create beautiful days ♡" />
      <OccasionChips />
      <YarnDivider />
      <TrustStrip />
      <Bestsellers />
      <YarnDivider />
      <StoryBlock />
      <OfferBlock />
      <Reviews />
      <BulkCta />
    </>
  );
}
