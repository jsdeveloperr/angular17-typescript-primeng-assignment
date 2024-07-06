import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
  selected?: boolean;
}

export interface Cart {
  id: string;
  items: CartItem[];
  total: number;
  shippingFee: number;
}
