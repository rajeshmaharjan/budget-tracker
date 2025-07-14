import { Component, OnInit } from '@angular/core';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';
import { getTotalExpense, getTotalIncome } from 'src/app/features/transactions/helpers/data.helper';

import { StorageKey } from '@enums/storage-key.enum';

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
    const transactions: Transaction[] = StorageHelper.getItem(StorageKey.Transaction) ?? [];

    this.totalIncome = getTotalIncome(transactions);
    this.totalExpense = getTotalExpense(transactions);

    this.balanceAmount = this.totalIncome - this.totalExpense;
  }
}
