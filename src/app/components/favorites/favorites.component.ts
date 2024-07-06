import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  favorites: Product[] = [];
  selectedFavorites: Product[] = [];
  cartId: string;

  constructor(
    private favoriteService: FavoriteService,
    private cartService: CartService,
    private router: Router
  ) {
    // Varsayılan sepet oluştur ve cartId'yi bu sepete ata
    const defaultCart = this.cartService.createCart();
    this.cartId = defaultCart.id;
  }

  ngOnInit(): void {
    this.favorites = this.favoriteService.getFavorites();
  }

  removeFromFavorites(product: Product): void {
    this.favoriteService.removeFromFavorites(product);
    this.favorites = this.favoriteService.getFavorites();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(this.cartId, product);
  }

  addSelectedToCart(): void {
    this.selectedFavorites.forEach(product => {
      this.cartService.addToCart(this.cartId, product);
    });
    this.selectedFavorites = [];
  }

  removeSelectedFavorites(): void {
    this.selectedFavorites.forEach(product => {
      this.favoriteService.removeFromFavorites(product);
    });
    this.favorites = this.favoriteService.getFavorites();
    this.selectedFavorites = [];
  }

  clearFavorites(): void {
    this.favoriteService.clearFavorites();
    this.favorites = this.favoriteService.getFavorites();
    this.selectedFavorites = [];
  }

  goToDetail(productId: string): void {
    this.router.navigate(['/product-detail', productId]);
  }
}
