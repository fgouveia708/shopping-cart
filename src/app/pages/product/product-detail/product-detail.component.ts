import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductResponse } from '@services/product/dtos/product.response';
import { ProductService } from '@services/product/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements AfterViewInit {
  product!: ProductResponse;
  isLoading: boolean = true;
  quantity: number = 1;

  constructor(
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.operation();
  }

  operation() {
    const urlParams = this.activeRoute.snapshot.params;
    if (urlParams && urlParams['id']) {
      this.getProduct(urlParams['id']);
    } else {
      this.router.navigate(['/product/list']);
    }
  }

  getProduct(index: number) {
    this.productService.getProducts().subscribe((c) => {
      this.product = c.filter((c) => !c.hero)[index];
      this.isLoading = false;
    });
  }

  addCart(item: ProductResponse) {
    this.success();
  }

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  success() {
    Swal.fire({
      title: 'Produto acionado no carrinho.',
      icon: 'success',
      showConfirmButton: false,
      timer: 2000,
    });
  }
}
