import React from 'react';

const Footer = () => {
  return (
    <footer className='flex justify-center bg-base-100 items-center gap-5 py-5'>
      <picture
        className='bg-white flex-col justify-center items-center flex rounded-full'
        style={{ width: '60px', height: '60px' }}
      >
        <img
          src='/github-mark.png'
          alt='git hub'
          width={50}
          height={50}
          loading='lazy'
        />
      </picture>
      <picture
        className='bg-white flex-col justify-center items-center flex rounded-full'
        style={{ width: '60px', height: '60px' }}
      >
        <img
          src='/linkedIn.png'
          alt='linked in'
          width={50}
          height={50}
          loading='lazy'
        />
      </picture>
      <picture
        className='bg-white flex-col justify-center items-center flex rounded-full'
        style={{ width: '60px', height: '60px' }}
      >
        <img
          src='/next.svg'
          alt='next js'
          width={50}
          height={50}
          loading='lazy'
        />
      </picture>
      <picture
        className='bg-white flex-col justify-center items-center flex rounded-full'
        style={{ width: '60px', height: '60px' }}
      >
        <img
          src='/vercel.svg'
          alt='vercel'
          width={50}
          height={50}
          loading='lazy'
        />
      </picture>
    </footer>
  );
};

export default Footer;
