import { Component, OnInit } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { AddEditTransactionComponent } from '../../components/add-edit-transaction/add-edit-transaction.component';

import { Transaction } from '@models/transaction.model';

import { StorageHelper } from '@helpers/storage.helper';

import { StorageKey } from '@enums/storage-key.enum';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public transactions!: Transaction[];

  constructor(private _offcanvas: NgbOffcanvas) { }

  ngOnInit(): void {
    this._loadData();
  }

  public trackByFn(idx: number, item: Transaction): number {
    return item.id;
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
    this.transactions = StorageHelper.getItem(StorageKey.Transaction) ?? [];
  }
}
