import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { LocalStorageConstant } from '../../constants/local-storage-constant';
import { CartRequest } from './dtos/cart.request';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private localStorageService: LocalStorageService) {}

  saveCart(cart: CartRequest) {
    this.localStorageService.save(LocalStorageConstant.CART, cart);
  }

  getCart(): CartRequest | null {
    return this.localStorageService.get<CartRequest>(LocalStorageConstant.CART);
  }

  cleanCart() {
    this.localStorageService.removeItem(LocalStorageConstant.CART);
  }

  quantityItems(): number {
    const cart = this.localStorageService.get<CartRequest>(LocalStorageConstant.CART);
    return cart ? cart.items.length : 0;
  }
}
