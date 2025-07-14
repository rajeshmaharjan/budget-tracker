import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardModule } from './features/dashboard/dashboard.module';
import { TransactionsModule } from './features/transactions/transactions.module';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => DashboardModule),
  },

  {
    path: 'transactions',
    loadChildren: () => import('./features/transactions/transactions.module').then(m => TransactionsModule),
  },

  { path: '', redirectTo: 'dashboard', pathMatch: 'full', },

  { path: '**', redirectTo: 'dashboard', },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
