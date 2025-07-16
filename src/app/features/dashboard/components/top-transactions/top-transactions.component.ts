import { Component, OnInit } from '@angular/core';

import { Transaction } from '@models/transaction.model';

import { TransactionService } from '@transactionServices/transaction.service';

@Component({
  selector: 'app-top-transactions',
  templateUrl: './top-transactions.component.html',
  styleUrls: ['./top-transactions.component.scss']
})
export class TopTransactionsComponent implements OnInit {
  public topTransactions: Transaction[] = [];

  constructor(private _transactionService: TransactionService) { }

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    this.topTransactions = this._transactionService.getTopTransactions();
  }
}
