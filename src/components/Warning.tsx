import React from 'react';
import { Button } from 'react-bootstrap';
import { CiWarning } from "react-icons/ci";
import { Warning as WarningType } from '../misc/types';
import { useTranslation } from 'react-i18next';

const Warning: React.FC<WarningType & { onClose: () => void }> = ({
  message,
  onClose,
  handleBtn2,
  btn1,
  btn2,
  variantBtn1 = "secondary",
  variantBtn2 = "danger"
}) => {
  const { t: translating } = useTranslation("global")

  return (
    <div className="notification-warning d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100">
      <div className="warning-box bg-light p-4 rounded shadow-lg border border-dark">
        <div className="warning-header d-flex align-items-center gap-2 border-bottom pb-2 mb-3">
          <CiWarning fontSize={40} />
          <h2 className="m-0 fs-4">{translating("global.warning")}</h2>
        </div>

        <p className="warning-message fs-5 mb-4">{message}</p>

        <div className="warning-actions d-flex gap-2">
          <Button
            className="flex-grow-1"
            variant={variantBtn1}
            onClick={onClose}
          >
            {btn1}
          </Button>
          <Button
            className="flex-grow-1"
            variant={variantBtn2}
            onClick={() => {
              handleBtn2();
              onClose();
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
