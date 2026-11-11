/**
 * Page backgrounds from owner-provided crochet mood art.
 * Home uses the earlier craft mood image; other pages use the Nov 10 set.
 * Section craft/studio are the Nov 10 evening set for hero + mid-page bands.
 */
export const BRAND_BACKGROUNDS = {
  home: "/brand/bg-section-craft.jpg",
  shop: "/brand/bg-shop.jpg",
  collection: "/brand/bg-collection.jpg",
  newArrivals: "/brand/bg-new-arrivals.jpg",
  story: "/brand/bg-story.jpg",
  craftMood: "/brand/craft-mood.jpg",
  /** Lifestyle photo — hero, bestsellers, reviews */
  sectionCraft: "/brand/bg-section-craft.jpg",
  /** Studio illustration — footer, shipping ladder */
  sectionStudio: "/brand/bg-section-studio.jpg",
} as const;

export type BrandBackgroundKey = keyof typeof BRAND_BACKGROUNDS;
