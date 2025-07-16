import { Injectable } from '@angular/core';

import { TransactionFilters } from '@models/transaction-filters.model';
import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';

import { StorageKey } from '@enums/storage-key.enum';
import { TransactionType } from '@enums/transaction-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  constructor() { }

  public get transactions(): Transaction[] {
    return StorageHelper.getItem(StorageKey.Transaction) ?? [];
  }

  public set transactions(transactions: Transaction[]) {
    StorageHelper.setItem(StorageKey.Transaction, transactions);
  }

  public getTransactions(filters: TransactionFilters) {
    let transactions: Transaction[] = this.transactions;

    if (filters['start_date'] && filters['end_date']) {
      const startDate = new Date(filters['start_date']).getTime()
        , endDate = new Date(filters['end_date']).getTime();

      transactions = transactions.filter(x => {
        const txnDate = new Date(x.date).getTime();
        return (txnDate >= startDate && txnDate <= endDate);
      });
    }

    if (filters['type']) {
      transactions = transactions.filter(x => x.type === filters['type']);
    }

    return transactions;
  }

  public addTransaction(txn: Omit<Transaction, 'id'>) {
    this.transactions = [...this.transactions, { id: new Date().getTime(), ...txn }];
  }

  public editTransaction(txn: Transaction): void {
    const transactions: Transaction[] = this.transactions
      , idx = this.transactions.findIndex((x: Transaction) => x.id === txn.id);

    if (idx !== -1) {
      transactions[idx] = txn;
      this.transactions = transactions;
    }
  }

  public deleteTransaction(id: number): void {
    this.transactions = this.transactions.filter((x: Transaction) => x.id !== id);
  }

  public getTransactionTypes(): { label: string; value: string }[] {
    return Object.entries(TransactionType).map(([key, value]) => {
      return {
        label: key,
        value: value,
      };
    });
  }
}
