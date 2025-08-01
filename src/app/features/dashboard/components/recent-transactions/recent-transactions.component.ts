import { Component, OnInit } from '@angular/core';

import { TransactionService } from '@transactionServices/transaction.service';

import { Transaction } from '@models/transaction.model';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.scss']
})
export class RecentTransactionsComponent implements OnInit {
  public recentTransactions: Transaction[] = [];

  constructor(private _transactionService: TransactionService) { }

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    this.recentTransactions = this._transactionService.getRecentTransactions();
  }
}
