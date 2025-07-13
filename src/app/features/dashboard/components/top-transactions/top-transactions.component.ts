import { Component, OnInit } from '@angular/core';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';

import { StorageKey } from '@enums/storage-key.enum';

@Component({
  selector: 'app-top-transactions',
  templateUrl: './top-transactions.component.html',
  styleUrls: ['./top-transactions.component.scss']
})
export class TopTransactionsComponent implements OnInit {
  public topTransactions: Transaction[] = [];

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    const transactions: Transaction[] = StorageHelper.getItem(StorageKey.Transaction) ?? [];
    this.topTransactions = transactions
      .sort((a, b) => +b - +a)
      .slice(0, 5);
  }
}
