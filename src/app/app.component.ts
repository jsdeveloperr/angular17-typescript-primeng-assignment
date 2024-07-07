import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { LoadingService } from './services/loading.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    FooterComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit  {
  constructor(public router: Router, public loadingService: LoadingService, private cartService: CartService) {}

  title = 'sepet-uygulamasi';

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        setTimeout(() => this.loadingService.hide(), 500); // Küçük bir gecikme ekleyerek yükleme işlemini daha görünür hale getirin
      }
    });
    this.cartService.cartItems$.subscribe(cartItems => {
      console.log('Current cart items:', cartItems);
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
