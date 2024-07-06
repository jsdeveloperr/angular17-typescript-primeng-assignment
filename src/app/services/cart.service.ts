import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';
import { Product } from '../models/product';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private carts: Cart[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.createCart();
  }

  createCart(): Cart {
    const newCart: Cart = {
      id: uuidv4(),
      items: [],
      total: 0,
      shippingFee: 40
    };
    this.carts.push(newCart);
    this.updateCartItems();
    return newCart;
  }

  getCarts(): Cart[] {
    return this.carts;
  }

  getCart(cartId: string): Cart | undefined {
    return this.carts.find(cart => cart.id === cartId);
  }

  addToCart(cartId: string, product: Product): void {
    const cart = this.getCart(cartId);
    if (cart) {
      const existingItem = cart.items.find(item => item.product.productId === product.productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.items.push({ product, quantity: 1 });
      }
      this.updateCart(cart);
    }
  }

  removeFromCart(cartId: string, product: Product): void {
    const cart = this.getCart(cartId);
    if (cart) {
      cart.items = cart.items.filter(item => item.product.productId !== product.productId);
      this.updateCart(cart);
    }
  }

  updateCart(cart: Cart): void {
    cart.total = cart.items.reduce((sum, item) => sum + item.product.productPrice * item.quantity, 0);
    cart.shippingFee = cart.total >= 1000 ? 0 : 40;
    cart.total += cart.shippingFee;
    this.updateCartItems();
  }

  private updateCartItems(): void {
    const allItems = this.carts.flatMap(cart => cart.items.map(item => item.product));
    this.cartItemsSubject.next(allItems);
  }
}
