import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
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

  deleteProduct(params: any){
    const that = this;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result: any) => {
      if (result.isConfirmed) {
        that.productService.deleteProduct(params).subscribe(res => {
          if (res.result === 'success') {
            this.getProductList();
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        }); 
      }
    })
  }

}