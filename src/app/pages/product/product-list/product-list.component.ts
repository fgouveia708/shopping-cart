import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductResponse } from '@services/product/dtos/product.response';
import { ProductService } from '@services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: ProductResponse[] = [];
  heroProducts: ProductResponse[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((c) => {
      this.products = c.filter((c) => !c.hero);
      this.heroProducts = c.filter((c) => c.hero);
    });
  }

  buy(index: number) {
    this.router.navigate(['/product/detail/' + index]);
  }
}
