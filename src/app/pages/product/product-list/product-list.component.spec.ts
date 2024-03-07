import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductService } from '@services/product/product.service';
import { of } from 'rxjs';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [{ provide: ProductService, useValue: productServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve products on initialization', () => {
    const mockProducts = [
      {
        name: 'hero Product',
        detail: 'Lorem ipsum dolor sit amet',
        price: '99',
        hero: 'OMG This just came out today!',
        image: 'http://placehold.it/940x300/999/CCC',
      },
      {
        name: 'Product 1',
        detail: 'Lorem ipsum dolor sit amet',
        price: '99',
        info: 'This is the latest and greatest product from Derp corp.',
        image: 'http://placehold.it/300x300/999/CCC',
      },
    ];
    productService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges();

    expect(component.products).toEqual(mockProducts.filter((p) => !p.hero));
    expect(component.heroProducts).toEqual(mockProducts.filter((p) => p.hero));
  });
});
