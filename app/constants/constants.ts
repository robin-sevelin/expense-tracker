import { DateTime } from 'luxon';
import { IUser } from '../models/IUser';
import { ITransaction } from '../models/ITransaction';

export const ROUTES = [
  { id: 0, url: '/', text: 'Home' },
  { id: 1, url: '/pages/profile', text: 'Profile' },
  { id: 2, url: '/pages/graph/', text: 'Graph' },
  { id: 3, url: '/pages/viewTransactions', text: 'View transactions' },
  { id: 4, url: '/pages/addTransactions', text: 'Add transactions' },
];
export const CURRENT_DATE = DateTime.now();
export const CURRENT_YEAR = CURRENT_DATE.year.toString();
export const CURRENT_MONTH = CURRENT_DATE.toFormat('MMMM');
export const DAYS_IN_MONTH = CURRENT_DATE.daysInMonth;

export const USER_BASE_VALUES: IUser = {
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
};

export const MONTH_BASE_VALES = {
  month: '',
  year: '',
};

export const TRANSACTION_BASE_VALUES: ITransaction = {
  id: '',
  title: '',
  amount: 0,
};
export const TRANSACTIONS_BASE_VALUES: ITransaction[] = [];

export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
};

export const EXPENSE_CATEGORIES = [
  {
    id: 0,
    title: 'Joy',
  },
  {
    id: 1,
    title: 'Bills',
  },
  {
    id: 2,
    title: 'Food',
  },
  {
    id: 3,
    title: 'Other',
  },
];

export const INCOME_CATEGORIES = [
  {
    id: 0,
    title: 'Salary',
  },
  {
    id: 1,
    title: 'Gift',
  },
  {
    id: 2,
    title: 'Wellfare',
  },
  {
    id: 3,
    title: 'Other',
  },
];

export const LINECHART_COLORS = {
  INCOME: {
    border: 'rgb(0, 128, 0)',
    bg: 'rgba(0, 128, 0, 0.5)',
  },
  EXPENSE: {
    border: 'rgb(255, 99, 132)',
    bg: 'rgba(255, 99, 132, 0.5)',
  },
  BALANCE: {
    border: 'rgb(75, 192, 192)',
    bg: 'rgba(75, 192, 192, 0.5)',
  },
};
