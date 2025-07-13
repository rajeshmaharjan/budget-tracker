import { TransactionType } from "@enums/transaction-type.enum";
import { Transaction } from "@models/transaction.model";

export const getEnumAsOptions = (data: any) => {
  return Object.entries(data).map(([key, value]) => {
    return {
      label: key,
      value: value,
    };
  });
};

export const getTotalIncome = (transactions: Transaction[]): number => {
  return transactions.filter(x => x.type === TransactionType.Income).reduce((a, c) => (a + +c.amount), 0);
};

export const getTotalExpense = (transactions: Transaction[]): number => {
  return transactions.filter(x => x.type === TransactionType.Expense).reduce((a, c) => (a + +c.amount), 0);
};
