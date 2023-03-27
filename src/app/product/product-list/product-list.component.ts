import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  
  dtOptions: DataTables.Settings = {};
  productList: any;
  productListSubscribe: any;

  constructor(private productService: ProductService){

  }
  
  ngOnInit(): void {
    this.getProductList();
    this.dtOptions = {
      data: this.productList,
      columns: [{
        title: 'Product Name',
        data: 'p_name'
      }, {
        title: 'Product Desc',
        data: 'p_description'
      }, {
        title: 'Price',
        data: 'p_price'
      }]
    };
  }

  getProductList(){
    this.productListSubscribe = this.productService.loadProducts().subscribe(res => {
      this.productList = res;
    });
  }

}
