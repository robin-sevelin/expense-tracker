'use client';

import { useGetBalance } from '../hooks/useGetBalance';
import { userAtom } from '../store/atoms';
import { useAtom } from 'jotai';
import Loading from './Loading';

const MainPage = () => {
  const [user] = useAtom(userAtom);
  const { isLoading } = useGetBalance();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>MainPage</h2>
      Hello {user.displayName}
    </div>
  );
};

export default MainPage;
