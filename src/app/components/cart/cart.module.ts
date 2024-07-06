import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: CartComponent
  }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
   TableModule,
    ButtonModule,
    FormsModule,
  ],
  exports: [RouterModule],
  declarations: [CartComponent],
  providers: [],
})
export class CartModule {}
