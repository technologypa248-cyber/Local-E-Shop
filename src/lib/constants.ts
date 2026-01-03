import { PlaceHolderImages } from './placeholder-images';

const findImage = (id: string) => {
  const image = PlaceHolderImages.find(img => img.id === id);
  return image ? [image.imageUrl] : [];
};

export const INITIAL_CATEGORIES = [
  { name: 'Lifestyle', slug: 'lifestyle' },
  { name: 'Electronics', slug: 'electronics' },
  { name: 'Food & Drink', slug: 'food-drink' },
  { name: 'Apparel', slug: 'apparel' },
  { name: 'Wellness', slug: 'wellness' },
];

export const INITIAL_PRODUCTS = [
  {
    title: 'Vintage Leather Journal',
    description: 'A beautifully crafted vintage leather journal for your thoughts and sketches. Made with genuine leather and high-quality paper.',
    price: 29.99,
    categorySlug: 'lifestyle',
    images: findImage('vintage-journal'),
    stock: 50,
  },
  {
    title: 'Artisan Coffee Beans',
    description: 'A 12oz bag of single-origin, medium-roast artisan coffee beans. Features notes of chocolate and citrus.',
    price: 18.50,
    categorySlug: 'food-drink',
    images: findImage('artisan-coffee'),
    stock: 100,
  },
  {
    title: 'Handwoven Scarf',
    description: 'A soft and warm handwoven scarf made from a blend of merino wool and silk. Perfect for chilly days.',
    price: 45.00,
    categorySlug: 'apparel',
    images: findImage('handwoven-scarf'),
    stock: 30,
  },
  {
    title: 'Minimalist Desk Lamp',
    description: 'A sleek and modern LED desk lamp with adjustable brightness. Provides a clean, minimalist aesthetic to your workspace.',
    price: 75.00,
    categorySlug: 'electronics',
    images: findImage('desk-lamp'),
    stock: 40,
  },
  {
    title: 'Smart Water Bottle',
    description: 'Stay hydrated with this smart water bottle that glows to remind you to drink. Syncs with an app to track your intake.',
    price: 59.95,
    categorySlug: 'wellness',
    images: findImage('smart-bottle'),
    stock: 60,
  },
  {
    title: 'Gourmet Chocolate Box',
    description: 'An exquisite selection of 12 gourmet chocolates, featuring a variety of unique flavors from around the world.',
    price: 35.00,
    categorySlug: 'food-drink',
    images: findImage('gourmet-chocolate'),
    stock: 80,
  },
  {
    title: 'Wireless Earbuds',
    description: 'High-fidelity wireless earbuds with active noise cancellation and a 24-hour battery life charging case.',
    price: 129.99,
    categorySlug: 'electronics',
    images: findImage('wireless-earbuds'),
    stock: 75,
  },
  {
    title: 'Eco-Friendly Yoga Mat',
    description: 'A durable, non-slip yoga mat made from eco-friendly and sustainable materials. Perfect for your daily practice.',
    price: 65.00,
    categorySlug: 'wellness',
    images: findImage('yoga-mat'),
    stock: 90,
  },
];
