import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productUrl = 'assets/product.json';
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl);
  }

  getProductById(productId: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.productId === productId))
    );
  }
}
