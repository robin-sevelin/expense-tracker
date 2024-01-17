import { DATESTAMP } from '@/app/constants/constants';
import { IUser } from '@/app/models/IUser';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firestore';

export const createUserDocument = async (userAuth: IUser) => {
  const userDocRef = doc(db, 'users', userAuth?.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: DATESTAMP.toLocaleString(),
        photoURL,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};
