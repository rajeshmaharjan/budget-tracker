import { TransactionType } from "@enums/transaction-type.enum";

export interface TransactionFilters {
  start_date: string;
  end_date: string;
  type: TransactionType | '';
}
