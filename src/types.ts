export type TransactionType = 'income' | 'expense';
export type UserRole = 'admin' | 'user';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  type: TransactionType;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
  expense: ['Food', 'Rent', 'Transport', 'Entertainment', 'Shopping', 'Health', 'Utilities', 'Other']
};
