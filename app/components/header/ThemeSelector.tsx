'use client';

import { THEMES } from '@/constants/themes';
import { ITheme } from '@/models/ITheme';
import { themeAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';
import { HiColorSwatch } from 'react-icons/hi';
import MediaQuery from 'react-responsive';

const ThemeSelector = () => {
  const [currentTheme, setTheme] = useAtom(themeAtom);

  const handleThemeChange = (selectedTheme: ITheme) => {
    setTheme(selectedTheme.name);
    localStorage.setItem('selectedTheme', selectedTheme.name);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme && savedTheme !== currentTheme) {
      setTheme(savedTheme);
    }
  }, [currentTheme, setTheme]);

  return (
    <div className='dropdown'>
      <button className='btn bg-base-100'>
        <span>
          <MediaQuery maxWidth={1224}>
            <HiColorSwatch />
          </MediaQuery>
          <MediaQuery minWidth={1225}>Themes</MediaQuery>
        </span>
      </button>
      <ul tabIndex={0} className='theme-dropdown'>
        {THEMES.map((theme) => (
          <li key={theme.id}>
            <button onClick={() => handleThemeChange(theme)}>
              {theme.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
