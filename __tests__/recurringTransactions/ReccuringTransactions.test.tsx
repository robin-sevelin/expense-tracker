import React from 'react';
import { render } from '@testing-library/react';
import { useAuthUser } from '@/hooks/useAuthUser';
import * as JotaiModule from 'jotai';
import RecurringTransactions from '@/components/formPage/RecurringTransactionTypeSelect';

jest.mock('next/navigation', () => ({ redirect: jest.fn() }));
jest.mock('../../app/hooks/useAuthUser.ts', () => ({ useAuthUser: jest.fn() }));
jest.mock('jotai', () => ({
  ...jest.requireActual('jotai'),
  useAtom: jest.fn(),
}));

describe('RecurringTransactions', () => {
  it('should render RecurringTransactions if user is logged in', () => {
    (useAuthUser as jest.Mock).mockReturnValue({ user: { uid: '123' } });

    (JotaiModule.useAtom as jest.Mock).mockReturnValueOnce([
      { uid: '123' },
      jest.fn(),
    ]);

    render(<RecurringTransactions />);
  });
});

describe('RecurringTransactions', () => {
  it('should not  render RecurringTransactions if user is not logged in', () => {
    (useAuthUser as jest.Mock).mockReturnValue({ user: { uid: '123' } });

    (JotaiModule.useAtom as jest.Mock).mockReturnValueOnce([
      { uid: '' },
      jest.fn(),
    ]);

    render(<RecurringTransactions />);
  });
});
