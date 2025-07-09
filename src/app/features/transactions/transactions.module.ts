import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { AddEditTransactionComponent } from './components/add-edit-transaction/add-edit-transaction.component';

@NgModule({
  declarations: [
    TransactionsComponent,
    AddEditTransactionComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
