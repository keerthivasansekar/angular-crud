import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { HttpResponse } from '../models/http-response';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  createProduct(data: any): Observable<HttpResponse> {
    const url = environment.API_ENDPOINT+'products/add';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  loadProducts() {
    const url = environment.API_ENDPOINT+'products';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  loadProductInfo(productId: any): Observable<Product> {
    const url = environment.API_ENDPOINT+'products/'+productId;
    return this.httpClient.get<Product>(url).pipe(map(data => data));
  }

  updateProductInfo(data:any): Observable<HttpResponse> {
    const url = environment.API_ENDPOINT+'products/edit';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }

  deleteProduct(productId: any): Observable<HttpResponse> {
    const url = environment.API_ENDPOINT+'products/delete/'+productId;
    return this.httpClient.get<HttpResponse>(url).pipe(map(data => data));
  }

}
