import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagesRoutingModule } from './pages-routing.module';
import { ProductModule } from './product/product.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PagesRoutingModule, ProductModule],
})
export class PagesModule {}
