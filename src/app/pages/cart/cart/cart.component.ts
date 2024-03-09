import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart/cart.service';
import { Cart } from '@services/cart/dtos/cart.request';
import { Product } from '@services/product/dtos/product.response';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  cart!: Cart | null;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.cart = this.getCart();
  }

  getCart() {
    return this.cartService.getCart();
  }

  deleteProduct(item: Product) {
    if (this.cart) {
      this.cart.items = this.cart.items.filter((c) => c.product.name !== item.name);
      this.cartService.saveCart(this.cart);
    }
  }

  clearCart() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Would you like to delete your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your cart has been deleted.',
          icon: 'success',
          timer: 2000,
        });

        this.clearAndRedirect();
      }
    });
  }

  closeCart() {
    //TODO: Call authentication flow or Checkout API

    this.success();
    this.clearAndRedirect();
  }

  private clearAndRedirect() {
    this.cartService.cleanCart();
    this.router.navigate(['/product']);
  }

  private success() {
    Swal.fire({
      title: 'Okay, now this product is yours and will soon be in your home.',
      icon: 'success',
      showConfirmButton: false,
      timer: 5000,
    });
  }
}
