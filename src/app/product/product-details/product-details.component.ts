import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  // @ts-ignore
  productDetails: Product

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute){

  }
  
  ngOnInit(): void {
    let productId = '';
    if (this.activatedRoute.snapshot.params['productId']) {
      productId = this.activatedRoute.snapshot.params['productId'];
      if (productId !== '') {
        this.loadProductDetails(productId);
      }      
    }
  }

  loadProductDetails(productId: any){
    this.productService.loadProductInfo(productId).subscribe(res => {
      this.productDetails = res;
    });
  }


}
