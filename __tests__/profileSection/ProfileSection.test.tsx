import ProfileSection from '@/components/mainPage/ProfileSection';
import BalanceAmount from '@/components/sharedComponents/BalanceAmount';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('profile section', () => {
  it('should render profile section', () => {
    render(<ProfileSection />);
  });

  it('should render balance amount component', () => {
    render(<BalanceAmount />);
  });
});
