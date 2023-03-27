import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  loadProducts() {
    const url = environment.API_ENDPOINT+'products';
    return this.httpClient.get(url);
    //.pipe(map(data => data))
  }
}
