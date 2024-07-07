import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: { [key: string]: Product[] } = {};
  private currentCart: string = 'default';
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartsFromLocalStorage();
    if (!this.carts[this.currentCart]) {
      this.carts[this.currentCart] = [];
    }
    this.updateCartItems();
  }

  private loadCartsFromLocalStorage() {
    const storedCarts = localStorage.getItem('carts');
    if (storedCarts) {
      this.carts = JSON.parse(storedCarts);
    } else {
      this.carts[this.currentCart] = [];
    }
  }

  private saveCartsToLocalStorage() {
    localStorage.setItem('carts', JSON.stringify(this.carts));
  }

  private updateCartItems() {
    this.cartItemsSubject.next(this.carts[this.currentCart]);
    this.saveCartsToLocalStorage();
  }

  addToCart(cartId: string, product: Product) {
    if (!this.carts[cartId]) {
      this.carts[cartId] = [];
    }
    const cart = this.carts[cartId];
    const existingProduct = cart.find(p => p.productId === product.productId);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      cart.push(product);
    }
    this.updateCartItems();
  }

  removeFromCart(cartId: string, productId: string) {
    if (!this.carts[cartId]) {
      this.carts[cartId] = [];
    }
    const cart = this.carts[cartId];
    const index = cart.findIndex(p => p.productId === productId);
    if (index !== -1) {
      cart.splice(index, 1);
    }
    this.updateCartItems();
  }

  clearCart(cartId: string) {
    if (!this.carts[cartId]) {
      this.carts[cartId] = [];
    }
    this.carts[cartId] = [];
    this.updateCartItems();
  }

  getCart(cartId: string): Product[] {
    return this.carts[cartId];
  }

  getTotal(cartId: string): number {
    if (!this.carts[cartId]) {
      this.carts[cartId] = [];
    }
    return this.carts[cartId].reduce((total, product) => total + (product.productPrice * product.quantity), 0);
  }

  createCart(): { id: string, products: Product[] } {
    const newCartId = `cart-${Object.keys(this.carts).length + 1}`;
    this.carts[newCartId] = [];
    this.currentCart = newCartId;
    this.updateCartItems();
    return { id: newCartId, products: this.carts[newCartId] };
  }

  switchCart(cartId: string) {
    if (this.carts[cartId]) {
      this.currentCart = cartId;
      this.updateCartItems();
    }
  }

  getCarts(): { label: string, value: string }[] {
    return Object.keys(this.carts).map(id => ({ label: id, value: id }));
  }

  getCurrentCartName(): string {
    return this.currentCart;
  }
}
