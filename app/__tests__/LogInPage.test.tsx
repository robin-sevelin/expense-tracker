// LogInPage.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogInPage from '@/app/components/mainPage/LogInPage'; // Adjust the alias or relative path
import { useGetRedirect } from '@/app/hooks/useGetRedirect';
import { signinWithGoogleRedirect } from '@/firebase/auth';

// Mock the useGetRedirect hook
jest.mock('../hooks/useGetRedirect');

// Mock the signinWithGoogleRedirect function
jest.mock('../../firebase/auth', () => ({
  signinWithGoogleRedirect: jest.fn(),
}));

describe('LogInPage', () => {
  it('renders the component correctly', () => {
    render(<LogInPage />);

    // Perform assertions based on the rendered content
    expect(screen.getByText('Hello there')).toBeInTheDocument();
    expect(
      screen.getByText(/Please login with your google account/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Log in/i })).toBeInTheDocument();
  });

  it('calls useGetRedirect hook', () => {
    render(<LogInPage />);

    // Check if useGetRedirect is called
    expect(useGetRedirect).toHaveBeenCalledTimes(1);
  });

  it('calls signinWithGoogleRedirect on button click', () => {
    render(<LogInPage />);

    // Simulate a button click
    fireEvent.click(screen.getByRole('button', { name: /Log in/i }));

    // Check if signinWithGoogleRedirect is called
    expect(signinWithGoogleRedirect).toHaveBeenCalledTimes(1);
  });
});
