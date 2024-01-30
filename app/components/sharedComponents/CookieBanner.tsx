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
    <>
      <input
        type='checkbox'
        id='my_modal_6'
        className='modal-toggle'
        onChange={handleCheckboxChange}
      />
      <div role='dialog'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Cookie conscent</h3>
          <div className='collapse bg-base-100'>
            <input type='checkbox' />
            <div className='collapse-title text-xl font-medium'>
              <p className='py-4'>
                You must accept cookies to use this site, click HERE to read
                more.
              </p>
            </div>
            <div className='collapse-content'>
              <p>
                Welcome to our website! Before proceeding, please be aware of
                our use of cookies and how we handle your Google user
                information. By using our site and logging in, you consent to
                necessary cookies for essential features and the storage of your
                Google user information in our database. Our necessary cookies
                ensure proper site functioning and security, automatically
                deleting when you close your browser.
              </p>
              <p>
                When you log in with your Google account, we collect and store
                your name, email, and profile picture for user authentication
                and a personalized experience. Your data security and privacy
                are paramount, and we comply with relevant regulations. If you
                have questions, contact our support team. By clicking ACCEPT or
                continuing to use our site, you confirm acceptance of our cookie
                policy and Google user information storage. Thanks for choosing
                our platform; we hope you have a great experience!
              </p>
            </div>
          </div>
          <div className='modal-action'>
            <label htmlFor='my_modal_6' className='btn'>
              Accept
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieBanner;
