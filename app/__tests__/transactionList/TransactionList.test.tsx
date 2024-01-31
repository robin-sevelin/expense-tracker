import TransactionList from '@/app/components/transactionPage/TransactionList';
import { render } from '@testing-library/react';

describe('transactionList', () => {
  it('should redner transactionList component', () => {
    const transactions = [
      {
        id: 'hej',
        title: '1',
        amount: 0,
        date: new Date(),
      },
    ];

    render(<TransactionList transactions={transactions} />);
  });
});
