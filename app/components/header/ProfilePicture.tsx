import { IUser } from '@/app/models/IUser';
import React from 'react';

interface Props {
  user: IUser;
}

const ProfilePicture = ({ user }: Props) => {
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
