import { atom } from 'jotai';
import { USER_BASE_VALUES } from '../constants/constants';

export const loadingAtom = atom(false);
export const loggedInAtom = atom(false);
export const userAtom = atom(USER_BASE_VALUES);
export const balanceAtom = atom(null);
