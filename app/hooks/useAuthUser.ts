import { userAtom } from '@/store/atoms';
import { redirect } from 'next/navigation';
import { useAtom } from 'jotai';

export const useAuthUser = () => {
  const [user] = useAtom(userAtom);

  if (!user.uid) {
    return redirect('/');
  }

  return { user } as const;
};
