import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private favorites: Product[] = [];
  private favoriteItemsSubject = new BehaviorSubject<Product[]>([]);
  favoriteItems$ = this.favoriteItemsSubject.asObservable();

  constructor() {
    this.loadFavoritesFromLocalStorage();
    this.updateFavoriteItems();
  }

  private loadFavoritesFromLocalStorage() {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favorites = JSON.parse(storedFavorites);
    }
  }

  private saveFavoritesToLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private updateFavoriteItems() {
    this.favoriteItemsSubject.next(this.favorites);
    this.saveFavoritesToLocalStorage();
  }

  addToFavorites(product: Product) {
    if (!this.favorites.find(p => p.productId === product.productId)) {
      this.favorites.push(product);
      this.updateFavoriteItems();
    }
  }

  removeFromFavorites(productId: string) {
    this.favorites = this.favorites.filter(p => p.productId !== productId);
    this.updateFavoriteItems();
  }

  getFavorites(): Product[] {
    return this.favorites;
  }

  clearFavorites() {
    this.favorites = [];
    this.updateFavoriteItems();
  }
}
