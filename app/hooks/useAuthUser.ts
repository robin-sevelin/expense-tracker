import { redirect } from 'next/navigation';
import { IUser } from '../models/IUser';

export const useAuthUser = (user: IUser) => {
  if (!user.uid) {
    redirect('/');
  }
};
