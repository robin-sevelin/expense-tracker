'use client';

import { signInWithGooglePopup } from '@/firebase/auth';
import { createUserDocument } from '@/firebase/firestore';
import { IUser } from '../models/IUser';

const LogInPage = () => {
  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       console.log(response.user);
  //     }
  //   };
  //   getData();
  // }, []);

  const signIn = async () => {
    const response = await signInWithGooglePopup();
    const userDocRef = await createUserDocument(response.user as IUser);
  };

  return (
    <div className='hero bg-base-200'>
      <div className='hero-content text-center'>
        <div className='max-w-md'>
          <h2 className='text-5xl font-bold'>Hello there</h2>
          <p className='py-6'>
            Please login with your google account to use the expense tracker.
          </p>
          <button onClick={signIn} className='btn btn-primary'>
            Log in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
