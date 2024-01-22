import React from 'react';

interface Props {
  onSetShowList: (value: string) => void;
}

const ViewMode = ({ onSetShowList }: Props) => {
  const handleClick = (value: string) => {
    onSetShowList(value);
  };

  return (
    <div className='bg-white flex flex-col m-5 p-5 justify-center items-center'>
      <fieldset>
        <legend>Select View</legend>
        <div className='join'>
          <input
            defaultChecked
            className='join-item btn'
            type='radio'
            name='view'
            aria-label='List'
            id='list'
            value='list'
            onClick={() => handleClick('list')}
          />
          <input
            className='join-item btn '
            type='radio'
            name='view'
            aria-label='Calender'
            id='calender'
            value={'calender'}
            onClick={() => handleClick('calender')}
          />
        </div>
      </fieldset>
    </div>
  );
};

export default ViewMode;
