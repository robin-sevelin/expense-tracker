import TransactionTypeSelect from '@/components/formPage/TransactionTypeSelect';

const AddTransactions = () => {
  return (
    <>
      <h2 className='text-3xl font-bold flex justify-center'>
        ADD TRANSACTIONS
      </h2>
      <TransactionTypeSelect />
    </>
  );
};

export default AddTransactions;
