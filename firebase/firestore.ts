import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { app } from './config';
import { IUser } from '@/app/models/IUser';

export const db = getFirestore(app);

export const createUserDocument = async (userAuth: IUser) => {
  const userDocRef = doc(db, 'users', userAuth?.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        photoURL,
      });
    } catch (error) {
      console.log('error creating the user', error);
    }
  }

  return userDocRef;
};
