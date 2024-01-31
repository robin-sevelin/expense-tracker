import UserValues from '@/app/components/profilePage/UserValues';
import React from 'react';

const page = () => {
  return (
    <div className='h-96 w-96 m-auto flex flex-col justify-center items-center'>
      <h2 className='text-5xl font-bold'>PROFILE</h2>
      <UserValues />
    </div>
  );
};

export default page;
