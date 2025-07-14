import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';
import { getTotalExpense, getTotalIncome } from 'src/app/features/transactions/helpers/data.helper';

import { StorageKey } from '@enums/storage-key.enum';

@Component({
  selector: 'app-income-vs-expense-chart',
  templateUrl: './income-vs-expense-chart.component.html',
  styleUrls: ['./income-vs-expense-chart.component.scss']
})
export class IncomeVsExpenseChartComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  chartOptions!: Highcharts.Options

  ngOnInit(): void {
    const transactions: Transaction[] = StorageHelper.getItem(StorageKey.Transaction) ?? []
      , totalIncome = getTotalIncome(transactions)
      , totalExpense = getTotalExpense(transactions);

    this.chartOptions = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Income Vs Expense'
      },
      xAxis: {
        categories: ['Income vs Expense'],
        crosshair: true,
        accessibility: {
          description: 'Income vs Expense'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount'
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: 'Income',
          data: [totalIncome],
          type: 'column',
          color: '#198754',
        },
        {
          name: 'Expense',
          data: [totalExpense],
          type: 'column',
          color: '#dc3545',
        }
      ],
      credits: {
        enabled: false
      },
    };
  }
}
