import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule,  Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { FavoriteService } from '../../services/favorite.service';
import { Product } from '../../models/product';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'main-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, MenubarModule],
})
export class HeaderComponent implements OnInit, OnDestroy {

  cartItems: Product[] = [];
  favoriteItems: Product[] = [];
  private subscriptions: Subscription[] = [];
  menuItems: MenuItem[] = [];

  constructor(
    private cartService: CartService,
    private favoriteService: FavoriteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.cartService.cartItems$.subscribe(items => {
        this.cartItems = items;
      })
    );
    this.subscriptions.push(
      this.favoriteService.favoriteItems$.subscribe(items => {
        this.favoriteItems = items;
      })
    );
    this.menuItems = [
      {
        label: 'Ana Sayfa',
        icon: 'pi pi-fw pi-home',
        command: () => this.router.navigate(['/'])
      },
      {
        label: 'Ürünler',
        icon: 'pi pi-fw pi-list',
        command: () => this.router.navigate(['/products'])
      }
    ];
  }

  navigateToCart(): void {
    this.router.navigate(['/cart']);
  }

  navigateToFavorites(): void {
    this.router.navigate(['/favorites']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
