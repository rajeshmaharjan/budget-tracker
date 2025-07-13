import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { AddEditTransactionComponent } from '../../components/add-edit-transaction/add-edit-transaction.component';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';
import { getEnumAsOptions } from '../../helpers/data.helper';

import { StorageKey } from '@enums/storage-key.enum';
import { TransactionType } from '@enums/transaction-type.enum';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<void>();

  public transactions!: Transaction[];
  public filteredTransactions!: Transaction[];

  public transactionTypes: any[] = getEnumAsOptions(TransactionType);

  public filters: { [key: string]: any } = {
    start_date: '',
    end_date: '',
    type: '',
  };
  public paginationConfig: { [key: string]: number } = {
    itemsPerPage: 5,
    currentPage: 1,
  };

  constructor(private _offcanvas: NgbOffcanvas) { }

  ngOnInit(): void {
    this._loadData();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  public trackByFn(idx: number, item: Transaction): number {
    return item.id;
  }

  public onResetBtnClick(): void {
    this.filters['start_date'] = '';
    this.filters['end_date'] = '';
    this.filters['type'] = '';
    this._applyFilters();
  }

  public onFilterBtnClick(): void {
    this._applyFilters();
  }

  public onAddTxnBtnClick(): void {
    const offcanvasRef = this._offcanvas.open(AddEditTransactionComponent, { position: 'end' });
    offcanvasRef.componentInstance.mode = 'Add';
    offcanvasRef.closed.subscribe(data => {
      if (data) {
        const currentItems = StorageHelper.getItem(StorageKey.Transaction) ?? [];
        currentItems.push(data);
        StorageHelper.setItem(StorageKey.Transaction, currentItems);
        this._loadData();
      }
    });
  }

  public onEditBtnClick(item: Transaction): void {
    const offcanvas = this._offcanvas.open(AddEditTransactionComponent, { position: 'end' });
    offcanvas.componentInstance.mode = 'Edit';
    offcanvas.componentInstance.data = item;
    offcanvas.closed.subscribe((data: Transaction) => {
      if (data) {
        const currentItems: Transaction[] = StorageHelper.getItem(StorageKey.Transaction)
          , idx = currentItems.findIndex((x: Transaction) => x.id === data.id);

        if (idx !== -1) {
          currentItems[idx] = data;
          StorageHelper.setItem(StorageKey.Transaction, currentItems);
        }

        this._loadData();
      }
    });
  }

  public onDeleteBtnClick(item: Transaction): void {
    if (confirm('Are you sure?')) {
      const currentItems = StorageHelper.getItem(StorageKey.Transaction) ?? []
        , filteredItems = currentItems.filter((x: Transaction) => x.id !== item.id);

      StorageHelper.setItem(StorageKey.Transaction, filteredItems);

      this._loadData();
    }
  }

  private _loadData(): void {
    const transactions = StorageHelper.getItem(StorageKey.Transaction) ?? [];

    this.transactions = [...transactions];
    this.filteredTransactions = [...transactions];
  }

  private _applyFilters(): void {
    let filteredTransactions: Transaction[] = [...this.transactions];

    if (this.filters['start_date'] && this.filters['end_date']) {
      const startDate = new Date(this.filters['start_date']).getTime()
        , endDate = new Date(this.filters['end_date']).getTime();

      filteredTransactions = filteredTransactions.filter(x => {
        const txnDate = new Date(x.date).getTime()
        return (txnDate >= startDate && txnDate <= endDate);
      });
    }

    if (this.filters['type']) {
      filteredTransactions = filteredTransactions.filter(x => x.type === this.filters['type']);
    }

    this.filteredTransactions = filteredTransactions;
  }
}
