import React from 'react';
interface Props {
  onHandleChange: () => void;
}

const CookieBanner = ({ onHandleChange }: Props) => {
  const handleCheckboxChange = () => {
    onHandleChange();
  };
  return (
    <div className='flex justify-center '>
      <input
        type='checkbox'
        id='my_modal_6'
        className='modal-toggle'
        onChange={handleCheckboxChange}
      />
      <div role='dialog '>
        <div className='modal-box bg-base-200 '>
          <h3 className='font-bold text-lg'>Cookie conscent</h3>
          <div className='collapse bg-base-200'>
            <input type='checkbox' />
            <div className='collapse-title text-xl font-medium'>
              <p>
                You must accept cookies to use this site, click HERE to read
                more ..or just click accept if you agree.
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
                If you have questions, contact the admin. By clicking ACCEPT or
                continuing to use the site, you confirm acceptance of our cookie
                policy and Google user information storage. Thanks for choosing
                our platform; we hope you have a great experience!
              </p>
            </div>
          </div>
          <button className='modal-action flex-col justify-center'>
            <label htmlFor='my_modal_6' className='btn btn-primary'>
              Accept
            </label>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
