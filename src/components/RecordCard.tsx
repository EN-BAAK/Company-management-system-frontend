import React from 'react';
import { Record as RecordType } from '../misc/types';
import { Card } from 'react-bootstrap';
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

interface Props {
  withWhatsApp?: boolean,
  handleDelete: (id: number, name: string) => void,
  handleSelectRecord: () => void
}

const RecordCard = ({ id, handleDelete, handleSelectRecord, name, phone, withWhatsApp = false }: RecordType & Props): React.ReactNode => {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/+972${phone}`, '_blank');
  };

  const handlePhoneClick = () => {
    window.open(`tel:+972${phone}`);
  };

  return (
    <Card className='w-100'>
      <Card.Body>
        <Card.Text className='text-center fw-semibold fs-4'>{name}</Card.Text>
        <div className="box bg-body-secondary flex-center-y justify-content-between p-3 w-100 fs-3">
          <GoTrash
            onClick={() => handleDelete(id, name)}
          />
          <FiPhoneCall onClick={handlePhoneClick} style={{ cursor: 'pointer' }} />
          {withWhatsApp &&
            <FaWhatsapp onClick={handleWhatsAppClick} style={{ cursor: 'pointer' }} />}
          <CiEdit
            onClick={handleSelectRecord}
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default RecordCard;
