'use client';

import React from 'react';
import ProfilePicture from '../header/ProfilePicture';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import BalanceAmount from '@/components/sharedComponents/BalanceAmount';

const ProfileSection = () => {
  const [user] = useAtom(userAtom);

  return (
    <section className='flex justify-start m-1 p-2 bg-secondary-100 h-auto '>
      {user.uid && (
        <div className='profile-window'>
          <ProfilePicture user={user} />
          <BalanceAmount />
        </div>
      )}
    </section>
  );
};

export default ProfileSection;
