import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [CommonModule, ProductRoutingModule],
})
export class ProductModule {}
