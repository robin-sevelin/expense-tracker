import { atom } from 'jotai';

export const loggedInAtom = atom(false);
export const userAtom = atom({
  uid: '',
  email: '',
  displayName: '',
  photoURL: '',
});
