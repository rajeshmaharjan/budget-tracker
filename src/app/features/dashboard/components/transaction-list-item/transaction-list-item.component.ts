import { Component, Input } from '@angular/core';

import { Transaction } from '@models/transaction.model';

import { TransactionType } from '@enums/transaction-type.enum';

@Component({
  selector: 'app-transaction-list-item',
  templateUrl: './transaction-list-item.component.html',
  styleUrls: ['./transaction-list-item.component.scss']
})
export class TransactionListItemComponent {
  @Input() transaction!: Transaction;
  TransactionType = TransactionType;
}
