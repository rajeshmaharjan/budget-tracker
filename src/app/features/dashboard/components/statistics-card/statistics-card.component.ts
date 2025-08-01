import { Component, OnInit } from '@angular/core';

import { TransactionService } from '@transactionServices/transaction.service';

import { TransactionSummary } from '@models/transaction-summary.model';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {
  public totalIncome!: number;
  public totalExpense!: number;
  public balanceAmount!: number;

  constructor(private _transactionService: TransactionService) { }

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    const summary: TransactionSummary = this._transactionService.getTransactionSummary();
    this.totalIncome = summary.totalIncome;
    this.totalExpense = summary.totalExpense;
    this.balanceAmount = summary.totalBalance;
  }
}
