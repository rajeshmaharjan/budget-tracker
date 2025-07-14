import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap';

import { Transaction } from '@models/transaction.model';

import { getEnumAsOptions } from '../../helpers/data.helper';

import { TransactionType } from '@enums/transaction-type.enum';

@Component({
  selector: 'app-add-edit-transaction',
  templateUrl: './add-edit-transaction.component.html',
  styleUrls: ['./add-edit-transaction.component.scss']
})
export class AddEditTransactionComponent implements OnInit {
  public mode!: 'Add' | 'Edit';
  public data!: Transaction;

  public submitting!: boolean;
  public submitted!: boolean;
  public formGroup!: FormGroup;

  public transactionTypes: any[] = getEnumAsOptions(TransactionType);

  constructor(
    private _fb: FormBuilder
    , public activeOffcanvas: NgbActiveOffcanvas
  ) { }

  ngOnInit(): void {
    this._buildForm();
  }

  public get fc(): { [key: string]: AbstractControl<any, any>; } {
    return this.formGroup.controls;
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.activeOffcanvas.close({ ...this.formGroup.value });
    }
  }

  private _buildForm(): void {
    this.formGroup = this._fb.group({
      id: [this.data?.id ?? new Date().getTime()],
      description: [this.data?.description, Validators.required],
      amount: [this.data?.amount, [Validators.required, Validators.min(1)]],
      date: [this.data?.date ?? new Date().toISOString().slice(0, 10), Validators.required],
      type: [this.data?.type ?? '', Validators.required],
    });
  }
}
