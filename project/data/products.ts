import { Product, Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat1',
    name: 'New Arrivals',
    image: 'https://images.pexels.com/photos/6626903/pexels-photo-6626903.jpeg',
    description: 'Check out our latest items just in'
  },
  {
    id: 'cat2',
    name: 'Tops',
    image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg',
    description: 'T-shirts, blouses, sweaters, and more'
  },
  {
    id: 'cat3',
    name: 'Bottoms',
    image: 'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg',
    description: 'Jeans, skirts, shorts, and more'
  },
  {
    id: 'cat4',
    name: 'Dresses',
    image: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
    description: 'Casual and formal dresses for all occasions'
  },
  {
    id: 'cat5',
    name: 'Outerwear',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
    description: 'Jackets, coats, and more for all weather'
  },
  {
    id: 'cat6',
    name: 'Accessories',
    image: 'https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg',
    description: 'Hats, scarves, jewelry, and more'
  }
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Classic Cotton T-Shirt',
    brand: 'Essentials',
    price: 29.99,
    originalPrice: 39.99,
    discount: 25,
    images: [
      'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg',
      'https://images.pexels.com/photos/9594747/pexels-photo-9594747.jpeg',
      'https://images.pexels.com/photos/5698849/pexels-photo-5698849.jpeg'
    ],
    description: 'A comfortable, breathable cotton t-shirt perfect for everyday wear. This versatile piece features a classic cut with a modern fit.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' }
    ],
    categoryId: 'cat2',
    rating: 4.5,
    reviews: 128,
    isFeatured: true,
    isNew: false,
    stock: 50
  },
  {
    id: 'p2',
    name: 'Slim Fit Jeans',
    brand: 'Denim Co.',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    images: [
      'https://images.pexels.com/photos/52518/jeans-pants-blue-shop-52518.jpeg',
      'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg'
    ],
    description: 'These premium slim fit jeans offer both style and comfort. Made from high-quality denim with a touch of stretch for all-day comfort.',
    sizes: ['28', '30', '32', '34', '36'],
    colors: [
      { name: 'Blue', code: '#0F52BA' },
      { name: 'Black', code: '#000000' },
      { name: 'Gray', code: '#808080' }
    ],
    categoryId: 'cat3',
    rating: 4.3,
    reviews: 95,
    isFeatured: true,
    isNew: false,
    stock: 35
  },
  {
    id: 'p3',
    name: 'Floral Summer Dress',
    brand: 'Bloom',
    price: 49.99,
    images: [
      'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
      'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg',
      'https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg'
    ],
    description: 'A light and airy summer dress featuring a beautiful floral pattern. The flowing fabric and flattering cut make it perfect for warm days.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Blue Floral', code: '#5D8AA8' },
      { name: 'Pink Floral', code: '#FF91A4' }
    ],
    categoryId: 'cat4',
    rating: 4.8,
    reviews: 64,
    isFeatured: false,
    isNew: true,
    stock: 20
  },
  {
    id: 'p4',
    name: 'Wool Blend Overcoat',
    brand: 'Urban Style',
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
      'https://images.pexels.com/photos/6311392/pexels-photo-6311392.jpeg'
    ],
    description: 'A sophisticated wool blend overcoat that combines warmth with elegance. The timeless design ensures years of stylish winter wear.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Camel', code: '#C19A6B' },
      { name: 'Black', code: '#000000' },
      { name: 'Navy', code: '#000080' }
    ],
    categoryId: 'cat5',
    rating: 4.7,
    reviews: 42,
    isFeatured: true,
    isNew: false,
    stock: 15
  },
  {
    id: 'p5',
    name: 'Classic Leather Belt',
    brand: 'Heritage',
    price: 35.99,
    images: [
      'https://images.pexels.com/photos/45055/pexels-photo-45055.jpeg',
      'https://images.pexels.com/photos/267301/pexels-photo-267301.jpeg',
      'https://images.pexels.com/photos/8483438/pexels-photo-8483438.jpeg'
    ],
    description: 'A premium quality leather belt with a classic buckle design. Adds the perfect finishing touch to any outfit.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Brown', code: '#964B00' },
      { name: 'Black', code: '#000000' }
    ],
    categoryId: 'cat6',
    rating: 4.6,
    reviews: 78,
    isFeatured: false,
    isNew: false,
    stock: 45
  },
  {
    id: 'p6',
    name: 'Organic Cotton Hoodie',
    brand: 'Eco Apparel',
    price: 65.99,
    images: [
      'https://images.pexels.com/photos/7764771/pexels-photo-7764771.jpeg',
      'https://images.pexels.com/photos/5693889/pexels-photo-5693889.jpeg',
      'https://images.pexels.com/photos/8217036/pexels-photo-8217036.jpeg'
    ],
    description: 'Made from 100% organic cotton, this comfortable hoodie is both eco-friendly and stylish. Features a modern cut with a kangaroo pocket.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Sage Green', code: '#9CAF88' },
      { name: 'Heather Gray', code: '#D3D3D3' },
      { name: 'Natural', code: '#F1E9DC' }
    ],
    categoryId: 'cat2',
    rating: 4.9,
    reviews: 53,
    isFeatured: true,
    isNew: true,
    stock: 30
  },
  {
    id: 'p7',
    name: 'Pleated Midi Skirt',
    brand: 'Modern Essentials',
    price: 55.99,
    originalPrice: 69.99,
    discount: 20,
    images: [
      'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg',
      'https://images.pexels.com/photos/914668/pexels-photo-914668.jpeg',
      'https://images.pexels.com/photos/6823157/pexels-photo-6823157.jpeg'
    ],
    description: 'A versatile pleated midi skirt that transitions easily from work to weekend. The flowing design offers both comfort and elegance.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Beige', code: '#F5F5DC' },
      { name: 'Navy', code: '#000080' }
    ],
    categoryId: 'cat3',
    rating: 4.4,
    reviews: 38,
    isFeatured: false,
    isNew: true,
    stock: 25
  },
  {
    id: 'p8',
    name: 'Cashmere Scarf',
    brand: 'Luxury Lane',
    price: 69.99,
    originalPrice: 89.99,
    discount: 22,
    images: [
      'https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg',
      'https://images.pexels.com/photos/5487587/pexels-photo-5487587.jpeg',
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg'
    ],
    description: 'Luxuriously soft cashmere scarf that adds warmth and sophistication to any winter outfit. The lightweight fabric offers comfort without bulk.',
    sizes: ['One Size'],
    colors: [
      { name: 'Camel', code: '#C19A6B' },
      { name: 'Light Gray', code: '#D3D3D3' },
      { name: 'Burgundy', code: '#800020' }
    ],
    categoryId: 'cat6',
    rating: 4.8,
    reviews: 29,
    isFeatured: true,
    isNew: false,
    stock: 18
  }
];

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured).concat(
    products.filter(product => !product.isFeatured).slice(0, 4)
  );
};

export const getNewArrivals = () => {
  return products.filter(product => product.isNew);
};

export const getProductsByCategory = (categoryId: string) => {
  return products.filter(product => product.categoryId === categoryId);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (product: Product) => {
  return products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);
};