import { NgModule } from '@angular/core';

import { ProductListComponent } from './product-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { TruncatePipe } from '../../pipes/truncate.pipe';

const routes: Routes = [
  {
    path: '',
    component: ProductListComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    ButtonModule,
    FormsModule,
    CardModule
  ],
  exports: [],
  declarations: [ProductListComponent, TruncatePipe],
  providers: [],
})
export class ProductListModule {}
