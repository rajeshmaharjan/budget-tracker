import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionsRoutingModule } from './transactions-routing.module';

import { AddEditTransactionComponent } from './components/add-edit-transaction/add-edit-transaction.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    AddEditTransactionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
