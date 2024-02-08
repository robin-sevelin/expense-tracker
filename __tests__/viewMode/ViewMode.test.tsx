import ViewMode from '@/components/transactionPage/ViewMode';
import { render } from '@testing-library/react';

describe('viewmode component', () => {
  it('should render viewMode component', () => {
    const showList = () => {};

    render(<ViewMode onSetShowList={showList} />);
  });
});
