import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { TagModule } from 'primeng/tag';

const routes: Routes = [
  {
    path: '',
    component: ProductDetailComponent
  }
];

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    CarouselModule,
    GalleriaModule,
    TagModule
  ],
  exports: [RouterModule]
})
export class ProductDetailModule { }
