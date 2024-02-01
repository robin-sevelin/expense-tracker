import Footer from '@/components/mainPage/Footer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('footer', () => {
  it('should render footer', () => {
    const { getByAltText } = render(<Footer />);

    const image1 = getByAltText('linkedIn logo');
    const image2 = getByAltText('github logo');

    expect(image1).toBeInTheDocument();
    expect(image2).toBeInTheDocument();
  });
});
