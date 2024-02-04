import TransactionList from '@/components/transactionPage/TransactionList';
import { render } from '@testing-library/react';

describe('transactions list', () => {
  it('should render TransactionList component', () => {
    const transactions = [
      {
        id: 'hej',
        title: 'Test Transaction',
        amount: 50,
        date: new Date('2022-02-01'),
      },
    ];

    render(<TransactionList transactions={transactions} />);
    expect(transactions).toHaveLength(1);
  });
});
