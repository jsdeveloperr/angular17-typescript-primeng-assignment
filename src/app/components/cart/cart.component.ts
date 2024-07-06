import { Component, OnInit, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnInit, AfterViewInit {
  carts: Cart[] = [];
  selectedCart: Cart | undefined;

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.carts = this.cartService.getCarts();
  }

  ngAfterViewInit(): void {
    if (this.carts.length > 0) {
      this.selectCart(this.carts[0]); // İlk sepeti seçili hale getir
    }
  }

  createCart(): void {
    const newCart = this.cartService.createCart();
    this.carts.push(newCart);
    this.selectCart(newCart); // Yeni oluşturulan sepeti seçili hale getir
    this.cdr.detectChanges();
  }

  selectCart(cart: Cart): void {
    this.selectedCart = cart;
    this.cdr.detectChanges(); // Değişiklikleri manuel olarak algıla
  }

  removeFromCart(product: Product): void {
    if (this.selectedCart) {
      this.cartService.removeFromCart(this.selectedCart.id, product);
      this.cdr.detectChanges(); // Değişiklikleri manuel olarak algıla
    }
  }

  updateQuantity(product: Product, quantity: number): void {
    if (this.selectedCart) {
      const item = this.selectedCart.items.find(item => item.product.productId === product.productId);
      if (item) {
        item.quantity = quantity;
        this.cartService.updateCart(this.selectedCart);
        this.cdr.detectChanges(); // Değişiklikleri manuel olarak algıla
      }
    }
  }

  calculateTotal(): number {
    return this.selectedCart ? this.selectedCart.total : 0;
  }

  calculateShippingFee(): number {
    return this.selectedCart ? this.selectedCart.shippingFee : 0;
  }

  removeSelectedItems(): void {
    if (this.selectedCart) {
      this.selectedCart.items = this.selectedCart.items.filter(item => !item.selected);
      this.cartService.updateCart(this.selectedCart);
      this.cdr.detectChanges(); // Değişiklikleri manuel olarak algıla
    }
  }

  selectAllItems(select: boolean): void {
    if (this.selectedCart) {
      this.selectedCart.items.forEach(item => item.selected = select);
      this.cdr.detectChanges(); // Değişiklikleri manuel olarak algıla
    }
  }

  addToCart(product: Product): void {
    if (this.selectedCart) {
      this.cartService.addToCart(this.selectedCart.id, product);
      this.cdr.detectChanges(); // Değişiklikleri manuel olarak algıla
    }
  }

  goToDetail(productId: string): void {
    console.log(productId);

    this.router.navigate(['/product-detail', productId]);
  }
}
