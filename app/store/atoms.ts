import { atom } from 'jotai';
import {
  EXPENSES_BASE_VALUES,
  INCOMES_BASE_VALUES,
  TRANSACTIONS_BASE_VALUES,
  TRANSACTION_BASE_VALUES,
  USER_BASE_VALUES,
} from '../constants/constants';

export const loadingAtom = atom(false);
export const loggedInAtom = atom(false);
export const userAtom = atom(USER_BASE_VALUES);
export const balanceAtom = atom(0);
export const sumAtom = atom(0);
export const submitAtom = atom(false);
export const transactionsAtom = atom(TRANSACTIONS_BASE_VALUES);
export const transactionByIdAtom = atom(TRANSACTION_BASE_VALUES);
export const monthAtom = atom(new Date());
export const filtredSumAtom = atom(0);
export const incomeSumAtom = atom(0);
export const expenseSumAtom = atom(0);
export const themeAtom = atom('dark');
export const reccuringExpenseAtom = atom(EXPENSES_BASE_VALUES);
export const reccuringIncomeAtom = atom(INCOMES_BASE_VALUES);
