export type FulfilmentMode = "made_to_order" | "in_stock";

export type Occasion = {
  slug: string;
  label: string;
  blurb: string;
  /** Product image used on home occasion tiles */
  imageUrl: string;
};

export type Category = {
  slug: string;
  label: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  occasions: string[];
  pricePkr: number;
  compareAtPkr?: number;
  colours: string[];
  fulfilment: FulfilmentMode;
  leadTimeDaysMin: number;
  leadTimeDaysMax: number;
  material: string;
  care: string;
  colourAccent: string;
  imageUrl: string;
  bestseller?: boolean;
  isNew?: boolean;
  description: string;
};

export const CATEGORIES: Category[] = [
  { slug: "phone-cases", label: "Phone cases" },
  { slug: "bags", label: "Bags" },
  { slug: "hair", label: "Hair accessories" },
  { slug: "jewelry", label: "Jewelry" },
  { slug: "cardigans", label: "Cardigans" },
  { slug: "gloves", label: "Gloves" },
  { slug: "bridal", label: "Bridal" },
  { slug: "amigurumi", label: "Amigurumi" },
  { slug: "keychains", label: "Keychains" },
  { slug: "home", label: "Home & vanity" },
];

export const OCCASIONS: Occasion[] = [
  {
    slug: "phone-covers",
    label: "Phone covers",
    blurb: "Soft crochet cases with bows, roses, and custom names.",
    imageUrl: "/products/phone-case-pink-scallop.jpg",
  },
  {
    slug: "garden-party",
    label: "Garden party",
    blurb: "Hair vines, tulip bracelets, daisy bags, and floral bandanas.",
    imageUrl: "/products/hair-vine-pink.jpg",
  },
  {
    slug: "cozy-cardigans",
    label: "Cozy cardigans",
    blurb: "Chunky crochet knits with floral and bow appliqués.",
    imageUrl: "/products/cardigan-floral.jpg",
  },
  {
    slug: "valentines-coquette",
    label: "Valentine's coquette",
    blurb: "Red bows, burgundy trims, and heart-ready gifts.",
    imageUrl: "/products/cardigan-red-bows.jpg",
  },
  {
    slug: "bridal-mehndi",
    label: "Bridal & mehndi",
    blurb: "Pearl crochet gajra for bridal and festive looks.",
    imageUrl: "/products/gajra-pearl.jpg",
  },
  {
    slug: "soft-everyday",
    label: "Soft everyday",
    blurb: "Cute bags, gloves, plushies, and vanity pieces for daily joy.",
    imageUrl: "/products/bag-cream-bow.jpg",
  },
];

export const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Other",
] as const;

