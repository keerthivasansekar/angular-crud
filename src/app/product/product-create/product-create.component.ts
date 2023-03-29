import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // @ts-ignore
  productForm: FormGroup;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router){ }
  
  ngOnInit(): void {
    this.createProductForm();
  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
    });
  }

  createProduct(values: any, isUpdate: boolean){
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if (isUpdate) {
      //for update product
    } else {
      this.productService.createProduct(formData).subscribe(res => {
        if (res.result === 'success') {
          this.router.navigate(['/product/product-list'])
        }
      });
    }

  }


}
