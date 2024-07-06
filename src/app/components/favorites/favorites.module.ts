import { NgModule } from '@angular/core';

import { FavoritesComponent } from './favorites.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent
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
  declarations: [FavoritesComponent],
  providers: [MessageService],
})
export class FavoritesModule {}
