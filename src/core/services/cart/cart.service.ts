import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { LocalStorageConstant } from '../../constants/local-storage-constant';
import { CartRequest } from './dtos/cart.request';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private localStorageService: LocalStorageService) {}

  public saveCart(cart: CartRequest) {
    this.localStorageService.save(LocalStorageConstant.CART, cart);
  }

  public getCart(): CartRequest | null {
    return this.localStorageService.get(LocalStorageConstant.CART);
  }

  public cleanCart() {
    this.localStorageService.removeItem(LocalStorageConstant.CART);
  }
}
