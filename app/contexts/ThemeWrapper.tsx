'use client';

import { ReactNode, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

interface WrapperProps {
  children: ReactNode;
}

const ThemeWrapper = ({ children }: WrapperProps) => {
  const { theme } = useContext(ThemeContext);
  return <div data-theme={theme}>{children}</div>;
};

export default ThemeWrapper;
