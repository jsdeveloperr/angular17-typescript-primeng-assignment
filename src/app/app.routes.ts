import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/product-list/product-list.module').then((m) => m.ProductListModule),
    pathMatch: 'full',
  },
  {
    path: 'cart',
    loadChildren: () => import('./components/cart/cart.module').then((m) => m.CartModule),
  },
  {
    path: 'favorites',
    loadChildren: () => import('./components/favorites/favorites.module').then((m) => m.FavoritesModule),
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./components/product-detail/product-detail.module').then(m => m.ProductDetailModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
