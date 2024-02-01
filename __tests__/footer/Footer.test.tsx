import Footer from '@/app/components/mainPage/Footer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('footer', () => {
  it('should render footer', () => {
    render(<Footer />);
  });
});
