import { ProductResponse } from '@services/product/dtos/product.response';

export interface CartRequest {
  createdAt: Date;
  total: number;
  items: ItemRequest[];
}

interface ItemRequest {
  product: ProductResponse;
  quantity: number;
}
