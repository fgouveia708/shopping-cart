import { Product } from '@services/product/dtos/product.response';

export interface Cart {
  createdAt: Date;
  total: number;
  items: ItemRequest[];
}

interface ItemRequest {
  product: Product;
  quantity: number;
}
