import { TEAM } from '@/constants/constants';
import React from 'react';

const TeamLogo = () => {
  return (
    <picture>
      <img
        src={TEAM}
        alt='google logo'
        width={200}
        height={200}
        loading='lazy'
      />
    </picture>
  );
};

export default TeamLogo;
