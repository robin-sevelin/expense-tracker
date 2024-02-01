'use client';

import React from 'react';
import ProfilePicture from '../header/ProfilePicture';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import BalanceAmount from '@/components/sharedComponents/BalanceAmount';

const ProfileSection = () => {
  const [user] = useAtom(userAtom);

  return (
    <>
      {user.uid && (
        <>
          <ProfilePicture user={user} />
          <BalanceAmount />
        </>
      )}
    </>
  );
};

export default ProfileSection;
