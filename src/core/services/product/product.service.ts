
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from './dtos/product.response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductResponse[]> {
    return this.http.get<ProductResponse[]>('https://raw.githubusercontent.com/eduardovianna/digi/main/products.json');
  }
}
