import { auth } from '@/firebase/auth';
import { signOut } from 'firebase/auth';

export const logOut = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    return error;
  }
};
