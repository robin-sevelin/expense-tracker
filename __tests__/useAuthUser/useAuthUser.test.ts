import { act } from '@testing-library/react';
import * as JotaiModule from 'jotai';
import { redirect } from 'next/navigation';
import { useAuthUser } from '@/hooks/useAuthUser';

jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtom: jest.fn(),
}));

jest.mock('next/navigation', () => ({ redirect: jest.fn() }));

describe('useAuthUser', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to "/" when user is not authenticated', () => {
    (JotaiModule.useAtom as jest.Mock).mockReturnValueOnce([
      { uid: '' },
    ] as any);

    useAuthUser();

    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('returns the authenticated user when user is authenticated', async () => {
    const mockUser = { uid: '123', name: 'John Doe' };

    (JotaiModule.useAtom as jest.Mock).mockReturnValueOnce([mockUser] as any);

    await act(async () => {
      const result = useAuthUser();

      expect(result).toEqual({ user: mockUser });
    });
  });
});
