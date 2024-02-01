import { THEMES } from '@/constants/themes';
import { ITheme } from '@/models/ITheme';
import { themeAtom } from '@/store/atoms';
import { useAtom } from 'jotai';
import React, { useEffect } from 'react';

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
      <button className='btn m-1 bg-base-100'>Theme</button>
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
