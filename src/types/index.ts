export interface Product {
  id: string;
  name: string;
  slug: string;
  category: 'RO' | 'Geyser' | 'Solar' | 'Tabletop Filters' | 'Dispensers' | 'Softeners';
  price: number;
  originalPrice: number;
  tags: string[];
  image: string;
  images?: string[];
  description: string;
  features: string[];
  warranty: string;
}

export type Category = 'All' | 'RO' | 'Geyser' | 'Solar' | 'Tabletop Filters' | 'Dispensers' | 'Softeners';

export interface FilterState {
  category: Category;
  minPrice: number;
  maxPrice: number;
  tags: string[];
  search: string;
  sort: 'default' | 'price-asc' | 'price-desc';
}
