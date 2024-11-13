import React from 'react'
import { Shift as ShiftType } from '../../../misc/types'
import ModalCard from '../ModalCard'
import { Card } from 'react-bootstrap'
import { FiPhoneCall } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { handlePhoneClick, handleWhatsAppClick } from '../../../misc/helpers';
import { useTranslation } from 'react-i18next';
import Clock from '../../Clock';

interface Props {
  shift: ShiftType,
  onClose: () => void
}

const View = ({ shift, onClose }: Props): React.JSX.Element => {
  const { t: translating } = useTranslation("global")

  return (
    <ModalCard
      onClose={onClose}
      title={translating("shifts.view.title")}
    >
      <Card>
        <Card.Header className='flex-center-y justify-content-between'>
          {shift.worker &&
            <div className='flex-center-y justify-content-between gap-3'>
              <FiPhoneCall
                size={25}
                onClick={() => handlePhoneClick(shift.worker?.phone || "")}
              />
              <FaWhatsapp
                size={25}
                onClick={() => handleWhatsAppClick(shift.worker?.phone || "")}
              />
            </div>}

          <p className='m-0'>{shift.date}</p>
        </Card.Header>

        <Card.Body>
          <p>{shift.worker?.fullName}</p>
          <p>{shift.workType}</p>
          <p>{shift.company.name}</p>
          <p className='m-0'>{shift.location}</p>

        </Card.Body>

        <Card.Footer>
          <Clock startHour={shift.startHour || undefined} endHour={shift.endHour || undefined} />
        </Card.Footer>
      </Card>
    </ModalCard>
  )
}

export default View
