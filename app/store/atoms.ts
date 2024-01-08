import { atom } from 'jotai';
import { BALANCE_BASE_VALUE, USER_BASE_VALUES } from '../constants/constants';

export const loadingAtom = atom(false);
export const loggedInAtom = atom(false);
export const userAtom = atom(USER_BASE_VALUES);
export const balanceAtom = atom(BALANCE_BASE_VALUE);
export const sumAtom = atom(0);
