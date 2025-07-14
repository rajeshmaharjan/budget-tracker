import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { IncomeVsExpenseChartComponent, RecentTransactionsComponent, StatisticsCardComponent, TopTransactionsComponent, TransactionListItemComponent } from './components';

import { DashboardComponent } from './pages/dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    StatisticsCardComponent,
    RecentTransactionsComponent,
    TopTransactionsComponent,
    TransactionListItemComponent,
    IncomeVsExpenseChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HighchartsChartModule,
  ]
})
export class DashboardModule { }
