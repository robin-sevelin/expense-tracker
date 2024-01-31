import ProfilePicture from '@/app/components/header/ProfilePicture';
import ProfileSection from '@/app/components/mainPage/ProfileSection';
import BalanceAmount from '@/app/components/sharedComponents/BalanceAmount';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

jest.mock('../../hooks/useAuthUser'),
  () => ({
    useAuthUser: jest.fn().mockReturnValue('user'),
  });

describe('profile section', () => {
  it('should render profile section', () => {
    render(<ProfileSection />);
  });

  it('should render balance amount component', () => {
    render(<BalanceAmount />);
  });

  it('should render profile picture component with user prop', () => {
    const mockUser = {
      displayName: 'MockUser',
      uid: 'mockUserId',
      email: 'mock@example.com',
      photoURL: 'mock/photo/url.jpg',
    };

    render(<ProfilePicture user={mockUser} />);
  });
});
