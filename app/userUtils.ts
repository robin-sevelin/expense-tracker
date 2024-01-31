import { IUser } from './models/IUser';
export const useAuthUser = () => {
  const user = { displayName: 'hej', uid: 'hej' };

  return { user } as const;
};

export const logOut = () => {
  const loggedInUser: IUser = {
    displayName: 'hej',
    uid: 'hej',
    email: '',
    photoURL: '',
  };
  signOut(loggedInUser);
};

const signOut = (user: IUser): IUser => {
  return {
    ...user,
    displayName: '',
    uid: '',
  };
};
