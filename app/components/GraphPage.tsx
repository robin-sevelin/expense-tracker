'use client';

import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '../store/atoms';
import { useAuthUser } from '../hooks/useAuthUser';

const GraphPage = () => {
  const [user] = useAtom(userAtom);
  useAuthUser(user);
  return <div>Graph</div>;
};

export default GraphPage;
