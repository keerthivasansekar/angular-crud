import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  // @ts-ignore
  productForm: FormGroup;
  productId: any;

  constructor(private productService: ProductService,
              private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute){ }
  
  ngOnInit(): void {
    this.createProductForm();
    let productId = '';
    if (this.activatedRoute.snapshot.params['productId']) {
      productId = this.activatedRoute.snapshot.params['productId'];
      if (productId !== '') {
        this.loadProductDetails(productId);
      }      
    }

  }

  createProductForm(){
    this.productForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50)])],
      'description': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(500)])],
      'price': ['', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(8)])]
    });
  }

  createProduct(values: any){
    let formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('price', values.price);

    if (this.productId) {
      formData.append('id', this.productId);
      this.productService.updateProductInfo(formData).subscribe(res => {
        if (res.result === 'success') {
          this.router.navigate(['/product/product-list']);
        }
      });
    } else {
      this.productService.createProduct(formData).subscribe(res => {
        if (res.result === 'success') {
          this.router.navigate(['/product/product-list']);
        }
      });
    }

  }

  loadProductDetails(productId: any){
    this.productService.loadProductInfo(productId).subscribe(res => {
      this.productForm.controls['name'].setValue(res.p_name);
      this.productForm.controls['description'].setValue(res.p_description);
      this.productForm.controls['price'].setValue(res.p_price);
      this.productId = res.p_id;
    });
  }


}