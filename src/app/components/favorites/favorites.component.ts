import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../services/favorite.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
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
    this.favoriteService.removeFromFavorites(product.productId);
    this.favorites = this.favoriteService.getFavorites();
  }

  addToCart(product: Product): void {
    console.log('Adding to cart:', product); // Debugging için log ekleyin
    this.cartService.addToCart(this.cartId, product);
    console.log('Current cart items:', this.cartService.getCart(this.cartId)); // Debugging için log ekleyin
  }

  addSelectedToCart(): void {
    this.selectedFavorites.forEach(product => {
      this.addToCart(product);
    });
    this.selectedFavorites = [];
  }

  removeSelectedFavorites(): void {
    this.selectedFavorites.forEach(product => {
      this.favoriteService.removeFromFavorites(product.productId);
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
