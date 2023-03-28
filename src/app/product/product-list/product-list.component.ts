import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
  
  productList: any = [];
  productListSubscribe: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  constructor(private productService: ProductService){

  }
    
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    }
    this.getProductList();
  }

  getProductList(): void{
    this.productListSubscribe = this.productService.loadProducts().subscribe((res: any) => {
      this.productList = res;
      this.dtTrigger.next(null);
    });
  }

}
