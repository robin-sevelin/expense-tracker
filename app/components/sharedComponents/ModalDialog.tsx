import React from 'react';

interface Props {
  onHandleClick: () => void;
  isModalOpen: boolean;
}

const ModalDialog = ({ onHandleClick, isModalOpen }: Props) => {
  const toggleModal = () => {
    onHandleClick();
  };
  return (
    <>
      <input
        type='checkbox'
        id='my_modal_6'
        className='modal-toggle'
        checked={isModalOpen}
      />
      <div className={`modal${isModalOpen ? ' open' : ''}`} role='dialog'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Success!</h3>
          <p className='py-4'>Action completed</p>
          <div className='modal-action'>
            <label htmlFor='my_modal_6' className='btn' onClick={toggleModal}>
              Close
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalDialog;
