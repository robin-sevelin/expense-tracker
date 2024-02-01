import { redirect } from 'next/navigation';

export const useAuthUser = (userId: string) => {
  if (!userId) {
    redirect('/');
  }

  const user = { uid: 'hej' };

  return { user } as const;
};
