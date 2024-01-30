// __tests__/auth.test.ts

import { signIn, signOutUser } from '@/firebase/auth';
import { useGetRedirect } from '../hooks/useGetRedirect';

// Mock the entire 'firebase/auth' module
jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'), // Use actual implementations for unmocked methods
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

describe('Authentication Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should sign in user successfully', async () => {
    const email = 'test@example.com';
    const password = 'testPassword';

    // Mock the sign-in method
    (useGetRedirect as jest.Mock).mockResolvedValueOnce({
      user: {
        uid: '123',
        email,
      },
    });

    const user = await signIn(email, password);

    expect(user.uid).toBe('123');
    expect(user.email).toBe(email);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      email,
      password
    );
  });

  test('should sign out user successfully', async () => {
    // Mock the sign-out method
    (signOutUser as jest.Mock).mockResolvedValueOnce();

    await signOutUser();

    expect(signOutUser).toHaveBeenCalled();
  });
});
