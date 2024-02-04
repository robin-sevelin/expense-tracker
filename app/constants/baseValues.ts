import { IRecurringTransaction } from '@/models/IRecurringTransaction';
import { ITransaction } from '@/models/ITransaction';
import { IUser } from '@/models/IUser';
import { CURRENT_DATE } from './constants';

export const DAY_BASE_VALUES = {
  incomeSum: 0,
  expenseSum: 0,
  day: 0,
};

export const USER_BASE_VALUES: IUser = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
};

export const TRANSACTION_BASE_VALUES: ITransaction = {
  id: '',
  title: '',
  amount: 0,
  date: CURRENT_DATE,
};

export const RECURRING_TRANSACTIONS_BASE_VALUES: IRecurringTransaction[] = [];
export const TRANSACTIONS_BASE_VALUES: ITransaction[] = [];
