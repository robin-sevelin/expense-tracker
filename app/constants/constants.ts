import { IUser } from '../models/IUser';
import { ITransaction } from '../models/ITransaction';
import { IIncome } from '../models/IIncome';
import { IExpense } from '../models/IExpense';

export const ROUTES = [
  { id: 0, url: '/', text: 'Home' },
  { id: 1, url: '/pages/profile', text: 'Profile' },
  { id: 2, url: '/pages/chart/', text: 'Chart' },
  { id: 3, url: '/pages/viewTransactions', text: 'View transactions' },
  { id: 4, url: '/pages/addTransactions', text: 'Add transaction' },
];
export const CURRENT_DATE = new Date();
export const CURRENT_YEAR = CURRENT_DATE.getFullYear();
export const CURRENT_MONTH = CURRENT_DATE.getMonth();

export const DAYS_IN_MONTH = new Date(
  CURRENT_DATE.getFullYear(),
  CURRENT_DATE.getMonth() + 1,
  0
).getDate();

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

export const EXPENSES_BASE_VALUES: IExpense[] = [];
export const INCOMES_BASE_VALUES: IIncome[] = [];

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
  RECCURING_EXPENSES: {
    border: 'rgb(235, 82, 52)',
    bg: 'rgb(154, 30, 166)',
  },
  RECCURING_INCOMES: {
    border: 'rgb(52, 52, 2352)',
    bg: 'rgb(87, 87, 186)',
  },
};

export const HAMBURGER_ICON = '/hamburger.svg';
