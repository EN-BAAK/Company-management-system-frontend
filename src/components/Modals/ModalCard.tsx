import React, { HTMLAttributes } from 'react'
import { Card } from 'react-bootstrap'

interface Props {
  onClose: () => void,
  title: string
}

const ModalCard = ({ onClose, title, ...props }: HTMLAttributes<HTMLDivElement> & Props): React.JSX.Element => {
  return (
    <div className='modal-card position-fixed flex-center'>
      <Card className='w-100 mx-2 shadow position-relative'>
        <Card.Header className='flex-center-y bg-white border-0 justify-content-between pt-4'>
          <Card.Title className='text-center fw-semibold'>{title}</Card.Title>

          <button
            onClick={onClose}
            className="close-icon bg-transparent rounded-circle flex-center text-main-primary fw-bold">
            X
          </button>
        </Card.Header>

        <Card.Body className=''>

          {props.children}
        </Card.Body>
      </Card>
    </div>
  )
}

export default ModalCard
