// Mysticloak - Product Data
// Replace placeholder data with your real products and Stripe Price IDs

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'cloaks', name: 'Cloaks' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'art', name: 'Art' }
];

const PRODUCTS = [
  {
    id: 1,
    slug: 'midnight-velvet-cloak',
    name: 'Midnight Velvet Cloak',
    description: 'A luxurious velvet cloak in deep midnight blue, lined with shimmering silver fabric. Hand-stitched with care, this cloak drapes beautifully and fastens with an ornate silver clasp. Perfect for rituals, renaissance fairs, or simply feeling magical on an ordinary day.',
    shortDescription: 'Luxurious midnight blue velvet cloak with silver lining',
    price: 185.00,
    images: [
      'images/products/midnight-velvet-cloak/main.jpg',
      'images/products/midnight-velvet-cloak/detail.jpg',
      'images/products/midnight-velvet-cloak/worn.jpg'
    ],
    category: 'cloaks',
    stripePriceId: 'price_REPLACE_WITH_REAL_ID',
    inStock: true,
    featured: true,
    materials: 'Velvet, silver satin lining, metal clasp'
  },
  {
    id: 2,
    slug: 'amethyst-pendant',
    name: 'Amethyst Moon Pendant',
    description: 'A hand-wrapped amethyst crystal set in an oxidized copper wire crescent moon. Each pendant is one of a kind, shaped by intuition and finished with a matching chain. Amethyst is known for its calming and intuitive properties.',
    shortDescription: 'Hand-wrapped amethyst crystal in copper crescent moon',
    price: 45.00,
    images: [
      'images/products/amethyst-pendant/main.jpg',
      'images/products/amethyst-pendant/detail.jpg'
    ],
    category: 'jewelry',
    stripePriceId: 'price_REPLACE_WITH_REAL_ID',
    inStock: true,
    featured: true,
    materials: 'Natural amethyst, oxidized copper wire, chain'
  },
  {
    id: 3,
    slug: 'enchanted-herb-bundle',
    name: 'Enchanted Herb Bundle',
    description: 'A carefully curated bundle of dried herbs and flowers, tied with gold ribbon and sealed with intention. Includes lavender, rosemary, mugwort, and rose petals. Use for smudging, altar decoration, or simply enjoying the aroma.',
    shortDescription: 'Curated dried herb bundle with lavender, rosemary & mugwort',
    price: 22.00,
    images: [
      'images/products/enchanted-herb-bundle/main.jpg'
    ],
    category: 'accessories',
    stripePriceId: 'price_REPLACE_WITH_REAL_ID',
    inStock: true,
    featured: false,
    materials: 'Dried lavender, rosemary, mugwort, rose petals, gold ribbon'
  },
  {
    id: 4,
    slug: 'sapphire-ring-set',
    name: 'Sapphire Stacking Ring Set',
    description: 'A set of three delicate stacking rings in mixed metals: gold, silver, and rose gold. The center ring features a tiny faceted sapphire. Wear together for maximum sparkle or separately for everyday enchantment.',
    shortDescription: 'Three mixed-metal stacking rings with sapphire accent',
    price: 68.00,
    images: [
      'images/products/sapphire-ring-set/main.jpg',
      'images/products/sapphire-ring-set/detail.jpg'
    ],
    category: 'jewelry',
    stripePriceId: 'price_REPLACE_WITH_REAL_ID',
    inStock: true,
    featured: true,
    materials: 'Gold-plated brass, sterling silver, rose gold-plated brass, sapphire'
  },
  {
    id: 5,
    slug: 'forest-spirit-print',
    name: 'Forest Spirit Art Print',
    description: 'A high-quality giclée print of an original painting depicting a luminous forest spirit emerging from ancient trees. Printed on archival matte paper with vivid, lasting colors. Available unframed.',
    shortDescription: 'Giclée art print of a luminous forest spirit painting',
    price: 35.00,
    images: [
      'images/products/forest-spirit-print/main.jpg'
    ],
    category: 'art',
    stripePriceId: 'price_REPLACE_WITH_REAL_ID',
    inStock: true,
    featured: false,
    materials: 'Archival matte paper, giclée ink'
  }
];

// Helper functions
function getProductBySlug(slug) {
  return PRODUCTS.find(p => p.slug === slug) || null;
}

function getProductsByCategory(categoryId) {
  if (categoryId === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === categoryId);
}

function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured);
}

function formatPrice(price) {
  return '$' + price.toFixed(2);
}
