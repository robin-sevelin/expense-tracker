export const ROUTES = [
  { id: 0, url: '/', text: 'Home' },
  { id: 1, url: '/pages/profile', text: 'Profile' },
  { id: 2, url: '/pages/chart/', text: 'Chart' },
  { id: 3, url: '/pages/viewTransactions', text: 'View transactions' },
  { id: 4, url: '/pages/addTransactions', text: 'Add transaction' },
  {
    id: 5,
    url: '/pages/viewRecurringTransactions',
    text: 'Recurring transactions',
  },
];
export const CURRENT_DATE = new Date();
export const CURRENT_YEAR = CURRENT_DATE.getFullYear();
export const CURRENT_MONTH = CURRENT_DATE.getMonth();
export const DAYS_IN_MONTH = new Date(
  CURRENT_DATE.getFullYear(),
  CURRENT_DATE.getMonth() + 1,
  0
).getDate();

export const TRANSACTION_TYPES = {
  BUDGET: 'budget',
  INCOME: 'income',
  EXPENSE: 'expense',
  RECURRING_INCOME: 'recurringIncome',
  RECURRING_EXPENSE: 'recurringExpense',
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

export const FOOTER_NAV_IMGS = [
  {
    id: 0,
    src: '/github-mark.png',
    alt: 'github logo',
    url: 'https://github.com/robin-sevelin',
  },
  {
    id: 1,
    src: '/linkedIn.png',
    alt: 'linkedIn logo',
    url: 'https://www.linkedin.com/in/robin-sevelin-336b20168/',
  },
  {
    id: 2,
    src: '/email.png',
    alt: 'email',
    url: 'mailto:robin.sevelin@medieinstitutet.se',
  },
];

export const BALANCE = 'balance';
export const TRANSACTIONS = 'transactions';
export const RECURRING_TRANSACTIONS = 'recurringTransactions';
export const USER_TRANSACTIONS = 'userTransactions';
export const USER_BUDGETS = 'userBudgets';
export const USERS = 'users';
