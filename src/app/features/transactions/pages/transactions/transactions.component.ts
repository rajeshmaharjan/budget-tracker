import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { AddEditTransactionComponent } from '../../components/add-edit-transaction/add-edit-transaction.component';

import { TransactionService } from '../../services/transaction.service';

import { TransactionFilters } from '@models/transaction-filters.model';
import { Transaction } from '@models/transaction.model';

import { defaultPaginationConfig } from '@config/default-pagination.config';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  private _destroyed$ = new Subject<void>();

  public transactions!: Transaction[];

  public transactionTypes: any[] = [];

  public filters: TransactionFilters = {
    start_date: '',
    end_date: '',
    type: '',
  };
  public paginationConfig = Object.assign({}, defaultPaginationConfig);

  constructor(
    private _offcanvas: NgbOffcanvas
    , private _transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.transactionTypes = this._transactionService.getTransactionTypes();
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
    for (const key in this.filters) {
      this.filters[key as keyof TransactionFilters] = '';
    }
    this._loadData();
  }

  public onFilterBtnClick(): void {
    this._loadData();
  }

  public onAddTxnBtnClick(): void {
    const offcanvasRef = this._offcanvas.open(AddEditTransactionComponent, { position: 'end' });
    offcanvasRef.componentInstance.mode = 'Add';
    offcanvasRef.closed.subscribe(data => {

      this._loadData();
    });
  }

  public onEditBtnClick(txn: Transaction): void {
    const offcanvas = this._offcanvas.open(AddEditTransactionComponent, { position: 'end' });
    offcanvas.componentInstance.mode = 'Edit';
    offcanvas.componentInstance.data = txn;
    offcanvas.closed.subscribe((data: Transaction) => {

      this._loadData();
    });
  }

  public onDeleteBtnClick(txn: Transaction): void {
    if (confirm('Are you sure?')) {
      this._transactionService.deleteTransaction(txn.id);
      this._loadData();
    }
  }

  private _loadData(): void {
    this.transactions = this._transactionService.getTransactions(this.filters);
  }
}
