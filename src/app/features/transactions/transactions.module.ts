import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';

import { TransactionsRoutingModule } from './transactions-routing.module';

import { SharedModule } from "src/app/shared/shared.module";

import { AddEditTransactionComponent } from './components/add-edit-transaction/add-edit-transaction.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    AddEditTransactionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TransactionsRoutingModule,
    SharedModule,
    NgxPaginationModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ]
})
export class TransactionsModule { }
