import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';

import { TransactionService } from '@transactionServices/transaction.service';

@Component({
  selector: 'app-income-vs-expense-chart',
  templateUrl: './income-vs-expense-chart.component.html',
  styleUrls: ['./income-vs-expense-chart.component.scss']
})
export class IncomeVsExpenseChartComponent implements OnInit {
  public Highcharts: typeof Highcharts = Highcharts;
  public updateFlag = false;

  public chartOptions!: Highcharts.Options;

  constructor(private _transactionService: TransactionService) { }

  ngOnInit(): void {
    const { totalIncome, totalExpense } = this._transactionService.getTransactionSummary();

    this.chartOptions = {
      chart: {
        type: 'column',
      },
      title: {
        text: 'Income Vs Expense',
      },
      xAxis: {
        categories: ['Income vs Expense'],
        crosshair: true,
        accessibility: {
          description: 'Income vs Expense',
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount',
        }
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
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
        enabled: false,
      },
    };
  }
}
