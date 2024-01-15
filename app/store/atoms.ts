import { atom, useAtom } from 'jotai';
import {
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
export const transactionAtom = atom(TRANSACTION_BASE_VALUES);
export const idAtom = atom('');
