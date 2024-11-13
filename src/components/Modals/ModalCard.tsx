import React, { HTMLAttributes } from 'react'
import { Card } from 'react-bootstrap'
import { FaXmark } from "react-icons/fa6";

interface Props {
  onClose: () => void,
  title: string
}

const ModalCard = ({ onClose, title, ...props }: HTMLAttributes<HTMLDivElement> & Props): React.JSX.Element => {
  return (
    <div className='modal-card position-fixed flex-center'>
      <Card className='w-100 mx-2 shadow position-relative'>
        <button
          onClick={onClose}
          className="close-icon bg-transparent position-absolute rounded-circle flex-center">
          <FaXmark size={20} />
        </button>

        <Card.Body className='pt-5'>
          <Card.Title className='text-center fw-semibold'>{title}</Card.Title>

          {props.children}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ModalCard
