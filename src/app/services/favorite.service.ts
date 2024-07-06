import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Product[] = [];
  private favoriteItemsSubject = new BehaviorSubject<Product[]>([]);
  favoriteItems$ = this.favoriteItemsSubject.asObservable();

  constructor() {}

  getFavorites(): Product[] {
    return this.favorites;
  }

  addToFavorites(product: Product): void {
    if (!this.favorites.includes(product)) {
      this.favorites.push(product);
      this.updateFavoriteItems();
    }
  }

  removeFromFavorites(product: Product): void {
    this.favorites = this.favorites.filter(p => p.productId !== product.productId);
    this.updateFavoriteItems();
  }

  clearFavorites(): void {
    this.favorites = [];
    this.updateFavoriteItems();
  }

  private updateFavoriteItems(): void {
    this.favoriteItemsSubject.next([...this.favorites]);
  }
}
