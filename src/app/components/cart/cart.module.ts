import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { MultiSelectModule } from 'primeng/multiselect';


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
    ButtonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    InputNumberModule,
    DropdownModule,
    CardModule,
    TabViewModule,
    ToolbarModule,
    MultiSelectModule,
  ],
  exports: [RouterModule],
  declarations: [CartComponent],
  providers: [MessageService],
})
export class CartModule {}
