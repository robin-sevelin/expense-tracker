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
  // signInWithRedirect(auth, googleProvider);

  try {
    const result = await signInWithPopup(auth, googleProvider);

    console.log(result.user);
  } catch (error) {
    console.error('error', error);
  }
};
