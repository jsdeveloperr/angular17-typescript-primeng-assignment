import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
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
    TableModule,
    ButtonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputNumberModule,
    ToastModule,
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
