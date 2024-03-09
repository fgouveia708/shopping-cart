import { Product } from '@services/product/dtos/product.response';

export interface CartRequest {
  createdAt: Date;
  total: number;
  items: ItemRequest[];
}

interface ItemRequest {
  product: Product;
  quantity: number;
}
