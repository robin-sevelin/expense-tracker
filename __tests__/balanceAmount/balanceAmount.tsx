import BalanceAmount from '@/components/sharedComponents/BalanceAmount';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('balance amount', () => {
  it('should render balance amount component', () => {
    render(<BalanceAmount />);
  });
});
