import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';
import { HttpResponse } from '../models/http-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  loadProducts() {
    const url = environment.API_ENDPOINT+'products';
    return this.httpClient.get(url).pipe(map(data => data));
  }

  createProduct(data: any): Observable<HttpResponse> {
    const url = environment.API_ENDPOINT+'products/add';
    return this.httpClient.post<HttpResponse>(url, data).pipe(map(data => data));
  }
}
