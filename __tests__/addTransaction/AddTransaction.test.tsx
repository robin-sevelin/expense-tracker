import AddTransaction from '@/components/formPage/AddTransaction';
import { render } from '@testing-library/react';

describe('Add transaction', () => {
  it('should render add transaction component', () => {
    render(<AddTransaction />);
  });
});
