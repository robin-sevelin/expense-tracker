'use client';

import { useGetUser } from '@/app/hooks/useGetUser';
import { userAtom } from '@/app/store/atoms';
import { useAtom } from 'jotai';

const Profile = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h2>Profile page</h2>
      <p>Name: {user.displayName}</p>
      <picture>
        <img src={user.photoURL} alt={user.displayName} />
      </picture>
    </div>
  );
};

export default Profile;
