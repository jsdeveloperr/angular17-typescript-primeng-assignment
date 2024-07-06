import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
  products: Product[] = [];
  cartId: string | undefined;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data;
    });
    const carts = this.cartService.getCarts();
    if (carts.length) {
      this.cartId = carts[0].id;
    } else {
      const newCart = this.cartService.createCart();
      this.cartId = newCart.id;
    }
  }

  addToFavorites(event: Event, product: Product): void {
    event.stopPropagation();
    this.favoriteService.addToFavorites(product);
  }

  addToCart(event: Event, product: Product): void {
    event.stopPropagation();
    if (this.cartId) {
      this.cartService.addToCart(this.cartId, product);
    }
  }

  goToDetail(productId: string): void {
    this.router.navigate(['/product', productId]);
  }
}
