import { Component, OnInit } from '@angular/core';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';

import { StorageKey } from '@enums/storage-key.enum';
import { TransactionType } from '@enums/transaction-type.enum';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent implements OnInit {
  public totalIncome!: number;
  public totalExpense!: number;
  public balanceAmount!: number;

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    const transactions: Transaction[] = StorageHelper.getItem(StorageKey.Transaction) ?? []
      , incomes = transactions.filter(x => x.type === TransactionType.Income)
      , expenses = transactions.filter(x => x.type === TransactionType.Expense);

    this.totalIncome = this._getTotalAmount(incomes);
    this.totalExpense = this._getTotalAmount(expenses);
    this.balanceAmount = this.totalIncome - this.totalExpense;
  }

  private _getTotalAmount(transactions: Transaction[]): number {
    return transactions.reduce((a, c) => (a + +c.amount), 0);
  }
}
