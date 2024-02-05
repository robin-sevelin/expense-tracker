'use client';

import { FOOTER_NAV_IMGS } from '@/constants/constants';
import Link from 'next/link';
import React from 'react';
import ProgressBar from '../ProgressBar';
import { userAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import ProfileSection from './ProfileSection';
import MediaQuery from 'react-responsive';

const Footer = () => {
  const [user] = useAtom(userAtom);
  return (
    <>
      <footer>
        {user.uid && <ProgressBar />}
        <MediaQuery maxWidth={1224}>
          <div>{user.uid && <ProfileSection />}</div>
        </MediaQuery>
        <h2>HOW TO REACH ME</h2>
        <div className='flex gap-5'>
          {FOOTER_NAV_IMGS.map((img) => (
            <Link href={img.url} key={img.id} target='blank'>
              <picture className='shadow-2xl bg-white flex-col justify-center items-center  flex rounded-full  p-3'>
                <img
                  src={img.src}
                  alt={img.alt}
                  loading='lazy'
                  width={35}
                  height={35}
                />
              </picture>
            </Link>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
