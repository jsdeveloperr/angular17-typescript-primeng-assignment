import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})

export class CartComponent implements OnInit {
  cartId: string = '';
  selectedCart: string | undefined;
  selectedProducts: Product[] = [];
  carts: { label: string, value: string }[] = [];
  objectKeys = Object.keys;

  constructor(
    public cartService: CartService,
    public favoriteService: FavoriteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
    if (this.carts.length) {
      this.cartId = this.carts[0].value;
    } else {
      const newCart = this.cartService.createCart();
      this.cartId = newCart.id;
    }
  }

  addToCart(product: Product): void {
    if (this.cartId) {
      this.cartService.addToCart(this.cartId, product);
    }
  }

  removeFromCart(productId: string): void {
    if (this.cartId) {
      this.cartService.removeFromCart(this.cartId, productId);
    }
  }

  getTotalWithShipping(): number {
    if (this.cartId) {
      const total = this.cartService.getTotal(this.cartId);
      return total >= 1000 ? total * 1.2 : (total * 1.2) + 40;
    }
    return 0;
  }

  createCart(cartName: string): void {
    if (cartName) {
      this.cartService.createCart();
      this.carts = this.cartService.getCarts();
    }
  }

  switchCart(cartName: string | undefined): void {
    if (cartName) {
      this.cartService.switchCart(cartName);
      this.cartId = cartName;
    } else {
      console.error('Invalid cart name');
    }
  }

  getCurrentCartName(): string {
    return this.cartService.getCurrentCartName();
  }

  goToDetail(productId: string): void {
    this.router.navigate(['/product-detail', productId]);
  }
}
