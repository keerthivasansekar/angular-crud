import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { DataTablesModule } from 'angular-datatables';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductCreateComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    DataTablesModule
  ]
})
export class ProductModule { }
