import { FOOTER_NAV_IMGS } from '@/app/constants/constants';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      {FOOTER_NAV_IMGS.map((img) => (
        <Link href={img.url} key={img.id} target='blank'>
          <picture className='bg-white flex-col justify-center items-center w-20 h-20 flex rounded-full  p-3'>
            <img
              src={img.src}
              alt={img.alt}
              loading='lazy'
              width={50}
              height={50}
            />
          </picture>
        </Link>
      ))}
    </footer>
  );
};

export default Footer;
