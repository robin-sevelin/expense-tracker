import { render, act } from '@testing-library/react';
import * as JotaiModule from 'jotai';
import { redirect } from 'next/navigation';
import { useAuthUser } from '@/app/hooks/useAuthUser'; // Adjust the import path accordingly

// Mocking Jotai
jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'), // Use the actual implementation for other functions
  useAtom: jest.fn(),
}));

// Mocking Next.js navigation
jest.mock('next/navigation', () => ({ redirect: jest.fn() }));

describe('useAuthUser', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reset mocks before each test
  });

  it('redirects to "/" when user is not authenticated', () => {
    // Mock useAtom to return a user with a falsy uid
    (JotaiModule.useAtom as jest.Mock).mockReturnValueOnce([
      { uid: '' },
    ] as any);

    // Call the function
    useAuthUser();

    // Assert that redirect was called with the correct argument
    expect(redirect).toHaveBeenCalledWith('/');
  });

  it('returns the authenticated user when user is authenticated', async () => {
    const mockUser = { uid: '123', name: 'John Doe' };

    // Update the implementation for the second test case
    (JotaiModule.useAtom as jest.Mock).mockReturnValueOnce([mockUser] as any);

    // Call the function within an act to handle asynchronous operations
    await act(async () => {
      const result = useAuthUser();

      // Assert that the returned object has the correct structure and contains the user
      expect(result).toEqual({ user: mockUser });
    });
  });
});
