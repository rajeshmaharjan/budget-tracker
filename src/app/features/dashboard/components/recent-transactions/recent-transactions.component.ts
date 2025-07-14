import { Component, OnInit } from '@angular/core';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';

import { StorageKey } from '@enums/storage-key.enum';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  public recentTransactions: any[] = [];

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    const transactions: Transaction[] = StorageHelper.getItem(StorageKey.Transaction) ?? [];
    this.recentTransactions = transactions
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }
}
