import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  quantityItemsCart: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.quantityItemsCart = this.cartService.quantityItems();
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
}
