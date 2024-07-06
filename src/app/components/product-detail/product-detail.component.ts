import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  recommendedProducts: Product[] = [];
  cartId: string | undefined;
  responsiveOptions: any[];
  product$: Observable<Product | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private favoriteService: FavoriteService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProducts().subscribe((products: Product[]) => {
        this.product = products.find(p => p.productId === productId);
        this.recommendedProducts = products.filter(p => p.productId !== productId);
      });
      this.route.params.subscribe(params => {
        const productId = params['id'];
        this.product$ = this.productService.getProductById(productId);
      });
    }

    const carts = this.cartService.getCarts();
    if (carts.length) {
      this.cartId = carts[0].id;
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

  addToFavorites(product: Product): void {
    this.favoriteService.addToFavorites(product);
  }

  getSeverity(status: string): "success" | "secondary" | "info" | "warning" | "danger" | "contrast" | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

}