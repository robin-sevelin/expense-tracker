import Header from '@/app/components/header/Header';
import Navigation from '@/app/components/header/Navigation';
import ThemeSelector from '@/app/components/header/ThemeSelector';
import ProfileSection from '@/app/components/mainPage/ProfileSection';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('../../hooks/useAuthUser'),
  () => ({
    useAuthUser: jest.fn().mockReturnValue('user'),
  });

jest.mock(''),
  () => ({
    signOut: jest.fn().mockReturnValue('user'),
  });

describe('header', () => {
  it('should render header with a fake user', () => {
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

  it('should not render navigation if not logged in', () => {
    const { queryByText } = render(<Navigation />);

    const navigationElement = queryByText('Add transactions');

    expect(navigationElement).toBeNull();
  });

  it('should  render navigation if logged in', () => {
    render(<Navigation />);
  });
});