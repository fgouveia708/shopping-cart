import { AfterViewInit, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '@services/cart/cart.service';
import { CartRequest } from '@services/cart/dtos/cart.request';
import { Product } from '@services/product/dtos/product.response';
import { ProductService } from '@services/product/product.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements AfterViewInit {
  product!: Product;
  isLoading: boolean = true;
  quantity: number = 1;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
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

  addCart(item: Product, quantity: number) {
    console.log({ item, quantity });
    let cart = this.cartService.getCart();

    if (cart) {
      this.addToExistingCart(cart, item, quantity);
    } else {
      cart = this.createCart(item, quantity);
    }

    this.cartService.saveCart(cart);
    this.success();
  }

  addToExistingCart(cart: CartRequest, item: Product, quantity: number) {
    const existingItemIndex = cart.items.findIndex((cartItem) => cartItem.product.name === item.name);

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      cart.items.push({
        product: item,
        quantity: quantity,
      });
    }
    cart.total = this.calculateTotal(cart);
  }

  createCart(item: Product, quantity: number): CartRequest {
    return {
      createdAt: new Date(),
      total: parseFloat(item.price) * quantity,
      items: [{ product: item, quantity: quantity }],
    };
  }

  calculateTotal(cart: CartRequest): number {
    return cart.items.reduce((total, item) => {
      const itemTotal = parseFloat(item.product.price) * item.quantity;
      return total + itemTotal;
    }, 0);
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
