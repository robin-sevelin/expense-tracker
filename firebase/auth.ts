import {
  browserSessionPersistence,
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import { app } from './config';

export const auth = getAuth(app);
setPersistence(auth, browserSessionPersistence);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signinWithGoogleRedirect = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error('error', error);
  }
};
