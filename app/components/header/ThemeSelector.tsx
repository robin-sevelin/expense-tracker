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
    <div className='dropdown '>
      {/* <summary className=' btn bg-base-100 w-20'>Theme</summary> */}
      <div tabIndex={0} role='button' className='btn m-1 bg-base-100 w-20'>
        Theme
      </div>
      <ul
        tabIndex={0}
        className='shadow menu dropdown-content z-[1] bg-base-100 rounded-box  '
        style={{
          maxHeight: '600px',
          overflowY: 'hidden',
          width: '220px',
          marginLeft: '-110px',
        }}
      >
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
