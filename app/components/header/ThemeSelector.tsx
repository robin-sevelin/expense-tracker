import { THEMES } from '@/app/constants/themes';
import { ITheme } from '@/app/models/ITheme';
import { themeAtom } from '@/app/store/atoms';
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
    <details className='dropdown'>
      <summary className='m-1 btn bg-base-100'>Theme</summary>
      <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
        {THEMES.map((theme) => (
          <li key={theme.id}>
            <button onClick={() => handleThemeChange(theme)}>
              {theme.name}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default ThemeSelector;