import { THEMES } from '@/app/constants/themes';
import { themeAtom } from '@/app/store/atoms';
import { useAtom } from 'jotai';
import React from 'react';

const ThemeSelector = () => {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <details className='dropdown'>
      <summary className='m-1 btn bg-base-100'>Theme</summary>
      <ul className='p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box'>
        {THEMES.map((theme) => (
          <li key={theme.id} className=''>
            <button onClick={() => setTheme(theme.name)}>{theme.name}</button>
          </li>
        ))}
      </ul>
    </details>
  );
};

export default ThemeSelector;
