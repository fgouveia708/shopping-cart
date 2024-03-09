import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '@services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  quantityItemsCart: number = 0;
  subscription!: Subscription;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.quantityItemsCart = this.cartService.quantityItems();

    this.subscription = this.cartService.getObservable().subscribe((c) => {
      this.quantityItemsCart = c ? c.items.length : 0;
    });

    this.cartService.getObservable();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  openCart() {
    this.router.navigate(['/cart']);
  }
}
