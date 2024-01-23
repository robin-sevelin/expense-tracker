import React from 'react';

interface Props {
  onHandleChange: () => void;
  isModalOpen: boolean;
}

const ModalDialog = ({ onHandleChange, isModalOpen }: Props) => {
  const handleCheckboxChange = () => {
    // Add logic to update the isModalOpen state
    onHandleChange();
  };
  return (
    <>
      <input
        type='checkbox'
        id='my_modal_6'
        className='modal-toggle'
        checked={isModalOpen}
        onChange={handleCheckboxChange}
      />
      <div className={`modal${isModalOpen ? ' open' : ''}`} role='dialog'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Success!</h3>
          <p className='py-4'>Action completed</p>
          <div className='modal-action'>
            <label htmlFor='my_modal_6' className='btn'>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDialog;
