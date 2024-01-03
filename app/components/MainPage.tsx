'use client';

import { userAtom } from '../store/atoms';
import { useAtom } from 'jotai';

const MainPage = () => {
  const [user] = useAtom(userAtom);

  return (
    <div>
      <h2>MainPage</h2>
      Hello {user.displayName}
    </div>
  );
};

export default MainPage;
