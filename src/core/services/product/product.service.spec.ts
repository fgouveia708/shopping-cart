import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    const mockProducts = [
      {
        name: "hero Product",
        detail: "Lorem ipsum dolor sit amet",
        price: "99",
        hero: "OMG This just came out today!",
        image: "http://placehold.it/940x300/999/CCC"
      },
      {
        name: "Product 1",
        detail: "Lorem ipsum dolor sit amet",
        price: "99",
        info: "This is the latest and greatest product from Derp corp.",
        image: "http://placehold.it/300x300/999/CCC"
      }
    ];

    service.getProducts().subscribe(products => {
      expect(products).toBeTruthy();
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://raw.githubusercontent.com/eduardovianna/digi/main/products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

});
