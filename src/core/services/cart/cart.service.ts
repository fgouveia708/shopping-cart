import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
import { Subject } from 'rxjs';
import { LocalStorageConstant } from '../../constants/local-storage-constant';
import { Cart } from './dtos/cart.request';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private subject = new Subject<Cart>();
  constructor(private localStorageService: LocalStorageService) {}

  saveCart(cart: Cart) {
    this.localStorageService.save(LocalStorageConstant.CART, cart);
    this.subject.next(cart);
  }

  getCart(): Cart | null {
    return this.localStorageService.get<Cart>(LocalStorageConstant.CART);
  }

  cleanCart() {
    this.localStorageService.removeItem(LocalStorageConstant.CART);
  }

  quantityItems(): number {
    const cart = this.getCart();
    return cart ? cart.items.length : 0;
  }

  getObservable() {
    return this.subject.asObservable();
  }
}
