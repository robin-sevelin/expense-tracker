'use client';

import React from 'react';
interface Props {
  onHandleChange: () => void;
}

const CookieBanner = ({ onHandleChange }: Props) => {
  const handleCheckboxChange = () => {
    onHandleChange();
  };
  return (
    <div className='m-auto'>
      <input
        type='checkbox'
        id='my_modal_6'
        className='modal-toggle'
        onChange={handleCheckboxChange}
      />
      <div role='dialog'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Cookie conscent</h3>
          <p className='py-4'>You must accept cookies to use this site</p>
          <div className='modal-action'>
            <label htmlFor='my_modal_6' className='btn'>
              Accept
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
