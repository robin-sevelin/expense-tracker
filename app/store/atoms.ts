import { atom } from 'jotai';
import {
  CURRENT_YEAR,
  MONTH_BASE_VALES,
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
export const selectedYearAtom = atom(CURRENT_YEAR);
export const selectedMonthAtom = atom(MONTH_BASE_VALES);
