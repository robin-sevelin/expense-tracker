// Import necessary modules and functions
import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useCookies } from 'react-cookie';
import LandingPage from '../components/mainPage/LandingPage';

// Mock the useGetRedirect, useIsLoggedIn, and react-cookie hooks
jest.mock('../hooks/useGetRedirect', () => ({
  useGetRedirect: jest.fn(() => ({ loading: false })),
}));

jest.mock('../hooks/useIsLoggedIn', () => ({
  useIsLoggedIn: jest.fn(() => ({ user: { uid: '123' } })),
}));

jest.mock('react-cookie', () => ({
  useCookies: jest.fn(() => {
    const cookieValue = 'someValue';
    const setCookie = (name: string, value: any) => {
      // Mocked setCookie function logic, you can adjust it based on your needs
      console.log(`Setting cookie: ${name} - ${JSON.stringify(value)}`);
    };

    return [{ 'expense-tracker': cookieValue }, setCookie];
  }),
}));

// Mock the useGetTransactions, useGetBalance, and useGetIncomeSum hooks
jest.mock('../hooks/useGetTransactions', () => ({
  useGetTransactions: jest.fn(),
}));

jest.mock('../hooks/useGetBalance', () => ({
  useGetBalance: jest.fn(),
}));

jest.mock('../hooks/useGetIncomeSum', () => ({
  useGetIncomeSum: jest.fn(),
}));

// Begin the test suite
describe('LandingPage', () => {
  // Test case 1
  it('renders Loading component while loading', () => {
    render(<LandingPage />);
    const loadingComponent = screen.getByTestId('loading-component');
    expect(loadingComponent).toBeInTheDocument();
  });

  // Test case 2
  it('renders MainPage if user is logged in', () => {
    render(<LandingPage />);
    const mainPageComponent = screen.getByTestId('main-page-component');
    expect(mainPageComponent).toBeInTheDocument();
  });

  // Test case 3
  it('renders CookieBanner if user is not logged in and cookie is not set', () => {
    // Mock the useIsLoggedIn hook to return no user
    jest.mock('../hooks/useIsLoggedIn', () => ({
      useIsLoggedIn: jest.fn(() => ({ user: {} })),
    }));

    // Mock the react-cookie hook to return no cookie
    jest.mock('react-cookie', () => ({
      useCookies: jest.fn(() => [{}]),
    }));

    render(<LandingPage />);
    const cookieBannerComponent = screen.getByTestId('cookie-banner-component');
    expect(cookieBannerComponent).toBeInTheDocument();
  });

  // Test case 4
  it('renders LogInPage if user is not logged in and cookie is set', () => {
    // Mock the useIsLoggedIn hook to return no user
    jest.mock('../../hooks/useIsLoggedIn', () => ({
      useIsLoggedIn: jest.fn(() => ({ user: {} })),
    }));

    // Mock the react-cookie hook to return a cookie
    jest.mock('react-cookie', () => ({
      useCookies: jest.fn(() => [{ 'expense-tracker': 'someValue' }]),
    }));

    render(<LandingPage />);
    const logInPageComponent = screen.getByTestId('log-in-page-component');
    expect(logInPageComponent).toBeInTheDocument();
  });

  // Test case 5
  it('handles cookie change', () => {
    // render the component and perform other setup

    // Trigger the handleCookie function
    act(() => {
      userEvent.click(screen.getByText('Accept'));
    });

    // Check that setCookie was called with the expected arguments
    expect(useCookies).toHaveBeenCalledWith('expense-tracker', { uid: '123' });
  });
});
