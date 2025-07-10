import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddEditTransactionComponent } from './components/add-edit-transaction/add-edit-transaction.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';

const routes: Routes = [
  { path: '', component: TransactionsComponent, },
  { path: 'add', component: AddEditTransactionComponent, },
  { path: 'edit/:id', component: AddEditTransactionComponent, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
