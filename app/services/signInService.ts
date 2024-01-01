import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { IUser } from '../models/IUser';
import { auth } from '@/firebase/auth';

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user as IUser;
  } catch (error) {
    return error;
  }
};
