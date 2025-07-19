import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { ConfirmationModalComponent } from 'src/app/shared/components';
import { AddEditTransactionComponent } from '../../components/add-edit-transaction/add-edit-transaction.component';

import { TransactionService } from '@transactionServices/transaction.service';

import { TransactionFilters } from '@models/transaction-filters.model';
import { Transaction } from '@models/transaction.model';

import { DEF_MODAL_OPTS } from '@config/modal.options';
import { DEF_OFFCANVAS_OPTS } from '@config/offcanvas.options';
import { DEF_PAGINATION_CONFIG } from '@config/pagination.config';

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
  public paginationConfig = Object.assign({}, DEF_PAGINATION_CONFIG);

  constructor(
    private _offcanvas: NgbOffcanvas
    , private _modal: NgbModal
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

  public trackByFn(idx: number, txn: Transaction): number {
    return txn.id;
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
    const offcanvasRef = this._offcanvas.open(AddEditTransactionComponent, DEF_OFFCANVAS_OPTS);
    offcanvasRef.componentInstance.mode = 'Add';
    offcanvasRef.closed.subscribe(data => {
      this._loadData();
    });
  }

  public onEditBtnClick(txn: Transaction): void {
    const offcanvasRef = this._offcanvas.open(AddEditTransactionComponent, DEF_OFFCANVAS_OPTS);
    offcanvasRef.componentInstance.mode = 'Edit';
    offcanvasRef.componentInstance.data = txn;
    offcanvasRef.closed.subscribe((data: Transaction) => {
      this._loadData();
    });
  }

  public onDeleteBtnClick(txn: Transaction): void {
    const modalRef = this._modal.open(ConfirmationModalComponent, DEF_MODAL_OPTS);
    modalRef.closed.subscribe(confirmation => {
      if (confirmation) {
        this._transactionService.deleteTransaction(txn.id);
        this._loadData();
      }
    });
  }

  private _loadData(): void {
    this.transactions = this._transactionService.getTransactions(this.filters);
  }
}
