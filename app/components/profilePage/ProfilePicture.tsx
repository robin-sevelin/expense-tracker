import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import React from 'react';

const ProfilePicture = () => {
  const [user] = useAtom(userAtom);
  return (
    <picture className=' p-2 m-1'>
      <img
        src={user.photoURL}
        alt={user.displayName}
        width={75}
        height={75}
        loading='lazy'
        className=' rounded-full shadow-2xl '
      />
    </picture>
  );
};

export default ProfilePicture;
