import AddTransaction from '@/components/formPage/AddTransaction';
import { ITransaction } from '@/models/ITransaction';
import { IUser } from '@/models/IUser';
import { render } from '@testing-library/react';

describe('Add transaction', () => {
  it('should render add transaction component', () => {
    const submitData = async (user: IUser, data: ITransaction, date: Date) => {
      //   await createTransactionDocument(user, data, date);
      //   setIsSubmitted(true);
    };

    render(<AddTransaction onHandleSubmit={submitData} />);
  });
});