/** Owner product photos — local files in /public/products */
export const PRODUCTS: Product[] = [
  {
    id: "p1",
    slug: "pink-scallop-phone-case",
    name: "Pink scallop phone case",
    category: "phone-cases",
    occasions: ["phone-covers", "soft-everyday"],
    pricePkr: 1800,
    colours: ["Pastel pink", "Cream trim"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 5,
    leadTimeDaysMax: 10,
    material: "Cotton blend yarn",
    care: "Spot clean only. Remove phone before washing hands nearby.",
    colourAccent: "#e8a0b0",
    imageUrl: "/products/phone-case-pink-scallop.jpg",
    bestseller: true,
    isNew: true,
    description: "Handmade crochet phone case with pink body and creamy scalloped edge.",
  },
  {
    id: "p2",
    slug: "statement-phone-case-set",
    name: "Statement phone case styles",
    category: "phone-cases",
    occasions: ["phone-covers", "soft-everyday"],
    pricePkr: 2200,
    colours: ["Cream rose", "Butterfly brown", "Cocoa bow", "Black custom"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 7,
    leadTimeDaysMax: 12,
    material: "Cotton yarn, 3D appliqué",
    care: "Spot clean. Custom name embroidery available on request.",
    colourAccent: "#8b4513",
    imageUrl: "/products/phone-cases-set.jpg",
    bestseller: true,
    isNew: true,
    description:
      "Choose rose, butterfly, oversized bow, or personalized name embroidery (like Alisha).",
  },
  {
    id: "p3",
    slug: "dusty-pink-hair-vine",
    name: "Dusty pink hair vine",
    category: "hair",
    occasions: ["garden-party", "bridal-mehndi"],
    pricePkr: 1600,
    colours: ["Dusty pink", "Sage green"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 5,
    leadTimeDaysMax: 9,
    material: "Fine cotton / lace-weight yarn",
    care: "Store flat. Avoid crushing the tiny flowers.",
    colourAccent: "#c4788a",
    imageUrl: "/products/hair-vine-pink.jpg",
    bestseller: true,
    description: "Delicate crochet floral vine crown with trailing green tendrils.",
  },
  {
    id: "p4",
    slug: "tulip-bracelet",
    name: "Tulip bracelet",
    category: "jewelry",
    occasions: ["garden-party", "soft-everyday"],
    pricePkr: 950,
    colours: ["Pastel pink", "Cream", "Leaf green"],
    fulfilment: "in_stock",
    leadTimeDaysMin: 2,
    leadTimeDaysMax: 4,
    material: "Fine crochet thread",
    care: "Keep dry. Wipe gently.",
    colourAccent: "#f2c4c8",
    imageUrl: "/products/bracelet-tulip.jpg",
    isNew: true,
    description: "Tiny crochet tulips on a soft white chain — garden-party jewelry.",
  },
  {
    id: "p5",
    slug: "floral-balloon-cardigan",
    name: "Floral balloon cardigan",
    category: "cardigans",
    occasions: ["cozy-cardigans", "garden-party"],
    pricePkr: 6500,
    compareAtPkr: 7200,
    colours: ["Cream", "Dusty pink flowers"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 12,
    leadTimeDaysMax: 18,
    material: "Chunky acrylic / cotton blend",
    care: "Hand wash cold. Lay flat to dry.",
    colourAccent: "#f5efe6",
    imageUrl: "/products/cardigan-floral.jpg",
    bestseller: true,
    isNew: true,
    description: "Oversized cream cardigan with 3D dusty-pink crochet flowers and lantern sleeves.",
  },
  {
    id: "p6",
    slug: "red-bow-cardigan",
    name: "Red bow cardigan",
    category: "cardigans",
    occasions: ["valentines-coquette", "cozy-cardigans"],
    pricePkr: 6200,
    colours: ["Cream", "Cherry red"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 12,
    leadTimeDaysMax: 18,
    material: "Chunky knit yarn, velvet-style bows",
    care: "Hand wash cold. Reshape while damp.",
    colourAccent: "#9b1c2e",
    imageUrl: "/products/cardigan-red-bows.jpg",
    bestseller: true,
    description: "Cream V-neck cardigan scattered with bright red bows — Valentine's coquette staple.",
  },
  {
    id: "p7",
    slug: "pastel-bow-cardigan",
    name: "Pastel bow cardigan",
    category: "cardigans",
    occasions: ["cozy-cardigans", "soft-everyday"],
    pricePkr: 6000,
    colours: ["Ivory", "Dusty pink bows"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 12,
    leadTimeDaysMax: 18,
    material: "Chunky crochet yarn",
    care: "Hand wash cold. Lay flat.",
    colourAccent: "#e8c4d0",
    imageUrl: "/products/cardigan-pink-bows.jpg",
    isNew: true,
    description: "Open-front ivory cardigan with soft pastel crochet bows on sleeves and body.",
  },
  {
    id: "p8",
    slug: "daisy-granny-bag",
    name: "Daisy granny baguette bag",
    category: "bags",
    occasions: ["garden-party", "soft-everyday"],
    pricePkr: 3200,
    colours: ["Butter yellow", "White daisy"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 8,
    leadTimeDaysMax: 14,
    material: "Cotton yarn, satin ribbon charm",
    care: "Spot clean. Empty before storing.",
    colourAccent: "#f0d56a",
    imageUrl: "/products/bag-daisy-yellow.jpg",
    bestseller: true,
    isNew: true,
    description: "Sunny yellow granny-square baguette with white daisies and a ribbon charm.",
  },
  {
    id: "p9",
    slug: "cream-bow-mesh-bag",
    name: "Cream bow mesh bag",
    category: "bags",
    occasions: ["soft-everyday", "garden-party"],
    pricePkr: 2800,
    colours: ["Cream", "Soft pink bow"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 7,
    leadTimeDaysMax: 12,
    material: "Cotton filet crochet",
    care: "Spot clean. Do not wring.",
    colourAccent: "#f7e9ee",
    imageUrl: "/products/bag-cream-bow.jpg",
    bestseller: true,
    description: "Airy cream mesh shoulder bag with a two-tone pink-and-cream crochet bow.",
  },
  {
    id: "p10",
    slug: "purple-meadow-bandana",
    name: "Purple meadow bandana",
    category: "hair",
    occasions: ["garden-party"],
    pricePkr: 1400,
    colours: ["Cream", "Sage", "Lavender"],
    fulfilment: "in_stock",
    leadTimeDaysMin: 2,
    leadTimeDaysMax: 5,
    material: "Cotton yarn",
    care: "Hand wash cold. Reshape to dry.",
    colourAccent: "#9b7bb8",
    imageUrl: "/products/bandana-purple-flowers.jpg",
    description: "Triangular crochet kerchief with sage stems and purple flower fringe.",
  },
  {
    id: "p11",
    slug: "yellow-daisy-bandana",
    name: "Yellow daisy bandana",
    category: "hair",
    occasions: ["garden-party", "soft-everyday"],
    pricePkr: 1400,
    colours: ["Butter yellow", "White daisy"],
    fulfilment: "in_stock",
    leadTimeDaysMin: 2,
    leadTimeDaysMax: 5,
    material: "Cotton yarn",
    care: "Hand wash cold.",
    colourAccent: "#f2d56b",
    imageUrl: "/products/bandana-yellow-daisy.jpg",
    isNew: true,
    description: "Buttery yellow granny-stitch bandana with dangling daisy charms.",
  },
  {
    id: "p12",
    slug: "pink-blossom-bandana",
    name: "Pink blossom bandana",
    category: "hair",
    occasions: ["garden-party", "soft-everyday"],
    pricePkr: 1450,
    colours: ["Cream", "Soft pink", "Sage"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 5,
    leadTimeDaysMax: 9,
    material: "Cotton yarn",
    care: "Hand wash cold. Air dry.",
    colourAccent: "#e6a0b4",
    imageUrl: "/products/bandana-pink-flowers.jpg",
    description: "Cream mesh bandana with pink crochet blossoms and leafy fringe.",
  },
  {
    id: "p13",
    slug: "pink-bow-fingerless-gloves",
    name: "Pink bow fingerless gloves",
    category: "gloves",
    occasions: ["soft-everyday", "valentines-coquette"],
    pricePkr: 1700,
    colours: ["Cream", "Light pink"],
    fulfilment: "in_stock",
    leadTimeDaysMin: 2,
    leadTimeDaysMax: 5,
    material: "Soft acrylic yarn",
    care: "Hand wash. Lay flat.",
    colourAccent: "#f0b8c8",
    imageUrl: "/products/gloves-pink-bow.jpg",
    bestseller: true,
    description: "Cream fingerless gloves with scalloped pink trim and oversized wrist bows.",
  },
  {
    id: "p14",
    slug: "burgundy-cozy-gloves",
    name: "Burgundy cozy gloves",
    category: "gloves",
    occasions: ["valentines-coquette", "soft-everyday"],
    pricePkr: 1750,
    colours: ["Cream", "Burgundy"],
    fulfilment: "in_stock",
    leadTimeDaysMin: 2,
    leadTimeDaysMax: 5,
    material: "Soft acrylic yarn",
    care: "Hand wash. Lay flat.",
    colourAccent: "#7a1f32",
    imageUrl: "/products/gloves-burgundy.jpg",
    isNew: true,
    description: "Cream fingerless gloves with burgundy scallop trim and tiny bows.",
  },
  {
    id: "p15",
    slug: "pearl-crochet-gajra",
    name: "Pearl crochet gajra",
    category: "bridal",
    occasions: ["bridal-mehndi"],
    pricePkr: 2800,
    compareAtPkr: 3200,
    colours: ["Maroon", "Ivory"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 7,
    leadTimeDaysMax: 12,
    material: "Cotton thread, pearl beads",
    care: "Store flat in a box. Avoid crushing flowers.",
    colourAccent: "#6b1c2a",
    imageUrl: "/products/gajra-pearl.jpg",
    bestseller: true,
    isNew: true,
    description: "Circular maroon-and-ivory crochet gajra with pearl centres for mehndi and walima.",
  },
  {
    id: "p16",
    slug: "vanity-mirror-organizer",
    name: "Vanity mirror organizer",
    category: "home",
    occasions: ["soft-everyday"],
    pricePkr: 4500,
    colours: ["Dusty pink", "Cream"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 10,
    leadTimeDaysMax: 16,
    material: "Cotton yarn, oval mirror, pearl accents",
    care: "Dust gently. Wipe mirror with soft cloth.",
    colourAccent: "#d4a0b0",
    imageUrl: "/products/vanity-mirror-organizer.jpg",
    isNew: true,
    description: "Wall-mounted crochet mirror with pink flower trim and three makeup pockets.",
  },
  {
    id: "p17",
    slug: "hello-kitty-keychain",
    name: "Hello Kitty keychain",
    category: "keychains",
    occasions: ["soft-everyday"],
    pricePkr: 850,
    colours: ["White", "Pink"],
    fulfilment: "in_stock",
    leadTimeDaysMin: 1,
    leadTimeDaysMax: 3,
    material: "Acrylic yarn, metal clasp",
    care: "Spot clean.",
    colourAccent: "#f4a0b8",
    imageUrl: "/products/keychain-hello-kitty.jpg",
    description: "Cute white-and-pink crochet character keychain with metal clasp.",
  },
  {
    id: "p18",
    slug: "sunhat-duckling",
    name: "Sunhat duckling",
    category: "amigurumi",
    occasions: ["soft-everyday", "garden-party"],
    pricePkr: 1900,
    colours: ["Butter yellow", "Tan hat"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 5,
    leadTimeDaysMax: 10,
    material: "Soft acrylic yarn, safety eyes",
    care: "Spot clean. Not for unsupervised under-3 play.",
    colourAccent: "#f0d56a",
    imageUrl: "/products/amigurumi-duckling.jpg",
    isNew: true,
    description: "Round yellow crochet duckling with a little sun hat — nursery-gift favourite.",
  },
  {
    id: "p19",
    slug: "heart-bunny-plush",
    name: "Heart bunny plush",
    category: "amigurumi",
    occasions: ["soft-everyday", "valentines-coquette"],
    pricePkr: 2100,
    colours: ["Cream", "Pink bows"],
    fulfilment: "made_to_order",
    leadTimeDaysMin: 6,
    leadTimeDaysMax: 11,
    material: "Soft acrylic yarn, safety eyes",
    care: "Spot clean.",
    colourAccent: "#f2c0cc",
    imageUrl: "/products/amigurumi-bunny-heart.jpg",
    bestseller: true,
    description: "Cream crochet bunny with pink ear bows, holding a tiny pink heart.",
  },
];

export const DEMO_ORDER = {
  orderNumber: "CB-DEMO-1001",
  phone: "03001234567",
  phoneNormalized: "+923001234567",
  promisedDateLabel: "18 Nov 2026",
  status: "in_production" as const,
  events: [
    { key: "placed", label: "Order placed", at: "8 Nov 2026 · 3:10 PM", done: true },
    { key: "confirmed", label: "Confirmed by WhatsApp", at: "8 Nov 2026 · 5:40 PM", done: true },
    { key: "production", label: "In production", at: "9 Nov 2026 · 11:00 AM", done: true },
    { key: "quality", label: "Quality check", at: null, done: false },
    { key: "shipped", label: "Shipped", at: null, done: false },
    { key: "delivered", label: "Delivered", at: null, done: false },
  ],
};

export function leadTimeLabel(product: Product): string {
  if (product.fulfilment === "in_stock") {
    return `In stock · ships in ${product.leadTimeDaysMin}–${product.leadTimeDaysMax} days`;
  }
  return `Made to order · ships in ${product.leadTimeDaysMin}–${product.leadTimeDaysMax} days`;
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function listOccasions(): Occasion[] {
  return OCCASIONS;
}

export function getOccasion(slug: string): Occasion | undefined {
  return OCCASIONS.find((o) => o.slug === slug);
}

export type ProductFilters = {
  category?: string;
  occasion?: string;
  fulfilment?: FulfilmentMode | "any";
  colour?: string;
  minPrice?: number;
  maxPrice?: number;
  q?: string;
  sort?: "bestselling" | "newest" | "price_asc" | "price_desc";
};

export function listNewArrivals(): Product[] {
  const news = PRODUCTS.filter((p) => p.isNew);
  return news.length > 0 ? news : PRODUCTS.filter((p) => p.bestseller);
}

export function listProducts(filters: ProductFilters = {}): Product[] {
  let items = [...PRODUCTS];

  if (filters.category) {
    items = items.filter((p) => p.category === filters.category);
  }
  if (filters.occasion) {
    items = items.filter((p) => p.occasions.includes(filters.occasion!));
  }
  if (filters.fulfilment && filters.fulfilment !== "any") {
    items = items.filter((p) => p.fulfilment === filters.fulfilment);
  }
  if (filters.colour) {
    const c = filters.colour.toLowerCase();
    items = items.filter((p) => p.colours.some((x) => x.toLowerCase().includes(c)));
  }
  if (filters.minPrice != null) {
    items = items.filter((p) => p.pricePkr >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    items = items.filter((p) => p.pricePkr <= filters.maxPrice!);
  }
  if (filters.q?.trim()) {
    const q = filters.q.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.includes(q),
    );
  }

  switch (filters.sort) {
    case "price_asc":
      items.sort((a, b) => a.pricePkr - b.pricePkr);
      break;
    case "price_desc":
      items.sort((a, b) => b.pricePkr - a.pricePkr);
      break;
    case "newest":
      items.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew) || a.name.localeCompare(b.name));
      break;
    case "bestselling":
    default:
      items.sort(
        (a, b) => Number(!!b.bestseller) - Number(!!a.bestseller) || a.name.localeCompare(b.name),
      );
      break;
  }

  return items;
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      (p.category === product.category ||
        p.occasions.some((o) => product.occasions.includes(o))),
  ).slice(0, limit);
}

export function normalizePkPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length >= 12) return `+${digits}`;
  if (digits.startsWith("0") && digits.length === 11) return `+92${digits.slice(1)}`;
  if (digits.length === 10) return `+92${digits}`;
  return raw.trim();
}
