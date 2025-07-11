import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { RecentTransactionsComponent, StatisticsCardComponent, TopTransactionsComponent, TransactionListItemComponent } from './components';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsCardComponent,
    RecentTransactionsComponent,
    TopTransactionsComponent,
    TransactionListItemComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
