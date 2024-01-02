import { signInWithRedirect } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase/auth';
import { IUser } from '../models/Iuser';

export const signInWithGoogle = async () => {
  googleProvider.setCustomParameters({ prompt: 'select_account' });
  try {
    const data = await signInWithRedirect(auth, googleProvider);
    return data;
  } catch (error) {
    return { error: 'error signing in' };
  }
};
