import { Component, OnInit } from '@angular/core';
import { CartService } from '@services/cart/cart.service';
import { CartRequest } from '@services/cart/dtos/cart.request';
import { Product } from '@services/product/dtos/product.response';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart!: CartRequest | null;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cart = this.getCart();
  }

  getCart() {
    return this.cartService.getCart();
  }

  deleteProduct(item: Product) {
    console.log(1);
    if (this.cart) {
      this.cart.items = this.cart.items.filter((c) => c.product.name !== item.name);
      this.cartService.saveCart(this.cart);
    }
  }
}
