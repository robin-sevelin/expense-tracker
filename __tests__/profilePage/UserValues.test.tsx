import AddBalance from '@/components/formPage/AddBalance';
import { render } from '@testing-library/react';

describe('User Values', () => {
  it('should render budget form', () => {
    render(<AddBalance />);
  });
});
