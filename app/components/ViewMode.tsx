import React from 'react';

interface Props {
  onSetShowList: (value: string) => void;
}

const ViewMode = ({ onSetShowList }: Props) => {
  const handleClick = (value: string) => {
    onSetShowList(value);
  };

  return (
    <fieldset>
      <legend>select viewmode</legend>
      <div className='join'>
        <input
          className='join-item btn'
          type='radio'
          name='view'
          aria-label='list'
          id='list'
          value='list'
          onClick={() => handleClick('list')}
        />
        <input
          className='join-item btn'
          type='radio'
          name='view'
          aria-label='calender'
          id='calender'
          value={'calender'}
          onClick={() => handleClick('calender')}
        />
      </div>
    </fieldset>
  );
};

export default ViewMode;
