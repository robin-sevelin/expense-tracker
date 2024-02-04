import Header from '@/components/header/Header';
import Navigation from '@/components/header/Navigation';
import ThemeSelector from '@/components/header/ThemeSelector';
import ProfileSection from '@/components/mainPage/ProfileSection';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn(),
  setPersistence: jest.fn(),
}));

describe('header', () => {
  it('should render header ', () => {
    const { queryByText } = render(<Header />);

    const title = queryByText('EXPENSE TRACKER');

    expect(title).toBeInTheDocument();
  });

  it('should render profile section', () => {
    render(<ProfileSection />);
  });

  it('should render theme selector', () => {
    render(<ThemeSelector />);
  });

  it('should not render navigation if no user id', () => {
    const { queryByText } = render(<Navigation />);

    const navigationElement = queryByText('Add transactions');

    expect(navigationElement).toBeNull();
  });
});
