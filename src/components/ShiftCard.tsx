import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { Shift as ShiftType } from '../misc/types'
import { GoTrash } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { formatText, handlePhoneClick, handleWhatsAppClick } from '../misc/helpers';
import { AiOutlineInfoCircle } from "react-icons/ai";
import Clock from './Clock';

interface Props {
  shift: ShiftType,
  handleDelete: () => void,
  handleEdit: () => void,
  handleView: () => void
}

const ShiftCard = ({ shift, handleDelete, handleEdit, handleView }: Props): React.JSX.Element => {
  const maxTextLength = 10
  return (
    <Card className='overflow-hidden w-100'>
      <Card.Header className='flex-center-y justify-content-between'>
        <div className='flex-center-y justify-content-between gap-3'>
          <GoTrash onClick={() => handleDelete()} size={20} />
          <CiEdit size={20}
            onClick={handleEdit}
          />
          <AiOutlineInfoCircle
            onClick={handleView}
            size={20} />
        </div>

        <p className='m-0'>{shift.date}</p>
      </Card.Header>

      <Card.Body className='row bg-body-secondary row-gap-2 fw-medium'>
        <Col xs={5}>
          <p className='m-0'>
            {shift.worker?.fullName &&
              formatText(shift.worker.fullName, maxTextLength)}
          </p>
        </Col>

        <Col xs={5}>
          {shift.workType &&
            <p className='m-0'>{formatText(shift.workType, maxTextLength)}</p>
          }
        </Col>

        <Col xs={2} className='flex-center-y gap-2'>
          {
            shift.worker?.phone ?
              <React.Fragment>
                <FiPhoneCall
                  size={20}
                  onClick={() => handlePhoneClick(shift.worker?.phone || "")}
                />
                <FaWhatsapp
                  size={20}
                  onClick={() => handleWhatsAppClick(shift.worker?.phone || "")}
                />
              </React.Fragment>
              : <></>
          }
        </Col>
        <Col xs={5}>
          <p className='m-0'>{formatText(shift.company.name, maxTextLength)}</p>
        </Col>

        <Col xs={5} className='flex-center-y gap-1'>
          <FaLocationDot size={20} />
          <p className='m-0'>{formatText(shift.location, maxTextLength)}</p>
        </Col>

        {(shift.startHour || shift.endHour) && (
          <Col sm={12}>
            <Clock startHour={shift.startHour || undefined} endHour={shift.endHour || undefined} />
          </Col>
        )}


      </Card.Body>
    </Card>
  )
}

export default ShiftCard
