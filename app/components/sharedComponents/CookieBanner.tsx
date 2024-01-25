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

          <div className='collapse bg-base-100'>
            <input type='checkbox' />
            <div className='collapse-title text-xl font-medium'>
              <p className='py-4'>You must accept cookies to use this site</p>
            </div>
            <div className='collapse-content'>
              <p>
                Welcome to our website! Before you proceed, we want to inform
                you about the use of cookies and how your Google user
                information will be handled. By using our website and logging
                in, you are consenting to the use of necessary cookies and the
                storage of your Google user information in our database. Please
                take a moment to review the following information: Cookie
                Policy: Our website uses necessary cookies to ensure the proper
                functioning of essential features, such as user authentication
                and session management. These cookies are vital for the
                performance and security of our site. They do not collect any
                personally identifiable information and are automatically
                deleted when you close your browser. By continuing to use our
                website, you are consenting to the use of these necessary
                cookies. If you do not wish to accept these cookies, please
                refrain from using our site. Google User Information: When you
                log in using your Google account, we collect and store certain
                information to provide you with a personalized and secure
                experience. This includes your name, email address, and profile
                picture. We use this information solely for the purpose of user
                authentication, account management, and to enhance your overall
                experience on our platform. By logging in with your Google
                account, you are explicitly giving us permission to store and
                process this information in our database. Rest assured, we take
                the security and privacy of your data seriously, and we adhere
                to all relevant data protection regulations. If you have any
                concerns or questions about our cookie policy or the handling of
                your Google user information, please feel free to contact our
                support team. By clicking ACCEPT or continuing to use our
                website and logging in with your Google account, you are
                confirming your acceptance of our cookie policy and the storage
                of your Google user information in our database. Thank you for
                choosing our platform. We hope you have a great experience!
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
    </div>
  );
};

export default CookieBanner;
