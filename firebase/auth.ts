import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signinWithGoogleRedirect = () => {
  signInWithRedirect(auth, googleProvider);
};

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
