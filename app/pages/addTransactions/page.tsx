import React from 'react';

const AddTransactions = () => {
  return (
    <div>
      <h2>Hello from add</h2>
      <form>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' />
        <label htmlFor='amount' id='amount'>
          Amount
        </label>
        <input type='number' />
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
};

export default AddTransactions;
