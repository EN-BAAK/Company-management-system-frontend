import React from 'react';
import { Button } from 'react-bootstrap';
import { CiWarning } from "react-icons/ci";
import { Warning as WarningType } from '../misc/types';

const Warning: React.FC<WarningType & { onClose: () => void }> = ({ message, onClose, handleBtn2, btn1, btn2, styleBtn1 = "secondary", styleBtn2 = "danger" }) => {
  return (
    <div className='notification-warning'>
      <div className="warning-box text-black bg-white border border-2 border-black">
        <div className="warning-header flex-center-y gap-1 border border-3 border-top-0 border-start-0 border-end-0 border-black px-2 py-2 mb-1">
          <CiWarning fontSize={45} />
          <h2 className='m-0'>Warning</h2>
        </div>

        <p className='warning-message px-3 fs-5'>{message}</p>

        <div className="warning-actions flex-center">
          <Button
            className='d-block w-100 rounded-0'
            variant={styleBtn1}
            onClick={onClose}
          >
            {btn1}
          </Button>
          <Button
            className='d-block w-100 rounded-1'
            variant={styleBtn2}
            onClick={() => {
              handleBtn2()
              onClose()
            }}
          >
            {btn2}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
